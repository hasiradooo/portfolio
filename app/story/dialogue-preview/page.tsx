import StoryParagraphs, { type StoryParagraph } from '../story-paragraphs';
import styles from '../story.module.css';
import dialogue from '../dialogue.module.css';

export const metadata = { title: 'Dialogue study | Kiro’s notebook', robots: { index: false, follow: false } };
const sample: StoryParagraph[] = [
  'Kiro kept turning the mug by its handle. The tea had stopped steaming a while ago.',
  '[[speech speaker=rin to=kiro]] “You planning to drink that, or is it furniture now?”',
  '[[speech speaker=kiro to=rin]] “I’m thinking.”',
  'Rin pulled a chair out with his foot.',
  '[[speech speaker=rin to=kiro]] “Yeah. I noticed the smoke.”',
  'Susie hid a smile behind her cup. Kiro looked between them, then down at the spare chair.',
  '[[speech speaker=kiro to=rin,susie]] “If you two want me to go, you can just say it.”',
  'They answered before he finished.',
  '[[speech speaker=rin to=kiro overlap=o1]] “Mate, sit the fuck down.”',
  '[[speech speaker=susie to=kiro overlap=o1]] “Nobody wants you to go.”',
  '[[speech speaker=kiro to=all overlap=o1]] “Okay, I was only asking.”',
  'The room went quiet. Three unfinished sentences. His fingers tightened around the handle.',
  { runs: [{ text: 'There. Made it weird.', italic: true }] },
  { runs: [{ text: 'Again.', italic: true, bold: true }] },
  'Susie nudged the chair toward him. She kept her hand on the back of it.',
  '[[speech speaker=susie to=kiro]] “You can stay. You don’t have to be entertaining.”',
  'He had heard something like that before. Rin, outside the shop, trying to light a cigarette in the wind.',
  { runs: [{ text: '[[memory speaker=rin to=kiro]] ' }, { text: '“You’re allowed to just exist here, idiot.”', italic: true }] },
  'His phone buzzed against his thigh. Susie was still across the table.',
  { runs: [{ text: '[[message speaker=susie to=kiro]] ' }, { text: 'want me to change the subject?', bold: true }] },
  'Kiro glanced up. She raised one eyebrow.',
  '[[speech speaker=kiro to=susie]] “Your plant looks dead.”',
  '[[speech speaker=susie to=kiro]] “Wow. Okay. Fuck you too.”',
  'He sat down. The mug left a little wet ring beside hers.',
];
export default function DialoguePreview() {
  return <>
    <aside className={dialogue.previewNote}><span>READING EXPERIMENT / NOT A NEW CHAPTER</span>
      <p>A small scene to try clearer dialogue. Names sit beside spoken lines; shared brackets keep overlapping voices together.</p>
      <div className={dialogue.legend}><span>names, not just colors</span><span>remembered voices marked</span><span>messages kept distinct</span></div>
    </aside>
    <article className={styles.sheet}>
      <span className={styles.tape} aria-hidden="true" />
      <header className={styles.chapterHeader}><p className={styles.label}>DIALOGUE STUDY / NON-CANON SAMPLE</p><h1>Still</h1><p className={styles.readingTime}>three people / one kitchen / a little too much thinking</p></header>
      <div className={styles.prose}><StoryParagraphs paragraphs={sample} /></div>
      <div className={styles.chapterEnd}>✶<span>end of the sample</span>✶</div>
    </article>
  </>;
}
