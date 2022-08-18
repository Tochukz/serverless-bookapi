const express = require('express');
const bcrypt = require('bcryptjs'); 
const router = express.Router();
const jwt = require('jsonwebtoken');

const { Admin, Book }  = require("../models");
const { adminRegisterValidator, loginValidator, bookCreateValidator } = require('../validators');

router.post('/login', loginValidator, async (req, res, next) => {
  try {
    const { username, password} = req.body;
    
    const admin = await Admin.findOne({
      where: {
        email: username
      }  
    });
    
    if (!admin) {
      return res.status(401).json({message: 'Invalid username and/or password'});
    }
    const { password: hashPass, ...adminData} = admin.dataValues;
    const isTrue = await bcrypt.compare(password, hashPass);
    if (!isTrue) {
      return res.status(401).json({message: 'Invalid username and/or password'});
    }
    
    const { APP_URL, JWT_SECRET } = process.env;
    adminData.token = jwt.sign({ adminId: admin.adminId}, JWT_SECRET, {    
      issuer: APP_URL,
      expiresIn: '8h',
    });
    delete admin.password;
    return res.json(adminData);

  } catch(err) {
    return next(err);
  }
});

router.post('/register', adminRegisterValidator, async (req, res, next) => {
  try {
    const body = req.body;
    body.password = await bcrypt.hash(body.password, 10);
    const newAdmin = await Admin.create(body);
    delete newAdmin.password;
    return res.status(201).json(newAdmin);
  } catch(err) {
    return next(err);
  }
});

router.get('/admins', async (req, res, next) => {
  try {
    const admins = await Admin.findAll({
      attributes: ['firstname', 'lastname', 'email', 'createdAt', 'updatedAt'],
    });
    return res.json(admins);
  } catch(err) {
    return next(err);
  }
});

router.post('/book/create', async (req, res, next) => { //bookCreateValidator
  try {
    const body = req.body;
    const newBook = await Book.create(body);
    return res.status(201).json(newBook);
  } catch(err) {
    return next(err);
  }
});
module.exports = router;