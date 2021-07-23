const router = require("express").Router();
const assist = require("../../assistant/assist");

const getTasks = async (req, res, next) => {
    const todos = await assist.read();
    res.status(200).json(todos);
}

router.get("/", getTasks);

module.exports = router;


