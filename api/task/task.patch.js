const router = require("express").Router();
const assist = require("../../assistant/assist");
const  { body, validationResult, param }  = require("express-validator");


const isValid = () => {
    return [
        body("name").isLength({min: 2}).withMessage("task name must be greater than 1"),
        //body("test").exists().withMessage("test eror"),
        param("id").exists().withMessage({
            message: "ID not found",
            errorCode: 404
        }),
        param("uuid").exists().withMessage("uuid is empty"),
    ]
} 

const patchTask = async (req, res, next) => {
    const { id, uuid } = req.params;
    const {name, done} = req.body;
    const er = validationResult(req);
    if (er.isEmpty()) {
        const upTask = await assist.update(uuid, name, done);
        res.status(200).json(upTask);
    } else {
        const firstError = er.errors[0].msg;
        res.status(400).json({ errors: firstError });
    }
    
    
}

router.patch("/:id/:uuid", isValid(), patchTask);

module.exports = router;