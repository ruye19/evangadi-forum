const DBConnection = require('../db/dbConfig')
const bcrypt =require('bcrypt') //To encrypt the passwords 
const {StatusCodes}=require('http-status-codes') // to get the status code 

const register = async (req, res) => {
   const {username,firstname,lastname , email,password}=req.body

   if (!email || !password || !firstname || !lastname || !username) {
    return res.status(400).json({ msg: "Please fill all fields" });
 }

 if(password.length < 8){
   return res.status(400).json({"msg":"password  must be atleast 8 charters"})
 }

//db .....
 try {
    const [user] = await DBConnection.query("select username,userid from users where username = ? or email=?",[username,email])
    if (user.length > 0) {
      return res.status(400).json({"msg":"user alreasy exist"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash (password,salt)
  
  

    await DBConnection.execute(
       "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
       [username, firstname, lastname, email, hashedPassword]
    );

    return  res.status(201).json({ msg: "User registered successfully" });

 } catch (error) {
    console.error(error.message);
   return res.status(500).json({ msg: "Server error" });

 }
};






const login = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(401).json({ msg: "Please enter all the fields" });
   }

   try {
      const [user] = await DBConnection.query(
         "SELECT username, userid, password FROM users WHERE email = ?",
         [email]
      );
   // check the email existance 
      if (user.length == 0) {
         return res.status(401).json({ msg: "Invalid credentials" });
      }


//compare the passwords the encrypt and the real one  
     const ismatch=await bcrypt.compare(password,user[0].password)
     if(!ismatch){
      return res.status(401).json({msg:"unauthorized"})
     }

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server faced an error" });
   }
};



module.exports={register,login}