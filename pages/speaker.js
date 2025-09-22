import React from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import Header from './header'
import Publications from './publications'
import Footer from './footer'

class Speaker extends React.Component {

  constructor(props) {
    super(props)

    if (!this.props.speaker) return

    this.props.speaker.nameId = _.lowerCase(this.props.speaker.name).replace(/ /g, '-')
    this.props.speaker.id = `${this.props.speaker.date}-${this.props.speaker.nameId}`
  }

  render() {
    if (!this.props.speaker) return
    return (
      <div style={{ 'margin': '40px 0' }} >
        <p className="ui horizontal divider header">
          { this.props.speaker.date }
        </p>
        <div className="publication ui vertical segment grid" data-id={ this.props.speaker.id } key={ this.props.speaker.id }>
          <div className="three wide column" style={{ margin: 'auto', 'textAlign': 'center' }}>
            <a href={ this.props.speaker.url } target="_blank" >
            <img className="photo" src={ `/static/images/seminar/${this.props.speaker.nameId}.jpg` } />
            <h1>{ this.props.speaker.name }</h1>
            <h3>
              { this.props.speaker.affiliation }
            </h3>
            </a>
          </div>
          <div className="twelve wide column">
            <h1>{ this.props.speaker.title }</h1>
            <h2>Abstract</h2>
            <p>{ this.props.speaker.abstract }</p>
            <h2>Bio</h2>
            <p>{ this.props.speaker.bio }</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Speaker
