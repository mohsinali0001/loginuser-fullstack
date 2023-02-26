const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.set("strictQuery", false);
main().catch(err => console.log(err));




async function main() {
  await mongoose.connect(`mongodb+srv://newdatabase:BDTuPOlR14LHNkEH@cluster0.itxnnc1.mongodb.net/abc?retryWrites=true&w=majority`);
  console.log('db connected')
}
const userSchema = new mongoose.Schema({
    username: String,
    email: String
});

const User = mongoose.model('User', userSchema);




const server = express();

server.use(cors());
server.use(bodyParser.json());

//  Create
server.post('/demo',async (req,res)=>{
     
    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    const doc = await user.save();

    console.log(doc);
    res.json(doc);
})

server.get('/demo',async (req,res)=>{
    const docs = await User.find({});
    res.json(docs)
})

server.listen(8080,()=>{
    console.log('server started')
})

