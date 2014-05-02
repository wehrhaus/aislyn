var fs = require('fs');

module.exports.clearScreenshots = function (screenshotDirectory) {
    var files = [];
    if (fs.existsSync(screenshotDirectory)) {
        files = fs.readdirSync(screenshotDirectory);
        files.forEach(function(file,index){
            var curPath = screenshotDirectory + '/' + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                this.clearScreenshots(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(screenshotDirectory);
    }
};
