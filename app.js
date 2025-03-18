const express = require('express')

const app = express();
const port = 5900;



app.get('/',(req,res)=>{
    if (res) {
        res.send('welcome #evangadi forum')
        console.log("welcome to evenagdi forum");
    }else{
        console.log(err.message)
    }
})




app.listen(port,(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("server is up on localhost:5900")
    }
})

