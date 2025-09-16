import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Meta from './meta'
import Header from './header'
import Publications from './publications'
import Footer from './footer'
import files from '../content/output/files.json'

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
    <div className="item">
      <a href={ href } target="_blank" style={{ fontSize: '1.2em' }}>
        <i className={ icon } />
        { title }
      </a>
    </div>
  )
}

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
    <div>

      <Meta
        title={ person.name }
        image={ person.photo }
      />

      <Header current="People" />

      <div className="ui stackable grid">
        <div className="one wide column"></div>
        <div className="eleven wide column centered">
          <div id="person" className="category" style={{ textAlign: 'center' }}>
            <img className="ui circular image large-profile" src={ person.photo } style={{ margin: 'auto' }} />
            <h1>{ person.name }</h1>
            <p>{ person.title }</p>
            { person.url &&
              <p>
                <a href={ person.url } target="_blank">
                <i className="fas fa-link fa-fw"/>{ person.url }
                </a>
              </p>
            }
            { person.scholar &&
              <p>
                <a href={ person.scholar } target="_blank">
                  <i className="fas fa-graduation-cap fa-fw"/>
                  Google Scholar
                </a>
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
  )
}
