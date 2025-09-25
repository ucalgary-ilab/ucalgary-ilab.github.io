import React from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import facility from '../content/output/facility.json'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas)

const categories = Object.keys(facility).slice(0, 7)

// getStaticProps returning empty props to generate page with next build
export async function getStaticProps() {
  return {
    props: {},
  }
}

class Facility extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div id="facility" className="category">
        <h1 className="ui horizontal divider header">
          <FontAwesomeIcon icon="fas fa-gear" />
          Facility
        </h1>
        <div className="ui divided items">
          { categories.map((category, i) => {
            return (
              <div className={ i === 0 ? '' : 'category' } key={ category }>
                <h1>{ category }</h1>
                <div className="ui stackable four cards" style={{ marginTop: '30px' }}>
                  { facility[category].map((item) => {
                    return (
                      <a className="card" href={ item.url } target="_blank" key={ item.img } >
                        <div className="image">
                          <Image width={0} height={0} src={ `/static/images/facility/${item.img}.jpg` } />
                        </div>
                        <div className="content">
                          <p className="header">{ item.name }</p>
                        </div>
                      </a>
                    )
                  }) }
                </div>
              </div>
            )
          }) }

        </div>
      </div>
    )
  }
}

export default Facility
