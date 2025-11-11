import React from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import Image from 'next/image'

export default function Header({}) {
  return (
    <div className="ui center aligned container">
      <div className="ui secondary huge compact menu">
        <Link href="/" className="item">
          <Image width={0} height={0} className="ui tiny image" src="/static/images/ilab-logo-3d.gif" />
        </Link>
        <Link href="/people" className="item">People</Link>
        <Link href="/publications" className="item">Research</Link>
      </div>
    </div>
  );
}