const router = require("express").Router();
const assist = require("../../assistant/assist");
const  { body, validationResult }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");

const isValid = () => {
    return [
        body("name").isLength({min: 2}).withMessage("task name must be greater than 1"),
    ]
} 


const postTask = async (req, res, next) => {
    const er = validationResult(req);
    if (er.isEmpty()) {
        const message = req.body.name;
        try {
            const todo = await assist.write(message);
            res.status(200).json(todo);
        } catch (e) {
            next(BaseError.UnprocessableEntity(e));
        }
    } else {
        next(er);
    }
}
router.post("/task/:id", isValid(), postTask);

module.exports = router;