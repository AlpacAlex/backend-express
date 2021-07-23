const router = require("express").Router();
const { DataBaseFile } = require("../../config/database");

const getTasks = async (req, res, next) => {
    const DBFile = new DataBaseFile();
    const todos = await DBFile.read();
    res.status(200).json(todos);
}

router.get("/", getTasks);

module.exports = router;


