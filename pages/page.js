import React from 'react'

import Meta from './meta'
import Header from './header'
import Labs from './labs'
import Publications from './publications'
import People from './people'
import Courses from './courses'
import Facility from './facility'
import Footer from './footer'

class Page extends React.Component {
  static async getInitialProps(req) {
    const id = req.query.id
    const title = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
    return { id: id, title: title }
  }

  renderSwitch(id) {
    switch (id) {
      case 'publications':
        return <Publications />
      case 'people':
        return <People />
      case 'courses':
        return <Courses />
      case 'facility':
        return <Facility />
    }
  }

  render() {

    return (
      <div>
        <Meta
          title={ this.props.title }
        />

        <Header current={ this.props.title } />

        <div className="ui stackable grid">
          <div className="eleven wide column centered">
            { this.renderSwitch(this.props.id) }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Page
