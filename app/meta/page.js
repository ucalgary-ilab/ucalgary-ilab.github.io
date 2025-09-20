'use client'

import Head from 'next/head'
import React from 'react';

class Meta extends React.Component {
  constructor(props) {
    super(props)

    const title = 'Interactions Lab - University of Calgary HCI Group'
    if (!this.props.title) {
      this.title = title
    } else {
      this.title = `${this.props.title} | ${title}`
    }
    if (!this.props.description) {
      this.description = 'Human-Computer Interaction and Information Visualization Group at the University of Calgary'
    } else {
      this.description = this.props.description
    }
    if (!this.props.keywords) {
      this.keywords = 'Human-Computer Interaction, HCI, Information Visualization, University of Calgary, CHI, UIST'
    } else {
      this.keywords = this.props.keywords
    }
    if (!this.props.image) {
      this.image = 'https://ilab.ucalgary.ca/static/images/cover.jpg'
    } else {
      this.image = 'https://ilab.ucalgary.ca' + this.props.image
    }
    if (!this.props.url) {
      this.url= 'https://ilab.ucalgary.ca/'
    } else {
      this.url = this.props.url
    }
  }


  render() {
    return (
      <Head>
        <title>{ this.title }</title>
        <meta name="keywords" content={ this.keywords } />
        <meta name="description" content={ this.description } />

        <meta property="og:title" content={ this.title } />
        <meta property="og:description" content={ this.description } />
        <meta property="og:site_name" content="University of Calgary Interactions Lab" />
        <meta property="og:url" content={ this.url } />
        <meta property="og:image" content={ this.image } />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={ this.title } />
        <meta name="twitter:description" content={ this.description } />
        <meta name="twitter:image" content={ this.image } />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ucalgary" />
        <meta name="twitter:url" content={ this.url } />
      </Head>
    )
  }
}

export default Meta