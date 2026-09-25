"""Import Title-delimited chapters with DOCX emphasis and links intact.
Usage: python import-docx.py source.docx existing-manuscript.json
Preserves the target's character profiles. Does not publish or choose music.
"""
import json,re,sys,math
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R='{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
def marks(node,base):
 out=dict(base)
 if node is not None:
  for tag,key in [('b','bold'),('i','italic')]:
   v=node.find(W+tag)
   if v is not None:out[key]=v.get(W+'val','1').lower() not in ('0','false','off')
 return out
def read(source):
 with ZipFile(source) as z:
  root=ET.fromstring(z.read('word/document.xml')); sr=ET.fromstring(z.read('word/styles.xml'))
  rels={n.get('Id'):n.get('Target') for n in ET.fromstring(z.read('word/_rels/document.xml.rels'))}
 styles={s.get(W+'styleId'):s for s in sr.findall(W+'style')}
 defaults=marks(sr.find(f'{W}docDefaults/{W}rPrDefault/{W}rPr'),{})
 def inherit(id,seen=()):
  if id not in styles or id in seen:return {}
  s=styles[id];parent=s.find(W+'basedOn')
  return marks(s.find(W+'rPr'),inherit(parent.get(W+'val'),(*seen,id)) if parent is not None else {})
 rows=[]
 for p in root.findall(f'{W}body/{W}p'):
  st=p.find(f'{W}pPr/{W}pStyle');style=st.get(W+'val') if st is not None else 'Normal'
  base={**defaults,**inherit(style)};runs=[]
  def visit(n,href=None):
   if n.tag==W+'del':return
   if n.tag==W+'hyperlink':href=rels.get(n.get(R+'id'))
   if n.tag==W+'r':
    rp=n.find(W+'rPr');cs=rp.find(W+'rStyle') if rp is not None else None
    props=marks(rp,{**base,**(inherit(cs.get(W+'val')) if cs is not None else {})})
    text=''.join((c.text or '') if c.tag==W+'t' else '\n' if c.tag in [W+'br',W+'cr'] else '\t' if c.tag==W+'tab' else '' for c in n.iter())
    if text:
     run={'text':text,**{k:v for k,v in props.items() if v},**({'href':href} if href else {})}
     if runs and {k:v for k,v in runs[-1].items() if k!='text'}=={k:v for k,v in run.items() if k!='text'}:runs[-1]['text']+=text
     else:runs.append(run)
   else:
    for c in n:visit(c,href)
  visit(p)
  if ''.join(r['text'] for r in runs).strip():rows.append((style,runs))
 return rows

def plain(p):return p if isinstance(p,str) else ''.join(r['text'] for r in p['runs'])
def run_import(source,target):
 data=json.loads(Path(target).read_text());chapters=[];duplicates=0;todos=0;before=[];after=[]
 for style,runs in read(source):
  text=''.join(r['text'] for r in runs)
  if style in ('Title','Heading1'):
   if chapters and not chapters[-1]['paragraphs'] and text.strip()==chapters[-1]['title']:
    duplicates+=1;continue
   title=text.strip();chapters.append({'number':len(chapters)+1,'slug':re.sub('[^a-z0-9]+','-',title.lower()).strip('-'),'title':title,'minutes':1,'paragraphs':[]});continue
  if not chapters:raise ValueError('Text before first title')
  before.append(text)
  todo='// TODO: add link to ko-fi for nsfw part'
  if todo in text:
   assert chapters[-1]['slug']=='upstairs'
   left=len(text[:text.index(todo)]);keep=[];offset=0
   for r in runs:
    part=r['text'][:max(0,left-offset)]
    if part:keep.append({**r,'text':part})
    offset+=len(r['text'])
   runs=keep;todos+=1
  value={'runs':runs} if any(len(r)>1 for r in runs) else ''.join(r['text'] for r in runs)
  chapters[-1]['paragraphs'].append(value);after.append(plain(value))
  if todo in text:chapters[-1]['paragraphs'].append('[NOTE: NSFW PART on https://ko-fi.com/hasiradooo]')
 assert [t.replace('// TODO: add link to ko-fi for nsfw part','') for t in before]==after
 assert len({c['slug'] for c in chapters})==len(chapters)
 for c in chapters:
  text=' '.join(re.sub(r'\[\[.*?\]\]','',plain(p)) for p in c['paragraphs'])
  c['minutes']=max(1,math.ceil(len(text.split())/220))
 data['chapters']=chapters;Path(target).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'chapters':len(chapters),'duplicate_titles_removed':duplicates,'kofi_notes_added':todos,'paragraphs':len(before),'text_preserved':True}))
if __name__=='__main__':run_import(sys.argv[1],sys.argv[2])
