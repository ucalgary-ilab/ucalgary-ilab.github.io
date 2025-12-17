import Contributions from '../components/contributions'

// getStaticProps returning empty props to generate page with next build
export async function getStaticProps() {
  return {
    props: {},
  }
}

// lab short author

export default function Theses(props) {
  return (
    <Contributions type="thesis" plural="theses" {...props} />
  )
}
