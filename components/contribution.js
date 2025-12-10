import React from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import summary from '../content/output/summary.json'
import booktitles from '../content/output/booktitles.json'
import files from '../content/output/files.json'
import vimeo from '../content/output/vimeo.json'

import Meta from '../components/meta'
import Head from 'next/head'
import Detail from '../components/detail'

// getStaticProps returning empty props to generate page with next build
export async function getStaticProps() {
  return {
    props: {},
  }
}

class Contribution extends React.Component {

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
      if(person.alias !== undefined) {this.namesId[person.alias] = person.id}
    }

    if(!this.props.id)return;
    if(!this.props.type)return;
    this.type = this.props.type
    this.plural = this.props.plural || `${ this.type }s`
    this.contribution = require(`../content/output/${ this.plural }/${ this.props.id }.json`)
  }

  render() {
    if(!this.props.id)return;
    if(!this.props.type)return;
    return (
      <>
        <Meta
          title={ parse(this.contribution.title) }
          description={ parse(this.contribution.abstract) }
          image={ `/static/images/${ this.plural }/cover/${ this.props.id }.jpg` }
          keywords={ this.contribution.keywords }
        />
          <div className="pusher">
          <div className="ui stackable grid">
            <div className="one wide column"></div>
            <div className="ten wide column centered" style={{ marginTop: '30px' }}>
              <Detail
                type={ this.type }
                contribution={ this.contribution }
                namesId={ this.namesId }
                people={ this.people }
                booktitles={ booktitles }
                files={ files }
                vimeo={ vimeo }
              />
            </div>
            <div className="one wide column"></div>
          </div>
        </div>
      </>
    )
  }
}

export default Contribution
