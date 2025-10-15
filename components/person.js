
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
import Publications from '../pages/publications'
import {getLabPictures, getLabPicture} from './labs'

import files from '../content/output/files.json'
import { default as labsJson } from '../content/output/labs.json'

export async function getStaticProps({ params }) {
  const id = params.id;

  const person = require(`../content/output/people/${id}.json`)
  const photos = getPhotos()
  person.photo = getPhoto(id, photos)

  return { props: { person } }
}

function getPhotos() {
  return files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === 'people')[0].children
    .map(image => image.name)
}

function getPhoto(id, pictures) {
  let img = `${id}.jpg`
  if (pictures.includes(img)) {
    return `/static/images/people/${ id }.jpg`
  } else {
    return '/static/images/people/no-profile.jpg'
  }
}

function renderLink(person, key) {
    if (!person[key]) {
      return ''
    }

    let title = person[key].split('/')[3]
    let href = person[key]
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
        title = person[key]
        href = `mailto:${person[key]}`
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


export default function Person ({person}) {
  const pictures = getLabPictures()
  const labs = labsJson.map(lab => ({
      ...lab,
      picture: getLabPicture(lab.id, pictures)
    })
  )
  return (
    <>
      <Meta
        title={ person.name }
        image={ person.photo }
      />

      <div className="pusher">
        <div className="ui stackable grid">
          <div className="one wide column"></div>
          <div className="eleven wide column centered">
            <div id="person" className="category" style={{ textAlign: 'center' }}>
              <Image width={0} height={0} className="ui circular image large-profile" alt={ `${person.name}'s photo` } src={ person.photo } style={{ margin: 'auto' }} />
              <h1>{ person.name }</h1>
              <p>{ person.title }</p>
              { person.url &&
                <p>
                  <Link href={ person.url } target="_blank">
                  <FontAwesomeIcon icon="fas fa-link fa-fw" />{ person.url }
                  </Link>
                </p>
              }
              { person.scholar &&
                <p>
                  <Link href={ person.scholar } target="_blank">
                    <FontAwesomeIcon icon="fas fa-graduation-cap fa-fw" />
                    Google Scholar
                  </Link>
                </p>
              }
              <div className="ui horizontal small divided link list">
                { ['cv', 'facebook', 'twitter', 'github', 'gitlab', 'linkedin', 'email'].map((key) => {
                  return renderLink(person, key)
                }) }
              </div>
              <div className="one wide column">
                <div className="ui horizontal small divided link list">
                  { person.labs !== undefined &&
                    person.labs.map((l, i) => {
                      const lab = labs.find( (j) => j.id == l )
                      const labId = labs.findIndex( (j) => j.id == l )
                      const colour = lab.colour;
                      const size = "6vw";
                      return (
                        <Link href={`/labs/${lab.id}`}>
                            <div style={{ background: colour, zIndex: "2", borderRadius: "50%", minHeight: size, height: size, minWidth: size, width: size, display: 'flex', alignItems: 'center'}}>
                            <Image width="0" height="0" src={lab.picture} alt={lab.id} style={{height:"auto", width:"100%"}}/>
                            </div>
                        </Link>
                        )
                      })
                    }
                </div>
              </div>
            </div>
            <Publications author={ person.name } />
          </div>
        </div>
      </div>
    </>
  )
}
