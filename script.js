// ==UserScript==
// @name		Steam_SChinese_Mark
// @namespace		https://github.com/desc70865/Steam_SChinese_Mark/
// @icon		https://keylol.com/favicon.ico
// @version		0.1
// @description		mark url contains appid which support schinese
// @author		desc_inno
// @match		https://keylol.com/*
// @require		https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// ==/UserScript==

(async function(){
	'use strict';
	var json = # ~
	replace_style(json)
})();

function replace_style(json){
	var color_new = "Red",
	fontWeight_new = "bolder";
	return new Promise(resolve => {
		$('.steam-info-link').each(function(){
			var arr_href = $(this).context.pathname.split('/')
			if(json.hasOwnProperty(arr_href[2]) == true){
				$(this).context.text = "{CN}" + $(this).context.innerText;
				$(this).context.style.color = color_new;
				$(this).context.style.fontWeight = fontWeight_new;
			}
		})
	});
}
