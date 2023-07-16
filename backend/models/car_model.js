import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: {
      require: true,
      type: String,
    },
    image_url: {
      require: true,
      type: String,
    },
    price: {
      require: true,
      type: Number,
    },
  },
  { collection: "cars" }
);

const carModel = mongoose.model("carModel", schema);
export default carModel;

//
