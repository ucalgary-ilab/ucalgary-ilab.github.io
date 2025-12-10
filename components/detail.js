import React from 'react'
import _ from 'lodash'
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

class Detail extends React.Component {
  constructor(props) {
    super(props)

    if (!this.props.contribution) return
    if (!this.props.type) return
    this.type = this.props.type
    this.plural = this.props.plural || `${ this.type }s`

    this.contribution = Object.assign({}, this.props.contribution)
    this.people = Object.assign([], this.props.people)
    this.namesId = Object.assign({}, this.props.namesId)

    this.names = [];
    this.people.forEach((person) => {
      this.names.push(person.name);
      if(person.alias){this.names.push(person.alias)};
    } )
    if (this.contribution.base) {
      this.contribution.id = this.contribution.base.split('.json')[0]
    }
    this.getProceedings()
    this.getVideoEmbed()


    this.showFigures = false
    if (!this.props.short) {
      this.getFigures()
      if (this.figures[this.contribution.id]) {
        this.showFigures = true
      }
    }
    this.showCover = false
    this.getCovers()
    if (this.covers[this.contribution.id]) {
      this.showCover = true
    }
    this.showPDF = false
    this.getPDFs()
    if (this.pdfs[this.contribution.id]) {
      this.showPDF = true
    }
  }

  getProceedings() {
    if(this.contribution.series !== undefined){
      const year = this.contribution.series.slice(-2)
      const conference = this.contribution.series.slice(0, -5)
      this.proceeding = this.props.booktitles[conference]
      if (!this.proceeding) {
        this.proceeding = {}
      }
      this.proceeding.series = `${conference} '${year}`
      if (this.contribution.pages < 4 && this.proceeding.booktitle && !this.proceeding.booktitle.toString().includes("Adjunct")) {
        this.proceeding.booktitle = 'Adjunct ' + this.proceeding.booktitle
      }
    }
  }

  getVideoEmbed() {
    if (this.contribution.video) {
      if (this.contribution.video.includes('youtube')) {
        this.contribution.embedId = this.contribution.video.split('?v=')[1]
        this.contribution.embed = `https://www.youtube.com/embed/${this.contribution.embedId}`
        this.contribution.embedThumbnail = `https://img.youtube.com/vi/${this.contribution.embedId}/maxresdefault.jpg`
      }
      if (this.contribution.video.includes('vimeo')) {
        this.contribution.embedId = this.contribution.video.split('/')[3]
        this.contribution.embed = `https://player.vimeo.com/video/${this.contribution.embedId}`
        this.contribution.embedThumbnail = this.props.vimeo[this.contribution.embedId]
      }
    }

    if (this.contribution.talk) {
      if (this.contribution.talk.includes('youtube')) {
        this.contribution.talkEmbedId = this.contribution.talk.split('?v=')[1]
        this.contribution.talkEmbed = `https://www.youtube.com/embed/${this.contribution.talkEmbedId}`
        this.contribution.talkEmbedThumbnail = `https://img.youtube.com/vi/${this.contribution.talkEmbedId}/maxresdefault.jpg`
      }
      if (this.contribution.talk.includes('vimeo')) {
        this.contribution.talkEmbedId = this.contribution.talk.split('/')[3]
        this.contribution.talkEmbed = `https://player.vimeo.com/video/${this.contribution.talkEmbedId}`
        this.contribution.talkEmbedThumbnail = this.props.vimeo[this.contribution.talkEmbedId]
      }
    }
  }

  getFigures() {
    this.figures = {}
    const contribImages =
    this.props.files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === this.plural);
    if (contribImages.length === 0) return;
    const dirs = contribImages[0]
    .children
    .filter(dir => dir.name === 'figures')[0].children
    for (let dir of dirs) {
      let id = dir.name
      let files = dir.children.map(file => file.path )
      this.figures[id] = files
    }
  }

  getCovers() {
    this.covers = {}
    const allImages =
    this.props.files.children
    .filter(dir => dir.name === 'images')[0].children
    const contribImages = allImages
    .filter(dir => dir.name === this.plural);
    if (contribImages.length === 0) return;
    const dirs = contribImages[0]
    .children 
    .filter(dir => dir.name === 'cover')[0].children
    this.covers = {}
    for (let dir of dirs) {
      let id = dir.name.split(".")[0]
      this.covers[id] = dir.path
    }
  }

  getPDFs() {
    this.pdfs = {}
    const contribPDFs =
    this.props.files.children
    .filter(dir => dir.name === this.plural);
    if (contribPDFs.length === 0) return;
    const dirs = contribPDFs[0].children
    for (let dir of dirs) {
      let id = dir.name.split(".")[0]
      this.pdfs[id] = dir.path
    }
  }

  // Adapted from same function in pages/person.js

  renderLink(contribution, key) {
    if (!contribution[key]) {
      return ''
    }

    let title = contribution[key]
    let href = contribution[key]
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

  hasMaterialLinks(contribution) {
    return contribution.gitlab || contribution.github
  }

  render() {
    if (!this.props.contribution || !this.type) {
      return <div></div>
    }
    let title = this.type.charAt(0).toUpperCase() + this.type.slice(1).toLowerCase()
    let authors = this.contribution.authors || [this.contribution.author, ...this.contribution.advisors, ...this.contribution.committee];
    let series = this.contribution.series ? parse(this.contribution.series) : `${this.contribution.author.split(" ").slice(-1)} ${this.contribution.degree.split("(")[1].split(")")[0]} ${this.contribution.date.split("-")[0]}`

    return (
      <div id={this.type}>
        <div className="block">
          <div id="breadcrumb" className="ui breadcrumb">
            <Link className="section" href={ `/${this.plural}` }>{title}</Link>
            <FontAwesomeIcon icon="fas fa-angle-right" />
            { series && <a className="active section">{ series }</a>}
          </div>

          <div className="ui stackable grid" style={{ marginTop: '10px' }}>
            <div className="three wide column" style={{ margin: 'auto' }}>
              {this.showCover && 
                <Image width={0} height={0} className="cover" alt={ `${ this.contribution.id } cover` } src={ `/static/images/${this.plural}/cover/${ this.contribution.id }.jpg` } />
              }
            </div>
            <div className="thirteen wide column">
              { this.props.short &&
                <h1>
                  <a href={ `/${this.plural}/${this.contribution.id}` } target="_blank">{ parse(this.contribution.title) }</a>
                </h1>
              }
              { !this.props.short &&
                <h1>{ parse(this.contribution.title) }</h1>
              }
              <p className="meta">
                { authors.map((author) => {
                    let role = "";
                    if (this.contribution.author && this.contribution.author === author){
                      role = " (author)"
                    }
                    else if (this.contribution.advisors && this.contribution.advisors.includes(author)){
                      role = " (advisor)"
                    }
                    else if (this.contribution.committee && this.contribution.committee.includes(author)){
                      role = " (committee)"
                    }
                    return (
                      this.names.includes(author) ?
                      <>
                      <a href={ `/people/${ this.namesId[author] }` } key={ author }>
                        <Image width={0} height={0} alt={ `${ this.namesId[author] } photo` } src={ `/static/images/people/${ this.namesId[author] }.jpg`} className="ui circular spaced image mini-profile" />
                        <strong>{author}</strong>
                      </a>
                      <span className="role">{role}</span>
                      </>
                      :
                      <span key={ author }>{parse(author)} <span className="role">{role}</span></span>
                    )
                  }).reduce((prev, current) => [prev, ', ', current])
                }
              </p>
              { this.showPDF && 
                <p>
                  <a href={ `https://raw.githubusercontent.com/ucalgary-ilab/ucalgary-ilab.github.io/main/static/${this.plural}/${this.contribution.id}.pdf` } target="_blank">
                    <FontAwesomeIcon icon="far fa-file-pdf fa-fw" />{ `${this.contribution.id}.pdf` }
                  </a>
                </p>
              }
            </div>
          </div>
        </div>
        { this.contribution.embed &&
          <div className="block">
            <div className="video-container">
              <iframe
                className="embed"
                width="100%"
                height="315"
                src={`${this.contribution.embed}`}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${this.contribution.embed}?autoplay=1><Image width={0} height={0} alt=${this.contribution.embedThumbnail} src=${this.contribution.embedThumbnail}><span>▶</span></a>`}
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
          { this.contribution.abstract &&
            <>
            <h1>Abstract</h1>
            <p>{ parse(this.contribution.abstract) }</p>
            </>
          }
          { this.contribution.keywords &&
            <div className="ui large basic labels">
              Keywords: &nbsp;
              { [...new Set(this.contribution.keywords.split(', '))].map((keyword) => {
                return <span className="ui brown basic label" key={ keyword }>{ _.startCase(keyword) }</span>
              }) }
            </div>
          }
        </div>
        <div className="block">
          <h1>Reference</h1>
          <div className="ui segment">
            <p style={{ lineHeight: "160%" }}>
              { (this.contribution.authors || [this.contribution.author]).reduce((prev, current) => [prev, ', ', parse(current)]) }.&nbsp;
              <b>{ parse(this.contribution.title) }</b>.&nbsp;
              <i>
              {/* Publications */}
              { this.proceeding && this.proceeding.booktitle && <>In {this.proceeding.booktitle}</> }
              { this.proceeding && this.proceeding.booktitle && this.contribution.series && <> </> }
              { this.contribution.series && <>({ parse(this.contribution.series) })</> }
              </i>
              {/* .&nbsp; */}
              { this.proceeding && this.proceeding.publisher }&nbsp;
              { this.contribution.pages &&
                <>Page: 1-{ this.contribution.pages }.&nbsp;</>
              }
              {/* Theses */}
              { this.contribution.institution && <>{this.contribution.institution}. </> }
              { this.contribution.degree && <>{this.contribution.degree}. </> }
              { !this.proceeding && this.contribution.date && <>{this.contribution.date}. </> }
              {/* Generic */}
              { this.contribution.doi &&
                <>DOI: <a href={ this.contribution.doi.includes("http") ? this.contribution.doi : `https://doi.org/${this.contribution.doi}`} target="_blank">{ this.contribution.doi }</a></>
              }
              { this.contribution.url &&
                <>URL: <a href={ this.contribution.url } target="_blank">{ this.contribution.url }</a></>
              }
            </p>
          </div>
        </div>
        {this.hasMaterialLinks(this.contribution) &&
          <div className="block">
            <h1>Materials</h1>
            <div className="ui horizontal small divided link list">
              {['github', 'gitlab'].map((key) => {
                return this.renderLink(this.contribution, key)
              })}
            </div>
          </div>
        }
        { this.contribution.talkEmbed &&
          <div className="block">
            <h1>Talk</h1>
            <div className="video-container">
              <iframe
                className="embed"
                width="100%"
                height="315"
                src={`${this.contribution.talkEmbed}`}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${this.contribution.talkEmbed}?autoplay=1><Image width={0} height={0} alt=${this.contribution.talkEmbedThumbnail} src=${this.contribution.talkEmbedThumbnail}><span>▶</span></a>`}
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
                { this.figures[this.contribution.id].map((src) => {
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
