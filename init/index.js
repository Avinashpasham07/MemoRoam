const mongoose = require('mongoose');
const initData = require('./data');
const listing = require('../models/listing');

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

const initdb = async () => {
  await listing.deleteMany({});
  initData.data = initData.data.map((obj)=>
    ({...obj, owner: "681781c9f0e961c6bcddaa69"}));
  await listing.insertMany(initData.data);
  console.log('Data inserted');
};

initdb();
