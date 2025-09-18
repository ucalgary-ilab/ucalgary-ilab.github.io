'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'

import Meta from '../meta/page'
import Header from '../header/page'
import Publications from '../publications/page'
import Footer from '../footer/page'
import files from '../../content/output/files.json'

class Person extends React.Component {
  static async getInitialProps(req) {
    const id = req.query.id
    return { id: id }
  }

  constructor(props) {
    super(props)

    if(!this.props.id)return;
    this.person = require(`../../content/output/people/${this.props.id}.json`)

    this.getPhotos()
  }

  renderLink(person, key) {
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
        <a href={ href } target="_blank" style={{ fontSize: '1.2em' }}>
          <i className={ icon } />
          { title }
        </a>
      </div>
    )
  }

  getPhotos() {
    const pictures =
    files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === 'people')[0].children

    this.pictures = []
    for (let picture of pictures) {
      this.pictures.push(picture.name)
    }
  }

  getPhoto(id) {
    let img = `${id}.jpg`
    if (this.pictures.includes(img)) {
      return `/static/images/people/${ id }.jpg`
    } else {
      return '/static/images/people/no-profile.jpg'
    }
  }

  render() {
    if(!this.props.id)return;
    return (
      <>
        <Meta
          title={ this.person.name }
          image={ this.getPhoto(this.props.id) }
        />
        <Header current="People" />

        <div className="ui stackable grid">
          <div className="one wide column"></div>
          <div className="eleven wide column centered">
            <div id="person" className="category" style={{ textAlign: 'center' }}>
              <img className="ui circular image large-profile" src={ this.getPhoto(this.props.id ) } style={{ margin: 'auto' }} />
              <h1>{ this.person.name }</h1>
              <p>{ this.person.title }</p>
              { this.person.url &&
                <p>
                  <a href={ this.person.url} target="_blank">
                  <i className="fas fa-link fa-fw"/>{ this.person.url }
                  </a>
                </p>
              }
              { this.person.scholar &&
                <p>
                  <a href={ this.person.scholar} target="_blank">
                    <i className="fas fa-graduation-cap fa-fw"/>
                    Google Scholar
                  </a>
                </p>
              }
              <div className="ui horizontal small divided link list">
                { ['cv', 'facebook', 'twitter', 'github', 'gitlab', 'linkedin', 'email'].map((key) => {
                  return this.renderLink(this.person, key)
                }) }
              </div>
              <Publications author={ this.person.name } />
            </div>
            <div className="one wide column"></div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Person
