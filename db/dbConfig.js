const mysql2 = require('mysql2')

 const DBConnection=mysql2.createPool({
    user:'ruth yeshitila',
    database:'evangadi_forum_db',
    host:'localhost',
    password:"creast314629",
    connectionLimit:10
 })

 DBConnection.execute("select 'test' " , (err,result)=>{
    if (err) {
        console.log(err.message);
        
    }else{
        console.log(result,"welldone ruth!")
    }
 })
