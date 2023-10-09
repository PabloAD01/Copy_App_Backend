import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
const app = express();
import mongoose from "mongoose";
import morgan from "morgan";


const products = [
    {
      id: 1,
      description: 'Product 1',
      price: '$10.000',
      uploaded: '2023-10-07',
      location: 'Santiago, Chile',
      like: false,
    },
    {
      id: 2,
      description: 'Product 2',
      price: '$20.000',
      uploaded: '2023-10-07',
      location: 'Valparaíso, Chile',
      like: false,
    },
    {
      id: 3,
      description: 'Product 3',
      price: '$30.000',
      uploaded: '2023-10-07',
      location: 'Concepción, Chile',
      like: false,
    },
    {
      id: 4,
      description: 'Product 4',
      price: '$40.000',
      uploaded: '2023-10-07',
      location: 'Antofagasta, Chile',
      like: false,
    },
    {
      id: 5,
      description: 'Product 5',
      price: '$50.000',
      uploaded: '2023-10-07',
      location: 'Arica, Chile',
      like: false,
    },
    {
      id: 6,
      description: 'Product 6',
      price: '$60.000',
      uploaded: '2023-10-07',
      location: 'Iquique, Chile',
      like: false,
    },
    {
      id: 7,
      description: 'Product 7',
      price: '$70.000',
      uploaded: '2023-10-07',
      location: 'Punta Arenas, Chile',
      like: false,
    },
    {
      id: 8,
      description: 'Product 8',
      price: '$80.000',
      uploaded: '2023-10-08',
      location: 'La Serena, Chile',
      like: false,
    },
    {
      id: 9,
      description: 'Product 9',
      price: '$90.000',
      uploaded: '2023-10-08',
      location: 'Temuco, Chile',
      like: false,
    },
    {
      id: 10,
      description: 'Product 10',
      price: '$100.000',
      uploaded: '2023-10-08',
      location: 'Rancagua, Chile',
      like: false,
    },
  ];


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
;
})


app.get("/api/v1/users", (req, res) => {
    res.status(200).json({msg: "Users"});
});
app.get("/api/v1/auth", (req, res) => {
    res.send("Authentication");
});

app.get("/api/v1/products", (req, res) => {
    res.status(200).json({msg: "Products", data: products});
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