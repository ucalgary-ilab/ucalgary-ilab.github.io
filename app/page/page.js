'use client'

import React from 'react'

import ReactMarkdown from 'react-markdown'

import Meta from './meta'
import Header from '../header/page'
import Labs from './labs'
import News from './news'
import Seminar from './seminar'
import Publications from '../publications/page'
import People from './people'
import Courses from './courses'
import Facility from './facility'
import Location from './location'
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
      <div>
        <Meta
          title={ this.props.title }
        />

        <Header current={ this.props.title } />

        <div className="ui stackable grid">
          <div className="wide column centered">
            { this.renderSwitch(this.props.id) }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Page
