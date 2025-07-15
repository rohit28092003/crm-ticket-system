const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  // frontend origin
  credentials: true                // if using cookies
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// After middleware
app.use('/api/auth', authRoutes);

// Add below existing app.use(...)
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
