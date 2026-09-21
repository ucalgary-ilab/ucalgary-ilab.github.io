import React from 'react'
import Meta from '../components/meta'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas)

export async function getStaticProps() {
  return {
    props: {},
  }
}

class Wiki extends React.Component {
  render() {
    return (
      <div id="wiki" className="category ui container">
        <Meta title="Wiki" />
        <h1 className="ui horizontal divider header">
          <FontAwesomeIcon icon="fas fa-book" />
          Wiki
        </h1>
        <div className="ui divided items">
          <p>The ILab wiki has been retired and is no longer available. If you're looking for old content, please contact one of the lab faculty.</p>
        </div>
      </div>
    )
  }
}

export default Wiki
