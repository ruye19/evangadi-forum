const mysql2 = require('mysql2')

 const DBConnection=mysql2.createPool({
    user:process.env.USER,
    database:process.env.DATABASE,
    host:'localhost',
    password:process.env.PASSWORD,
    connectionLimit:10
 })

//  DBConnection.execute("select 'test' " , (err,result)=>{
//     if (err) {
//         console.log(err.message);
        
//     }else{
//         console.log(result,"well done Ruth!")
//     }
//  })
 module.exports= DBConnection.promise()
