import React from 'react'
import ReactMarkdown from 'react-markdown'
import news from '../content/output/news.json'
import Link from 'next/link'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far, fab)

class News extends React.Component {
  
  render() {
    return (
      <div id="news" className="category">
        <h1 className="ui horizontal divider header">
          <FontAwesomeIcon icon="fas fa-paper-plane" />
          News
        </h1>
        <div className="ui segment" style={{ marginTop: '50px' }}>
          <div className="ui unstackable divided items">
            { news.map((item) => {
              return (
                <div className="item" key={ item.date }>
                  { item.image &&
                    <div className="image">
                      <img src={ `/static/images/news/${ item.image}` } style={{ padding: '5px' }} />
                    </div>
                  }
                  { item.icon &&
                    <div className="image" style={{ margin: 'auto', textAlign: 'center', fontSize: '2.2em', background: '#eee', height: '80px', paddingTop: '20px' }}>
                      <FontAwesomeIcon icon={ `${item.icon} fa-fw` } />
                    </div>
                  }
                  <div className="content">
                    <div className="meta">
                      { item.date }
                    </div>
                    <div className="middle aligned content">
                      { item.text }
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
       { this.props.short &&
          <div className="ui vertical segment stackable" style={{ textAlign: 'center' }}>
            <Link className="ui button" href="/news">
              { `+ see more updates` }
            </Link>
          </div>
       }
      </div>
    )
  }
}

export default News
