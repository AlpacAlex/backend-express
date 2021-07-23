const path = require("path");// defines work path
const klawSync = require('klaw-sync');

async function initMainRouter(app) {
    const paths = klawSync(`${__dirname}/../api`, {nodir: true});
    let controllersCount = 0;
    try {
        paths.forEach((file) => {
            if (path.basename(file.path)[0] === '_' || path.basename(file.path)[0] === '.') {
                return;
            }
            app.use('/', require(file.path));
            controllersCount++;
        });
    } catch (e) {
        console.log(e);
    }

    console.info(`Total controllers: ${controllersCount}`);
};

module.exports = { initMainRouter };