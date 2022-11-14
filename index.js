const express = require("express");
const axios = require("axios");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const dotenv =require('dotenv')
const jwt = require("jsonwebtoken");
const { json } = require("express");
app.use(dotenv.config)
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
const PORT =process.env.PORT || 5000
const mongoUrl =
  "mongodb+srv://karthikeyan:admin@cluster0.id1xc4s.mongodb.net/?retryWrites=true&w=majority";
  app.listen(PORT, () => {
    console.log("Server Started");
  });
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

  app.get("/", async(req,res)=>{
    res.json("server started");
  });

require("./userDetails");

const User = mongoose.model("SupplierInfo");
app.post("/register", async (req, res) => {
  const { id, name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldId = await User.findOne({ id });

    if (oldId) {
      return res.json({ error: "id Exists" });
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    await User.create({
      id,
      name,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error",error: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id });
  if (!user) {
    return res.json({ error: "id not match" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});




const Farmer = mongoose.model("FarmerInfo");
app.post("/fregister", async (req, res) => {
  const { id, name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldId = await Farmer.findOne({ id });

    if (oldId) {
      return res.json({ error: "id Exists" });
    }

    const oldUser = await Farmer.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    await Farmer.create({
      id,
      name,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error",error: "error" });
  }
});

app.post("/flogin-user", async (req, res) => {
  const { id, password } = req.body;

  const user = await Farmer.findOne({ id });
  if (!user) {
    return res.json({ error: "id" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "id error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});



const Cpost = mongoose.model("PostInfo");
app.post("/cropost", async (req, res) => {
  
  const { cid, sid, cname, quantity, img ,phno} = req.body;
  const oldId = await Cpost.findOne({ cid });

  if (oldId) {
    return res.json({ error: "id Exists" });
  }

  try {
    await Cpost.create({
      sid,
      cid,
      cname,
      quantity,
      img,
      phno,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error",error: "error" });
  }
});


const Admin = mongoose.model("AdminInfo");
app.post("/adminpost", async(req,res)=>{

  const {email, password} = req.body;
  const user = await Admin.findOne({ email});
  const pass = await Admin.findOne({ password});
  if (!user) {
    return res.json({ error: "User" });
  }

  if(!pass){
    return res.send({error: "password not"})
  }
  if(pass){
    if (res.status(201)) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Password" });
});


const Csell = mongoose.model("SellInfo");
app.post("/cropsell", async (req, res) => {
  
  const { sid, cid, cname,fid, quantity, rs ,phno} = req.body;

  try {
    await Csell.create({
      sid,
      cid,
      cname,
      fid,
      quantity,
      rs,
      phno,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error",error: error });
  }
});


app.get('/getpost', async(req,res)=>{
  try{
    const allData = await Cpost.find();
    // res.json({ status: 'success' });
    // return console.log(allData);
    res.status(200).json(allData)
  }
  catch(error){
    console.log("karthi -> "+error);
  }
});

app.get('/getnewpost/:id', async(req,res)=>{
  try{
    const allData = await Cpost.findById(req.params.id);
    console.log(allData);
    // res.json({ status: 'success' });
    // return console.log(allData);
    res.status(200).json(allData)
  }
  catch(error){
    console.log("karthi -> "+error);
  }
});


app.get('/receives/:id', async(req,res)=>{
  console.log("hello");
  console.log(req.params.id);

  try{
    const all = await Csell.find( {"sid": req.params.id } );

    // res.json({ status: 'success' });   
    // return console.log(allData);
    console.log(all);

    res.status(200).json(all)
  }
  catch(error){
    console.log("karthi error found-> "+error);
  }
});


app.get('/getfarmer', async(req,res)=>{
  try{
    const all = await Farmer.find();
    // res.json({ status: 'success' });
    // return console.log(allData);
    res.status(200).json(all)
  }
  catch(error){
    console.log("karthi -> "+error);
  }
});


app.get('/getsupplier', async(req,res)=>{
  try{
    const all = await User.find();
    // res.json({ status: 'success' });
    // return console.log(allData);
    res.status(200).json(all)
  }
  catch(error){
    console.log("karthi -> "+error);
  }
});


app.delete('/deletesup/:id', async(req,res)=>{
  try{
  const all = await User.findByIdAndDelete(req.params.id);
  console.log(id);
  res.status(200).json(all)
  return res.json({status: "ok" });
  }catch(error){
    console.log("karthi ->"+error);
  }
});


app.delete('/deletefar/:id', async(req,res)=>{
  try{
    console.log(req.params.id);
  const all = await Farmer.findByIdAndDelete(req.params.id);
  console.log(id);
  res.status(200).json(all)
  return res.json({status: "ok" });
  }catch(error){
    console.log("karthi ->"+error);
  }
});








app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const userid = user.id;
    User.findOne({ id: userid })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});


app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const userid = user.id;
    Farmer.findOne({ id: userid })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.get('/getid/:id', async(req,res)=>{
  try{
  console.log("crop received id",req.params.id);
  const all = await Csell.findById(req.params.id);
  console.log(all,"what is this");
  res.status(200).json(all)
  return res.json({status: "ok" });
  }catch(error){
    console.log("karthi ->"+error);
  }
}); 



app.get('/staterec/:id', async(req,res)=>{
  console.log("hello farmer");
  console.log("farmerr id",req.params.id);

  try{
    const all = await Csell.find( {"fid": req.params.id } );
    console.log(all);

    res.status(200).json(all)
  }
  catch(error){
    console.log("karthi error found-> "+error);
  }
});


app.get('/getstatus/:id', async(req,res)=>{
  try{
  console.log("crop received id",req.params.id);
  const all = await Csell.findById(req.params.id);
  all.isBuy=true;
  await all.save();
  res.status(200).json(all)
  return res.json({status: "ok" });
  }catch(error){
    console.log("karthi crop status ->"+error);
  }
});