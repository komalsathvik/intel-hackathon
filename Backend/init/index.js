require("dotenv").config();

const mongoose = require("mongoose");
const Pdata = require("./ProccessorsData");
const Pmodel = require("../models/ProcessorsModel");
const Sdata = require("./SystemData");
const Smodel = require("../models/SystemsModel");
const Adata = require("./Acceleratersdata");
const Amodel = require("../models/AccerelaterModel");

const url = process.env.MONGO_URL;

if (!url) {
  console.error("❌ MONGO_URL is not defined in .env");
  process.exit(1);
}

async function main() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    await initdb();
    console.log("✅ DB initialized with fresh data");
    process.exit(0);
  } catch (err) {
    console.error("❌ Database connection or init failed:", err);
    process.exit(1);
  }
}

async function initdb() {
  try {
    await Pmodel.deleteMany({});
    await Smodel.deleteMany({});
    await Amodel.deleteMany({});

    const pRes = await Pmodel.insertMany(Pdata.data);
    const sRes = await Smodel.insertMany(Sdata.data);
    const aRes = await Amodel.insertMany(Adata.data);

    console.log(`✅ Inserted ${pRes.length} processors`);
    console.log(`✅ Inserted ${sRes.length} systems`);
    console.log(`✅ Inserted ${aRes.length} accelerators`);
  } catch (err) {
    console.error("❌ Error during DB initialization:", err);
    throw err;
  }
}

main();
