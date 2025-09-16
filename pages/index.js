import React from 'react'

import ReactMarkdown from 'react-markdown'

import Logo from './logo'
import About from './about'
import Meta from './meta'
import Header from './header'
import Labs from './labs'
import News from './news'
import Seminar from './seminar'
import Publications from './publications'
import People from './people'
import Location from './location'
import Footer from './footer'

class Index extends React.Component {
  componentDidMount() {
  }

  render() {

    return (
      <div>
        <Meta />
        <div className="ui stackable grid">
          <div className="eleven wide column centered">
            <Logo/>
            <About/>
            <Labs />
            <People students="true" />
            <Publications short="true" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Index
