const fs = require("fs");
const cliProgress = require("cli-progress");

// Read umap_and_cell_meta.json
const umapData = fs.readFileSync("./jsons/umap_and_cell_meta.json");
const umapJson = JSON.parse(umapData);

// Read sample_genes.json
const sampleData = fs.readFileSync("./jsons/sample_genes.json");
const sampleJson = JSON.parse(sampleData);

const mergedData = fs.readFileSync("./jsons/merged_data.json")
const mergeJson = JSON.parse(mergedData);


// Create a new progress bar
const progressBar = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic
);
progressBar.start(umapJson.length, 0);

// Iterate over umapJson
for (let i = 0; i < umapJson.length; i++) {
  // Iterate over each key in sampleJson
  for (const key in sampleJson) {
    if (sampleJson.hasOwnProperty(key)) {
      // Add key-value pair to umapJson object
      umapJson[i][`${key}_exp`] = sampleJson[key][i];
    }
  }
  progressBar.update(i + 1); // Update progress bar
}

progressBar.stop(); // Stop progress bar

// Write the updated umapJson array to a new file
fs.writeFileSync("./jsons/merged_data.json", JSON.stringify(umapJson, null, 2));

console.log("Merged data saved to merged_data.json");
