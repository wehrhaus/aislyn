# Aislyn
Given a URL -> return the url as a screenshot via png.

[demo](http://aislyn.justinwehrman.com/home)

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

## Screenshot Directory Management
This is a simple implementation which stores each screenshot to the filesystem in:

    /public/images/screenshots/

It is recommended to setup a cron job to run `clearScreenshotsDirectory` which will wipe out all *.png files from the __screenshots__ directory

* The following will run `clearScreenshotsDirectory` at 11:00am every day of every month, each weekday


        crontab -e
        00 23 * * * /Path/To/aislyn/bin/clearScreenshotsDirectory

* For more information visit [https://help.ubuntu.com/community/CronHowto](https://help.ubuntu.com/community/CronHowto)



## License
See LICENSE for details
