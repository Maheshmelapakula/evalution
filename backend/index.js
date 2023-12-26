const express = require('express')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const app = express();
const {connection} = require('./db')
const {Usermodel} = require('./models/Usermodel')

app.use(express.json());
app.use(cors({
    origin : "*"
}))

app.get('/', (req,res)=>{
    res.send({msg:"Api is working"})
})
app.post("/register", async (req, res) => {
    const {name, email, password,phone_number,department} = req.body;
    try{
        bcrypt.hash(password, 4, async function(err, hash) {
            await Usermodel.create({name, email, password : hash, phone_number,department})
            return res.send({msg : "register successfull"})
        });
    }
    catch(err){
        console.log(err)
        return res.send({msg : "something went wrong, please try again later"})
    }
})
app.post("/logingin", async (req, res) => {
    const {email, password} = req.body;
    const user = await Usermodel.findOne({email})

    if(!user){
        return res.send({msg : "Invalid credentials"})
    }

    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
         if(result){
                const token = jwt.sign({userID : user._id}, "mahesh")
                return res.send({msg : "login successfull", token : token})
         }
         else{
            return res.send({msg : "login failed"})
         }
    });
})


const port = 1002

app.listen(port,async()=>{
    try {
        await connection;
        console.log('Connected to Db');
        
    } catch (error) {
        console.log('err in connecting to DB');
        console.log(error);
        
    }
    console.log(`Server connected to the ${port}`);
})