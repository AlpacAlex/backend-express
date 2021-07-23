const router = require("express").Router();
const { DataBaseFile } = require("../../config/database");

const patchTask = async (req, res, next) => {
    const { id } = req.params;
    if (!req.body)
        return res.status(400);
    //const {} 

    const DBFile = new DataBaseFile();
    const todos = await DBFile.read();
    res.status(200).json(todos);
}

router.patch("/:id", patchTask);

module.exports = router;