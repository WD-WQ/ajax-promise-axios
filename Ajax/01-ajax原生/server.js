const express = require('express')

const app = express()

app.get('/server',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.send('get server is open')
})

app.post('/server',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.send('post server is open')
})

app.get('/json-server',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  const data = {
    name:'wyt',
    age:20
  }
  res.send(data)
})

app.listen(8000,()=>{
  console.log('8000 open...')
})