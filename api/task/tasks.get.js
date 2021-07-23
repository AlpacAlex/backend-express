//import DataBaseFile from "./database";
const router = require("express").Router();
// import function(controller)

// test 
const { DataBaseFile } = require("../../config/database");
//import dbt from "./database";
const getTasks = async (req, res, next) => {
    const DBFile = new DataBaseFile();
    const todos = await DBFile.read();
    res.status(200).json(todos);
}

router.get("/", getTasks);

module.exports = router;


