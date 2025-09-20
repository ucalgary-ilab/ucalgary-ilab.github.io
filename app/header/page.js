'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.items = [
      'Publications',
      'People',
      'Courses',
      'Facility',
      'Seminar',
      'Location'
    ]
  }

  render() {
    return (
      <>
        <div className="ui right vertical sidebar menu">
          <Link className="item" href="/" key="Home">Home</Link>
          { this.items.map((item) => {
            return (
              <Link className={ this.props.current == item ? 'item active' : 'item' } href={ `/${item.toLowerCase()}` } key={ item }>
                { item }
              </Link>
            )
          })}
        </div>
        <div className="ui stackable secondary pointing container menu" style={{ borderBottom: 'none', marginRight: '15%', fontSize: '1.1em' }}>
          <div className="left menu">
            <Link className='item' href='/'>
              <b>UCalgary iLab</b>
            </Link>
          </div>
          <div className="right menu">
            { this.items.map((item) => {
              return (
                <Link className={ this.props.current == item ? 'item active' : 'item' } href={ `/${item.toLowerCase()}` } key={ item }>
                  { item }
                </Link>
              )
            })}
            <div className="toc item">
              <Link href="/" key="Home"><b>UCalgary iLab</b></Link>
              <i style={{ float: 'right' }} className="sidebar icon"></i>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Header