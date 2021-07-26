const { json } = require("express");
const FileSystem = require("fs");// for work file system(txt,json)
const ospath = require("path");// defines work path
const { v4: uuidv4 } = require("uuid");
/*
{
    "uuid": uuid,
    "createdAt": Date.now(),
    "name": task,
    "done": completed
}
 */



class DataBaseFile {
    constructor(path = "", name = "todos.json") {
        path = path || ospath.resolve(__dirname, `../db/${name}`);
        this.path = path;
        if(this.createDB())
            console.log("database exist");
        else
            console.log("database NO exist");
    }
    async createDB() {
        try {
            if (FileSystem.existsSync(this.path)) {
                return true;
            } else {
                FileSystem.writeFileSync(this.path, "");
                return true;
            }
        } catch (error) {
            console.log(error, "  <--- error database");
            return false;
        }
    }
    async read() {   
        const tododb = FileSystem.readFileSync(this.path).toString();
        if (!tododb.length) 
            return new Array();
        else
            return JSON.parse(tododb); 
    }
    async write(message) {
        console.log("begin write...");
        if (message.length < 1)
            return false;// error 422
        const newItem = {
            uuid: uuidv4(),
            createdAt: new Date().toISOString(),
            name: message,
            done: false
        };
        console.log("data read...");
        const data = await this.read();
        
        const isRepit = data.some( (todo) => {
            return (todo.name === message);
        })
        if (!isRepit) {
            try {
                console.log("No repit message...");
                data.push(newItem);
                console.log("write in DataBase...");
                FileSystem.writeFileSync(this.path, JSON.stringify(data));
                return newItem;
            } catch (error) {
                console.log(error, "  <--- error wrie method");
            }
        } else {
            console.log("repit !!! message...");
            return false;//already write message
        }
        
    }
    async update(uuid, newName, newDone) {
        try {
            console.log("update...");
            console.log("data read...");
            const data = await this.read();
            console.log(data);
            const findIdElem = data.findIndex( todo => todo.uuid === uuid );
            console.log(findIdElem);
            data[findIdElem].name = newName;
            data[findIdElem].done = newDone;
            console.log(data);
            console.log("data rewrite(update)...");
            FileSystem.writeFileSync(this.path, JSON.stringify(data));
            return data[findIdElem];
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async delete(uuid) {
        try {
            console.log("update...");
            console.log("data read...");
            const data = await this.read();
            const findIdElem = data.findIndex( todo => todo.uuid === uuid );
            if (findIdElem == -1)
                return false;
            data.splice(findIdElem, 1);
            console.log("data rewrite(update)...");
            FileSystem.writeFileSync(this.path, JSON.stringify(data));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports =  { DataBaseFile };