const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const PORT = 3001;
const postgres = require('postgres');
const sql = postgres('postgresql://allears-db_owner:JkCDGHu6FU8m@ep-flat-butterfly-a50qpai2-pooler.us-east-2.aws.neon.tech/allears-db?sslmode=require');
app.use(express.json());
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.listen(PORT, () =>{
    console.log("app running on " + PORT)
})

app.get('/', (req,res) => {
    res.status(200).send({
        message:"hello"
    });
})

//Signup endpoint
app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const passwordHash = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10));
    try{
        const query = await sql`
        insert into users (
          username, password
        ) values (
          ${username}, ${passwordHash}
        )
      `
      res.status(200).send({
        message: 'Successfully signed up ' + username
      })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            message: "We couldn't sign you up. Please check if this username is already registered."
        })
    }
})

//Login endpoint
app.post('/login', (req, res) => {

});