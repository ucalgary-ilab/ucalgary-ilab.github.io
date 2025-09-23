import { useRouter } from 'next/router'
import Person from '../person.jsx'

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export async function getStaticPaths() {
    const summary = require("../../content/output/summary.json");
    const people = Object.keys(summary.fileMap).filter((fileName) => {
      return fileName.includes("people");
    });
    const params = people.map((person) => ({
      params: {
        id: person.split("/")[3].replace(".json", ""),
      },
    }));
    return {
      paths: params,
      fallback: false, // false or "blocking"
    };
  }

  export async function getStaticProps() {
    const summary = require("../../content/output/summary.json");
    const people = Object.keys(summary.fileMap).filter((fileName) => {
      return fileName.includes("people");
    });
    const ids = people.map((person) => ({
      id: person.split("/")[3].replace(".json", ""),
    }));
    return {
      props: {
        ids,
      },
    };
  }

  // https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#pages-with-dynamic-routes
  // https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
  export default function Page() {
    const router = useRouter();
    const id = router.query.id;
    return <Person id={id} />;
  }