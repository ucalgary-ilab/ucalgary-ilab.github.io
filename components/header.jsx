import React from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import Image from 'next/image'

export default function Header({}) {
  return (
    <div class="ui center aligned container">
      <div class="ui secondary huge compact menu">
        <Link href="/" class="item">
          <Image width={0} height={0} class="ui tiny image" src="/static/images/ilab-logo-3d.jpg" />
        </Link>
        <Link href="/people" class="item">People</Link>
        <Link href="/publications" class="item">Research</Link>
      </div>
    </div>
  );
}