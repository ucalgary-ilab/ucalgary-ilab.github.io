import Person, { getStaticProps as Person_getStaticProps } from '../person.jsx'

import summary from '../../content/output/summary.json'

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export async function getStaticPaths() {

    const people = Object.keys(summary.fileMap).filter((fileName) => {
      return fileName.includes("people");
    });
    const params = people.map((person) => ({
      params: {
        id: person.split("/")[3].replace(".json", "")
      }
    }));

    return {
      paths: params,
      fallback: false, // any paths not returned result in 404
    };
  }

export { Person_getStaticProps as getStaticProps }
export default Person
