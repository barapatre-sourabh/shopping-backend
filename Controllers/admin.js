import { Admin } from "../Models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

// admin register
export const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin)
      return res.json({ message: "Admin Already exist ", success: false });
    const hashPass = await bcrypt.hash(password, 10);
   admin = await Admin.create({ name, email, password: hashPass });
    res.json({
      message: "Admin register successfully...! ",
      admin,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) return res.json({ message: "Admin Not Found", success: false });
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.json({ message: "Invalid Credential", success: false });

    const token = jwt.sign({adminId:admin._id},"!@#$%^&*()",{
      expiresIn:'365d'
    })

    res.json({ message: `Welcome ${admin.name}`,token, success: true,});
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get All admins
export const admins= async (req, res) => {
  try {
    let admins = await Admin.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.json(error.message);
  }
};


// get adminProfile
export const adminProfile = async (req,res)=>{
  res.json({admin:req.admin})
}