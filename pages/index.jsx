import React from 'react'

import Logo from './logo'
import About from './about'
import Meta from './meta'
import Labs from './labs'
import Publications from './publications'
import People from './people'
import Footer from './footer'

export default function Index({}) {
  return (
    <div>
      <Meta />
      <div className="ui stackable grid">
        <div className="eleven wide column centered">
          <Logo />
          <About />
          <Labs />
          <People short="true" />
          <Publications short="true" />
        </div>
      </div>
      <Footer />
    </div>
  )
}
