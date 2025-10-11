
import Logo from '../components/logo'
import About from '../components/about'
import Meta from '../components/meta'
import Labs, { getStaticProps as Labs_getStaticProps } from '../components/labs'
import Publications from './publications'
import People, { getStaticProps as People_getStaticProps } from './people'


// getStaticProps returning empty props to generate page with next build
export async function getStaticProps() {
  const peopleStaticProps = (await People_getStaticProps()).props
  const labsStaticProps = (await Labs_getStaticProps()).props
  return {
    props: {peopleStaticProps, labsStaticProps},
  }
}

export default function Index({peopleStaticProps, labsStaticProps}) {
  return (
    <div>
      <Meta />
      <div className="ui stackable grid">
        <div className="eleven wide column centered">
          <Logo />
          <About />
          <Labs {...labsStaticProps}/>
          <People short="true" {...peopleStaticProps} />
          <Publications short="true" />
        </div>
      </div>
    </div>
  )
}