
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser';

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far, fab)


import Meta from './meta'
import Publications from '../pages/publications'
import Theses from '../pages/theses'
import Projects from '../pages/projects'

import files from '../content/output/files.json'

import People, { getStaticProps as People_getStaticProps } from '../pages/people'

import { getEventPictures, getEventPicture } from './events'

export async function getStaticProps({ params }) {
  const {id } = params;
  const events = require(`../content/output/events.json`)
  const event = events.find((l) => l.id == id);
  event.index = events.findIndex((l) => l.id == id);
  const logos = getEventPictures()
  event.logo = getEventPicture(id, logos)
  // event.person = getPerson(event.prof)

  const peopleStaticProps = (await People_getStaticProps()).props

  return { props: { event,peopleStaticProps } }
}

function renderLink(event, key) {
    if (!event[key]) {
      return ''
    }

    let title = event[key].split('/')[3]
    let href = event[key]
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
      case 'gitevent':
        icon = 'fab fa-gitevent fa-fw'
        break
      case 'cv':
        icon = 'far fa-file fa-fw'
        break
      case 'email':
        title = event[key]
        href = `mailto:${event[key]}`
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

// function getPerson(id) {
//   return require(`../content/output/people/${id}.json`)
// }

function EventLogo({event, colour, size}) {
  return <div style={{display: "flex"}}>
    <div className="event logo" style={{ background: colour, zIndex: "2", borderRadius: "50%", minHeight: size, height: size, minWidth: size, width: size, margin: 'auto', display: 'flex', alignItems: 'center'}}>
    <Image width="0" height="0" src={event.logo} alt={event.id} style={{height:"auto", width:"100%"}}/>
    </div>
  </div>
}

export default function Event ({event, peopleStaticProps}) {

  return (
    <>
      <Meta
        title={ event.name }
        image={ event.logo }
      />

      <div className="pusher">
        <div className="ui stackable grid">
          <div className="one wide column"></div>
          <div className="eleven wide column centered">
            <div id="event" className="category" style={{ textAlign: 'center' }}>
              {/* <EventLogo event={event} colour={event.colour} size="150px"/> */}
              <h1>{ event.name }</h1>
              <p>{ event.title }</p>
              { event.url &&
                <p>
                  <Link href={ event.url } target="_blank">
                  <FontAwesomeIcon icon="fas fa-link fa-fw" />{ event.url }
                  </Link>
                </p>
              }
              { event.description &&
                <p>
                  {parse(event.description)}
                </p>
              }
              <div style={{display: "flex", alignItems: "center"}}>
                <p className="event statement" style={{marginLeft: "5px"}}>
                  <span style={{fontSize: "1.15em"}}>{event.name.endsWith(" Event") ? "The " : ""}</span>
                  {/* <Link href={ event.url }><span style={{color: `${event.colour}`, fontWeight: "700", fontSize: "1.7em"}}> {event.name} </span></Link> */}
                  {/* <span style={{fontSize: "1.15em"}}> (<Link href={`/people/${event.prof}`}><span style={{fontWeight: "600"}}>Prof. { event.person.name }</span></Link>) {event.statement} </span>  */}
                </p>
              </div>
              <div className="ui horizontal small divided link list">
                { ['cv', 'facebook', 'twitter', 'github', 'gitevent', 'linkedin', 'email'].map((key) => {
                  return renderLink(event, key)
                }) }
              </div>
            </div>
            {/* <People event={ event.id } {...peopleStaticProps} /> */}
            <Publications selection={ event.publications } />
            {/* <Theses event={ event.id } /> */}
            <Projects selection={ event.projects } />
          </div>
          <div className="one wide column"></div>
        </div>
      </div>
    </>
  )
}
