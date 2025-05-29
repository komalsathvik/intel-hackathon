const mongoose = require('mongoose');

const AcceleraterSchema = new mongoose.Schema({
  Configuration:{type:String},
  title:{type:String},
  name: { type: String }, 
  priceINR: { type: Number }, 
  Per_unit_Estimate:{type:String},
  Availability:{type:String},
 Performance:{type:String},
  Form_Factor:{type:String},
  Features:{type:String},
  Specifications:{type:String},
  img_url :{type:String},
});

module.exports = mongoose.model('Accelerater', AcceleraterSchema);
