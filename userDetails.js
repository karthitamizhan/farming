const mongoose = require("mongoose");
const { number } = require("prop-types");

const UserDetailsScehma = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "SupplierInfo",
  }
);

mongoose.model("SupplierInfo", UserDetailsScehma);



const FarmerDetailsScehma = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "FarmerInfo",
  }
);

mongoose.model("FarmerInfo", FarmerDetailsScehma);




const PostDetailsScehma = new mongoose.Schema(
  {
    sid: Number,
    cid: { type: String , unique: true},
    // fid: Number,
    cname: String,
    quantity: Number,
    img: String,
    phno: Number,
  },

  {
    collection: "PostInfo",
  }
);

mongoose.model("PostInfo", PostDetailsScehma);



const AdminDetailsScehma = new mongoose.Schema(
  {
    email: { type: String },
    password: String, 
  },
  
  {
    collection: "AdminInfo",
  }
);

mongoose.model("AdminInfo", AdminDetailsScehma);




const SellDetailsScehma = new mongoose.Schema(
  {
    sid: String,
    cid: { type: String },
    cname: String,
    fid: Number,
    quantity: Number,
    rs: Number,
    phno: Number,
    isBuy:{
      type:Boolean,
      default:false
    }
  },
  
  {
    collection: "SellInfo",
  }
);

mongoose.model("SellInfo", SellDetailsScehma);

