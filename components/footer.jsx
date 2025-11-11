import React from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import Link from 'next/link'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far, fab)

export default function Header({}) {
  return (
    <footer>
      <div className="ui center aligned container">
        <div className="ui section divider"></div>
          <div className="content">
            <Link href="https://ucalgary.ca">
              <Image width={200} height={0} style={{ maxWidth: '200px', margin: '0px auto', height: 'auto' }} alt="University of Calgary logo" src="/static/images/logo-4.png"  />
            </Link>
            <div className="sub header">
              <Link href="https://cpsc.ucalgary.ca" className="item">Department of Computer Science</Link>
            </div>
          </div>
        </div>
    </footer>
  )
}
