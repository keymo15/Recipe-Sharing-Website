const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

//Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const ratingRoute = require("./routes/rating");
const categoryRoute = require("./routes/categories");


//build path
app.use(express.static(path.join(__dirname, '../client/build')));

// index file path
app.get('/', (req, res) => {res.status(200).sendFile(path.resolve(__dirname, '../client/build/index.html'))});



dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.static('public'))
app.use('/images', express.static("images"))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("Connected to mongoDB database"))
  .catch((err) => console.log(err));

app.listen("5000", () => {
  console.log(`Server has started on port 5000`);
});



//Routing
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);
app.use("/upload", uploadRoute);
app.use("/rating", ratingRoute);
