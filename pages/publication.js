import React from 'react'
import ReactMarkdown from 'react-markdown'
import summary from '../content/output/summary.json'
import booktitles from '../content/output/booktitles.json'
import files from '../content/output/files.json'
import vimeo from '../content/output/vimeo.json'

import Meta from './meta'
import Head from 'next/head'
import Header from './header'
import Detail from './detail'
import Footer from './footer'

class Publication extends React.Component {
  static async getInitialProps(req) {
    const id = req.query.id
    return { id: id }
  }

  constructor(props) {
    super(props)

    let fileNames = Object.keys(summary.fileMap)
    let keys = fileNames.filter((fileName) => {
      return fileName.includes('people')
    })

    this.people = []
    for (let key of keys) {
      let id = key.split('/')[3].replace('.json', '')
      let person = Object.assign(summary.fileMap[key], { id: id })
      this.people.push(person)
    }
    this.namesId = {}
    for (let person of this.people) {
      this.namesId[person.name] = person.id
    }

    if(!this.props.id)return;
    this.publication = require(`../content/output/publications/${ this.props.id }.json`)
  }

  render() {
    if(!this.props.id)return;
    return (
      <>
        <Meta
          title={ this.publication.title }
          description={ this.publication.abstract }
          image={ `/static/images/publications/cover/${ this.props.id }.jpg` }
          keywords={ this.publication.keywords }
        />
        <Header current="Publications" />
          <div className="pusher">
          <div className="ui stackable grid">
            <div className="one wide column"></div>
            <div className="ten wide column centered" style={{ marginTop: '30px' }}>
              <Detail
                publication={ this.publication}
                namesId={ this.namesId }
                people={ this.people }
                booktitles={ booktitles }
                files={ files }
                vimeo={ vimeo }
              />
            </div>
            <div className="one wide column"></div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Publication
