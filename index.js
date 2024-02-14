import  express  from "express";
import cors from 'cors'
import mongoose from "mongoose";

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/oskItDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log("DB CONNECT"))
.catch((err)=> console.log(err))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    hobbies: Array,
    gender: String
})

const User = new mongoose.model('User', userSchema);

app.post('/register', async (req, res)=>{
    const {userName, userEmail, userPhone,userHobbies,userGender, file} = req.body
    console.log(req.body);
    const user = new User({
        name: userName,
        email: userEmail,
        phone: userPhone,
        hobbies:userHobbies,
        gender:userGender,
        file:file

    })
   await user.save()
    res.send("save User Data")
})

app.listen(8000, ()=>{

    console.log('Db started on port 3000');
})