const router = require("express").Router();
//const assist = require("../../assistant/assist");
const {Todos}  = require("../../models");
const  { query, validationResult }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const LIMIT = 5;

const isValid = () => {
    return [
        query("page").exists().withMessage("no exist page in get reqest").isInt({ min: 1 }).toInt().withMessage("no page specified"),
        query("orderBy").default("asc"),
    ]
} 
 
const getTasks = async (req, res, next) => {
    try {
        const er = validationResult(req);
        if (er.isEmpty()) {
            try {
                const {page, orderBy, filterBy} = req.query;
                const chosenTodos = await Todos.findAndCountAll({
                    limit: LIMIT,
                    offset: (page - 1) * LIMIT,
                    order: [["createdAt", `${orderBy}`]],
                    //where: false
                })
                res.status(200).json(chosenTodos);
            } catch (e) {
                console.log(e);
                next(BaseError.Error400("myerror"));
            }
        } else {
            throw er;
        }
    } catch (e) {
        console.log(e);
        next(BaseError.Error422(e.errors[0].msg))
    }
    
}
 
router.get("/", isValid(), getTasks);
 
module.exports = router;