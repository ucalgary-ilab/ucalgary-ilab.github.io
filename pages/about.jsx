import Link from 'next/link'

export default function About({}) {
  return (
    <div class="ui two column centered grid">
      <div class="ui text container left aligned" id="about">
        <p style={{ fontSize: '1.6em'}}> The <span style={{ fontSize: '2em', fontWeight: '900', color: '#e56f50' }}>INTERACTIONS LAB</span><br/> is the <span style={{fontWeight: '600'}}>University of Calgary’s</span> Human-Computer Interaction research collective.</p>
        <p style={{ fontSize: '1.15em'}}>Based in the <Link href="https://cpsc.ucalgary.ca">Department of Computer Science</Link>, our collocated research space hosts an integrated set of <strong>7 research groups</strong> with over <strong>50 members</strong> including post-docs, graduate students, and undergraduate researchers focused on a diverse range of future-looking interaction and human-centered computing research.</p>
        <p style={{ fontSize: '1.1em'}}>The ILab space, along with faculty offices for the principal researchers, are located in <Link href="https://maps.app.goo.gl/N1GoY4sAp69r1pFt6"> Math Science 680</Link> on the main University of Calgary campus.</p>
      </div>
    </div>
  );
}