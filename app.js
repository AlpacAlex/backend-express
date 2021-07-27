const express = require('express');
const { initMainRouter } = require("./config/root-routes");
const handleError = require("./assistant/ApiError");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});
initMainRouter(app);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})