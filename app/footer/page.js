'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="ui center aligned container">
          <div className="ui section divider"></div>
            <img style={{ maxWidth: '180px', margin: '30px auto' }} src="/static/images/logo-6.png"  />
            <div className="content">
              <img style={{ maxWidth: '200px', margin: '0px auto' }} src="/static/images/logo-4.png"  />
              <div className="sub header">
                Department of Computer Science
              </div>
            </div>
          </div>
          {/*
          <div className="ui horizontal small divided link list">
            <div className="item">
              <a href="https://scholar.google.com/citations?user=klWjaQIAAAAJ" target="_blank" style={{ fontSize: '1.2em' }}>
                <i className="fas fa-graduation-cap fa-fw" />
                Google Scholar
              </a>
            </div>
            <div className="item">
              <Link href="/cv.pdf" target="_blank" style={{ fontSize: '1.2em' }}>
                <i className="far fa-file fa-fw" />
                Resume/CV
              </Link>
            </div>
            <div className="item">
              <a href="mailto:ryo.suzuki@colorado.edu" target="_blank" style={{ fontSize: '1.2em' }}>
                <i className="far fa-envelope fa-fw" />
                ryo.suzuki@colorado.edu
              </a>
            </div>
            <br/>
            <div className="item">
              <a href="https://www.facebook.com/ryosuzk" target="_blank" style={{ fontSize: '1.2em' }}>
                <i className="fab fa-facebook-square fa-fw" />
                ryosuzk
              </a>
            </div>
            <div className="item">
              <a href="https://twitter.com/ryosuzk" target="_blank" style={{ fontSize: '1.2em' }}>
                <i className="fab fa-twitter fa-fw" />
                ryosuzk
              </a>
            </div>
            <div className="item">
              <a href="https://github.com/ryosuzuki" target="_blank" style={{ fontSize: '1.2em' }}>
                <i className="fab fa-github-alt fa-fw" />
                ryosuzuki
              </a>
            </div>
            <div className="item">
              <a href="https://www.linkedin.com/in/ryosuzuki/" target="_blank" style={{ fontSize: '1.2em' }}>
                <i className="fab fa-linkedin-in fa-fw" />
                ryosuzuki
              </a>
            </div>
          </div>
          */}
      </footer>
    )
  }
}

export default Footer