const router = require("express").Router();
const  { param }  = require("express-validator");
const {Todos}  = require("../../models");
const {isValidError} = require("../../assistant/assist");
const verifyToken = require("../../assistant/auth");

router.delete("/task/:uuid",
    verifyToken,
    param("uuid").exists().withMessage("uuid is empty"), 
    async (req, res, next) => {
        const { id, uuid } = req.params;
        if (isValidError(req, next))
            return;
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
    }
);

module.exports = router;