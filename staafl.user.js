// ==UserScript==
// @name         staafl
// @namespace    http://staafl.trustingwolves.com/
// @version      0.1
// @description  try to take over the world!
// @author       staafl
// @match        http*://*/*
// @grant        none
// @download     https://github.com/staafl/github-misc/raw/master/staafl.user.js
// ==/UserScript==

/* jshint esversion: 6, multistr: true */
(function() {
    "use strict";

    const { cssUg, cssWhite, cssBlack } = getCss();

    let filters =
        [
            {
                // wikipedia
                patterns: [/wikipedia/],
                todos: [invertImages, addStyle("i { color: #ccc !important }")],
                stop: false
            },
            {
                // UG
                patterns: [/ultimate-guitar.com\/tab.*official/],
                todos: [addStyle(cssUg)]
            },
            {
                // white
                patterns: [/docs[.]glue42/],
                todos: [addStyle(cssWhite)]
            },
            {
                // black
                patterns: [/ultimate-guitar.com\/tab/],
                todos: [addStyle(cssBlack)]
            }
        ];

    for (let filter of filters) {
        let matched = false;
        for (let pattern of filter.patterns) {
            if (pattern.test(location.href)) {
                matched = true;
                for (let todo of filter.todos) {
                    todo();
                }
                break;
            }
        }
        if (matched && filter.stop) {
            break;
        }
    }

    function addStyle(style) {
        return function() {
            let sheet = document.createElement("style");
            sheet.innerHTML = style;
            document.body.appendChild(sheet);
        };
    }

    function invertImages() {
         let images = document.querySelectorAll("img");
         for (let image of images) {
            image.style.filter = "invert(0%)";
        }
    }

    function getCss()
    {
       let cssUg = " \
           body, .jg5ks, ._1eAgg \
           { \
               background: black !important; \
           } \
\
           #canvas > div \
           { \
               z-index: -1 !important; \
               background: black !important; \
           } \
\
           #canvas > canvas:nth-child(2) \
           { \
               filter: invert(100%); \
           } \
\
           section, aside \
           { \
               background: black !important; \
               color: white !important; \
           }";

        let cssWhite = " \
            * \
            { \
                color: #333333 !important; \
                background: white !important; \
            } \
\
            .ace_marker-layer, .ace_cursor-layer \
            { \
                visibility: hidden !important; \
            }";

        let cssBlack = " \
            * \
            { \
                color: #cccccc !important; background: black !important; \
            } \
\
            .ace_marker-layer, .ace_cursor-layer \
            { \
                visibility: hidden !important; \
            }";

        return { cssUg, cssWhite, cssBlack };
    }

    // 2018-07-07-12-07-36
})();