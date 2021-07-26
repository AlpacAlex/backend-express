const { DataBaseFile } = require("../config/database");

async function read() {
    const DBFile = new DataBaseFile();
    return await DBFile.read();
}

async function write(message) {
    const DBFile = new DataBaseFile();
    return await DBFile.write(message);
}

async function update(uuid, newName, newDone) {
    const DBFile = new DataBaseFile();
    return await DBFile.update(uuid, newName, newDone);
}

async function remove(uuid) {
    const DBFile = new DataBaseFile();
    return await DBFile.delete(uuid);
}

// async function filterBy(flag, todos) {
//     //const filterArr = [...todos];
//     const alredyFilter = todos.filter( (todo) => todo.done === ((flag === "done") ? true : false));
//     return alredyFilter;
// }

// async function orderBy(flag, todos) {
//     //const orderArr = [...todos];
//     try {
//         const alredyOrder = [...todos];
//         //const d1 = Date.parse(a.createdAt) - Date.parse(b.createdAt);
//         //const d2 = Date.parse(b.createdAt) - Date.parse(a.createdAt);
//         alredyOrder.sort( (a, b) => {(
//                 ((flag === "asc") ? 
//                 (Date.parse(a.createdAt) - Date.parse(b.createdAt)) : 
//                 (Date.parse(b.createdAt) - Date.parse(a.createdAt)))
//             )}
//         );
//         // alredyOrder.sort( (flag === "asc") ?
//         //     (a, b) => {Date.parse(a.createdAt) - Date.parse(b.createdAt) ? 1 : -1} :
//         //     (a, b) => {Date.parse(b.createdAt) - Date.parse(a.createdAt) ? 1 : -1}
//         //     );
//         // alredyOrder.sort( (a, b) => {(flag ? 
//         // Date.parse(a.createdAt) - Date.parse(b.createdAt) : 
//         // Date.parse(b.createdAt) - Date.parse(a.createdAt))});
        
//         return alredyOrder;
//     } catch (e) {
//         console.log(e);
//     }
    
// }

// async function returnTasksOnPage(currentPage, todos) {
//     const LIMIT = 5;
//     const pageTodos = [...todos]
//     .slice(
//         (currentPage - 1) * LIMIT,
//         (currentPage - 1) * LIMIT + LIMIT
//       );
//     return pageTodos;
// }

module.exports = {read, write, update, remove };
