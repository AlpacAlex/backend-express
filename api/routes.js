//import DataBaseFile from "./database";
const router = require("express").Router();
// import function(controller)

// test 
const { DataBaseFile } = require("./database");
//import dbt from "./database";

router.get("/", (req, res) => {
    res.send("ger request !!!");
    const DBFile = new DataBaseFile();
    DBFile.read();
    DBFile.write("hello word");
    DBFile.write("--hello word--");
    DBFile.readAll();
});

module.exports = router;