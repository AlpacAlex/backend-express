const router = require("express").Router();
const assist = require("../../assistant/assist");
const  { query, validationResult }  = require("express-validator");

const isValid = () => {
    return [
        query("page").exists().isInt({ min: 1 }).toInt().withMessage("no page specified"),
        query("orderBy").optional({ checkFalsy: true, nullable: true }).isString().withMessage("error me"),//custom( (value, {req}) => {console.log(value);}),
        // query("filterBy").optional({ checkFalsy: true, nullable: true }).isString().custom( (value, {req}) => {
        //     console.log(value);
        // }),
        //query("orderBy").exists().withMessage("not query order").isString().withMessage("not filter by"),
        
    ]
} 

const getTasks = async (req, res, next) => {
    const er = validationResult(req);
    if (er.isEmpty()) {
        let todos = await assist.read();
        const {page, orderBy, filterBy} = req.query;

        // if (typeof filterBy === "undefined") {
        //     filterBy = "done";
        // }

        //let currentData = [];
        todos = await assist.orderBy(orderBy, todos);
        todos = await assist.filterBy(filterBy, todos);

        // if(orderBy === "asc") {
        //     todos = await assist.orderBy(true, todos);
        // } else if (orderBy === "desc") {
        //     todos = await assist.orderBy(false, todos);
        // } else {
        //     console.log("unknown order");
        // } 
        // if (filterBy === "done") {
        //     todos = await assist.filterBy(true, todos);
        // } else if (filterBy === "undone") {
        //     todos = await assist.filterBy(false, todos);
        // } else {
        //     console.log("unknown filter");
        // }
        todos = assist.returnTasksOnPage(page, todos);

         

        res.status(200).json(todos);
    } else {
        const firstError = er.errors[0].msg;
        res.status(400).json({ errors: firstError });
    }
    
}

router.get("/", isValid(), getTasks);

module.exports = router;


