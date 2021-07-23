const path = require("path");// defines work path
const klawSync = require('klaw-sync');

async function initMainRouter() {
    const paths = klawSync(`${__dirname}/../api`, {nodir: true});
    let controllersCount = 0;
    paths.forEach((file) => {
        if (path.basename(file.path)[0] === '_' || path.basename(file.path)[0] === '.') return;
        app.use('/', require(file.path));
        controllersCount++;
    });

    console.info(`Total controllers: ${controllersCount}`);
};

module.exports = { initMainRouter };