import express from 'express';
import connectDB from './database/db.js';
import loginRoute from './routes/login.route.js';
import cors from 'cors';
import criminalRoute from './routes/criminal.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/jailer', loginRoute);
app.use('/api/criminal', criminalRoute);

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
})