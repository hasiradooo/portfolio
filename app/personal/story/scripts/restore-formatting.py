"""Restore DOCX run formatting without changing the imported manuscript's text.
Usage: python restore-formatting.py source.docx path/to/manuscript.json
Uses only Python's standard library. It rejects any text mismatch.
"""
import json
import re
import sys
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'

def run_properties(properties, inherited):
    result = dict(inherited)
    if properties is not None:
        for tag, key in [('b', 'bold'), ('i', 'italic')]:
            value = properties.find(W + tag)
            if value is not None:
                result[key] = value.get(W + 'val', '1') not in ('0', 'false', 'off')
    return result

def restore(source, target):
    with ZipFile(source) as archive:
        document = ET.fromstring(archive.read('word/document.xml'))
        styles_root = ET.fromstring(archive.read('word/styles.xml'))
        relationships = ET.fromstring(archive.read('word/_rels/document.xml.rels'))
    relationships = {item.get('Id'): item.get('Target') for item in relationships}
    styles = {style.get(W + 'styleId'): style for style in styles_root.findall(W + 'style')}
    defaults = run_properties(styles_root.find(f'{W}docDefaults/{W}rPrDefault/{W}rPr'), {})
    def inherited_style(style_id, visited=None):
        visited = set() if visited is None else visited
        if style_id not in styles or style_id in visited:
            return defaults
        visited.add(style_id)
        style = styles[style_id]
        based_on = style.find(W + 'basedOn')
        parent = inherited_style(based_on.get(W + 'val'), visited) if based_on is not None else defaults
        return run_properties(style.find(W + 'rPr'), parent)
    paragraphs = []
    for paragraph in document.findall(f'.//{W}body//{W}p'):
        paragraph_style = paragraph.find(f'{W}pPr/{W}pStyle')
        inherited = inherited_style(paragraph_style.get(W + 'val') if paragraph_style is not None else 'Normal')
        runs = []
        def visit(node, href=None):
            if node.tag == W + 'hyperlink':
                href = relationships.get(node.get(R + 'id'))
            if node.tag == W + 'r':
                props = node.find(W + 'rPr')
                character_style = props.find(W + 'rStyle') if props is not None else None
                marks = dict(inherited)
                if character_style is not None:
                    marks.update(inherited_style(character_style.get(W + 'val')))
                marks = {key: value for key, value in run_properties(props, marks).items() if value}
                text = ''.join((child.text or '') if child.tag == W + 't' else '\n' if child.tag == W + 'br' else '\t' if child.tag == W + 'tab' else '' for child in node.iter())
                if text:
                    runs.append({'text': text, **marks, **({'href': href} if href else {})})
            else:
                for child in node:
                    visit(child, href)
        visit(paragraph)
        text = ''.join(run['text'] for run in runs)
        # Match the original import's paragraph splitting and whitespace trimming.
        bounds = [0]
        slices = []
        for match in re.finditer(r'\n\s*\n', text):
            slices.append((bounds[-1], match.start()))
            bounds.append(match.end())
        slices.append((bounds[-1], len(text)))
        for start, end in slices:
            raw = text[start:end]
            if not raw.strip():
                continue
            start += len(raw) - len(raw.lstrip())
            end -= len(raw) - len(raw.rstrip())
            selected = []
            offset = 0
            for run in runs:
                next_offset = offset + len(run['text'])
                left, right = max(start, offset), min(end, next_offset)
                if right > left:
                    part = {**run, 'text': run['text'][left-offset:right-offset]}
                    if selected and {k: v for k, v in selected[-1].items() if k != 'text'} == {k: v for k, v in part.items() if k != 'text'}:
                        selected[-1]['text'] += part['text']
                    else:
                        selected.append(part)
                offset = next_offset
            plain = ''.join(run['text'] for run in selected)
            paragraphs.append({'runs': selected} if any(len(run) > 1 for run in selected) else plain)
    def plain(paragraph):
        return paragraph if isinstance(paragraph, str) else ''.join(run['text'] for run in paragraph['runs'])
    sections = []
    for paragraph in paragraphs:
        text = plain(paragraph)
        if re.fullmatch(r'Karta\s*[\u2013\u2014-]\s*\d+', text):
            sections.append([])
        else:
            sections[-1].append(paragraph)
    character_groups = [[]]
    for paragraph in sections[0][1:]:
        if plain(paragraph) == '\u2014':
            character_groups.append([])
        else:
            character_groups[-1].append(paragraph)
    data = json.loads(Path(target).read_text())
    assert len(data['chapters']) == len(sections) - 1
    assert len(data['characters']) == len(character_groups)
    count = {'paragraphs': 0, 'bold_runs': 0, 'italic_runs': 0, 'combined_runs': 0}
    for item, rich in list(zip(data['characters'], character_groups)) + list(zip(data['chapters'], [section[1:] for section in sections[1:]])):
        assert [plain(p) for p in item['paragraphs']] == [plain(p) for p in rich], f"Text mismatch in {item.get('title', item.get('name'))}"
        item['paragraphs'] = rich
        for paragraph in rich:
            count['paragraphs'] += 1
            if isinstance(paragraph, dict):
                for run in paragraph['runs']:
                    count['bold_runs'] += bool(run.get('bold'))
                    count['italic_runs'] += bool(run.get('italic'))
                    count['combined_runs'] += bool(run.get('bold') and run.get('italic'))
    Path(target).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(count), 'All paragraph text verified unchanged.')

if __name__ == '__main__':
    restore(sys.argv[1], sys.argv[2])
