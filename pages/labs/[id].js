
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Lab, { getStaticProps as Lab_getStaticProps } from '../../components/lab'

import labs from '../../content/output/labs.json'

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export async function getStaticPaths() {

  const params = labs.map(lab => ({
    params: {
      id: lab.id
    }
  }));
  return {
    paths: params,
    fallback: false, // any paths not returned result in 404
  };
}

export { Lab_getStaticProps as getStaticProps }

export default function Page(props) {
  if(props.lab.redirect === true){
    const router = useRouter();
    useEffect(() => {
      router.replace(props.lab.url);
    }, [router])
  }
  else { 
    return <Lab {...props} />
  }
}

