const router = require("express").Router();
const assist = require("../../assistant/assist");
const  { validationResult, param }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");

const isValid = () => {
    return [
        param("id").exists().withMessage("ID not found"),
        param("uuid").exists().withMessage("uuid is empty"),
    ]
} 

const deleteTask = async (req, res, next) => {
    const { id, uuid } = req.params;
    try {
        const er = validationResult(req);
        if (er.isEmpty()) {
            try {
                await assist.remove(uuid);
                res.sendStatus(204);
            } catch (e) {
                next(BaseError.Error422(e));
            }    
        } else {
            throw er;
        }
    } catch (e) {
        next(BaseError.Error422(e.errors[0].msg));
    }
    
}

router.delete("/task/:id/:uuid", isValid(), deleteTask);

module.exports = router;