// ==UserScript==
// @name		Steam_SChinese_Mark
// @namespace	https://github.com/desc70865/Steam_SChinese_Mark/
// @icon		https://keylol.com/favicon.ico
// @version		0.4
// @description	mark url contains appid which support chinese & card info
// @author		desc_inno, wsz987
// @match		https://keylol.com/*
// @resource 	chinese https://raw.githubusercontent.com/desc70865/Steam_SChinese_Mark/master/chinese.json
// @resource 	card https://bartervg.com/browse/cards/json/
// @updateURL   https://raw.githubusercontent.com/desc70865/Steam_SChinese_Mark/master/script.js
// @require		https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// @grant       GM_getResourceText
// ==/UserScript==

(async function() {
    'use strict';
    var card_json = JSON.parse(GM_getResourceText('card')),
	chinese_json = JSON.parse(GM_getResourceText('chinese'));
    search_appid(card_json, chinese_json);
    jQuery('body').on("click", "#threadindex > div > ul > li",()=>{
        $('.t_f').ready(()=>setTimeout(()=>{search_appid(card_json, chinese_json).then(unauto())},1000))
    });
})();

function search_appid(card_json, chinese_json){
    var color_card = "deeppink",
    color_foo = "darkviolet",
	color_language = "red", // #57BAE8
    fontWeight_new = "bolder"; // normal

	return new Promise(resolve => {
        var table = [];
		$('.steam-info-link').each(function(){
			var arr_href = $(this).context.pathname.split('/'),
                kind = arr_href[1],
                appid = arr_href[2];
            table.push($(this).context)
			if(kind != 'app'){
				if(kind == 'bundle'){
					$(this).context.text = "[Bundle]: "+ $(this).context.innerText;
                }
				else if(kind == 'sub'){
					$(this).context.text = "[Sub]: "+ $(this).context.innerText;
                }
				$(this).context.style.color = color_foo;
			}
			else if(card_json[appid] != undefined){
				$(this).context.text = "📇 " + $(this).context.innerText;
				$(this).context.style.color = color_card;
				$(this).context.style.fontWeight = fontWeight_new;
			}
			if(chinese_json[appid] != undefined){
				$(this).context.text = "🀄️ " + $(this).context.innerText;
				$(this).context.style.color = color_language;
				$(this).context.style.fontWeight = fontWeight_new;
            }
        })
        console.log(table.join('\n'))
    });
}

function unauto(){
    $('.plc div.authi>a[rel=nofollow]').eq(0).after(`<span class="pipe">|</span><a href="javascript:void(0);" id="unauto_tab">标记</a>`);
    $('#unauto_tab').click(()=>search_appid(card_json, chinese_json))
}
