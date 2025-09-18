'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import seminar from '../../content/output/seminar.json'
import Speaker from '../speaker/page.js'

class Seminar extends React.Component {
  render() {
    return (
      <div id="seminar" className="category">
        <h1 className="ui horizontal divider header">
          <i className="calendar alternate outline icon"></i>
          iLab Invited Talk Series
        </h1>
        <div className="ui " style={{ marginTop: '50px' }}>
         { seminar.map((speaker, i) => {
            return (
              <Speaker
                speaker={ speaker }
                key={ speaker.date }
              />
            )
          } )}
        </div>
      </div>
    )
  }
}

export default Seminar
