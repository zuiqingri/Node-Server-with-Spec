const express=require('express')
const logger=require('morgan')
const app=express()
const users=[{id: 1, name:'Alice'},{id:2, name:'Bek'},{id:3, name:'Chris'}]
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


module.exports=app