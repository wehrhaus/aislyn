var Aislyn = function () {

    var _this = this, getRenderDelay, iterateProgress;

    // set render delay based on form value (default to 10 seconds)
    // assumes iterateProgress.progressInterval is running every 500ms
    getRenderDelay = function () {
        var rdVal = $('#renderDelay').val();
        if (rdVal !== '') {
            return (100 / parseInt(rdVal, 10)) / 2;
        }
        return 5;
    };

    // run interval for progress bar
    iterateProgress = function () {
        var renderDelay = Math.round(getRenderDelay()),
            progressInterval,
            iterator = 0;

        console.log('renderDelay: ', renderDelay);

        progressInterval = setInterval(function () {
            iterator = iterator + renderDelay;
            if (iterator <= 100) {
                return _this.updateProgressStatus(iterator);
            } else {
                return clearInterval(progressInterval);
            }
        }, 500);
    };

    // updates progressBar percentages
    this.updateProgressStatus = function (val) {
        var $progressIndicator = $('.progress'),
            $progressBar = $progressIndicator.find('.progress-bar'),
            $progressComplete = $progressIndicator.find('.progressComplete').find('.percentage');

        $progressBar.css('width', val + '%');
        $progressBar.attr('aria-valuenow', val);
        $progressComplete.text(val);

        return _this;
    };

    this.progressFeedback = function () {
        var $progressModule = $('.progressModule');
        $('.submit').addClass('hidden');
        $progressModule.removeClass('hidden').addClass('visible');
        iterateProgress();
        return _this;
    };

    this.listenForSubmit = function (useButton) {
        console.log('hello');
        var $form = $('.aislyn');
        if (useButton) {
            $('.submit').on('click', function () {
                _this.progressFeedback();
            });
        }
        $form.on('submit', function (evt) {
            _this.progressFeedback();
        });

        return _this;
    };

};

$(document).ready(function () {
    console.log('doc Ready');
    var aislyn = new Aislyn();
    aislyn.listenForSubmit();
});
