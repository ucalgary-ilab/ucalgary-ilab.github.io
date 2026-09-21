
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Event, { getStaticProps as Event_getStaticProps } from '../../components/event'

import events from '../../content/output/events.json'

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export async function getStaticPaths() {

  const params = events.map(event => ({
    params: {
      id: event.id
    }
  }));
  return {
    paths: params,
    fallback: false, // any paths not returned result in 404
  };
}

export { Event_getStaticProps as getStaticProps }

export default function Page(props) {
  return <Event {...props} />
}

