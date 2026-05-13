import fs from "fs";
import QRCodeStyling from "qr-code-styling";
import nodeCanvas from "canvas";
import { JSDOM } from "jsdom";

let contributionInputPath = "";
const inputDir = "./content/input";
const inputPubDir = `${inputDir}/publications`;
const pubDir = "./content/publications";

if(process.argv.length === 3){
    contributionInputPath = process.argv.slice(-1)[0];
}
else{
    console.log(`Append contribution path as argument. Example: ./content/projects/student-club-ucxr.yaml`)
    process.exit(2)
}
console.log(`Generating QR code for contribution ${contributionInputPath}`)

const contentsPath = "contents"
if(!fs.existsSync(contributionInputPath)){
    console.log(`Contribution path ${contributionInputPath} does not exits, exiting.`)
    process.exit(1);
}
let contributionSubPath = contributionInputPath.split("/");
if(contributionSubPath[0] !== "content"){
    console.log(`Contribution path ${contributionInputPath} should start with content instead of ${contributionSubPath[1]}, exiting.`)
    process.exit(1);
}
let contributionType = contributionSubPath[1];
console.log(`Type of contribution inferred from path: ${contributionType}`)

let contributionId = contributionSubPath[2].split(".")[0]

let urlPrefix = "https://ilab.ucalgary.ca"
let url = `${urlPrefix}/${contributionType}/${contributionId}`

console.log(`Contribution URL inferred from path: ${url}`);

let fileOutputPrefix = "./static/images";
let fileOutputExtension = "png"
let fileOutputDir = `${fileOutputPrefix}/${contributionType}/qrcode`
let fileOutputPath = `${fileOutputDir}/${contributionId}.${fileOutputExtension}`

if (!fs.existsSync(fileOutputDir)) {
    fs.mkdirSync(fileOutputDir);
}

if (fs.existsSync(fileOutputPath)) {
    console.log(`QR code ${fileOutputPath} already exists, exiting.`)
    process.exit(1);
}

console.log(`Generating file: ${fileOutputPath}`);

/// https://github.com/kozakdenys/qr-code-styling#node-support

const options = {
    width: 300,
    height: 300,
    data: url,
    // image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    dotsOptions: {
        color: "#dd2725",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#e9ebee",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
    }
}

// For canvas type
const qrCodeImage = new QRCodeStyling({
    jsdom: JSDOM, // this is required
    nodeCanvas, // this is required,
    ...options,
    imageOptions: {
        saveAsBlob: true,
        crossOrigin: "anonymous",
        margin: 20
    },
});

qrCodeImage.getRawData("png").then((buffer) => {
  fs.writeFileSync(fileOutputPath, buffer);
});

// // For svg type
// const qrCodeSvg = new QRCodeStyling({
//     jsdom: JSDOM, // this is required
//     type: "svg",
//     ...options
// });

// qrCodeSvg.getRawData("svg").then((buffer) => {
//   fs.writeFileSync("test.svg", buffer);
// });

// // For svg type with the inner-image saved as a blob
// // (inner-image will render in more places but file will be larger)
// const qrCodeSvgWithBlobImage = new QRCodeStyling({
//     jsdom: JSDOM, // this is required
//     nodeCanvas, // this is required
//     type: "svg",
//     ...options,
//     imageOptions: {
//         saveAsBlob: true,
//         crossOrigin: "anonymous",
//         margin: 20
//     }
// });

// qrCodeSvgWithBlobImage.getRawData("svg").then((buffer) => {
//   fs.writeFileSync("test_blob.svg", buffer);
// });