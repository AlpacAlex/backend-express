const express = require('express');
const { initMainRouter } = require("./config/root-routes");
const {handleError} = require("./assistant/ApiError");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors);
app.use(express.json());

initMainRouter(app);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Example app listening at port ${PORT}`)
})