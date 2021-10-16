const express=require('express')
const logger=require('morgan')
const bodyParser=require('body-parser')
const app=express()
let users=[{id: 1, name:'Alice'},{id:2, name:'Bek'},{id:3, name:'Chris'}]

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function (req, res) {
    res.send('hello world')
  })
  app.get('/users',(req,res)=>{
      req.query.limit=req.query.limit||10
      const limit=parseInt(req.query.limit,10)
      if(Number.isNaN(limit)){
        res.status(400).end()
      }else{
        res.json(users.slice(0,limit))
      }
     })
  app.get('/users/:id',(req,res)=>{
      const id=parseInt(req.params.id,10)
      if(Number.isNaN(id)){
        return res.status(400).end()

      }
      const user=users.filter(user=>user.id===id)[0]
      if(!user){
          return res.status(404).end()
      }
      res.json(user)
  })

  app.delete('/users/:id',(req,res)=>{
      const id=parseInt(req.params.id,10)
      if(Number.isNaN(id)){
          return res.status(400).end()
      }

      users=users.filter(user=>user.id!==id)
      res.status(204).end()
  })

  app.post('/users',(req,res)=>{
      const name=req.body.name
      if(!name){
          return res.status(400).end()
      }

      const found=users
      .filter(user=>user.name===name).length
      if(found){
          return res.status(409).end()
      }

      const id=Date.now()
      const user={id,name}
      users.push(user)
      res.status(201).json(user)
  })
module.exports=app