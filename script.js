// ==UserScript==
// @name		Steam_SChinese_Mark
// @namespace		https://github.com/desc70865/Steam_SChinese_Mark/
// @icon		https://keylol.com/favicon.ico
// @version		0.3.3
// @description		mark url contains appid which support chinese & card info
// @author		desc_inno, wsz987
// @match		https://keylol.com/*
// @require		https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// ==/UserScript==

(async function() {
    'use strict';
    var card_json=await get_cardinfo(),
	chinese_json = ~; // paste them here
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
        var table = []; // save links for print
		$('.steam-info-link').each(function(){
			var arr_href = $(this).context.pathname.split('/')
            table.push($(this).context)
			if(arr_href[1] != 'app'){
				if(arr_href[1] == 'bundle'){
					$(this).context.text = "[Bundle]: "+ $(this).context.innerText;
                }
				else if(arr_href[1] == 'sub'){
					$(this).context.text = "[Sub]: "+ $(this).context.innerText;
                }
				$(this).context.style.color = color_foo;
			}
			else if(card_json.hasOwnProperty(arr_href[2]) == true){
				$(this).context.text = "📇 " + $(this).context.innerText;
				$(this).context.style.color = color_card;
				$(this).context.style.fontWeight = fontWeight_new;
			}
			if(chinese_json.hasOwnProperty(arr_href[2]) == true){
				$(this).context.text = "🀄️ " + $(this).context.innerText;
				$(this).context.style.color = color_language;
				$(this).context.style.fontWeight = fontWeight_new;
            }
        })
        console.log(table.join('\n'))
    });
}

function get_cardinfo(){
    return new Promise(resolve => {
        var settings = {
            "url": "https://bartervg.com/browse/cards/json/",
            "method": "GET",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response) {
            resolve(response);
        });
    });
};

function unauto(){
    $('.plc div.authi>a[rel=nofollow]').eq(0).after(`<span class="pipe">|</span><a href="javascript:void(0);" id="unauto_tab">标记</a>`);
    $('#unauto_tab').click(()=>search_appid(card_json, chinese_json))
}
