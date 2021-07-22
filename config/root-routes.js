const task = require("../api/routes");

const initMainRouter = (app) => {
    app.use("/", task);
}

module.exports = { initMainRouter };