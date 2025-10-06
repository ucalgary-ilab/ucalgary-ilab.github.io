
import Image from 'next/image'
import Link from 'next/link'

import files from '../content/output/files.json'
import { default as labsJson } from '../content/output/labs.json'


export async function getStaticProps() {

  const pictures = getLabPictures()

  const labs = labsJson.map(lab => ({
      ...lab,
      profilePhoto: getProfilePhotoPath(lab.prof),
      person: getPerson(lab.prof),
      picture: getLabPicture(lab.id, pictures)
    })
  )

  return { props: { labs } }
}

export function getLabPictures() {
  return files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === 'labs')[0].children
    .map(image => image.name)
}

export function getLabPicture(id, pictures) {
  let img = `${id}.png`
  if (pictures.includes(img)) {
    return `/static/images/labs/${ id }.png`
  } else {
    return '/static/images/labs/emptyLabLogo.png'
  }
}

function getPerson(id) {
  return require(`../content/output/people/${id}.json`)
}

function getProfilePhotoPath(id){
  return `/static/images/people/${id}.jpg`
}


function LabProf({lab, colour, size}) {
  return <div style={{display: "flex"}}>
    <div style={{ background: colour, zIndex: "2", borderRadius: "50%", minHeight: size, height: size, minWidth: size, width: size, display: 'flex', alignItems: 'center'}}>
    <Image width="0" height="0" src={lab.picture} alt={lab.id} style={{height:"auto", width:"100%", objectFit:"contain", padding:"0"}}/>
    </div>
    <Image width="0" height="0" style={{transform: "translateX(-1vw)", borderRadius: "50%", minHeight: size, height: size, minWidth: size, width: size, padding: "0px"}}
          alt={`${lab.prof}'s photo`} src={lab.profilePhoto}/>
  </div>
}


export default function Labs ({labs}) {

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
      <div id="labs" className="ui two column centered grid">
        <div className="ui text container left aligned">
          { labs.map((lab, i) => {
            if (lab.status !== "associated")
            {
              return (
                <div className="card" key={ lab.id } style={{ padding: '15px' }}>
                    <div style={{display: "flex"}}>
                      <Link href={`/labs/${lab.id}`}>
                        <LabProf lab={lab} colour={colours[i]} size="6vw"/>
                      </Link>
                      <div style={{display: "flex", alignItems: "center"}}>
                        <p style={{marginLeft: "5px"}}>
                          <span style={{fontSize: "1.15em"}}>{lab.name.endsWith(" Lab") ? "The " : ""}</span>
                          <Link href={`/labs/${lab.id}`}><span style={{color: `${colours[i]}`, fontWeight: "700", fontSize: "1.7em"}}> {lab.name} </span></Link>
                          <span style={{fontSize: "1.15em"}}> (<Link href={`/people/${lab.prof}`}><span style={{fontWeight: "600"}}>Prof. { lab.person.name }</span></Link>) {lab.statement} </span> </p>
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
            { labs.map((lab, i) => {
              if (lab.status === "associated")
              {
                let colourIndex = i-2
                return (
                    <div className="card" key={ lab.id } style={{flex: "50%", marginBottom: "3vh"}}>

                        <div style={{display: "flex"}}>
                          <Link href={ lab.url }>
                            <LabProf lab={lab} colour={colours[colourIndex]} size="4.5vw"/>
                          </Link>
                          <div style={{display: "flex", alignItems: "center"}}>
                            <p> <Link href={ lab.url }><span style={{color: `${colours[colourIndex]}`, fontWeight: "700", fontSize: "1.15em"}}> {lab.name} </span></Link>
                              <span style={{fontSize: "0.8em"}}> (<Link href={`/people/${lab.prof}`}>Dr. { lab.person.name }</Link> - { lab.person.title }) {lab.description}. </span> </p>
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
