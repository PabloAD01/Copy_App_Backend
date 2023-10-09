import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
const app = express();
import mongoose from "mongoose";


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.get('/adbc', (req, res) => {
    res.send('Pepe!');
})

try {
   await mongoose.connect(process.env.MONGO_URL);
   app.listen(process.env.PORT, () => {
       console.log(`Connected to database, running on port ${process.env.PORT}`);
   })
    
} catch (error) {
    console.log(error);
  process.exit(1);
    
}