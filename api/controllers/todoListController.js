var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');
  bcrypt=require('bcryptjs')


exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.userSignin = (req,res,next) =>{
  const email = req.body.email;
  const Password = req.body.Password;
  let loadedUser;
  Task.findOne({email: email})
  .then(user =>{
  if(!user){
  // const error = new Error('A user with this email could not be found.');
  // error.statusCode = 401;
  // throw error;
 
  res.json('A user with this email could not be found');
  }
  
  loadedUser = user;
  return bcrypt.compare(Password,user.Password);
  })
  .then(isEqual =>{
  if(!isEqual){
  const error = new Error('wrong password.');
  error.statusCode = 401;
  // throw error;
  res.json('wrong password');
  }
  const token = jwt.sign(
  {
  email: loadedUser.email,
  userId:loadedUser._id.toString()
  },'secret')
  return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
  })
  .catch(err => {
  if (!err.statusCode) {
  err.statusCode = 500;
  res.json('user login sucessfully');
  }
  next(err);
  }); 
  }


exports.create_a_task = function(req, res) {
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
const reg_mob=/^[0]?[789]\d{9}$/;
const reg_pwd=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
if(!reg_pwd.test(req.body.Password)){
  console.log(req.body)
res.send('password is invalid');
}
if(!reg_mob.test(req.body.Mobnum)){
res.send('Mobile number is invalid');
}
if(reg_email.test(req.body.email)){
  Task.find({email: req.body.email},function(err, data){
if(data != null && data != ''){
res.send('User already exists');
}
else
{
var userData = new Task(req.body);
bcrypt.genSalt(10, function(err, salt){
bcrypt.hash(userData.Password, salt, function(err, hash) {
userData.Password = hash;
userData.save(function(err, data){
  res.send("user added successfully");
if(err)
res.send(err.message);
res.json(data);
})
})
})
}
});
}
else {
res.send('Email is invalid');
}
};



exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};


