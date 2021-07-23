const router = require("express").Router();
const assist = require("../../assistant/assist");

const patchTask = async (req, res, next) => {
    const { id, uuid } = req.params;
    if (!req.body)
        return res.status(400);
    //const {} 
    const {name, done} = req.body;
    
    const upTask = await assist.update(uuid, name, done);
    res.status(200).json(upTask);
}

router.patch("/:id/:uuid", patchTask);

module.exports = router;