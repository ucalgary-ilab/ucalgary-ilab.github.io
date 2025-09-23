
import Person, { getStaticProps as Person_getStaticProps } from '../../components/person'

import summary from '../../content/output/summary.json'

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export async function getStaticPaths() {

  let fileNames = Object.keys(summary.fileMap)
  let keys = fileNames.filter(f => f.includes('people'))

  const params = keys.map(key => ({
    params: {
      id: key.split('/')[3].replace('.json', '')
    }
  }));

  return {
    paths: params,
    fallback: false, // any paths not returned result in 404
  };
}

export { Person_getStaticProps as getStaticProps }

export default function Page(props) {
  return <Person {...props} />
}

