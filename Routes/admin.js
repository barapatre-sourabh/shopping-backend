import express from 'express'
import {adminLogin,adminRegister,adminProfile,admins  } from '../Controllers/admin.js';
import { AuthenticatedA } from "../Middlewares/auth.js";
const router = express.Router();

// register admin
router.post('/adminRegister',adminRegister) //=> /api/admin/register

// login admin
router.post('/adminLogin',adminLogin)

// get all admin's
router.get('/alladmin',admins)

// get admin profile
router.get("/adminProfile", AuthenticatedA, adminProfile);

export default router