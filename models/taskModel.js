const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const TaskSchema = new Schema({
  id: ObjectId,
  name: String,
  description: String,
  deadline: { type: Date, default: Date.now },
  status: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);