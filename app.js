const express = require('express');
const { initMainRouter } = require("./config/root-routes");
const {handleError} = require("./assistant/ApiError");
const cors =require("cors");
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors);
app.use(express.json());

initMainRouter(app);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})