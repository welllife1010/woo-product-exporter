const fs = require("fs");
const path = require("path");
const { parse } = require("json2csv");

function saveToCSV(data, fileName = "export.csv") {
  const csv = parse(data);
  fs.writeFileSync(path.join(__dirname, fileName), csv, "utf8");
}

module.exports = { saveToCSV };
