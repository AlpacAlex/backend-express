const router = require("express").Router();
const assist = require("../../assistant/assist");
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
    const er = validationResult(req);
    if (er.isEmpty()) {
        try {
            let todos = await assist.read();
            const {page, orderBy, filterBy} = req.query;
            if (typeof orderBy === "undefined") {
                orderBy = "asc";
            }
            todos.sort( (a, b) =>  { 
                return ( (orderBy === "asc") ? (Date.parse(a.createdAt) - Date.parse(b.createdAt)) : (Date.parse(b.createdAt) - Date.parse(a.createdAt)))  
            });
            todos = (typeof filterBy === "undefined") ? todos : todos.filter( (todo) => (todo.done === ((filterBy === "done") ? true : false)));
            todos = todos.slice(
                    (page - 1) * LIMIT,
                    (page - 1) * LIMIT + LIMIT
                );
            res.status(200).json(todos);
        } catch (e) {
            console.log(e);
            next(e);
        }
    } else {
        console.log(er);
        next(er);
    }   
}
 
router.get("/tasks/", isValid(), getTasks);
 
module.exports = router;