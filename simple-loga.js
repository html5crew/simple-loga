/* jshint browser: true, node: true */

;(function (exports) {
    'use strict';


    var logLevel = INFO;
    function setLogLevel(level) {
        logLevel = getLevelNumber(level);
    }

    var EMERGENCY = 0,
        ALERT = 1,
        CRITICAL = 2,
        ERROR = 3,
        WARNNING = 4,
        NOTICE = 5,
        INFO = 6,
        DEBUG = 7;
    var levelList = {
        "emergency": EMERGENCY,
        "alert": ALERT,
        "critical": CRITICAL,
        "error": ERROR,
        "warnning": WARNNING,
        "notice": NOTICE,
        "info": INFO,
        "debug": DEBUG
    };
    function getLevelNumber(level) {
        var levelNum = levelList[level];
        if (!levelNum) {
            throw new Error('Not Found level!!');
        }

        return levelNum;
    }
    function log(level, log) {
        var levelNum;
        if (typeof level !== 'string') {
            throw new TypeError('Invalid level, level is not string');
        }
        
        if (arguments.length === 1) {
            log = level;
            levelNum = DEBUG;
        } else if (typeof log === 'string') {
            levelNum = getLevelNumber(level);
        } else {
            throw new TypeError('Invalid log, log is not string');
        }

        if (logLevel < levelNum) {
            return;
        }

        var date = new Date();
        if (levelNum < INFO) {
            console.error(log);
        } else {
            console.log(log);
        }  
    }
    

    exports = {
        log: log,       
        setLogLevel: setLogLevel,
        emergency: function(log) {
            log("emergency", log);
        },
        alert: function(log) {
            log("alert", log);
        },
        critical: function(log) {
            log("critical", log);
        },
        error: function(log) {
            log("error", log);
        },
        warnning: function(log) {
            log("warnning", log);
        },
        notice: function(log) {
            log("notice", log);
        },
        info: function(log) {
            log("info", log);
        },
        debug: function(log) {
            log("debug", log);
        }
    };

}((function (){
    // Make userAgent a Node module, if possible.
    if (typeof exports === 'object') {
        return exports;
    } else if (typeof window === 'object') {
        window.loga = (typeof window.loga === 'undefined') ? {} : window.loga;
        return window.loga;
    }
})()));