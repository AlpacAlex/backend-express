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
        //createDB
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
        if (await this.createDB()) {
            const tododb = FileSystem.readFileSync(this.path).toString();
            console.log(tododb.split("\n"));
        } else {
            console.log("^^^ error DB ^^^");
        }
    }
    async write(message) {
        try {
            const newItem = {
                uuid: uuidv4(),
                createdAt: new Date().toISOString(),
                name: message,
                done: false
            };
        } catch (error) {
            console.log(error, "  <--- error json")
        }
        if (await this.createDB()) {
            //FileSystem.appendFileSync(this.path, message+"\n");
            const data = await this.read();
            const isRepit = data.find( (todo) => {
                if (todo.name === message) return false;
                return true;
            })
            if (isRepit) {

            } else {
                return false;
            }
        } else {
            console.log("^^^ error DB ^^^");
        }
    }
    async update(uuid, newS, complete) {
        
    }
}

module.exports =  { DataBaseFile };