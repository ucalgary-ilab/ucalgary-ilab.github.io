const fs = require("fs");
const tree = require("directory-tree");

/// Store list of image files

const files = tree("./static", {
  extensions: /\.(jpg|jpeg|pdf|png)$/,
});
fs.writeFileSync("./content/output/files.json", JSON.stringify(files, null, 2));

/// getContributions adapted from components/contributions.js
function getContributions(summary) {
  const fileNames = Object.keys(summary.fileMap);
  const keys = fileNames.filter((fileName) => {
    return fileName.includes("projects") || fileName.includes("publications") || fileName.includes("theses");
  });

  let contributions = [];
  for (let key of keys) {
    /// Test if contributions are deactivated: contributions must include a title:
    if(Object.keys(summary.fileMap[key]).includes("title")){
      console.log(key)
      contributions.push(summary.fileMap[key]);
    }
    else{
      delete summary.fileMap[key]
    }
  }
  contributions = contributions.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return contributions;
}

/// getPeople adapted from components/contributions.js
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

/// Extend contributions with affiliated labs from authors

let summary = require("./content/output/summary.json");
let contributions = getContributions(summary);
const people = getPeople(summary);
contributions.forEach((contribution, p) => {
  let labs = [];
  let authors = contribution.authors || [contribution.author, ...contribution.advisors] // do not parse committee for lab affiliation
  authors.forEach((author) => {
    let person = people.find((p) => p.name == author);
    if (person !== undefined && person.labs !== undefined) {
      labs = labs.concat(person.labs);
      labs = [...new Set(labs)].sort();
    }
  });
  if (labs.length > 0) {
    console.log(`Adding labs "${labs}" to "${contribution.dir}/${contribution.base}"`);
    contribution.labs = labs;
    fs.writeFileSync(
      "./" + contribution.dir + "/" + contribution.base,
      JSON.stringify(contribution, null, 2)
    );
    
    summary["fileMap"]["${contribution.dir}/${contribution.base}"] = contribution;
  }
});
fs.writeFileSync(
  "./content/output/summary.json",
  JSON.stringify(summary, null, 2)
);
