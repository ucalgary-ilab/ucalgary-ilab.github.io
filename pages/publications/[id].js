import { useRouter } from "next/router";
import Contribution from '../../components/contribution';

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export async function getStaticPaths() {
  const summary = require("../../content/output/summary.json");
  const publications = Object.keys(summary.fileMap).filter((fileName) => {
    return fileName.includes("publications");
  });
  const params = publications.map((publication) => ({
    params: {
      id: publication.split("/")[3].replace(".json", ""),
    },
  }));
  return {
    paths: params, 
    fallback: false, // false or "blocking"
  };
}

export async function getStaticProps() {
  const summary = require("../../content/output/summary.json");
  const publications = Object.keys(summary.fileMap).filter((fileName) => {
    return fileName.includes("publications");
  });
  const ids = publications.map((publication) => ({
    id: publication.split("/")[3].replace(".json", ""),
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
  return <Contribution type="publication" id={id}/>;
}
