import React from 'react'
import ReactMarkdown from 'react-markdown'
import seminar from '../content/output/seminar.json'
import Speaker from './speaker'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas)

// getStaticProps returning empty props to generate page with next build
export async function getStaticProps() {
  return {
    props: {},
  }
}

class Seminar extends React.Component {
  render() {
    return (
      <div id="seminar" className="category">
        <h1 className="ui horizontal divider header">
          <FontAwesomeIcon icon="fas fa-calendar-days" />
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
