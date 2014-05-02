var renderUrl, sendImgData, sendErrorData, args;
args = require('system').args;

renderUrl = function (callback) {
    var url,
        file,
        retrieve,
        next,
        page = require('webpage').create();

    // config options for rendering the page
    page.settings.javascriptEnabled = true;
    page.settings.loadImages = true;
    page.settings.resourceTimeout = args[9] * 1500;
    url = args[1];
    file = args[2] + args[3] + '.' + args[4];
    page.viewportSize = { width: args[5], height: args[6] };
    page.paperSize = { width: args[5], height: args[6] };
    page.settings.userName = args[7];
    page.settings.password = args[8];
    page.settings.userAgent = 'Project Aislyn Screenshot Bot';

    next = function (status, url, file) {
        page.close();
        callback(status, url, file);
    };

    retrieve = function () {
        page.open(url);
        page.onLoadFinished = function (status) {
            if (status === 'success') {
                return window.setTimeout(function () {
                    page.render(file);
                    return next(status, url, file);
                }, args[9] * 1000);
            } else {
                return next(status, url, file);
            }
        };
    };
    return retrieve();
};

// send image data back as json
sendImgData = function (imgData) {
    var imgDataObj = '{"' + args[3] + '": "' + imgData + '"}';
    return console.log(imgDataObj);
};

// send error data back as json
sendErrorData = function (status, url, file) {
    var errorDataObj = '{"status": "' + status + '" ,"url": "' + url + '", "file": "' + file + '"}';
    return console.log(errorDataObj);
};

renderUrl(function (status, url, file) {
    if (status !== 'success') {
        sendErrorData(status, url, file);
    } else {
        sendImgData(file);
    }
    return phantom.exit();
});
