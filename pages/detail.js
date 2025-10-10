import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
import Link from 'next/link'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far, fab)

class Detail extends React.Component {
  constructor(props) {
    super(props)

    if (!this.props.publication) return

    this.publication = Object.assign({}, this.props.publication)
    this.people = Object.assign([], this.props.people)
    this.namesId = Object.assign({}, this.props.namesId)

    this.names = this.people.map((person) => person.name )
    if (this.publication.base) {
      this.publication.id = this.publication.base.split('.json')[0]
    }
    this.getProceedings()
    this.getVideoEmbed()


    this.showFigures = false
    if (!this.props.short) {
      this.getFigures()
      if (this.figures[this.publication.id]) {
        this.showFigures = true
      }
    }
    this.showCover = false
    this.getCovers()
    if (this.covers[this.publication.id]) {
      this.showCover = true
    }
    this.showPDF = false
    this.getPDFs()
    if (this.pdfs[this.publication.id]) {
      this.showPDF = true
    }
  }

  getProceedings() {
    const conference = this.publication.series.slice(0, -5)
    const year = this.publication.series.slice(-2)
    this.proceeding = this.props.booktitles[conference]
    if (!this.proceeding) {
      this.proceeding = {}
    }
    this.proceeding.series = `${conference} '${year}`
    if (this.publication.pages < 4 && this.proceeding.booktitle && !this.proceeding.booktitle.toString().includes("Adjunct")) {
      this.proceeding.booktitle = 'Adjunct ' + this.proceeding.booktitle
    }
  }

  getVideoEmbed() {
    if (this.publication.video) {
      if (this.publication.video.includes('youtube')) {
        this.publication.embedId = this.publication.video.split('?v=')[1]
        this.publication.embed = `https://www.youtube.com/embed/${this.publication.embedId}`
        this.publication.embedThumbnail = `https://img.youtube.com/vi/${this.publication.embedId}/maxresdefault.jpg`
      }
      if (this.publication.video.includes('vimeo')) {
        this.publication.embedId = this.publication.video.split('/')[3]
        this.publication.embed = `https://player.vimeo.com/video/${this.publication.embedId}`
        this.publication.embedThumbnail = this.props.vimeo[this.publication.embedId]
      }
    }

    if (this.publication.talk) {
      if (this.publication.talk.includes('youtube')) {
        this.publication.talkEmbedId = this.publication.talk.split('?v=')[1]
        this.publication.talkEmbed = `https://www.youtube.com/embed/${this.publication.talkEmbedId}`
        this.publication.talkEmbedThumbnail = `https://img.youtube.com/vi/${this.publication.talkEmbedId}/maxresdefault.jpg`
      }
      if (this.publication.talk.includes('vimeo')) {
        this.publication.talkEmbedId = this.publication.talk.split('/')[3]
        this.publication.talkEmbed = `https://player.vimeo.com/video/${this.publication.talkEmbedId}`
        this.publication.talkEmbedThumbnail = this.props.vimeo[this.publication.talkEmbedId]
      }
    }
  }

  getFigures() {
    const dirs =
    this.props.files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === 'publications')[0].children
    .filter(dir => dir.name === 'figures')[0].children
    this.figures = {}
    for (let dir of dirs) {
      let id = dir.name
      let files = dir.children.map(file => file.path )
      this.figures[id] = files
    }
  }

  getCovers() {
    const dirs =
    this.props.files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === 'publications')[0].children
    .filter(dir => dir.name === 'cover')[0].children
    this.covers = {}
    for (let dir of dirs) {
      let id = dir.name.split(".")[0]
      this.covers[id] = dir.path
    }
  }

  getPDFs() {
    const dirs =
    this.props.files.children
    .filter(dir => dir.name === 'publications')[0].children
    this.pdfs = {}
    for (let dir of dirs) {
      let id = dir.name.split(".")[0]
      this.pdfs[id] = dir.path
    }
  }

  // Adapted from same function in pages/person.js

  renderLink(publication, key) {
    if (!publication[key]) {
      return ''
    }

    let title = publication[key]
    let href = publication[key]
    let icon
    switch(key) {
      case 'github':
        icon = 'fab fa-github-alt fa-fw'
        break
      case 'gitlab':
        icon = 'fab fa-gitlab fa-fw'
        break
    }

    return (
      <div className="item" key={ href }>
        <a href={ href } target="_blank" style={{ fontSize: '1.2em' }}>
          <FontAwesomeIcon icon={ icon } />
          { title }
        </a>
      </div>
    )
  }

  // To update when new link types are added to renderLink()

  hasMaterialLinks(publication) {
    return publication.gitlab || publication.github
  }

  render() {
    if (!this.props.publication) {
      return <div></div>
    }

    return (
      <div id="publication">
        <div className="block">
          <div id="breadcrumb" className="ui breadcrumb">
            <Link className="section" href="/publications">Publications</Link>
            <FontAwesomeIcon icon="fas fa-angle-right" />
            <a className="active section">{ this.publication.series }</a>
          </div>

          <div className="ui stackable grid" style={{ marginTop: '10px' }}>
            <div className="three wide column" style={{ margin: 'auto' }}>
              {this.showCover && 
                <Image width={0} height={0} className="cover" alt={ `${ this.publication.id } cover` } src={ `/static/images/publications/cover/${ this.publication.id }.jpg` } />
              }
            </div>
            <div className="thirteen wide column">
              { this.props.short &&
                <h1>
                  <a href={ `/publications/${this.publication.id}` } target="_blank">{ this.publication.title }</a>
                </h1>
              }
              { !this.props.short &&
                <h1>{ this.publication.title }</h1>
              }
              <p className="meta">
                { this.publication.authors.map((author) => {
                    return (
                      this.names.includes(author) ?
                      <a href={ `/people/${ this.namesId[author] }` } key={ author }>
                        <Image width={0} height={0} alt={ `${ this.namesId[author] } photo` } src={ `/static/images/people/${ this.namesId[author] }.jpg`} className="ui circular spaced image mini-profile" />
                        <strong>{author}</strong>
                      </a>
                      :
                      <span key={ author }>{author}</span>
                    )
                  }).reduce((prev, current) => [prev, ' , ', current])
                }
              </p>
              { this.showPDF && 
                <p>
                  <a href={ `https://raw.githubusercontent.com/ucalgary-ilab/ucalgary-ilab.github.io/main/static/publications/${this.publication.id}.pdf` } target="_blank">
                    <FontAwesomeIcon icon="far fa-file-pdf fa-fw" />{ `${this.publication.id}.pdf` }
                  </a>
                </p>
              }
            </div>
          </div>
        </div>
        { this.publication.embed &&
          <div className="block">
            <div className="video-container">
              <iframe
                className="embed"
                width="100%"
                height="315"
                src={`${this.publication.embed}`}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${this.publication.embed}?autoplay=1><Image width={0} height={0} alt=${this.publication.embedThumbnail} src=${this.publication.embedThumbnail}><span>▶</span></a>`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                mozallowfullscreen="true"
                msallowfullscreen="true"
                oallowfullscreen="true"
                webkitallowfullscreen="true"
              ></iframe>
            </div>
          </div>
        }
        <div className="block">
          <h1>Abstract</h1>
          <p>{ this.publication.abstract }</p>

          { this.publication.keywords &&
            <div className="ui large basic labels">
              Keywords: &nbsp;
              { [...new Set(this.publication.keywords.split(', '))].map((keyword) => {
                return <span className="ui brown basic label" key={ keyword }>{ _.startCase(keyword) }</span>
              }) }
            </div>
          }
        </div>
        <div className="block">
          <h1>Reference</h1>
          <div className="ui segment">
            <p style={{ lineHeight: "160%" }}>
              { this.publication.authors.reduce((prev, current) => [prev, ', ', current]) }.&nbsp;
              <b>{ this.publication.title }</b>.&nbsp;
              <i>
              { this.proceeding.booktitle && <>In {this.proceeding.booktitle}</> }
              { this.publication.series && <>({ this.publication.series })</> }
              </i>.&nbsp;
              { this.proceeding.publisher }&nbsp;
              { this.publication.pages &&
                <>Page: 1-{ this.publication.pages }.&nbsp;</>
              }
              { this.publication.doi &&
                <>DOI: <a href={ this.publication.doi} target="_blank">{ this.publication.doi }</a></>
              }
            </p>
          </div>
        </div>
        {this.hasMaterialLinks(this.publication) &&
          <div className="block">
            <h1>Materials</h1>
            <div className="ui horizontal small divided link list">
              {['github', 'gitlab'].map((key) => {
                return this.renderLink(this.publication, key)
              })}
            </div>
          </div>
        }
        { this.publication.talkEmbed &&
          <div className="block">
            <h1>Talk</h1>
            <div className="video-container">
              <iframe
                className="embed"
                width="100%"
                height="315"
                src={`${this.publication.talkEmbed}`}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${this.publication.talkEmbed}?autoplay=1><Image width={0} height={0} alt=${this.publication.talkEmbedThumbnail} src=${this.publication.talkEmbedThumbnail}><span>▶</span></a>`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                mozallowfullscreen="true"
                msallowfullscreen="true"
                oallowfullscreen="true"
                webkitallowfullscreen="true"
              ></iframe>
            </div>
          </div>
        }
        { this.showFigures &&
          <div className="block">
            <h1>Figures</h1>
            <div id="figure">
              <div className="ui stackable three cards" style={{ marginTop: '30px' }}>
                { this.figures[this.publication.id].map((src) => {
                  return (
                    <a className="card" href={ `/${src}` } target="_blank" >
                      <div className="image">
                        <Image width={0} height={0} alt={ `${src} figure` } src={ `/${src}` } />
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

}

export default Detail
