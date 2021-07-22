const express = require('express');
const { initMainRouter } = require("./config/root-routes");

const app = express();
const PORT = 3000;

app.use(express.json());
initMainRouter(app);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})