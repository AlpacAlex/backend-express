const router = require("express").Router();
const assist = require("../../assistant/assist");

const deleteTask = async (req, res, next) => {
    const { id, uuid } = req.params;

    await assist.remove(uuid);
    res.sendStatus(204);
}

router.delete("/:id/:uuid", deleteTask);

module.exports = router;