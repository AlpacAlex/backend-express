const { DataBaseFile } = require("../config/database");
const  { validationResult }  = require("express-validator");

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

function isValidError(req, next) {
    const er = validationResult(req);
    if(!er.isEmpty()) {
        next(er);
        return true;
    }
    return false;
}

module.exports = {read, write, update, remove, isValidError };
