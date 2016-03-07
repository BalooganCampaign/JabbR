var Emoji = {};

(function () {
    "use strict";
    
var validEmoji = { "nyan": true,"3": true,"catstare":true,"smooth":true,"eyepop":true,"v":true, "whitewater":true,"ese":true,"what":true };
 var validAlias = { };
    Emoji.getIcons = function() {
        var icons = [];
        for (var key in validEmoji) {
            if (validEmoji.hasOwnProperty(key)) {
                icons.push(key + ':');
            }
        }
        return icons;
    };
    
    Emoji.Parser = function () {
        this.parse = function (content) {
            return parseEmoji(content);
        };

        this.transformToHtml = transformToHtml;

        function parseEmoji(content) {
            for (var key in validAlias) {
                if (validAlias.hasOwnProperty(key)) {
                    var regex = new RegExp(key, "g");
                    content = content.replace(regex, '\u200B' + validAlias[key] + '\u200B');
                }
            }
            
            return content;
        }

        function transformToHtml(content) {
            return content.replace(/:([a-z0-9\+\-_]+):/g, emojiReplacer);
        }

        function emojiReplacer(str, match) {
    		if (validEmoji[match]) {
			
return '<img src="Content/images/emojis/' + match + '.gif" alt="' + match+'" title="' + match + '"/>';
                var css = match;
                if (css === '+1') {
                    css = 'plus1';    // +1 not valid CSS class
                }
                return '<span class="emoji20 emoji20-' + css + '" alt="' + match + '" title="' + match + '" />';
            } else {
                return ':' + match + ':';
            }
        }
    };
})();
