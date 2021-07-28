const { json } = require("express");
const FileSystem = require("fs").promises;// for work file system(txt,json)
const FileSys = require("fs");
const ospath = require("path");// defines work path
const { v4: uuidv4 } = require("uuid");


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
            if (FileSys.existsSync(this.path)) {
                return true;
            } else {
                FileSys.writeFileSync(this.path, "");
                return true;
            }
        } catch (error) {
            console.log(error, "  <--- error database");
            return false;
        }
    }
    async read() {  
        console.log("begin read..."); 
        const readFileAsync = () => {
            return new Promise( (resolve, reject) => {
                FileSys.readFile(this.path, "utf8", (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
        }

        const todoRaw = await readFileAsync();
        const tododb = JSON.parse(todoRaw);
        console.log("end read...");
        if (!tododb.length) 
            return new Array();
        else
            return tododb; 
    }
    async write(message) {
        console.log("begin write...");
        if (message.length < 1)
            throw "name must greater than 1";
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
                await FileSystem.writeFile(this.path, JSON.stringify(data));
                return newItem;
            } catch (error) {
                console.log(error, "  <--- error wrie method");
            }
        } else {
            console.log("repit !!! message...");
            throw "name repit, create uniq";
        }
        
    }
    async update(uuid, newName, newDone) {
        
        console.log("update...");
        console.log("data read...");
        const data = await this.read();
        const findIdElem = data.findIndex( todo => todo.uuid === uuid );
        if (findIdElem === -1) 
            throw "wrong ID";
        console.log(findIdElem);
        data[findIdElem].name = newName;
        data[findIdElem].done = newDone;
        console.log("data rewrite(update)...");
        try {
            await FileSystem.writeFile(this.path, JSON.stringify(data))
            return data[findIdElem];
        } catch (error) {
            console.log(error);
        }
    }
    async delete(uuid) {
        console.log("update...");
        console.log("data read...");
        const data = await this.read();
        const findIdElem = data.findIndex( todo => todo.uuid === uuid );
        if (findIdElem == -1)
            throw "wrong ID";
        data.splice(findIdElem, 1);
        console.log("data rewrite(update)...");
        try {
            await FileSystem.writeFile(this.path, JSON.stringify(data));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports =  { DataBaseFile };