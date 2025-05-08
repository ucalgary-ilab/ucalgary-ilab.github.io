import React from 'react'
import _ from 'lodash'

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
  }

  getProceedings() {
    const conference = this.publication.series.slice(0, -5)
    const year = this.publication.series.slice(-2)
    this.proceeding = this.props.booktitles[conference]
    if (!this.proceeding) {
      this.proceeding = {}
    }
    this.proceeding.series = `${conference} '${year}`
    if (this.publication.pages < 4) {
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
      <div className="item">
        <a href={ href } target="_blank" style={{ fontSize: '1.2em' }}>
          <i className={ icon } />
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
            <a className="section" href="/publications">Publications</a>
            <i className="right angle icon divider"></i>
            <a className="active section">{ this.publication.series }</a>
          </div>

          <div className="ui stackable grid" style={{ marginTop: '10px' }}>
            <div className="three wide column" style={{ margin: 'auto' }}>
              <img className="cover" src={ `/static/images/publications/cover/${ this.publication.id }.jpg` } />
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
                        <img src={ `/static/images/people/${ this.namesId[author] }.jpg`} className="ui circular spaced image mini-profile" />
                        <strong>{author}</strong>
                      </a>
                      :
                      <span key={ author }>{author}</span>
                    )
                  }).reduce((prev, current) => [prev, ' , ', current])
                }
              </p>
              <p>
                <a href={ `/static/publications/${this.publication.id}.pdf` } target="_blank">
                  <i className="far fa-file-pdf fa-fw"></i>{ `${this.publication.id}.pdf` }
                </a>
              </p>
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
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${this.publication.embed}?autoplay=1><img src=${this.publication.embedThumbnail}><span>▶</span></a>`}
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
              { this.publication.keywords.split(', ').map((keyword) => {
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
              <i>{ `In ${this.proceeding.booktitle} (${ this.proceeding.series })`  }</i>.&nbsp;
              { this.proceeding.publisher }&nbsp;
              Page: 1-{ this.publication.pages }.&nbsp;
              DOI: <a href={ this.publication.doi} target="_blank">{ this.publication.doi }</a>
            </p>
          </div>
        </div>
        {this.hasMaterialLinks(this.publication) &&
          <div className="block">
            <h1>Materials</h1>
            <div class="ui horizontal small divided link list">
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
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${this.publication.talkEmbed}?autoplay=1><img src=${this.publication.talkEmbedThumbnail}><span>▶</span></a>`}
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
                        <img src={ `/${src}` } />
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
