import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express';
import carModel from './models/car_model.js';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;


app.post("/car/add", (req, res) => {
  console.log(req.body);
  
  const newCar = new carModel({
    name:req.body.name,
    image_url: req.body.image_url,
    price: req.body.price
      
    });
    newCar.save();
    res.send("Saved successfuly ✅");
    

})

app.get("/cars",async (req, res)  => {
   
  let results = await carModel.find()
    //.limit(50)
   // .toArray();
    console.log(results);

  res.send(results).status(200);
})



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("✅ DB Connected")
    app.listen(PORT, () => { 
        console.log("✅ Server runing")
    });
});


