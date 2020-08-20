/*
/Users/lukas/Onedrive/Coding/Javascript/mongodb/bin/mongod.exe --dbpath=/Users/lukas/Onedrive/Coding/Javascript/mongodb-data
*/
const express = require('express')
require('./db/mongoose')
// const Task = require('./models/task')
// const User = require('./models/user')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
// const { populate } = require('./models/task')
const app = express()
const port = process.env.PORT || PORT



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


//Deprecated

// const main = async() => {
// //     const task =  await Task.findById('5f39b24042eb143fecf134f1')
// //     await task.populate('owner').execPopulate()
// //     console.log(task.owner)

//     const user = await User.findById('5f3842be9fe96f0d5c300141')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

// }

//main()
// const pet = {
//     name: 'Hailey'
// }
// pet.toJSON = function () {
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))


// app.use((req, res, next) => {
//     if( req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req,res, next) => {
//     const maintenance = true
//     if(maintenance){
//         res.status(503).send('Currently under maintenance')
//     } else {
//         next()
//     }
// })

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file , cb) { //cb = callback
//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word Document.'))
//         }

//         // Uses
//         // cb(new Error('File must be a PDF'))
//         cb(undefined, true)
//         // cb(undefined, false)
        

//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// },(error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })