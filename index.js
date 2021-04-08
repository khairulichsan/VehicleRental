require("dotenv").config();
const bodyParser = require('body-parser')


const express = require("express");
const cors = require("cors");
const router = require("./src/routes");
const app = express();

app.use('/uploads', express.static('assets'))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`vahicle Rental`);
});