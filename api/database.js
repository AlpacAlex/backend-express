const FileSystem = require("fs");// for work file system(txt,json)
const path = require("path");// defines work path

class DataBaseFile {
    constructor(path = "", name = "todos.json") {
        path = path || path.resolve(__dirname, `../db/${name}`);
        this.path = path;
    }
    async createDB() {
        try {
            if (FileSystem.existsSync(path)) {
                return true;
            } else {
                FileSystem.writeFileSync(path);
                return true;
            }
        } catch (error) {
            console.log(error, "  <--- error database");
            return false;
        }
    }
    async readAll() {
        if (this.createDB()) {
            
        }
    }
}