var appData = {
    meta: {
        title: 'Aislyn',
        description: 'Given a URL -> return the url as a screenshot via png. Image dimensions will be based off Viewport Width/Height specified in form.'
    },
    page: {
        error: {
            meta: {
                title: 'Error | Aislyn'
            },
            pageData: {
                message: 'Temporary Error',
                phantomjsLoadError: 'There was an error accessing the url provided.',
                phantomjsSuggestions: 'Try hitting the url directly to ensure the page loads, if it redirects to a new page use that url instead.',
                retry: 'Try Again'
            }
        },
        home: {
            meta: {
                title: 'Home | Aislyn'
            },
            pageData: {
                header: 'Aislyn',
                url: 'Site URL',
                urlPlaceholder: 'http://www.example.com',
                imageName: 'Image Name',
                imageNamePlaceholder: 'exampleScreenshot',
                options: 'Optional Settings',
                outputMessage: 'Output as',
                outputTypePng: '.png',
                outputTypePdf: '.pdf (unavailable at this time)',
                vpWidth: 'Viewport Width (defaults to 1024)',
                vpWidthPlaceholder: 'width in px',
                vpHeight: 'Viewport Height (defaults to 768)',
                vpHeightPlaceholder: 'height in px',
                renderDelay: 'Page Load Time (defaults to 10)',
                renderDelayPlaceholder: 'delay in seconds',
                username: 'Site Username',
                usernamePlaceholder: 'username',
                password: 'Site Password',
                passwordPlaceholder: 'password',
                submit: 'Submit',
                progressCaption: 'Progress',
                progressComplete: '% Complete'
            }
        },
        results: {
            meta: {
                title: 'Results | Aislyn'
            },
            pageData: {
                header: 'Aislyn',
                instructions: 'Download to view full size. Images are removed on a regular basis.',
                returnHome: 'Run Again'
            }
        }
    }
};

// return meta item
exports.getMeta = function (content) {
    return appData.meta[content];
};

// return page specific meta if it exists
// otherwise return base meta data
exports.getPageMeta = function (page, content) {
    if (appData.page[page].meta[content]) {
        return appData.page[page].meta[content];
    } else {
        return this.getMeta(content);
    }
};

// set additional page properties
exports.setPageData = function (page, key, value) {
    appData.page[page].pageData[key] = value;
    return this;
};

// return all page data
exports.getPageData = function (page) {
    this.setPageData(page, 'title', this.getPageMeta(page, 'title'));
    this.setPageData(page, 'description', this.getPageMeta(page, 'description'));
    return appData.page[page].pageData;
};

