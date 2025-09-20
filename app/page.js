'use client'

import React from 'react'

import ReactMarkdown from 'react-markdown'

import Meta from './meta/page'
import Header from './header/page'
import Labs from './labs/page'
import News from './news/page'
import Seminar from './seminar/page'
import Publications from './publications/page'
import People from './people/page'
import Location from './location/page'
import Footer from './footer/page'

class Index extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Meta />
        <Header />
        <div className="pusher">
          <div id="top-video-container">
            <video
              id="top-video"
              poster="/static/posters/top.png"
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline=""
            >
              <source src="/static/videos/top.mp4" type="video/mp4"></source>
            </video>
          </div>
          <div className="ui stackable grid">
            <div className="eleven wide column centered">
              <div id="header-logo">
                <div>
                  <img
                    src="/static/images/logo-5.png"
                    style={{ height: "200px" }}
                  />
                </div>
              </div>
              <div id="header" className="category">
                <img
                  src="/static/images/logo-4.png"
                  style={{ height: "100px", marginTop: "0px" }}
                />
                <h1 style={{ fontSize: "2em" }}>Interactions Lab</h1>
                <p>
                  Human-Computer Interaction and Information Visualization Group
                </p>
              </div>
              <Labs />
              <People faculty="true" />
              <Publications short="true" />
              <People students="true" />
              {/* <News short="true" /> */}
              <Location short="true" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Index
