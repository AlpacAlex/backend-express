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

async function filterBy(flag) {
    const filterArr = await read();
    const alredyFilter = [...filterArr.filter( (todo) => todo.done === (flag ? true : false))];
    return alredyFilter;
}

async function orderBy(flag) {
    const orderArr = await read();
    const alredyOrder = [...orderArr];
    alredyOrder.sort( (a, b) => {
        flag ? Date.parse(a.createdAt) - Date.parse(b.createdAt) :
        Date.parse(b.createdAt) - Date.parse(a.createdAt)     
    })
    return alredyOrder;
}

module.exports = {read, write, update, remove};
