const express = require('express')
const userRouter = require('./routes/userRoute')//impoting the route

const DBConnection = require('./db/dbConfig');//db connection 

const app = express();
const port = 5900;


//json middleware to extract json data 
app.use(express.json())


//user middleware route
app.use('/api/user',userRouter) 

//question middleware route
app.use("api/question",userRouter)




async function starter() {
     try {
        const result = await DBConnection.execute("select 'test' ")
        console.log(result)
        console.log("Database connected successfully");
        app.listen(port)
        console.log("server is up on localhost:5900")
        
     } catch (error) {
        console.log(error.message)
        
     }
    
}
starter()

// app.listen(port,(err)=>{
//     if(err){
//         console.log(err.message);
//     }else{
//         console.log("server is up on localhost:5900")
//     }
// })


