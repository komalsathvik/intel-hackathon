require('dotenv').config({ path: '../.env' });

const mongoose = require("mongoose");
const Pdata = require("./ProccessorsData");
const Pmodel = require("../models/ProcessorsModel");
const Sdata = require("./SystemData");
const Smodel = require("../models/SystemsModel");
const Adata = require("./Acceleratersdata");
const Amodel = require("../models/AccerelaterModel");

const url = process.env.MONGO_URL;
// console.log("MONGO_URL:", process.env.MONGO_URL);

async function main() {
  await mongoose.connect(url);
  console.log("DB connected");

  await initdb(); // waiting to insert data after connecting

  console.log("DB initialized");
}

async function initdb() {
  await Pmodel.deleteMany({});
  await Smodel.deleteMany({});
  await Amodel.deleteMany({});
  let d1 = await Pmodel.insertMany(Pdata.data);
  console.log(d1)
  let d2 = await Smodel.insertMany(Sdata.data);
  console.log(d2)
   let d3 = await Amodel.insertMany(Adata.data);
  console.log(d3)
}

main().catch(err => {
  console.error("Error:", err);
});
