const fs = require("fs");
const tree = require("directory-tree");

/// Store list of image files

const files = tree("./static", {
  extensions: /\.(jpg|jpeg|pdf|png)$/,
});
fs.writeFileSync("./content/output/files.json", JSON.stringify(files, null, 2));

/// getPublications adapted from pages/publications.js
function getPublications(summary) {
  const fileNames = Object.keys(summary.fileMap);
  const keys = fileNames.filter((fileName) => {
    return fileName.includes("publications");
  });

  let publications = [];
  for (let key of keys) {
    publications.push(summary.fileMap[key]);
  }
  publications = publications.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return publications;
}

/// getPeople adapted from pages/publications.js
function getPeople(summary) {
  const fileNames = Object.keys(summary.fileMap);
  const keys = fileNames.filter((fileName) => {
    return fileName.includes("people");
  });

  let people = [];
  for (let key of keys) {
    let id = key.split("/")[3].replace(".json", "");
    let person = Object.assign(summary.fileMap[key], { id: id });
    people.push(person);
  }

  const names = people.map((person) => person.name);
  const namesId = {};
  for (let person of people) {
    namesId[person.name] = person.id;
  }
  return people;
}

/// Extend publications with affiliated labs from authors

const summary = require("./content/output/summary.json");
let publications = getPublications(summary);
const people = getPeople(summary);
publications.forEach((publication, p) => {
  let labs = [];
  publication.authors.forEach((author) => {
    let person = people.find((p) => p.name == author);
    if (person !== undefined && person.labs !== undefined) {
      labs = labs.concat(person.labs);
      labs = [...new Set(labs)].sort();
    }
  });
  if (labs.length > 0) {
    console.log(`Adding labs "${labs}" to "${publication.dir}/${publication.base}"`);
    publication.labs = labs;
    fs.writeFileSync(
      "./" + publication.dir + "/" + publication.base,
      JSON.stringify(publication, null, 2)
    );
    
    summary["fileMap"]["${publication.dir}/${publication.base}"] = publication;
  }
});
fs.writeFileSync(
  "./content/output/summary.json",
  JSON.stringify(summary, null, 2)
);
