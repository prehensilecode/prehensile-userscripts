// ==UserScript==
// @name           FaceInvert
// @namespace      net.prehensileeye.faceinvert
// @description    Flips FB upside-down
// @include        https://www.facebook.com/*
// @author         David Chin <david@prehensileEye.net>
// @version        1.0
// @license        Public Domain
// ==/UserScript==
// Flips Facebook upside down. That's it,
(function() {
    GM_addStyle('body {transform:rotate(180deg); -ms-transform:rotate(180deg); -moz-transform:rotate(180deg); -webkit-transform:rotate(180deg); -o-transform:rotate(180deg);}');
})();

