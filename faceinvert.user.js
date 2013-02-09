// ==UserScript==
// @name           FaceInvert
// @namespace      net.prehensileeye.faceinvert
// @description    Flips FB upside-down
// @include        http://www.facebook.com/*
// @author         David Chin <david@prehensileEye.net>
// @version        1.0
// @license        Public Domain
// ==/UserScript==
// Flips Facebook upside down. That's it,
(function() {
    GM_addStyle('body {-webkit-transform:rotate(180deg); -moz-transform:rotate(180deg);}');
})();

