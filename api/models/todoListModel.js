var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  Fname: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Lname:{
    type: String,
    required: 'Kindly enter the name of the task'
  },
  email:{
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Password:{
    type: String,
    required: 'Kindly enter the name of the task'
  },
 Confirmpassword:{
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Mobnum:{
    type: String,
    required: 'Kindly enter the name of the task'
  }

//   Created_date: {
//     type: Date,
//     default: Date.now
//   },
//   status: {
//     type: [{
//       type: String,
//       enum: ['pending', 'ongoing', 'completed']
//     }],
//     default: ['pending']
//   }
});

module.exports = mongoose.model('Tasks', TaskSchema);