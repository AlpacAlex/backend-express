const router = require("express").Router();
const assist = require("../../assistant/assist");
const  { validationResult, param }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const {Todos}  = require("../../models");

const isValid = () => {
    return [
        param("id").exists().withMessage("ID not found"),
        param("uuid").exists().withMessage("uuid is empty"),
    ]
} 

const deleteTask = async (req, res, next) => {
    const { id, uuid } = req.params;
    const er = validationResult(req);
    if (er.isEmpty()) {
        try {
            await Todos.destroy({
                where: {
                    uuid: uuid
                }
            });
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }    
    } else {
        next(er);
    }
}

router.delete("/task/:id/:uuid", isValid(), deleteTask);

module.exports = router;