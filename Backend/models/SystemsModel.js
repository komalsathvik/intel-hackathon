const mongoose = require('mongoose');

const SystemsSchema = new mongoose.Schema({
  title:{type:String},
  name: { type: String },              
  proccessor: { type: String },         
  graphics: { type: String },          
  Display : { type: String },          
  priceINR: { type: String },            
  img_url :{type:String},
  weight: {type:String},
  Design :{type:String},
  Memory : {type:String},
  Storage : {type:String},
});

module.exports = mongoose.model('System', SystemsSchema);
