const router = require("express").Router();
const assist = require("../../assistant/assist");

const postTask = async (req, res, next) => {
    const { id } = req.params;

    const message = req.body.name;
    const todo = await assist.write(message);
    res.status(200).json(todo);
}

router.post("/:id", postTask);

module.exports = router;