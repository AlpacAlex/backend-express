const router = require("express").Router();
const { DataBaseFile } = require("../../config/database");

const postTask = async (req, res, next) => {
    const { id } = req.params;

    const message = req.body.name;
    const DBFile = new DataBaseFile();
    const todos = await DBFile.write(message);
    res.status(200).json(todos);
}

router.post("/:id", postTask);

module.exports = router;