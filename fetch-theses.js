import fs from "fs";

let type = "";
let name = "";
let query = "";
const fetchUrl = "https://ucalgary.scholaris.ca/server/api/discover/search/objects?f.itemtype=thesis,contains&";
// - by author: https://ucalgary.scholaris.ca/server/api/discover/search/objects?f.itemtype=thesis,contains&f.author=Friedel,%20Marcus,contains (only exact matches)
// - by committee member: https://ucalgary.scholaris.ca/server/api/discover/search/objects?f.itemtype=thesis,contains&query=Christian%20Frisson (exact matches plus more)
const inputDir = "./content/input";
const inputThesesDir = `${inputDir}/theses`;
const contentThesesDir = "./content/theses";

/// Handle arguments
if(process.argv.length === 4){
    type = process.argv.slice(-2)[0];
    name = process.argv.slice(-1)[0];
}
else{
    console.log(`Specify "author" or "committee" as first argument then append name between quotes as second argument.`)
    process.exit(2)
}

/// Split name
let names=name.split(" ");
let lastName=names.slice(-1);
names.pop()
let firstNames=names

/// Extend query
if(type == "author"){
    query="f.author="
    query+=`${lastName},${firstNames.join("%20")},contains`
}
else if(type == "committee"){
    query="query="
    query+=name.split(" ").join("%20")
}
else {
    console.log(`Wrong first argument, must be either "author" or "committee".`)
    process.exit(2)
}
console.log(`Fetching theses for ${type} ${name} via ${fetchUrl}${query}`)

/// Generate filenames
const nameFile = name.toLowerCase().replaceAll(" ", "-");
const typeDir = `${inputThesesDir}/${type}`;
const nameFilePath = `${typeDir}/${nameFile}.json`;

/// Fetch JSON data from Scholaris
async function fetchJSON(name) {
  let data = undefined;
  if (!fs.existsSync(nameFilePath)) {
    console.log(`Fetching ${nameFilePath} via query ${fetchUrl}${query}.`);
    /// Note: fs-extra supports recursive `mkdir -p`
    if (!fs.existsSync(inputDir)) {
        fs.mkdirSync(inputDir);
    }
    if (!fs.existsSync(inputThesesDir)) {
        fs.mkdirSync(inputThesesDir);
    }
    if (!fs.existsSync(typeDir)) {
      fs.mkdirSync(typeDir);
    }
    const response = await fetch(`${fetchUrl}${query}`);
    data = await response.json();
    // console.log("response", response)
    // console.log("data", data)
    if(response.status !== 200){
        console.log(`Fetching ${nameFilePath} via query ${query} failed.`);
    }
    fs.writeFileSync(nameFilePath, JSON.stringify(data, null, 2));
  } else {
    console.log(`Reading data from ${nameFilePath}.`);
    data = fs.readFileSync(nameFilePath, { encoding: "utf8", flag: "r" });
    data = JSON.parse(data)
  }
  return data;
}
const data = await fetchJSON(name).catch(console.error);

async function parseScholaris(){
    /// Parse each result
    if(!data){
        console.log(`Failed to fetch data from Scholaris.`)
        process.exit(2)
    }
    const searchResults = data._embedded.searchResult._embedded.objects
    // console.log(searchResults)
    const nResults = searchResults.length
    console.log(`Found ${nResults} results.`);
    searchResults.forEach(async searchResult => {
        const result = searchResult._embedded.indexableObject
        // console.log(result)
        /// Check name as author or advisor or committee members
        let match = false
        const author=result.metadata["dc.contributor.author"][0].value
        const advisors=result.metadata["dc.contributor.advisor"];
        const committee=result.metadata["dc.contributor.committeemember"];
        console.log(`Checking id ${result.id} by author ${author}`)
        if(type === "author"){
            if(author.includes(`${lastName}, ${firstNames[0]}`)){
                match=true
            }
        }
        else if(type === "committee"){
            advisors.forEach(advisor => {
                if(advisor.value.includes(`${lastName}, ${firstNames[0]}`)){
                    match=true
                }
            })
            if(committee !== undefined){
                committee.forEach(member => {
                    if(member.value.includes(`${lastName}, ${firstNames[0]}`)){
                        match=true
                    }
                })
            }
        }
        else{
            console.log(`Wrong authorship type ${type}.`)
            process.exit(2)
        }
        
        /// Create content file if match
        if(!match){
            console.log(`Skipping id ${result.id} that does not include ${name} as ${type}`)
        }
        else{
            const firstNameFamily = author.split(",")[0].toLowerCase();
            const acroType = result.metadata["thesis.degree.name"][0].value.split("(")[1].split(")")[0].toLowerCase();
            const year = result.metadata["dc.date.issued"][0].value.split("-")[0];
            const pubFileName = `${acroType}-${year}-${firstNameFamily}`;
            console.log(`Parsing id ${result.id} as ${pubFileName}`)
            /// Test if file exists
            const pubFilePath = `${contentThesesDir}/${pubFileName}.yaml`
            if (fs.existsSync(pubFilePath)) {
                console.log(`Skipping id ${result.id} as ${pubFilePath} exists`)
            }
            else{
                console.log(`Creating ${pubFilePath} for id ${result.id}`)
                if (!fs.existsSync(contentThesesDir)) {
                    fs.mkdirSync(contentThesesDir);
                }
                let contents = "";
                contents += `date: "${result.metadata["dc.date.issued"][0].value}"\n`
                contents += `title: "${result.metadata["dc.title"][0].value}"\n`
                contents += `author: ${result.metadata["dc.contributor.author"][0].value.split(", ").reverse().join(" ")}\n`
                contents += `advisors:\n` 
                result.metadata["dc.contributor.advisor"].forEach(advisor => {
                    contents += `  - ${advisor.value.split(", ").reverse().join(" ")}\n`
                })
                contents += `committee:` 
                if(result.metadata["dc.contributor.committeemember"]){
                    contents += '\n'
                    result.metadata["dc.contributor.committeemember"].forEach(member => {
                        contents += `  - ${member.value.split(", ").reverse().join(" ")}\n`
                    })
                }
                else{
                    contents += ' []\n'
                }
                contents += `degree: "${result.metadata["thesis.degree.name"][0].value}"\n`
                contents += `type: "${result.metadata["dc.type"][0].value}"\n`
                let institution = result.metadata["dc.publisher.institution"] || result.metadata["thesis.degree.grantor"]
                institution = institution[0].value
                contents += `institution: "${institution}"\n`
                if(result.metadata["dc.publisher.faculty"]){
                    contents += `faculty: "${result.metadata["dc.publisher.faculty"][0].value}"\n`
                }
                contents += `discipline: "${result.metadata["thesis.degree.discipline"][0].value}"\n`
                result.metadata["dc.identifier.uri"].forEach(url => {
                    if(url.value.includes("hdl.handle.net")){
                        contents += `url: ${url.value}\n`
                    }
                    if(url.value.includes("doi.org")){
                        contents += `doi: ${url.value}\n`
                    }
                })
                const keywords = result.metadata["dc.subject"]
                if(keywords && keywords.length > 0){
                    contents += `keywords: ${keywords.map(k=>k.value).join(", ")}\n`
                } 
                if(result.metadata["dc.description.abstract"]){
                    let abstract = result.metadata["dc.description.abstract"][0].value.replaceAll('"','\\"').replaceAll(/[\n\r]+/g,"<br/>")//.replaceAll(/[\n]+/g,"<br/>").replaceAll(/[\r]+/g,"<br/>")//.replaceAll(/\r/g,"%")
                    contents += `abstract: "${abstract}"\n`
                }
                fs.writeFileSync(pubFilePath, contents);
            }
        }
    });
}
await parseScholaris();
