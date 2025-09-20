import Publication from "../../publication/page";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const summary = require("../../../content/output/summary.json");
  const publications = Object.keys(summary.fileMap).filter((fileName) => {
    return fileName.includes("publications");
  });

  return publications.map((publication) => ({
    slug: publication.split("/")[3].replace(".json", ""),
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <Publication id={slug} />;
}
