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

module.exports = {read, write, update, remove };
