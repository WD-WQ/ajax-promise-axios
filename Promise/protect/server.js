const express = require('express')

const app = express()

app.get('/promise',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send('promise 封装 Ajax')
})

app.listen(8000,()=>{
    console.log('8000 open...')
})