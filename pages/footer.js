import React from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far, fab)

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
                <FontAwesomeIcon icon="fas fa-graduation-cap fa-fw" />
                Google Scholar
              </a>
            </div>
            <div className="item">
              <Link href="/cv.pdf" target="_blank" style={{ fontSize: '1.2em' }}>
                <FontAwesomeIcon icon="far fa-file fa-fw" />
                Resume/CV
              </Link>
            </div>
            <div className="item">
              <a href="mailto:ryo.suzuki@colorado.edu" target="_blank" style={{ fontSize: '1.2em' }}>
                <FontAwesomeIcon icon="far fa-envelope fa-fw" />
                ryo.suzuki@colorado.edu
              </a>
            </div>
            <br/>
            <div className="item">
              <a href="https://www.facebook.com/ryosuzk" target="_blank" style={{ fontSize: '1.2em' }}>
                <FontAwesomeIcon icon="fab fa-facebook-square fa-fw" />
                ryosuzk
              </a>
            </div>
            <div className="item">
              <a href="https://twitter.com/ryosuzk" target="_blank" style={{ fontSize: '1.2em' }}>
                <FontAwesomeIcon icon="fab fa-twitter fa-fw" />
                ryosuzk
              </a>
            </div>
            <div className="item">
              <a href="https://github.com/ryosuzuki" target="_blank" style={{ fontSize: '1.2em' }}>
                <FontAwesomeIcon icon="fab fa-github-alt fa-fw" />
                ryosuzuki
              </a>
            </div>
            <div className="item">
              <a href="https://www.linkedin.com/in/ryosuzuki/" target="_blank" style={{ fontSize: '1.2em' }}>
                <FontAwesomeIcon icon="fab fa-linkedin-in fa-fw" />
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