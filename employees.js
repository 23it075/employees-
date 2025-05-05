const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for profile pic upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1234567890.jpg
  }
});
const upload = multer({ storage });

// List all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new employee
router.post('/', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    const employee = new Employee({ name, email, phone, type, profilePic });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee details by id
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update employee by id
router.put('/:id', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;
    const updateData = { name, email, phone, type };
    if (req.file) {
      updateData.profilePic = req.file.filename;
    }
    const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete employee by id
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search employees by name or email
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const employees = await Employee.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
