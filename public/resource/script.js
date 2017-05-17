/*
 * jQuery BlockUI; v20141123
 * http://jquery.malsup.com/block/
 * Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
 */
(function(){"use strict";function e(e){function o(o,i){var s,h,k=o==window,v=i&&void 0!==i.message?i.message:void 0;if(i=e.extend({},e.blockUI.defaults,i||{}),!i.ignoreIfBlocked||!e(o).data("blockUI.isBlocked")){if(i.overlayCSS=e.extend({},e.blockUI.defaults.overlayCSS,i.overlayCSS||{}),s=e.extend({},e.blockUI.defaults.css,i.css||{}),i.onOverlayClick&&(i.overlayCSS.cursor="pointer"),h=e.extend({},e.blockUI.defaults.themedCSS,i.themedCSS||{}),v=void 0===v?i.message:v,k&&b&&t(window,{fadeOut:0}),v&&"string"!=typeof v&&(v.parentNode||v.jquery)){var y=v.jquery?v[0]:v,m={};e(o).data("blockUI.history",m),m.el=y,m.parent=y.parentNode,m.display=y.style.display,m.position=y.style.position,m.parent&&m.parent.removeChild(y)}e(o).data("blockUI.onUnblock",i.onUnblock);var g,I,w,U,x=i.baseZ;g=r||i.forceIframe?e('<iframe class="blockUI" style="z-index:'+x++ +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+i.iframeSrc+'"></iframe>'):e('<div class="blockUI" style="display:none"></div>'),I=i.theme?e('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+x++ +';display:none"></div>'):e('<div class="blockUI blockOverlay" style="z-index:'+x++ +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'),i.theme&&k?(U='<div class="blockUI '+i.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(x+10)+';display:none;position:fixed">',i.title&&(U+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(i.title||"&nbsp;")+"</div>"),U+='<div class="ui-widget-content ui-dialog-content"></div>',U+="</div>"):i.theme?(U='<div class="blockUI '+i.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(x+10)+';display:none;position:absolute">',i.title&&(U+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(i.title||"&nbsp;")+"</div>"),U+='<div class="ui-widget-content ui-dialog-content"></div>',U+="</div>"):U=k?'<div class="blockUI '+i.blockMsgClass+' blockPage" style="z-index:'+(x+10)+';display:none;position:fixed"></div>':'<div class="blockUI '+i.blockMsgClass+' blockElement" style="z-index:'+(x+10)+';display:none;position:absolute"></div>',w=e(U),v&&(i.theme?(w.css(h),w.addClass("ui-widget-content")):w.css(s)),i.theme||I.css(i.overlayCSS),I.css("position",k?"fixed":"absolute"),(r||i.forceIframe)&&g.css("opacity",0);var C=[g,I,w],S=k?e("body"):e(o);e.each(C,function(){this.appendTo(S)}),i.theme&&i.draggable&&e.fn.draggable&&w.draggable({handle:".ui-dialog-titlebar",cancel:"li"});var O=f&&(!e.support.boxModel||e("object,embed",k?null:o).length>0);if(u||O){if(k&&i.allowBodyStretch&&e.support.boxModel&&e("html,body").css("height","100%"),(u||!e.support.boxModel)&&!k)var E=d(o,"borderTopWidth"),T=d(o,"borderLeftWidth"),M=E?"(0 - "+E+")":0,B=T?"(0 - "+T+")":0;e.each(C,function(e,o){var t=o[0].style;if(t.position="absolute",2>e)k?t.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:"+i.quirksmodeOffsetHack+') + "px"'):t.setExpression("height",'this.parentNode.offsetHeight + "px"'),k?t.setExpression("width",'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):t.setExpression("width",'this.parentNode.offsetWidth + "px"'),B&&t.setExpression("left",B),M&&t.setExpression("top",M);else if(i.centerY)k&&t.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),t.marginTop=0;else if(!i.centerY&&k){var n=i.css&&i.css.top?parseInt(i.css.top,10):0,s="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+n+') + "px"';t.setExpression("top",s)}})}if(v&&(i.theme?w.find(".ui-widget-content").append(v):w.append(v),(v.jquery||v.nodeType)&&e(v).show()),(r||i.forceIframe)&&i.showOverlay&&g.show(),i.fadeIn){var j=i.onBlock?i.onBlock:c,H=i.showOverlay&&!v?j:c,z=v?j:c;i.showOverlay&&I._fadeIn(i.fadeIn,H),v&&w._fadeIn(i.fadeIn,z)}else i.showOverlay&&I.show(),v&&w.show(),i.onBlock&&i.onBlock.bind(w)();if(n(1,o,i),k?(b=w[0],p=e(i.focusableElements,b),i.focusInput&&setTimeout(l,20)):a(w[0],i.centerX,i.centerY),i.timeout){var W=setTimeout(function(){k?e.unblockUI(i):e(o).unblock(i)},i.timeout);e(o).data("blockUI.timeout",W)}}}function t(o,t){var s,l=o==window,a=e(o),d=a.data("blockUI.history"),c=a.data("blockUI.timeout");c&&(clearTimeout(c),a.removeData("blockUI.timeout")),t=e.extend({},e.blockUI.defaults,t||{}),n(0,o,t),null===t.onUnblock&&(t.onUnblock=a.data("blockUI.onUnblock"),a.removeData("blockUI.onUnblock"));var r;r=l?e("body").children().filter(".blockUI").add("body > .blockUI"):a.find(">.blockUI"),t.cursorReset&&(r.length>1&&(r[1].style.cursor=t.cursorReset),r.length>2&&(r[2].style.cursor=t.cursorReset)),l&&(b=p=null),t.fadeOut?(s=r.length,r.stop().fadeOut(t.fadeOut,function(){0===--s&&i(r,d,t,o)})):i(r,d,t,o)}function i(o,t,i,n){var s=e(n);if(!s.data("blockUI.isBlocked")){o.each(function(){this.parentNode&&this.parentNode.removeChild(this)}),t&&t.el&&(t.el.style.display=t.display,t.el.style.position=t.position,t.el.style.cursor="default",t.parent&&t.parent.appendChild(t.el),s.removeData("blockUI.history")),s.data("blockUI.static")&&s.css("position","static"),"function"==typeof i.onUnblock&&i.onUnblock(n,i);var l=e(document.body),a=l.width(),d=l[0].style.width;l.width(a-1).width(a),l[0].style.width=d}}function n(o,t,i){var n=t==window,l=e(t);if((o||(!n||b)&&(n||l.data("blockUI.isBlocked")))&&(l.data("blockUI.isBlocked",o),n&&i.bindEvents&&(!o||i.showOverlay))){var a="mousedown mouseup keydown keypress keyup touchstart touchend touchmove";o?e(document).bind(a,i,s):e(document).unbind(a,s)}}function s(o){if("keydown"===o.type&&o.keyCode&&9==o.keyCode&&b&&o.data.constrainTabKey){var t=p,i=!o.shiftKey&&o.target===t[t.length-1],n=o.shiftKey&&o.target===t[0];if(i||n)return setTimeout(function(){l(n)},10),!1}var s=o.data,a=e(o.target);return a.hasClass("blockOverlay")&&s.onOverlayClick&&s.onOverlayClick(o),a.parents("div."+s.blockMsgClass).length>0?!0:0===a.parents().children().filter("div.blockUI").length}function l(e){if(p){var o=p[e===!0?p.length-1:0];o&&o.focus()}}function a(e,o,t){var i=e.parentNode,n=e.style,s=(i.offsetWidth-e.offsetWidth)/2-d(i,"borderLeftWidth"),l=(i.offsetHeight-e.offsetHeight)/2-d(i,"borderTopWidth");o&&(n.left=s>0?s+"px":"0"),t&&(n.top=l>0?l+"px":"0")}function d(o,t){return parseInt(e.css(o,t),10)||0}e.fn._fadeIn=e.fn.fadeIn;var c=e.noop||function(){},r=/MSIE/.test(navigator.userAgent),u=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent);document.documentMode||0;var f=e.isFunction(document.createElement("div").style.setExpression);e.blockUI=function(e){o(window,e)},e.unblockUI=function(e){t(window,e)},e.growlUI=function(o,t,i,n){var s=e('<div class="growlUI"></div>');o&&s.append("<h1>"+o+"</h1>"),t&&s.append("<h2>"+t+"</h2>"),void 0===i&&(i=3e3);var l=function(o){o=o||{},e.blockUI({message:s,fadeIn:o.fadeIn!==void 0?o.fadeIn:700,fadeOut:o.fadeOut!==void 0?o.fadeOut:1e3,timeout:o.timeout!==void 0?o.timeout:i,centerY:!1,showOverlay:!1,onUnblock:n,css:e.blockUI.defaults.growlCSS})};l(),s.css("opacity"),s.mouseover(function(){l({fadeIn:0,timeout:3e4});var o=e(".blockMsg");o.stop(),o.fadeTo(300,1)}).mouseout(function(){e(".blockMsg").fadeOut(1e3)})},e.fn.block=function(t){if(this[0]===window)return e.blockUI(t),this;var i=e.extend({},e.blockUI.defaults,t||{});return this.each(function(){var o=e(this);i.ignoreIfBlocked&&o.data("blockUI.isBlocked")||o.unblock({fadeOut:0})}),this.each(function(){"static"==e.css(this,"position")&&(this.style.position="relative",e(this).data("blockUI.static",!0)),this.style.zoom=1,o(this,t)})},e.fn.unblock=function(o){return this[0]===window?(e.unblockUI(o),this):this.each(function(){t(this,o)})},e.blockUI.version=2.7,e.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:!0,theme:!1,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:.6,cursor:"wait"},cursorReset:"default",growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:!1,baseZ:1e3,centerX:!0,centerY:!0,allowBodyStretch:!0,bindEvents:!0,constrainTabKey:!0,fadeIn:200,fadeOut:400,timeout:0,showOverlay:!0,focusInput:!0,focusableElements:":input:enabled:visible",onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:!1};var b=null,p=[]}"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],e):e(jQuery)})();

$(function(){
	var initDescription = function () {
		$('#screen_name_file').on('change', function() {
			var path = $(this).val();
			var VRegExp = new RegExp(/(\w|[-.])+$/);
			$('#screen_name').val(VRegExp.exec(path)[0]);
		});
		$("#menu-btn").click(function() {
			$('.panel').toggleClass('expand');
			$(this).toggleClass('active');
		});
		$("#search-btn").click(function() {
			$('.panel').toggleClass('showsearch');
			$(this).toggleClass('active');
		});
		$('.report_btn').on('click',{ className: '.report-block' }, toogleShowBlock);
		$('.share_btn').on('click',{ className: '.share-block' }, toogleShowBlock);
		$('.btn-open-send-com').on('click',{ className: '.comment-send' }, toogleShowBlock);
		$('.btn-open-coments').on('click',{ className: '.comments' }, toogleShowBlock);
	}
	var initAjaxReplaceThumbs = function () {
		$('.time-view.ajax > li > a').on('click', function() {
			var $this = $(this),
				blockId = $this.parents('.time-view').data('block'),
				sortBy = $this.data('sort'),
				url = "?mode=async&action=get_block&block_id=" + blockId + "&sort_by=" + sortBy;
			$.ajax({
				url: url,
				success: function(data) {
					if(data){
						var $btnMoreNew,
							$dataContainer = $('<div>').html(data),
							$result = $dataContainer.find('.thumb'),
							$conatainer =  $this.parents('.wrap-heading').next(),
							$btnMoreOld =  $conatainer.next();
						$conatainer.html($result);
						if($btnMoreOld.hasClass('btn-more')) {
							$btnMoreOld.attr('data-sort', sortBy);
							$btnMoreOld.data('sort', sortBy);
							$btnMoreOld.data('count-page', 2);
						} else {
							$btnMoreNew = $dataContainer.find('.btn-more');
							$btnMoreNew.attr('data-sort', sortBy);
							$conatainer.after($btnMoreNew);
						}
						$this.parents('.wrap-heading').find('li').removeClass('active');
						$this.parent().addClass('active');
					}
				}
			});

			$('.menu > li > a').removeClass('active');
			$(this).addClass('active');

			return false;
		});
	}
	var initFancybox = function() {$(".fancybox").fancybox();}
	var initSlider = function() {
		$('.models-slider-big').owlCarousel({
				loop: false,
				margin:10,
				nav: true,
				autoplay:false,
				smartSpeed: 1000,
				autoHeight: true,
				lazyLoad: true,
				responsiveClass:true,
				responsive:{
						0:{items:1}
				}
		}).on('changed.owl.carousel', function(event){
			selectSlide(event.item.index);
		});
		$('.models-slider-small').owlCarousel({
				loop: false,
				margin:5,
				nav: true,
				autoplay:false,
				smartSpeed: 1000,
				responsiveClass:true,
				responsive:{
						0:{items:2},
						600:{items:3},
						780:{items:4},
						900:{items:5},
						1000:{items:6}
				}
		});
		$('.nav-album').on('click', function(){
			var numSlide = $(this).data('album-item');
			var owl = $(".models-slider-big").data('owlCarousel');
			owl.to(numSlide);
			selectSlide(numSlide);
			return false;
		});
	}
	function selectSlide(numSlide) {
		var slides = $('.models-slider-small .mslider-item');
		slides.removeClass('active');
		slides.eq(numSlide).addClass('active');
	}
	var initSelect = function () {$(".select").select2({});}
	var initPlaylist = function () {
		//add to playlist
		$('.drop-playlists').on('click', '.add_to_playlist', function(){
			$(this).parent().addClass('already_added');
			$(this).attr('class', 'go_to_playlist');
			$(this).parent().find('.delete_from_playlist').show();
			var playlist_id = $(this).attr('data-playlist-id');
			var video_id = $('.video-id').attr('data-video-id');
			$.ajax({ url: '?mode=async&action=add_to_favourites&video_id=' + video_id + '&playlist_id=' + playlist_id});
			return false;
		});
		//remove from playlist
		$('.drop-playlists').on('click', '.delete_from_playlist', function(){
			$(this).parent().removeClass();
			$(this).parent().find('.go_to_playlist').attr('class', 'add_to_playlist');
			$(this).hide();
			var playlist_id = $(this).attr('data-playlist-id');
			var video_id = $('.video-id').attr('data-video-id');
			$.ajax({ url: '?mode=async&action=delete_from_favourites&video_id=' + video_id + '&playlist_id=' + playlist_id});
			return false;
		});
		if(window.location.href.indexOf('/playlist/') != -1) {
			//var video_url = $('.thumbs.playlist a').attr('data-playlist-item');
			//reloadPlayer(video_url);
		}
		$('.thumbs.playlist a').on('click', function() {
			//var video_url = $(this).attr('data-playlist-item');
			//$('.thumbs.playlist a').removeClass('active');
			//$(this).addClass('active');
			//reloadPlayer(video_url);
			//return false;
		});
	}
	var initPagination = function () {
		$('.main').on('click', '.btn-more', function(){
			var $this = $(this);
			var num_page_load = $this.data('count-page'),
				from = $this.data('from') ? $this.data('from') : 'from',
				total = $this.data('total'),
				itemClass = $this.data('item-class'),
				container = $this.data('container'),
				sort_by = $this.data('sort');
			var params = {
				mode: 'async',
				action: 'get_block',
				block_id: $this.data('id'),
				dir: $this.data('id-dir')
			};
			params[from] = num_page_load;
			if(sort_by) {
				params['sort_by'] = sort_by;
			}
			var str = $.param(params);
			var get_url = '?' + str;
			$.ajax({
				url:get_url,
				success:function(data){
					if(data){
						var result = $(data).find('.'+ itemClass);
						if(container) {
							$this.prev('.' + container).append(result);
						} else {
							$this.before(result);
						}
						$this.data('count-page', ++num_page_load);
						if( num_page_load > total){
							$this.remove();
						}
					}
				}
			});
			return false;
		});
	}
	function reloadPlayer(video_url) {
		$.ajax({
			url: video_url + '?mode=async&function=get_block&block_id=video_view_video_view',
			success:function(data) {
				var player = $(data).find('.video');
				$('.video').replaceWith(player);
			}
		});
	}
	var initSelectCategoriesModels = function () {
		//Categories and Models select popup
		$('body').on('click', '.wrap-categories a', function(){
			var $this = $(this);
			var thisValue = $this.data('value');
			$('input[id=category_' + thisValue + ']').removeAttr("checked");
			$this.remove();
			return false;
		});
		$('body').on('click', '.wrap-models a', function(){
			var $this = $(this);
			var thisValue = $this.data('value');
			$('input[id=model_' + thisValue + ']').removeAttr("checked");
			$this.remove();
			return false;
		});
		$('#wnd-select-category .confirm').on('click', function(){
			check_cat();
			$('.window, #modal').fadeOut(500, function() {
				$('.lock').removeClass('lock').css('paddingRight', 0);
			});
			return false;
		});
		$('#wnd-select-model .confirm').on('click', function(){
			check_mod();
			$('.window, #modal').fadeOut(500, function() {
				$('.lock').removeClass('lock').css('paddingRight', 0);
			});
			return false;
		});
	}
	function check_cat(){
		var cat_name;
		$('.wrap-categories a').remove();
		$("#wnd-select-category .items input:checkbox:checked").each(function(){
				cat_name = $(this).next('label').text();
				$(".wrap-categories").append('<a href="#" data-value=' + $(this).attr('value') + '>' + cat_name + '</a>');
		});
	}
	function check_mod(){
		var cat_name;
		$('.wrap-models a').remove();
		$("#wnd-select-model .items input:checkbox:checked").each(function(){
				cat_name = $(this).next('label').text();
				$(".wrap-models").append('<a href="#" data-value=' + $(this).attr('value') + '>' +cat_name + '</a>');
		});
	}
	var initWindows = function () {
		var div = $('<div>').css({
				position: "absolute",
				top: "0px",
				left: "0px",
				width: "100px",
				height: "100px",
				visibility: "hidden",
				overflow: "scroll"
		});
		$('body').eq(0).append(div);

		var widthScroll = div.get(0).offsetWidth - div.get(0).clientWidth;

		div.remove();

		//Windows
		$('.btn-crplay').click(function() {
				$('.window').hide();
				$('body').addClass('lock').css('paddingRight',widthScroll+'px');
				$('#modal').fadeIn(500);
				$('#wnd-create-playlist').fadeIn(800);
				return false;
		});
		$('.btn-adcat').click(function() {
				$('.window').hide();
				$('body').addClass('lock').css('paddingRight',widthScroll+'px');
				$('#modal').fadeIn(500);
				$('#wnd-select-category').fadeIn(800);
				return false;
		});
		$('.btn-admod').click(function() {
				$('.window').hide();
				$('body').addClass('lock').css('paddingRight',widthScroll+'px');
				$('#modal').fadeIn(500);
				$('#wnd-select-model').fadeIn(800);
				return false;
		});
			$("#modal, .close_window").click(function(event) {
					if (event.target.id == 'modal' || event.target.className == 'close_window') {
							$('.window, #modal').fadeOut(500, function() {
								$('.lock').removeClass('lock').css('paddingRight', 0);
							});
					}
			});
	}
	function toogleShowBlock(event) {
		$this = $(this);
		$this.toggleClass('active');
		if( $this.hasClass('active')) {
			$(event.data.className).slideDown();
		} else {
			$(event.data.className).slideUp();
		}
		return false;
	}

	$.fn.exists = function () {
		return this.length > 0;
	};
	var pageContext = window['pageContext'];
	var storage = {};
	var utilitiesScrollTo = function($obj, speed) {
		if (typeof speed == 'undefined') {
			speed = 400;
		}
		if ($obj.exists()) {
			var windowTop = $(document).scrollTop();
			var windowBottom = windowTop + $(window).height();
			var objectTop = $obj.offset().top;
			if (objectTop > windowTop && objectTop < windowBottom) {
				return;
			}
		}
		$.scrollTo($obj, speed);
	};
	var utilitiesGetBlock = function (blockId, sender, args, params) {
		var url = (args.url ? args.url : window.location.href);
		$.ajax({
			url: url + (url.indexOf('?') >= 0 ? '&' : '?') + 'mode=async&function=get_block&block_id=' + blockId + (params ? '&' + $.param(params) : ''),
			type: 'GET',
			cache: false,
			beforeSend: function () {
				$(sender).block({message: null});
				if (args.beforeSend) {
					args.beforeSend(sender);
				}
			},
			complete: function () {
				$(sender).unblock();
				if (args.complete) {
					args.complete(sender);
				}
			},
			success: function (html) {
				storage[blockId] = params;
				if (args.success) {
					args.success(sender, html);
				}
			},
			error: function () {
				if (args.error) {
					args.error(sender);
				}
			}
		});
	};
	var utilitiesReloadBlock = function(blockId, sender, scroll, animate) {
		if (!blockId) {
			window.location.reload();
			return;
		}
		var params = null;
		if (storage[blockId]) {
			params = storage[blockId];
		}

		var args = {};
		args.success = function (sender, html) {
			storage[blockId] = params;
			var animationOpacity = 0.1;
			if (!animate) {
				animationOpacity = 1;
			}
			$('#' + blockId).animate({opacity: animationOpacity}, 400, function () {
				var div = document.createElement('div');
				div.innerHTML = html;

				var content = $(div).children().first();
				$(content).css('opacity', animationOpacity);
				$(this).replaceWith(content);
				$('#' + blockId).animate({opacity: 1}, 400);
				initAjaxLists($('#' + blockId));
				if (scroll) {
					utilitiesScrollTo($('#' + blockId));
				}

				if (typeof(Storage) !== 'undefined') {
					var userId = '';
					if (pageContext && pageContext['userId']) {
						userId = pageContext['userId'] + ':';
					}
					sessionStorage.setItem(userId + location.href + '#' + blockId, $('#' + blockId).html());
					sessionStorage.setItem(userId + location.href + '#' + blockId + ':params', JSON.stringify(params));
				}
			});
		};

		var errorTries = 0;
		args.error = function () {
			errorTries++;
			var hasFromParameter = false;
			for (var paramName in params) {
				if (params.hasOwnProperty(paramName)) {
					if (paramName.indexOf('from') == 0 && parseInt(params[paramName])>1) {
						params[paramName] = parseInt(params[paramName]) - 1;
						if (errorTries > 1) {
							params[paramName] = 1;
						}
						hasFromParameter = true;
					}
				}
			}
			if (!hasFromParameter) {
				params = null;
			}

			if (errorTries > 1) {
				delete args.error;
			}

			utilitiesGetBlock(blockId, sender, args, params);
		};

		utilitiesGetBlock(blockId, sender, args, params);
	};
	var utilitiesParseParameters = function(str) {
		var result = {};
		if (str) {
			var params = str.split(';');
			for (var i = 0; i < params.length; i++) {
				var pair = params[i].split(':');
				if (pair.length == 2) {
					var paramNames = pair[0].split('+');
					for (var j = 0; j < paramNames.length; j++) {
						result[paramNames[j]] = decodeURIComponent(pair[1]).replace(/[+]/g,' ');
					}
				}
			}
		}
		return result;
	};
	var utilitiesAjaxRequest = function(sender, params, successCallback) {
		var url = window.location.href;
		$.ajax({
			url: url + (url.indexOf('?') >= 0 ? '&' : '?') + 'mode=async&format=json&' + $.param(params),
			type: 'GET',
			beforeSend: function () {
				$(sender).block({message: null});
			},
			complete: function () {
				$(sender).unblock();
			},
			success: function (json) {
				if (typeof json != 'object') {
					json = JSON.parse(json);
				}
				if (json && successCallback) {
					successCallback(json);
				}
			}
		});
	};
	var initSubscriptions = function () {
		var $btnSubscriptions = $('[data-subscribe-to], [data-unsubscribe-to]');
		$btnSubscriptions.click(function(e) {
			e.preventDefault();

			var $btn = $(this);
			if ($btn.hasClass('done')) {
				return;
			}
			var subscriptionTo = $btn.attr('data-subscribe-to') || $btn.attr('data-unsubscribe-to');
			var subscriptionId = $btn.attr('data-id');
			if (subscriptionTo && subscriptionId) {
				var params = {action: 'subscribe'};
				if (!$btn.attr('data-subscribe-to')) {
					params['action'] = 'unsubscribe';
				}
				if (subscriptionTo == 'category') {
					params[params['action'] + '_category_id'] = subscriptionId;
				} else if (subscriptionTo == 'model') {
					params[params['action'] + '_model_id'] = subscriptionId;
				} else if (subscriptionTo == 'content_source') {
					params[params['action'] + '_cs_id'] = subscriptionId;
				} else if (subscriptionTo == 'user') {
					params[params['action'] + '_user_id'] = subscriptionId;
				} else if (subscriptionTo == 'playlist') {
					params[params['action'] + '_playlist_id'] = subscriptionId;
				} else if (subscriptionTo == 'dvd') {
					params[params['action'] + '_dvd_id'] = subscriptionId;
				}
				utilitiesAjaxRequest($btn, params, function(json) {
					if (json['status'] == 'success') {
						$btn.addClass('done');
						var $buttonInfo = $btn.parents().first().find('.button-info');
						if ($buttonInfo.exists()) {
							if (params['action'] == 'subscribe') {
								$buttonInfo.html(parseInt($buttonInfo.html()) + 1);
							} else {
								$buttonInfo.html(parseInt($buttonInfo.html()) - 1);
							}
						}
					}
				});
			}
		});
	};
	var initAjaxLists = function () {

		$container = $(document);

		function createDeleteCallback($form, $sender, blockId) {
			return function(json) {
				if (json['status'] == 'success') {
					utilitiesReloadBlock(blockId, $sender, true, true);
					if ($form.attr('data-refresh-block-ids')) {
						var blockIds = $form.attr('data-refresh-block-ids').split(',');
						for (var j = 0; j < blockIds.length; j++) {
							utilitiesReloadBlock(blockIds[j], $sender, false, true);
						}
					} else if ($sender.attr('data-redirect-url')) {
						window.location = $sender.attr('data-redirect-url');
					}
				} else {
					for (var i = 0; i < json['errors'].length; i++) {
						var error = json['errors'][i];
						var errorMessage = error['message'];
						if (errorMessage) {
							$form.find('.generic-error').empty().text(errorMessage).fadeIn();
						}
					}
					utilitiesScrollTo($('#' + blockId), 0);
				}
			};
		}

		$container.find('[data-action="select"]').each(function() {
			$(this).click(function(e) {
				if ($(this).hasClass('disabled')) {
					return;
				}

				var $form = $(this).parents('form');
				var $checkbox = $(this).find('input');
				if (!$(e.target).is($checkbox)) {
					$checkbox.prop('checked', !$checkbox.prop('checked'));
				}

				var selectedNumber = parseInt($form.attr('data-selected-cnt')) || 0;
				if ($checkbox.prop('checked')) {
					$(this).addClass('active');
					selectedNumber++;
				} else {
					$(this).removeClass('active');
					selectedNumber = Math.max(selectedNumber - 1, 0);
				}
				$form.find('input[data-mode="selection"]').prop('disabled', selectedNumber == 0);
				$form.find('input[data-action="select_all"]').toggleClass('active', selectedNumber == $form.find('input[type=checkbox]').length - $form.find('input[type=checkbox][disabled]').length);
				$form.attr('data-selected-cnt', selectedNumber);
			});
		});

		$container.find('[data-action="delete"]').each(function() {
			$(this).click(function(e) {
				e.preventDefault();

				if ($(this).hasClass('disabled')) {
					return;
				}

				var $form = $(this).parents('form');
				var $button = $(this);
				var confirmText = $button.attr('data-confirm') || '';
				if (!confirmText || confirm(confirmText)) {
					var objectId = $button.attr('data-id');
					if (!objectId) {
						return;
					}
					var blockId = $form.attr('data-block-id');
					var params = utilitiesParseParameters($form.attr('data-parameters'));
					params['function'] = 'get_block';
					params['block_id'] = blockId;
					params['delete'] = [objectId];
					utilitiesAjaxRequest($button, params, createDeleteCallback($form, $button, blockId));
				}
			});
		});
		$container.find('form[data-controls]').each(function () {
			var $form = $(this);
			var blockId = $form.attr('data-block-id');
			$form.find('input[type="button"]').each(function() {
				$(this).click(function(e) {
					e.preventDefault();
					var $button = $(this);
					var confirmText = $button.attr('data-confirm') || '';
					if (confirmText) {
						var selectedNumber = parseInt($form.attr('data-selected-cnt')) || 0;
						confirmText = confirmText.replace(/\[count\](.*)\[\/count\]/gi, function(match, p1) {
							var defaultValue = '';
							var values = p1.split('||');
							for (var i = 0; i < values.length; i++) {
								var temp = values[i].split(':', 2);
								if (temp.length == 1) {
									defaultValue = temp[0].trim();
								} else {
									var compareExamples = temp[0].split(',');
									for (var j = 0; j < compareExamples.length; j++) {
										var compareExample = compareExamples[j].trim();
										if (compareExample.indexOf('//') == 0) {
											if (selectedNumber % 100 == parseInt(compareExample.substring(2))) {
												return temp[1].trim().replace('%1%', '' + selectedNumber);
											}
										} else if (compareExample.indexOf('/') == 0) {
											if (selectedNumber % 10 == parseInt(compareExample.substring(1))) {
												return temp[1].trim().replace('%1%', '' + selectedNumber);
											}
										} else if (selectedNumber == parseInt(temp[0].trim())) {
											return temp[1].trim().replace('%1%', '' + selectedNumber);
										}
									}
								}
							}
							return defaultValue;
						}).replace('%1%', '' + selectedNumber);
					}
					var params = {};
					if (!confirmText || confirm(confirmText)) {
						if ($button.attr('data-action') == 'select_all') {
							if ($button.hasClass('active')) {
								$form.find('input[type=checkbox]').each(function() {
									if (this.checked) {
										$(this).click();
									}
								});
							} else {
								$form.find('input[type=checkbox]').each(function() {
									if (!this.checked) {
										$(this).click();
									}
								});
							}
						} else if ($button.attr('data-action') == 'delete_multi') {
							params = utilitiesParseParameters($form.attr('data-parameters'));
							params['function'] = 'get_block';
							params['block_id'] = blockId;
							params['delete'] = [];
							$form.find('input[type=checkbox]').each(function() {
								if (this.checked) {
									params['delete'].push(this.value);
								}
							});
							utilitiesAjaxRequest($button, params, createDeleteCallback($form, $button, blockId));
						}
					}
				});
			})
		});
	};
	var initMethods = [
		initDescription,
		initSlider,
		initFancybox,
		initSelect,
		initAjaxReplaceThumbs,
		initPlaylist,
		initPagination,
		initSelectCategoriesModels,
		initSubscriptions,
		initAjaxLists,
		initWindows
	];
	for (var i = 0; i < initMethods.length; i++) {
		if (typeof initMethods[i] == 'function') {
			try {
				initMethods[i].call(this);
			} catch (e) {
				if (console && console.error) {
					//console.log(e);
				}
			}
		}
	}
});
$(window).load(function () {
	var owl = $(".models-slider-big").data('owlCarousel');
	//owl.next();
	//owl.prev();
});

(function($) {
	window.reProj = window.reProj || new reProj();

	function reProj() {
		// Private variables
		var self = this;

		self.showMore = function(el, e) {
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			var $this = $(el),
				params = $this.data();
			if ($this.hasClass('wait')) {
				return false;
			}
			// window.ajaxLoader.show();
			$this.addClass('wait');
			$.post(params.url, params, function(resp) {
				// window.ajaxLoader.hide();
				$this.removeClass('wait');
			});
		}
	}
})(jQuery); 


// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================



