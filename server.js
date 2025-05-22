import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import facultyRoutes from './FacultyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
  });

app.use('/api', facultyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
