const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Replace <your_college_id> with your actual college ID
const mongoURI = 'mongodb://localhost:27017/23it075';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

//const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');

//app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Serve profile pictures statically
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
