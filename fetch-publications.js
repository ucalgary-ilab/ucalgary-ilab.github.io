import fs from "fs";

let author = "";
const dblpUrl = "https://dblp.org/search/publ/api?h=1000&format=json&q=";
const crossRefUrl = "https://api.crossref.org/works/";
const inputDir = "./content/input";
const pubDir = "./content/publications";

if(process.argv.length === 3){
    author = process.argv.slice(-1)[0];
}
else{
    console.log(`Append author between quotes as argument.`)
    process.exit(2)
}
console.log(`Fetching publications for author ${author}`)

const authorFile = author.toLowerCase().replaceAll(" ", "-");
const authorFilePath = `${inputDir}/${authorFile}.json`;

/// Fetch JSON data from DBLP
async function fetchDBLPJSON(author) {
  let data = undefined;
  if (!fs.existsSync(authorFilePath)) {
    const query = dblpUrl + encodeURI(author);
    console.log(`Fetching ${authorFilePath} via query ${query}.`);
    if (!fs.existsSync(inputDir)) {
      fs.mkdirSync(inputDir);
    }
    const response = await fetch(query);
    data = await response.json();
    if(data.result.status.text !== "OK"){
        console.log(`Fetching ${authorFilePath} via query ${query} failed.`);
    }
    fs.writeFileSync(authorFilePath, JSON.stringify(data, null, 2));
  } else {
    console.log(`Reading data from ${authorFilePath}.`);
    data = fs.readFileSync(authorFilePath, { encoding: "utf8", flag: "r" });
    data = JSON.parse(data)
  }
  return data;
}
const data = await fetchDBLPJSON(author).catch(console.error);

/// Fix author name
function fixAuthorName(author){
    /// Remove last word if number
    let authorLastWord = author.split(" ").slice(-1)[0];
    if(Number.isInteger(Number(authorLastWord))){
        author = author.replace(" "+authorLastWord,"")
    }
    return author;
}

async function parseDBLP(){
    /// Parse each hit
    const nHits = data.result.hits["@total"];
    console.log(`Found ${nHits} hits.`);
    const hits = data.result.hits.hit;
    data.result.hits.hit.forEach(async hit => {
        /// Compute first author family name lower case
        let authors = hit.info.authors.author;
        let firstAuthor = undefined;
        if(Array.isArray(authors)){
            firstAuthor = authors[0];
        }
        else{
            firstAuthor = authors;
        }
        firstAuthor = fixAuthorName(firstAuthor.text.toLowerCase());
        const firstAuthorFamily = firstAuthor.split(" ").slice(-1)[0];

        /// Compute venue identifier for conferences and journals
        let venue = hit.info.venue;
        if(venue === "CoRR"){
            console.log(`Skipping id ${hit["@id"]} with venue ${venue}`)
        }
        else if(venue !== undefined){
            /// Handle edge cases
            if(venue.includes("Proc. ACM Hum. Comput. Interact.")){
                venue = "pacmhci"
            }
            else if(venue.includes("ACM Trans. Access. Comput.")){
                venue = "taccess"
            }
            else if(venue.includes("EAI Endorsed Trans. Pervasive Health Technol.")){
                venue = "phat"
            }
            /// Remove publishers and stop words
            const removeWords = ['ACM','IEEE','and','&amp;','Conference on'];
            removeWords.forEach(r => {
                venue = venue.replaceAll(r+" ","");
            })
            let venueWords = []
            if(venue.includes("@")){
                /// Handle workshops
                venue = venue.split("@").reverse().join("-")
                venueWords = [venue];
            }else{
                venue = venue.replaceAll("/"," ")
                venueWords = venue.split(" ");
            }
            if(venueWords.length === 1){
                /// Handle venue consisting of a single acronym
                venue = venue.toLowerCase();
            }
            else{
                /// Handle venue consisting of multiple words
                venue = '';
                let acronym = false;
                venueWords.forEach(w => {
                    /// Handle venue starting with acronym
                    if(w === w.toUpperCase() && !w.endsWith(".")){
                        venue += w.toLowerCase();
                        acronym = true;
                    }
                    else{
                        if(acronym===true){
                            venue += "-";
                            acronym = false;
                        }
                        /// Append subproceedings
                        if(w[0].toLowerCase() !== w[0]){
                            venue += w[0].toLowerCase();
                        }
                    }
                })
            }
            const pubFileName = `${venue}-${hit.info.year}-${firstAuthorFamily}`;
            console.log(`Parsing id ${hit["@id"]} as ${pubFileName}`)
            /// Test if file exists
            const pubFilePath = `${pubDir}/${pubFileName}.yaml`
            if (fs.existsSync(pubFilePath)) {
                console.log(`Skipping id ${hit["@id"]} as ${pubFilePath} exists`)
            }
            else{
                console.log(`Creating ${pubFilePath} for id ${hit["@id"]}`)
                let contents = "";
                contents += `date: "${hit.info.year}"\n`
                contents += `title: "${hit.info.title}"\n`
                contents += `authors: \n`
                if(!Array.isArray(authors)){
                    authors=[authors];
                }
                authors.forEach(a => {
                    /// Remove numbers
                    let author = fixAuthorName(a.text);
                    contents += `  - ${author}\n`
                })
                contents += `series: ${hit.info.venue} ${hit.info.year}\n`
                if(hit.info.doi) {contents += `doi: ${hit.info.doi}\n`}
                if(hit.info.pages) {contents += `pages: ${hit.info.pages}\n`}
                if(hit.info.volume) {contents += `volume: ${hit.info.volume}\n`}
                if(hit.info.number) {contents += `number: ${hit.info.number}\n`}
                fs.writeFileSync(pubFilePath, contents);
            }
        }
        else{
            console.log(`Failed to parse venue for id ${hit["@id"]}`)
        }
    });
}
await parseDBLP();
