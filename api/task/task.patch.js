const router = require("express").Router();
const assist = require("../../assistant/assist");
const  { body, validationResult, param }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");


const isValid = () => {
    return [
        body("name").isLength({min: 2}).withMessage("task name must be greater than 1"),
        param("id").exists().withMessage("ID not found"),
        param("uuid").exists().withMessage("uuid is empty"),
    ]
} 

const patchTask = async (req, res, next) => {
    const { uuid } = req.params;
    const {name, done} = req.body;
    const er = validationResult(req);
    if (er.isEmpty()) {
        try {
            const upTask = await assist.update(uuid, name, done);
            res.status(200).json(upTask);
        } catch (e) {
            next(BaseError.UnprocessableEntity(e));
        }
    } else {
        next(er);
    }
}

router.patch("/task/:id/:uuid", isValid(), patchTask);

module.exports = router;