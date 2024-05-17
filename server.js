const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000; // Define your desired port

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow the specified methods
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Allow the specified headers
  next();
});

app.use(express.static("dev"));
// Endpoint to serve the JSON data
app.get("/data", (req, res) => {
  const json = fs.readFileSync("jsons/umap_data.json");
  data = JSON.parse(json);
  res.json(data); // Respond with the JSON data
});


app.get("/metadata", (req, res) => {
  const json = fs.readFileSync("jsons/merged_data.json");
  data = JSON.parse(json);
  res.json(data);
});

app.get("/minidata", (req, res) => {
  const json = fs.readFileSync("jsons/categoey_cell_meta.json");
  data = JSON.parse(json);
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
