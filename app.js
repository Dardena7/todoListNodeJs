require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//Routes modules
const indexRouter = require('./routes/index');
const taskRouter = require('./routes/task');

//Models modules
const Task = require('./models/taskModel');

//Application init
let app = express();

//Template 
app.set('view engine', 'ejs');

//Routes mapping
app.use('/', indexRouter);
app.use('/task', taskRouter);

//DB connection
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let task1 = new Task({
    name: "Second task",
    description: "Description of the second task",
    status: false
});

task1.save(function(err) {
    if(err) throw err;
    console.log("Task Saved !");
})

app.listen(process.env.PORT);