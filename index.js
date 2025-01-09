const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const PORT = 3001;
app.use(express.json());

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
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    res.status(200).send({
        receivedUsername: username,
        passwordHash: passwordHash
    })
})

//Login endpoint
app.post('/login', (req, res) => {

});