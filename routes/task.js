const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const Task = require('../models/taskModel');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();


//Tasks list to do
router.get('/', function(req, res) {
    Task.find({status: false}, function(err, tasks){
        if (err) throw err;
        res.render('task', {tasks : tasks});
    });
});

//Tasks list done
router.get('/done', function(req, res) {
    Task.find({status: true}, function(err, tasks){
        if (err) throw err;
        res.render('task-done', {tasks : tasks});
    });
});

router.get('/add', function(req, res) {
    res.render('task-add');
});

router.get('/:id', function(req, res) {
    Task.find({_id: req.params.id}, function(err, task){
        if (err) {
            res.redirect('/task');
        } else {
            res.render('task-details', {task : task[0]});
        }
    });
});

router.get('/:id/edit', function(req, res) {
    Task.find({_id: req.params.id}, function(err, task){
        if (err) {
            res.redirect('/task');
        } else {
            console.log(task);
            res.render('task-edit', {task: task[0]});   
        }
    });
});

router.post('/:id/edit', urlencodedParser, function(req, res) {
    Task.updateOne({_id: req.params.id}, 
        {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status === "true" ? true : false
        },
        function(err, task){
            if (err) {
                console.log(err);
                res.redirect('/task');
            } else {
                console.log("Task edited!");
                res.redirect('/task/'+req.params.id); 
            }
    });
});

router.post('/add', urlencodedParser, function(req, res) {
    let newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        status: false
    });
    newTask.save(function(err) {
        if (err) throw err;
        console.log("new task saved");
        res.redirect('/task');
    });
});

router.delete('/', jsonParser, function(req, res) {
    Task.deleteOne({_id: req.body.id}, function(err, task){
        if (err) throw err;
        res.send(200);
    });
});

module.exports = router;