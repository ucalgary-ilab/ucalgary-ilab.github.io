import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import Meta from './meta'
import Header from './header'
import Publications from './publications'
import Footer from './footer'
import files from '../content/output/files.json'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far, fab)

// getStaticProps returning empty props to generate page with next build
export async function getStaticProps() {
  return {
    props: {},
  }
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

/*
export async function getStaticProps(context) {
  const { params } = context;
  const id = params.id;

  const temp = require(`../content/output/people/${id}.json`)
  const photos = getPhotos()
  temp.photo = getPhoto(id, photos)
  return { props: {person: temp} }
}
*/

export default function Person ({}) {

  const router = useRouter()
  const {id} = router.query

  const [person, setPerson] = useState(null)

  useEffect(() => {
    const temp = require(`../content/output/people/${id}.json`)
    const photos = getPhotos()
    temp.photo = getPhoto(id, photos)
    setPerson(temp)
  }, [])

  if (person == null) {
    return <div></div>
  }

  return (
    <>

      <Meta
        title={ person.name }
        image={ person.photo }
      />

      <Header current="People" />

      <div className="pusher">
        <div className="ui stackable grid">
          <div className="one wide column"></div>
          <div className="eleven wide column centered">
            <div id="person" className="category" style={{ textAlign: 'center' }}>
              <Image width={0} height={0} className="ui circular image large-profile" src={ person.photo } style={{ margin: 'auto' }} />
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
              <div class="ui horizontal small divided link list">
                { ['cv', 'facebook', 'twitter', 'github', 'gitlab', 'linkedin', 'email'].map((key) => {
                  return renderLink(person, key)
                }) }
              </div>
            </div>
            <Publications author={ person.name } />
          </div>
          <div className="one wide column"></div>
        </div>
        <Footer />
      </div>
    </>
  )
}
