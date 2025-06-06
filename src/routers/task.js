const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router
//Create Task
router.post('/tasks', auth, async(req,res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
       await task.save()
       res.send(task) 
    }catch(e) {
        res.status(400).send(e)
    }
    // task.save().then(()=> {
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})
//Read all tasks, or filtered
//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt_asc or desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed) {
        match.completed = req.query.completed === 'true' 
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 /* This sets sort to -1 if desc is in the createdAt query, and 1 if not */
                
    }
    try {
        //const task = await Task.find({ owner: req.user._id})
        //OR
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }            
        }).execPopulate()
        res.send(req.user.tasks) //req.user.tasks
    } catch (e) {
        res.status(500).send(e)
    }
    // Task.find({}).then((task) => {
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})
//Read task by Id, registered under account
router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id
    try{ 
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        
        if(!task) {
            return res.status(404).send()
        }
        
        res.send(task)
    }catch (e) {
        res.status(400).send(e)
    }
    // Task.findById(_id).then((task) => {
    //     if(!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(400).send()
    // })
})
//Update Task
router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }
    
    try{
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        //const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
//Delete Task
router.delete('/tasks/:id', auth, async(req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    
        if(!task) {
            res.status(400).send()
        }
        
        res.send(task)

    }catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router