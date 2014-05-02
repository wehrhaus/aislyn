# Aislyn
Given a URL -> return the url as a screenshot via png.

## Options
* Page Load Time
    * Set higher values for pages that take a while to load
* Viewport Width/Height
    * Great for testing responsiveness of a site
* Username/Password
    * Use for protected sites

## Running Locally

### Get Source
    git clone git@github.com:wehrhaus/aislyn.git
    cd aislyn
    git remote add upstream git@github.com:wehrhaus/aislyn.git
    git fetch upstream

### Install Dependencies
    npm install

### Set correct phantomjs binary
    Includes a `darwin` binary and a `linux` binary. This can be configured by setting process.env.PHANTOM_JS_BIN. Defaul set to `linux` in /routes/router.js

### Start Server
    npm start

### Open in browser
    localhost:1337


## License
See LICENSE for details
