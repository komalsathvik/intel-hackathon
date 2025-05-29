const mongoose = require('mongoose');

const ProccessorsSchema = new mongoose.Schema({
  title:{type:String},
  name: { type: String },                // Intel® Core™ Ultra 9 285K
  cores: { type: String },               // 24
  maxTurboFrequencyGHz: { type:String },// 5.7
  cacheMB: { type: String },             // 36
  graphics: { type: String },            // Intel® Graphics
  launchDate: { type: String },          // Q4'24
  priceINR: { type: String },            // 45999
  img_url :{type:String},
  baseFrequencyGHz: {type:String},
  tdpW :{type:String},
  img_url :{type:String},
});

module.exports = mongoose.model('Proccessor', ProccessorsSchema);
