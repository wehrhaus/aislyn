var express = require('express'),
    appData = require('../appData'),
    path = require('path'),
    router = express.Router(),
    cleansePostData, stripFSPath, addPostData, renderPage;

// ensures fallback data is sent to post
cleansePostData = function (fallback, data) {
    if (data !== '') {
        return data;
    } else {
        return fallback;
    }
};

// strip the filesystem path from passed object for rendering on page
stripFSPath = function (obj, replacePath) {
    var o;
    for (o in obj) {
        if (obj.hasOwnProperty(o)) {
            obj[o] = obj[o].replace(replacePath, '');
        }
    }
};

// add data from post to specified appData object
addPostData = function(stdout, req) {
    var obj = JSON.parse(stdout),
        postData = req.body, o;

    stripFSPath(obj, path.join(__dirname, '../public/'));

    appData.setPageData('results', 'imgData', obj);
    for (o in postData) {
        if (postData.hasOwnProperty(o)) {
            appData.setPageData('results', o, postData[o]);
        }
    }
    console.log(appData.getPageData('results'));
    return appData.getPageData('results');
};

// sends page information to be redered
renderPage = function(res, err, html, forceError) {
    if (err && !forceError) {
        res.render('error', {
            message: appData.getPageData('error').message,
            err: err,
            retry: appData.getPageData('error').retry
        });
    } else if (err && forceError) {
        res.render('error', {
            message: appData.getPageData('error')[forceError],
            err: err,
            retry: appData.getPageData('error').retry
        });
    } else {
        res.send(html);
    }
};

// basic logging on each request
router.use(function (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

// redirect to /home from /
router.get('/', function (req,res, next) {
    res.redirect('/home');
});

// render home
router.get('/home', function (req, res, next) {
    res.render('index', appData.getPageData('home'), function (err, html) {
        renderPage(res, err, html);
    });

});

// render results
router.post('/results', function (req, res, next) {

    // configs for posting data to phantomjs
    var execFile = require('child_process').execFile,
        cs = require('../bin/clearScreenshotDirectory'),
        child,
        phantomjs = path.join(__dirname, '../bin/phantomjs'),
        renderUrl = path.join(__dirname, '../bin/renderUrl.js'),
        url = req.body.url, // phantomjs arg 1
        staticPath = path.join(__dirname, '../public/images/screenshots/'), // phantomjs arg 2
        imageName = req.body.imageName, // phantomjs arg 3
        outputType = req.body.outputType, // phantomjs arg 4
        vpWidth = cleansePostData(1024, req.body.vpWidth), // phantomjs arg 5
        vpHeight = cleansePostData(768, req.body.vpHeight), // phantomjs arg 6
        username = cleansePostData('username', req.body.username), // phantomjs arg 7
        password = cleansePostData('password', req.body.password), // phantomjs arg 8
        renderDelay = cleansePostData(10, req.body.renderDelay), // phantomjs arg 9
        urlApprove = function () {
            if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
                return 'http://' + url;
            }
            return url;
        },
        nameCleanse = imageName.replace(/[^\w]/gi, '');

    // console.log('clearing directory');
    cs.clearScreenshots(staticPath);

    console.log('Sending Data to PhantomJS: ', urlApprove(), staticPath, nameCleanse, outputType, vpWidth, vpHeight, username, password, renderDelay);

    // execute child process running phantomjs
    child = execFile(phantomjs, [renderUrl, urlApprove(), staticPath, nameCleanse, outputType, vpWidth, vpHeight, username, password, renderDelay], function (error, stdout, stderr) {
        if (stdout !== null) {
            var results = JSON.parse(stdout);
            if (results.status === 'fail') {
                renderPage(res, url, '', 'phantomjsLoadError');
            }
            res.render('results', addPostData(stdout, req), function (err, html) {
                renderPage(res, err, html);
            });
        } else {
            renderPage(res, error, '', true);
        }
    });


    process.on('uncaughtException', function(err) {
        // handle the error safely
        console.log('uncaughtException');
        console.log(err);

        res.render('error', {
            message: appData.getPageData('error').phantomjsLoadError,
            suggestions: appData.getPageData('error').phantomjsSuggestions,
            retry: appData.getPageData('error').retry
        });

    });

});

module.exports = router;
