'use client'

import React from 'react'

import ReactMarkdown from 'react-markdown'

import Meta from '../meta/page'
import Header from '../header/page'
import Labs from '../labs/page'
import News from '../news/page'
import Seminar from '../seminar/page'
import Publications from '../publications/page'
import People from '../people/page'
import Courses from '../courses/page'
import Facility from '../facility/page'
import Location from '../location/page'
import Footer from '../footer/page'

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
      case 'news':
        return <News />
      case 'seminar':
        return <Seminar />
      case 'location':
        return <Location />
    }
  }

  render() {

    return (
      <>
        <Meta
          title={ this.props.title }
        />
        <Header current={ this.props.title } />

        <div className="ui stackable grid">
          <div className="eleven wide column centered">
            { this.renderSwitch(this.props.id) }
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Page
