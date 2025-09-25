
import Image from 'next/image'
import Link from 'next/link'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far, fab)


import Meta from './meta'
import Header from './header'
import Publications from '../pages/publications'
import Footer from './footer'

import files from '../content/output/files.json'

import People, { getStaticProps as People_getStaticProps } from '../pages/people'


export async function getStaticProps({ params }) {
  const {id } = params;
  const labs = require(`../content/output/labs.json`)
  const lab = labs.find((l) => l.id == id);
  lab.index = labs.findIndex((l) => l.id == id);
  const logos = getLogos()
  lab.logo = getLogo(id, logos)
  lab.person = getPerson(lab.prof)

  const peopleStaticProps = (await People_getStaticProps()).props

  return { props: { lab,peopleStaticProps } }
}

function getLogos() {
  return files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === 'labs')[0].children
    .map(image => image.name)
}

function getLogo(id, pictures) {
  let img = `${id}.png`
  if (pictures.includes(img)) {
    return `/static/images/labs/${ id }.png`
  } else {
    return '/static/images/labs/no-profile.jpg'
  }
}

function renderLink(lab, key) {
    if (!lab[key]) {
      return ''
    }

    let title = lab[key].split('/')[3]
    let href = lab[key]
    let icon
    switch(key) {
      case 'twitter':
        icon = 'fab fa-twitter fa-fw'
        break
      case 'facebook':
        icon = 'fab fa-facebook-square fa-fw'
        break
      case 'github':
        icon = 'fab fa-github-alt fa-fw'
        break
      case 'gitlab':
        icon = 'fab fa-gitlab fa-fw'
        break
      case 'cv':
        icon = 'far fa-file fa-fw'
        break
      case 'email':
        title = lab[key]
        href = `mailto:${lab[key]}`
        icon = 'far fa-envelope fa-fw'
        break
      case 'linkedin':
        title = 'LinkedIn'
        icon = 'fab fa-linkedin-in fa-fw'
        break
    }

    return (
      <div className="item" key={key}>
        <Link href={ href } target="_blank" style={{ fontSize: '1.2em' }}>
          <FontAwesomeIcon icon={icon} />
          { title }
        </Link>
      </div>
    )
  }

function getPerson(id) {
  return require(`../content/output/people/${id}.json`)
}

function LabLogo({lab, colour, size}) {
  return <div style={{display: "flex"}}>
    <div style={{ background: colour, zIndex: "2", borderRadius: "50%", minHeight: size, height: size, minWidth: size, width: size, justifyItems: "center", margin: 'auto'}}>
    <Image width="0" height="0" src={lab.logo} alt={lab.id} style={{padding: "0px", borderRadius: "50%", minHeight: size, height: size, minWidth: size, width: size, justifyItems: "center"}}/>
    </div>
  </div>
}

export default function Lab ({lab, peopleStaticProps}) {

  let colours = [
    'rgb(24, 91, 121)',
    'rgb(32, 149, 186)',
    'rgb(87, 167, 147)',
    'rgb(163, 184, 108)',
    'rgb(223, 198, 61)',
    'rgb(236, 170, 53)',
    'rgb(237, 137, 37)',
    'rgb(193, 72, 36)',
    'rgb(240, 109, 36)',
    'rgb(216, 81, 40)',
  ]

  return (
    <>
      <Meta
        title={ lab.name }
        image={ lab.logo }
      />

      <Header current="Labs" />

      <div className="pusher">
        <div className="ui stackable grid">
          <div className="one wide column"></div>
          <div className="eleven wide column centered">
            <div id="lab" className="category" style={{ textAlign: 'center' }}>
              <LabLogo lab={lab} colour={colours[lab.index]} size="150px"/>
              <h1>{ lab.name }</h1>
              <p>{ lab.title }</p>
              { lab.url &&
                <p>
                  <Link href={ lab.url } target="_blank">
                  <FontAwesomeIcon icon="fas fa-link fa-fw" />{ lab.url }
                  </Link>
                </p>
              }
              <div style={{display: "flex", alignItems: "center"}}>
                <p style={{marginLeft: "5px"}}>
                  <span style={{fontSize: "1.15em"}}>{lab.name.endsWith(" Lab") ? "The " : ""}</span>
                  <Link href={ lab.url }><span style={{color: `${colours[lab.index]}`, fontWeight: "700", fontSize: "1.7em"}}> {lab.name} </span></Link>
                  <span style={{fontSize: "1.15em"}}> (<Link href={`/people/${lab.prof}`}><span style={{fontWeight: "600"}}>Prof. { lab.person.name }</span></Link>) {lab.statement} </span> </p>
              </div>
              <div className="ui horizontal small divided link list">
                { ['cv', 'facebook', 'twitter', 'github', 'gitlab', 'linkedin', 'email'].map((key) => {
                  return renderLink(lab, key)
                }) }
              </div>
            </div>
            {/* <Publications author={ lab.name } /> */}
            <People lab={ lab.id } {...peopleStaticProps} />
          </div>
          <div className="one wide column"></div>
        </div>
        <Footer />
      </div>
    </>
  )
}
