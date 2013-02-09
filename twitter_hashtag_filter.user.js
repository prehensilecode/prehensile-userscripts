// ==UserScript==
// @name           Twitter hashtag filter
// @namespace      net.prehensileeye.twitter_hashtag_filter
// @description    Blocks posts by hashtag
// @version        0.1
// @include        http://twitter.com/
// @include        https://twitter.com/
// @author         David Chin <david@prehensileEye.net>
// @license        GPLv3
// ==/UserScript==
// Settings code from Rojo^ - http://sensiblefacial.googlepages.com/
(function (){
    function Config() {
        var unwantedHashtags = '';
        var option = ['unwantedHashtags', 'Hashtags to filter out', unwantedHashtags];
        
        this.showConfig = function() {
            var w = window.innerWidth;
            var h = window.innerHeight;
            var sl = document.body.scrollLeft;
            var st = document.body.scrollTop;
            var boxSt = document.createElement('span');
            boxSt.innerHTML = ['<style>'
                ,'#configBox { padding: 5px; white-space: nowrap; opacity: 1.0; z-index: 901; '
                ,'background-color: #eec; border: 2px outset; display: inline; position: absolute; '
                ,'line-height: 1.5em; font-size: 0.9em; color: black; }'
                ,'#configTitle { padding: 1px 5px; background-color: #038; color: #fff; font-weight: bold; line-height: 1em; }'
                ,'#overlay { width: '+ (w - 20) +'px; height: '+h+'px; background-color: #eee; opacity: 0.67; z-index: 900; '
                ,'position: absolute; left: '+sl+'px; top: '+st+'px; }</style>'].join('\n');
            document.body.insertBefore(boxSt, document.body.firstChild);
            var overlay = document.createElement('div');
            overlay.setAttribute('id','overlay');
            var box = document.createElement('div');
            box.setAttribute('id','configBox');
            box.className = 'nav_text';
            var boxTitle = document.createElement('div');
            boxTitle.setAttribute('id','configTitle');
            boxTitle.innerHTML = 'Twitter hashtag filter configuration';
            box.appendChild(boxTitle);
            var boxText = document.createElement('div');
            boxText.style.whiteSpace = 'normal';
            boxText.style.padding = '10px 0px';
            boxText.style.fontWeight = 'bold';
            boxText.innerHTML = 'Changes take effect on next page load.';
            box.appendChild(boxText);
            
            var tb = document.createElement('input');
            tb.maxLength = 256;
            tb.style.width = '90px';
            tb.style.display = 'inline';
            tb.style.marginRight = '8px';
            with (tb) {
                value = GM_getValue('unwantedHashtags', '');
            }
            var txt = document.createElement('span');
            txt.innerHTML = 'Unwanted hashtags';
            box.appendChild(tb);
            box.appendChild(txt);
            box.appendChild(document.createElement('br'));
            
            var Buttons = document.createElement('div');
            Buttons.style.textAlign = 'right';
            var OKbutton = document.createElement('button');
            var CANCELbutton = document.createElement('button');
            OKbutton.innerHTML = 'OK';
            CANCELbutton.innerHTML = 'CANCEL';
            Buttons.appendChild(OKbutton);
            Buttons.appendChild(CANCELbutton);
            box.appendChild(Buttons);
            document.body.appendChild(box);
            document.body.appendChild(overlay);
            
            // center dialog
            box.style.left = Math.floor(sl + (w / 2 - box.offsetWidth / 2)) + 'px';
            box.style.top = Math.floor(st + (h / 2 - box.offsetHeight / 2)) + 'px';
            
            OKbutton.addEventListener('click',function() {
                GM_setValue('unwantedHashtags', tb.value);
                location.reload();
                document.body.removeChild(overlay);
                document.body.removeChild(box);
                document.body.removeChild(boxSt);
            }, false);
            
            CANCELbutton.addEventListener('click',function() {
                document.body.removeChild(overlay);
                document.body.removeChild(box);
                document.body.removeChild(boxSt);
            },false);
        }
    };
    
    var settings = new Config();
    GM_registerMenuCommand('Twitter hashtag filter settings...', settings.showConfig);
    
    var unwantedHashtags = GM_getValue('unwantedHashtags', '').split(' ');
    var unwantedVias = GM_getValue('unwantedVias', '').split(',');
    
    var xp = '';
    var si = "/../../../parent::li";
    var sires = null;
    var i = 0;
    var j = 0;
    for (i = 0; i < unwantedHashtags.length; ++i) {
        xp = "//a[translate(@title, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = '" + unwantedHashtags[i].toLowerCase() + "']";
        sires = document.evaluate(xp + si, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (sires) {
            var nodes = new Array(sires.snapshotLength);
            for (j = 0; j < sires.snapshotLength; ++j) {
                nodes[j] = sires.snapshotItem(j);
            }

            var el = null;
            for (j = 0; j < nodes.length; ++j) {
                nodes[j].style.display = 'none';
            }
        }
    }
    unwantedVias = ['twitter for iphone'];
    si = "/../../parent::li";
    var vires = null;
    xp = "//span[@class='meta entry-meta']/span[1]/a";
    vires = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    sires = document.evaluate(xp + si, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    GM_log('FOO: vires = ' + vires);
    GM_log('FOO: vires.text = ' + vires.text);
    GM_log('FOO: vires.snapshotLength = ' + vires.snapshotLength);
    GM_log('FOO: sires.snapshotLength = ' + sires.snapshotLength);
    
    if (vires) {
        var nodes = [];
        var nfound = 0;
        for (j = 0; j < vires.snapshotLength; ++j) {
            GM_log('FOO: vires.snapshotItem(' + j + ') = ' + vires.snapshotItem(j));
            GM_log('FOO: vires.snapshotItem(' + j + ').text = ' + vires.snapshotItem(j).text);
            GM_log('FOO: sires.snapshotItem(' + j + ') = ' + sires.snapshotItem(j));
            GM_log('FOO: sires.snapshotItem(' + j + ').text = ' + sires.snapshotItem(j).text);
            
            for (i = 0; i < unwantedVias.length; ++i) {
                GM_log('ALOHA: a - ' + vires.snapshotItem(j).text.split('via')[0].toLowerCase());
                GM_log('ALOHA: b - ' + unwantedVias[i]);
                if (vires.snapshotItem(j).text.split('via')[0].toLowerCase() == unwantedVias[i]) {
                    GM_log('HEY: found 1; j = ' + j);
                    nodes[++nfound] = sires.snapshotItem(j);
                }
            }
        }
        
        GM_log('AAAAA: nodes.length = ' + nodes.length);
        for (j = 0; j < nodes.length; ++j) {
            GM_log('MAHALO: nodes[' + j + '] = ' + nodes[j]);
            //nodes[j].style.display = 'none';
        }
    }
    
    if (sires) {
        var nodes = new Array(sires.snapshotLength);
        for (j = 0; j < sires.snapshotLength; ++j) {
            GM_log('FOO: sires.snapshotItem(' + j + ') = ' + sires.snapshotItem(j));
            
            nodes[j] = sires.snapshotItem(j);
        }
        for (j = 0; j < nodes.length; ++j) {
            nodes[j].style.display = 'none';
        }
    }
}());