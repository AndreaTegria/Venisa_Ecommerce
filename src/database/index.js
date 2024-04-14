import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://andreategria3:0318.Isa@cluster0.d5hbb01.mongodb.net/";

  mongoose
    .connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;
