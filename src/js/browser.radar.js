/*!@license
 * Browser Radar
 * Copyright © 2012-2021 Brian Matthews (brian@slapthink.net)
 * Licensed under MIT License
 */
var browserRadar = (function () {
    var options, data;

    function init(obj) {
        options = obj || {};
        var parser = new UAParser();
        var ua = getQueryParam("ua"); //get a url param for a passed user agent

        //handle user agents set in url
        if (ua) {
            parser.setUA(decodeURIComponent(ua));
        }
        var uaData = parser.getResult();
        data = uaData;
        
        if (options.render){
            options.render(uaData)
        }else{
            render(uaData);
        }

        if (options.logData) {
            console.log(data);
        }
    }
    function getData() {
        return data;
    }
    function render(data) {
        var elements = document.querySelectorAll("[data-br-key]"),
            shareLink = document.querySelector("[data-br-share-link]"),
            copyButton = document.querySelector("[data-br-copy-button]");
            

        var ua = encodeURIComponent(data.ua);
        var url = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + location.pathname + (location.search ? location.search + "&ua=" + ua : "?ua=" + ua) + location.hash;

        elements.forEach(function (el) {
            if (!el.dataset.brKey) {
                console.error(el, 'no browser.radar data key br-data-key="xxx"');
                return;
            }
            var v = getPropertyByStringKey(data, el.dataset.brKey);
            if (v) {
                el.innerHTML = v;
            }
        });
        if (shareLink) {
            shareLink.value = url;
        }
        if (copyButton && shareLink) {
            
            copyButton.addEventListener("click", function () {
                var copyButtonMessage = document.querySelector("[data-br-copy-button-message]");
                shareLink.select();
                document.execCommand("copy");

                if (copyButtonMessage) {
                    copyButtonMessage.innerText = "Copied to clipboard!";
                }
            });
        }
    }

    function getQueryParam(name) {
        var r = /[?&]([^=#]+)=([^&#]*)/g,
            p = {},
            match;
        while ((match = r.exec(window.location))) p[match[1]] = match[2];
        return p[name];
    }

    function getPropertyByStringKey(obj, stringKey) {
            stringKey = stringKey.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
            stringKey = stringKey.replace(/^\./, ""); // strip a leading dot
            var keys = stringKey.split(".");
            for (var i = 0, n = keys.length; i < n; ++i) {
                var k = keys[i];
                if (k in obj) {
                    obj = obj[k];
                } else {
                    return;
                }
            }
            return obj;
    }

    return {
        init: init,
        getData: getData
    };
})();
