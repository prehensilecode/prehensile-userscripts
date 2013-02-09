// ==UserScript==
// @name           FaceFlip
// @namespace      net.prehensileeye.faceflip
// @description    Flips FB images upside-down
// @include        http://www.facebook.com/*
// @author         David Chin <david@prehensileEye.net>
// @version        1.0
// @license        Public Domain
// ==/UserScript==
// Flips all images in Facebook upside down. That's it,
(function() {
    GM_addStyle('img {-webkit-transform:rotate(180deg); -moz-transform:rotate(180deg);}');
})();

