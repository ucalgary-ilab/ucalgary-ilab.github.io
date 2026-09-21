
import Image from 'next/image'
import Link from 'next/link'

import files from '../content/output/files.json'
import { default as eventsJson } from '../content/output/events.json'


export async function getStaticProps() {

  const pictures = getEventPictures()

  const events = eventsJson.map(event => ({
      ...event,
      profilePhoto: getProfilePhotoPath(event.prof),
      person: getPerson(event.prof),
      picture: getEventPicture(event.id, pictures)
    })
  )

  return { props: { events } }
}

export function getEventPictures() {
  let pictures = files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === 'events')[0]
  if(pictures !== undefined)
    pictures = pictures.children
    .map(image => image.name)
  return pictures
}

export function getEventPicture(id, pictures) {
  let img = `${id}.png`
  if (pictures !== undefined && pictures.includes(img)) {
    return `/static/images/events/${ id }.png`
  } else {
    return '/static/images/events/emptyEventLogo.png'
  }
}

function getPerson(id) {
  return require(`../content/output/people/${id}.json`)
}

function getProfilePhotoPath(id){
  return `/static/images/people/${id}.jpg`
}


function EventProf({event, colour, size}) {
  return <div style={{display: "flex"}}>
    <div style={{ background: colour, zIndex: "2", borderRadius: "50%", minHeight: size, height: size, minWidth: size, width: size, display: 'flex', alignItems: 'center'}}>
    <Image width="0" height="0" src={event.picture} alt={event.id} style={{height:"auto", width:"100%", objectFit:"contain", padding:"0"}}/>
    </div>
    <Image width="0" height="0" style={{transform: "translateX(-1vw)", borderRadius: "50%", minHeight: size, height: size, minWidth: size, width: size, padding: "0px"}}
          alt={`${event.prof}'s photo`} src={event.profilePhoto}/>
  </div>
}


export default function Events ({events}) {

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
      <div id="events" className="ui two column centered grid">
        <div className="ui text container left aligned">
          { events.map((event, i) => {
            if (event.status !== "associated")
            {
              const url = event.redirect === true ? event.url : `/events/${event.id}`;
              return (
                <div className="card" key={ event.id } style={{ padding: '15px' }}>
                    <div style={{display: "flex"}}>
                      <Link href={url}>
                        <EventProf event={event} colour={event.colour} size="6vw"/>
                      </Link>
                      <div style={{display: "flex", alignItems: "center"}}>
                        <p style={{marginLeft: "5px"}}>
                          <span style={{fontSize: "1.15em"}}>{event.name.endsWith(" Event") ? "The " : ""}</span>
                          <Link href={url}><span style={{color: `${event.colour}`, fontWeight: "700", fontSize: "1.7em"}}> {event.name} </span></Link>
                          <span style={{fontSize: "1.15em"}}> <span style={{whiteSpace: "nowrap"}}>(<Link href={`/people/${event.prof}`}><span style={{fontWeight: "600"}}>Prof. { event.person.name }</span></Link>)</span> {event.statement} </span> </p>
                      </div>
                    </div>

                </div>
              )
            }
          })}
          <h2>
            Associated Research Groups
          </h2>
          <div className="associatedGroups" style={{display: "flex", flexWrap: "wrap", marginTop: "5vh"}}>
            { events.map((event, i) => {
              if (event.status === "associated")
              {
                return (
                    <div className="card" key={ event.id } style={{flex: "50%", marginBottom: "3vh"}}>

                        <div style={{display: "flex"}}>
                          <Link href={ event.url }>
                            <EventProf event={event} colour={event.colour} size="4.5vw"/>
                          </Link>
                          <div style={{display: "flex", alignItems: "center"}}>
                            <p> <Link href={ event.url }><span style={{color: `${event.colour}`, fontWeight: "700", fontSize: "1.15em"}}> {event.name} </span></Link>
                              <span style={{fontSize: "0.8em"}}> <span style={{whiteSpace: "nowrap"}}>(<Link href={`/people/${event.prof}`}>Dr. { event.person.name }</Link></span> &ndash; { event.person.title }) {event.description}. </span> </p>
                          </div>
                        </div>

                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    )
  }
