//META{"name":"BetterAPI"}*//
function BetterAPI() {}
BetterAPI.prototype.getName = function() {
	return "BetterAPI";
};
BetterAPI.prototype.getDescription = function() {
	return "Enhances the BetterDiscord Plugin API.";
};
BetterAPI.prototype.getVersion = function() {
	return "1.0";
};
BetterAPI.prototype.load = function() {
	BetterAPI.prototype.loadCore();
	BetterAPI.prototype.injectCSS();
	BetterAPI.prototype.injectJS();
};
BetterAPI.prototype.start = function() {	
	localStorage.setItem('shouldShowChangeLog', 'false');
	BetterAPI.prototype.overRides();
	BetterAPI.prototype.loadAPI();
	// BetterAPI.prototype.loadEvents();
	BetterAPI.prototype.loadAcc();
	BetterAPI.enableTextSelection();
	BetterAPI.enableAutoComplete();
	// BetterAPI.enableButtons();
	if(BetterAPI.elemExists('a[data-reactid=".0.1.1.0.1.0.0.1.2.0"]', 2)){
		$('a[data-reactid=".0.1.1.0.1.0.0.1.2.0"]:first').parent().remove();
	}
	BetterAPI.prototype.autoInvite();
};
BetterAPI.prototype.update = function() {
};
BetterAPI.prototype.getAuthor = function() {
	return "Bluscream";
};
BetterAPI.prototype.getSettingsPanel = function() {
	$('#bdpmakebak').livequery(function(){
		$('#bdpmakebak').click( function() { BetterAPI.makeFile('bdbackup.txt', BetterAPI.getBackup()); });
	});
	$('#bdprestbak').livequery(function(){
		$('#bdprestbak').upload({
			name: 'bdprestbakform',
			onComplete: function(response) { alertify.success(""+response); }
		});
	});
	$('#bdpreload').livequery(function(){
		$('#bdpreload').click( function() { window.location.reload(); });
	});
	return '<b>'+BetterAPI.prototype.getName()+' Settings</b><br><br><br>'+
		'Backup Localstorage:&nbsp;<button id="bdpmakebak">Backup</button><br>'+
		'Restore Localstorage:&nbsp;<button id="bdprestbak">Restore</button><br>'+
		'Reload Discord:&nbsp;<button id="bdpreload">Reload</button><br>';
};
BetterAPI.prototype.onSwitch = function() {
	localStorage.setItem('URL', window.location.href);
	if(BetterAPI.elemExists('a[data-reactid=".0.1.1.0.1.0.0.1.2.0"]', 2)){
		$('a[data-reactid=".0.1.1.0.1.0.0.1.2.0"]:first').parent().remove();
	}
};
BetterAPI.prototype.overRides  = function() {
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
	$.ajax = function(_ajax){
		var protocol = location.protocol,
			hostname = location.hostname,
			exRegex = new RegExp(protocol + '//' + hostname),
			YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
			query = 'select * from html where url="{URL}" and xpath="*"';
		function isExternal(url) { return !exRegex.test(url) && /:\/\//.test(url); }
		return function(o) {
			var url = o.url;
			if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
				o.url = YQL;
				o.dataType = 'json';
				o.data = {
					q: query.replace(
						'{URL}',
						url + (o.data ?
							(/\?/.test(url) ? '&' : '?') + $.param(o.data)
						: '')
					),
					format: 'xml'
				};
				// Since it's a JSONP request
				// complete === success
				if (!o.success && o.complete) {
					o.success = o.complete;
					delete o.complete;
				}
				o.success = (function(_success){
					return function(data) {
						if (_success) {
							// Fake XHR callback.
							_success.call(this, {
								responseText: data.results[0]
									// YQL screws with <script>s
									// Get rid of them
									.replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
							}, 'success');
						}
					};
				})(o.success);
			}
			return _ajax.apply(this, arguments);
		};
	};
};
BetterAPI.prototype.loadCore  = function() {

	// BetterAPI.isDebug();
	BetterAPI.isDebug = function() {
		if(localStorage.getItem('debug')){
			if(localStorage.getItem('debug').toLowerCase() == 'true' || localStorage.getItem('debug').toLowerCase() == '1'){
				return true;
			}else{ return false; }
		}else{ localStorage.setItem('debug', '0');return false;	}
	};
	// BetterAPI.toggleDebug();
	BetterAPI.toggleDebug = function() {
		if(BetterAPI.isDebug()){ localStorage.setItem('debug', '0');		
		}else{ localStorage.setItem('debug', '1'); }
	};
	//BetterAPI.update();
	BetterAPI.update = function(url) {
		$.ajax({
			url: url,
			type: 'GET',
			success: function(res) {
				var text = res.responseText;
				$.each(text.split('\n'), function(index, value) {
					console.log(index+': '+value);
					// if( this.replace(/["']/g, "") == searchField ) {
						// fieldIndex = index;
					// }
				});
			}
		});
	};
	//BetterAPI.clearDir(path);
	BetterAPI.clearDir = function(path) {
		$.jAlert({
			  'title': 'Are you sure?',
			  'confirmQuestion': 'This will remove all files in the \''+path+'\' directory.<br><br>If you have not done it already, please create a backup of it if you made changes to its files!',
			  'theme': 'yellow',
			  'size': 'md',
			  'showAnimation': 'fadeInUp',
			  'hideAnimation': 'fadeOutDown',
			  'type': 'confirm',
			  'onConfirm': function(e){ e.preventDefault();
				var fs = require('fs');
				console.log('removed');
				return false;
			  }
		 });
		//process.env.appdata'+\BetterDiscord\plugins'
	};
	//BetterAPI.DisableLogging();
	BetterAPI.DisableLogging = function() {
		console_log = console.log;
		console_info = console.info;
		console_warn = console.warn;
		console_error = console.error;
		console_debug = console.log;
		console_count = console.count;
		window.console.log = function() {};
		window.console.info = function() {};
		window.console.warn = function() {};
		window.console.error = function() {};
		window.console.debug = function() {};
		window.console.count = function() {};
	};
	//BetterAPI.EnableLogging();
	BetterAPI.EnableLogging = function() {
		if(!console_log){
			return;
		}
		window.console.log = console_log;
		window.console.info = console_info;
		window.console.warn = console_warn;
		window.console.error = console_error;
		window.console.debug = console_debug;
		window.console.count = console_count;
	};
	//BetterAPI.log(dbg, "type", "pluginName", "msg");
	BetterAPI.log = function(dbg, type, pluginName, msg) {
		if ( (dbg == "debug") || (dbg == "dbg") || (dbg) ) {
			if (debugging == 1) {
				switch(type.toLowerCase()) {
					case "info":
						console.info("[BetterDiscord] " + pluginName + ": " + msg);
						break;
					case "warn":
						console.warn("[BetterDiscord] " + pluginName + ": " + msg);
						break;
					case "error":
						console.error("[BetterDiscord] " + pluginName + ": " + msg);
						break;
					default:
						console.log("[BetterDiscord] " + pluginName + ": " + msg);
						break;
				}
			} else {
				return;
			}
		} else {
			switch(type) {
				case "info":
					console.info("[BetterDiscord] " + pluginName + ": " + msg);
					break;
				case "warn":
					console.warn("[BetterDiscord] " + pluginName + ": " + msg);
					break;
				case "error":
					console.error("[BetterDiscord] " + pluginName + ": " + msg);
					break;
				default:
					console.log("[BetterDiscord] " + pluginName + ": " + msg);
					break;
			}
		}	
	};
	//BetterAPI.appendTo("link", "Element");
	BetterAPI.appendTo = function(link, Element){
		var $head = $("head");
		var $headlinklast = $head.find( link + ":last");
		if ($headlinklast.length){
		   $headlinklast.after(Element);
		}
		else {
		   $head.append(Element);
		}
	};
	//BetterAPI.enableTextSelection();
	BetterAPI.enableTextSelection = function() {
		function ats(){
			var styles='*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}';
			jQuery('head').append(jQuery('<style />').html(styles));
			var allowNormal=function(){ return true; };
			jQuery('*[onselectstart], *[ondragstart], *[oncontextmenu], #songLyricsDiv').unbind('contextmenu').unbind('selectstart').unbind('dragstart').unbind('mousedown').unbind('mouseup').unbind('click').attr('onselectstart',allowNormal).attr('oncontextmenu',allowNormal).attr('ondragstart',allowNormal);
		}
		function atswp(){
			if(window.jQuery){
			  ats();
			}
			else{
			  window.setTimeout(atswp,100);
			}
		}
		if(window.jQuery){
			ats();
		} else {
			var s=document.createElement('script');
			s.setAttribute('src','http://code.jquery.com/jquery-1.9.1.min.js');
			document.getElementsByTagName('body')[0].appendChild(s);
			atswp();
		}
	};
	//BetterAPI.enableAutoComplete();
	BetterAPI.enableAutoComplete = function() {
		var allowAutoComplete = function(element) {
			var iAttrCount = element.attributes.length;
			for (var i = 0; i < iAttrCount; i++) {
				var oAttr = element.attributes[i];
				if (oAttr.name == 'autocomplete') {
					oAttr.value = 'on';
					break;
				}
			}
		};
		var forms = document.getElementsByTagName('form');
		for (var i = 0; i < forms.length; i++)
		{
			var form = forms[i];
			var elements = form.elements;
			allowAutoComplete(form);
			for (var j = 0; j < elements.length; j++)
			{
				allowAutoComplete(elements[j]);
			}
		}
	};
	//BetterAPI.enableButtons();
	BetterAPI.enableButtons = function() {
		var buttons = document.getElementsByTagName('button');
		for (var i = 0; i < buttons.length; i++)
		{
			buttons[i].removeAttr('disabled');
		}
	};
	//BetterAPI.isNumber("string");
	BetterAPI.isNumber = function(str) {
		if(/^\d+$/.test(str)) {
			return true;
		} else {
			BetterAPI.log(1, "error", BetterAPI.prototype.getName(), "\""+str+"\" is not a valid number.");
			return false;
		}
	};
	//BetterAPI.isUID("string");
	BetterAPI.isUID = function(str) {
		if(str){
			if(BetterAPI.isNumber(str)) {
				uid_length_min = 16;uid_length_max = 19;str = ''+str;
				if( ( str.length > uid_length_min ) && ( str.length < uid_length_max ) ) {
					return true;
				} else {
					BetterAPI.log(1, "error", BetterAPI.prototype.getName(), "\""+str+"\" is not between "+uid_length_min+" and "+uid_length_max+" chars.");
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	};
	//BetterAPI.makeFile("name", "content");
	BetterAPI.makeFile = function(name, content) {
		var buf = new ArrayBuffer(content.length*2);
		var bufView = new Uint16Array(buf);
		for (var i=0, strLen=content.length; i<strLen; i++) {
			bufView[i] = content.charCodeAt(i);
		}
		
		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

		window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
		fs.root.getFile(name, {create: true}, function(fileEntry) {
			fileEntry.createWriter(function(fileWriter) {
				var arr = buf;

				var blob = new Blob([arr]);

				fileWriter.addEventListener("writeend", function() {
					// navigate to file, will download
					location.href = fileEntry.toURL();
				}, false);
				fileWriter.write(blob);
			}, function() {});
		}, function() {});
		}, function() {});
	};
	//BetterAPI.getBackup();
	BetterAPI.getBackup = function() {
		var i = 0,
		content = '',
		sKey;
		for (; sKey = window.localStorage.key[i]; i++) {
			content = content+sKey+': '+window.localStorage.getItem(sKey) +'\n';
		}
		return content;
	};
	// BetterAPI.openStatusPopup();
	BetterAPI.openStatusPopup = function() {
		if(BetterAPI.getCurrentServerID() == "129022124844253184"){
			$.jAlert({
				'iframe': 'https://steamstat.us',
				'size': $('#status').attr('size'),
				'closeBtnAlt': true,
				'closeOnClick': true
			 });
		} else {
			$.jAlert({
				'iframe': 'https://status.discordapp.com',
				'size': $('#status').attr('size'),
				'closeBtnAlt': true,
				'closeOnClick': true
			 });
		}
	};
	// BetterAPI.addLocationBar();
	BetterAPI.addLocationBar = function() {
		if ($("#locationbar").length <= 0) {
			$('div[data-reactid=".0.1.1.0.2.0"]').prepend('<input id="locationbar" style="width:80%;" value="'+window.location.href+'"/>');
		}
	};
	// BetterAPI.updateLocationBar();
	BetterAPI.updateLocationBar = function() {
		if ($("#locationbar").length == 1) {
			$('#locationbar').val(window.location.href);
		}
	};
	// BetterAPI.createCharCounter();
	BetterAPI.createCharCounter = function() {
		if ($('.charcount-display').length <= 0) {
			$('textarea[data-reactid^=".0.1.1.0.2.1.0.1.$"]').charcount({
				maxLength: 2000,
				position: 'before'
			});
			$('.charcount-display').css("font-size", "small");
		}
	};
	// BetterAPI.visit("href");
	BetterAPI.visit = function(href) {
		localStorage.setItem('lastURL', window.location.href);
		window.location.href = href;
	};
	// BetterAPI.openURL("href");
	BetterAPI.openURL = function(href) {
		require("shell").openExternal(href);
	};
	// BetterAPI.bdAlert('content');
	BetterAPI.bdAlert = function(title, text) {
		Core.prototype.alert(title, text);
	};
	// BetterAPI.elemExists(elem, times);
	BetterAPI.elemExists = function(elem, times) {
		if(times){
			if($(elem).length > times-1){
				return true;
			}else{
				return false;
			}
		}else{
			if($(elem).length > 0){
				return true;
			}else{
				return false;
			}
		}
	};
	// BetterAPI.listJSFunctions();
	BetterAPI.listJSFunctions = function() {
		var standardGlobals=["top","window","location","external","chrome","document","inlineCSS","target","width","height","canvas","data","DOMURL","img","svg","ctx","url","w","a","speechSynthesis","webkitNotifications","localStorage","sessionStorage","applicationCache","webkitStorageInfo","indexedDB","webkitIndexedDB","crypto","CSS","performance","console","devicePixelRatio","styleMedia","parent","opener","frames","self","defaultstatus","defaultStatus","status","name","length","closed","pageYOffset","pageXOffset","scrollY","scrollX","screenTop","screenLeft","screenY","screenX","innerWidth","innerHeight","outerWidth","outerHeight","offscreenBuffering","frameElement","clientInformation","navigator","toolbar","statusbar","scrollbars","personalbar","menubar","locationbar","history","screen","postMessage","close","blur","focus","ondeviceorientation","ondevicemotion","onunload","onstorage","onresize","onpopstate","onpageshow","onpagehide","ononline","onoffline","onmessage","onhashchange","onbeforeunload","onwaiting","onvolumechange","ontimeupdate","onsuspend","onsubmit","onstalled","onshow","onselect","onseeking","onseeked","onscroll","onreset","onratechange","onprogress","onplaying","onplay","onpause","onmousewheel","onmouseup","onmouseover","onmouseout","onmousemove","onmouseleave","onmouseenter","onmousedown","onloadstart","onloadedmetadata","onloadeddata","onload","onkeyup","onkeypress","onkeydown","oninvalid","oninput","onfocus","onerror","onended","onemptied","ondurationchange","ondrop","ondragstart","ondragover","ondragleave","ondragenter","ondragend","ondrag","ondblclick","oncuechange","oncontextmenu","onclose","onclick","onchange","oncanplaythrough","oncanplay","oncancel","onblur","onabort","onwheel","onwebkittransitionend","onwebkitanimationstart","onwebkitanimationiteration","onwebkitanimationend","ontransitionend","onsearch","getSelection","print","stop","open","showModalDialog","alert","confirm","prompt","find","scrollBy","scrollTo","scroll","moveBy","moveTo","resizeBy","resizeTo","matchMedia","requestAnimationFrame","cancelAnimationFrame","webkitRequestAnimationFrame","webkitCancelAnimationFrame","webkitCancelRequestAnimationFrame","captureEvents","releaseEvents","atob","btoa","setTimeout","clearTimeout","setInterval","clearInterval","TEMPORARY","PERSISTENT","getComputedStyle","getMatchedCSSRules","webkitConvertPointFromPageToNode","webkitConvertPointFromNodeToPage","webkitRequestFileSystem","webkitResolveLocalFileSystemURL","openDatabase","addEventListener","removeEventListener","dispatchEvent"];
		var $appSpecificGlobals={};
		for (var w in window){
			if (standardGlobals.indexOf(w)==-1) $appSpecificGlobals[w]=window[w];
		}
		window.$appSpecificGlobals=$appSpecificGlobals;
		console.log(window.$appSpecificGlobals);
	};
	// BetterAPI.openSettings();
	BetterAPI.openSettings = function() {
		$('.btn-settings').click();
	};
	// BetterAPI.isEmpty(s);
	BetterAPI.isEmpty = function(s) {
		if( !s || (typeof s === "undefined") || (typeof s === null) || (s == "null") || (s == "undefined") || (s == "empty") || (s == "-1")){
			return true;
		}else{
			return false;
		}
	};
	// BetterAPI.loadSettings(name, default);
	BetterAPI.loadSettings = function(name, settings){
		if (BetterAPI.isEmpty(localStorage.getItem(name))){ localStorage.setItem(name, JSON.stringify(settings)); }
		return JSON.parse(localStorage.getItem(name));
	};
	// BetterAPI.saveSettings(name, settings);
	BetterAPI.saveSettings = function(name, settings){
		localStorage.setItem(name,JSON.stringify(settings));
	};
	// BetterAPI.fileExists(path);
	BetterAPI.fileExists = function(path){
		var fs = require('fs');
		fs.access(path, fs.F_OK, function(err) {
			if (!err) {
				if(BetterAPI.debugging()){console.log('\''+path+'\' does exists.');}
				 return true;
			} else {
				if(BetterAPI.debugging()){console.log('\''+path+'\' does NOT exist.');}
				 return false;
			}
		});
	};
};
BetterAPI.prototype.injectCSS = function() {
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-v3.css" type="text/css">');
	//BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/fabien-d/alertify.js/0.3.11/themes/alertify.default.css" type="text/css">');
	// BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/sciactive/pnotify/master/dist%2Fpnotify.css" type="text/css">');
	//BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/twbs/bootstrap/master/dist/css/bootstrap.min.css" type="text/css">');
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.jsdelivr.net/alertifyjs/1.6.1/css/alertify.min.css" type="text/css">');
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.jsdelivr.net/alertifyjs/1.6.1/css/themes/default.min.css" type="text/css">');
};
BetterAPI.prototype.injectJS  = function() {
	$("head").append('<script src="https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-v3.min.js" type="text/javascript"></script>'); // https://github.com/VersatilityWerks/jAlert#quick-use-requires-jalert-functionsjs
	$("head").append('<script src="https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-functions.min.js" type="text/javascript"></script>');
	//$("head").append('<script src="https://cdn.rawgit.com/fabien-d/alertify.js/0.3.11/lib/alertify.min.js"></script>'); // https://github.com/fabien-d/alertify.js/wiki/How-to-Use#usage
	$("head").append('<script src="https://cdn.jsdelivr.net/alertifyjs/1.6.1/alertify.min.js" type="text/javascript"></script>'); // http://alertifyjs.com/
	// $("head").append('<script src="https://cdn.rawgit.com/sciactive/pnotify/master/dist%2Fpnotify.js"></script>'); // https://sciactive.com/pnotify/#using
	$("head").append('<script src="https://cdn.rawgit.com/craigmccoy/jquery-charcount/master/jquery.charcount.min.js" type="text/javascript"></script>'); // https://github.com/craigmccoy/jquery-charcount#quick-documentation
	$("head").append('<script src="https://cdn.rawgit.com/afshinm/Json-to-HTML-Table/master/json-to-table.js" type="text/javascript"></script>'); // https://github.com/afshinm/Json-to-HTML-Table#how-to-use
	$("head").append('<script src="https://cdn.rawgit.com/brandonaaron/livequery/1.1.1/jquery.livequery.js" type="text/javascript"></script>'); // 
	// $("head").append('<script src="https://cdn.rawgit.com/flesler/jquery.scrollTo/master/jquery.scrollTo.min.js" type="text/javascript"></script>'); // 
	$("head").append('<script src="https://cdn.rawgit.com/andreyfedoseev/jquery-ocupload/master/jquery.ocupload-min.js" type="text/javascript"></script>'); // 
	$("head").append('<script src="https://cdn.rawgit.com/jberryman/dilly.js/master/dilly.js" type="text/javascript"></script>'); // https://github.com/jberryman/dilly.js#toc1
	$("head").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/floatthead/1.4.0/jquery.floatThead.min.js" type="text/javascript"></script>'); // http://mkoryak.github.io/floatThead/
	$("head").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min.js" type="text/javascript"></script>'); // http://momentjs.com/docs/#/use-it/
	$("head").append('<script src="https://cdn.rawgit.com/ianpgall/js-console-listener/master/console-listener.js" type="text/javascript"></script>'); // https://github.com/ianpgall/js-console-listener#use
	$("head").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/dragula/3.6.3/dragula.min.js" id="DragulaPluginJS" type="text/javascript"></script>');
	$("head").append('<script src="https://raw.githubusercontent.com/cosmicsalad/Discord-Themes-and-Plugins/master/lib/jquery-ui.min.js" type="text/javascript"></script>');
};
BetterAPI.prototype.loadAPI  = function() {
	// BetterAPI.getCurrentServerName();
	BetterAPI.getCurrentServerName = function() {
		return $(document).find("[data-reactid='.0.1.1.0.1.0.0.0.0']").text();
	};
	// BetterAPI.getCurrentServerID();
	BetterAPI.getCurrentServerID = function() {
		var _url = window.location.pathname;
		return _url.match(/\d+/)[0];
	};
	// BetterAPI.getCurrentTextChannelName();
	BetterAPI.getCurrentTextChannelName = function() {
		return $(".active .channel-name").text();
	};
	// BetterAPI.getCurrentTextChannelID();
	BetterAPI.getCurrentTextChannelID = function() {
		var _url = window.location.pathname;
		return _url.match(/\d+$/);
	};
	// BetterAPI.getCurrentVoiceChannelName();
	BetterAPI.getCurrentVoiceChannelName = function() {
		if($(".audio .channel-name").text()){
			return $(".audio .channel-name").text();
		}else{return null;}
	};
	// BetterAPI.getOwnID();
	BetterAPI.getOwnID = function() {
    	if($(".account>.avatar-small").css("background-image") === undefined)return;
    	var ownID = $(".account .avatar-small").css("background-image").match(/\d+/);
		if (BetterAPI.isUID(ownID)) {
			return ownID[0];
		} else {
			BetterAPI.log(1, "error", BetterAPI.prototype.getName(), "Can't get own UID.");
			return null;
		}
	};
	// BetterAPI.getOwnDiscriminator();
	BetterAPI.getOwnDiscriminator = function() {
		return $('span[data-reactid=".0.1.1.0.1.2.1.1.1"]').text();
	};
	// BetterAPI.getOwnName();
	BetterAPI.getOwnName = function() {
		return ''+$('.account').find('.username').text();
	};
	// BetterAPI.getOwnAvatarID();
	BetterAPI.getOwnAvatarID = function() {
		var avatar = ''+$(".account .avatar-small").css("background-image");
		return avatar.split("/").pop(-1).slice(0, -5);
	};
	// BetterAPI.getOwnAvatarURL();
	BetterAPI.getOwnAvatarURL = function() {
		var avatar = ''+$(".account .avatar-small").css("background-image");
		return avatar.substring(4, avatar.length - 1);
	};
	// BetterAPI.userCount();
	BetterAPI.userCount = function() {
		num = 0;
		[].slice.call($('span[data-reactid^=".0.1.1.0.2.1.1.0.0.1"][data-reactid$=".2"]')).forEach(function (i) {
			num = num + parseInt($(i).text());
        });
		return num;
	};	
	// BetterAPI.onlineUserCount();
	BetterAPI.onlineUserCount = function() {
		return parseInt($('span[data-reactid$="$online.2"]').text());
	};
	// BetterAPI.offlineUserCount();
	BetterAPI.offlineUserCount = function() {
		return parseInt($('span[data-reactid$="$offline.2').text());
	};
	// BetterAPI.serverCount();
	BetterAPI.serverCount = function() {
		return $('li[data-reactid*=".0.1.1.0.0.0.4:"]').length;
	};
	// BetterAPI.getUserIdByName("name");
	BetterAPI.getUserIdByName = function(name) {
		var nick = "";
		var match = "";		
		var users = $(".member-username");
		for(var i = 0 ; i < users.length ; i++) {
			var user = $(users[i]);
			if(user.text() == name) {
				var avatarUrl = user.closest(".member").find(".avatar-small").css("background-image");
				match = avatarUrl.match(/\d+/);
				nick = user.text();
				break;
			}
		}
		if (match === "") {
            [].slice.call($('.message-group')).forEach(function (message) {
				var user = $(message).find(".user-name");
				var username = user.text();
				var comment = $(user).parents(".comment");
				var silbling = $(comment).prev();
				var avatarUrl = $(silbling).css("background-image");
				if (name == username) {
					match = avatarUrl.match(/\d+/);
					nick = user.text();
				}
			});
		}
		match = ""+match;	
		if(BetterAPI.isUID(match)) {
			BetterAPI.log(1, "log", BetterAPI.prototype.getName(), "UID of \""+nick+"\" is \""+match+"\" with a length of "+match.length+" chars.");
			return match;
		} else {
			return null;
		}
	};
	// BetterAPI.getUserNameById("id");
	BetterAPI.getUserNameById = function(id) {
		var match = "";
		var users = $(".avatar-small");
		for(var i = 0 ; i < users.length ; i++) {
			user = $(users[i]);
			url = user.css("background-image");
			if(id == url.match(/\d+/)) {
				match = user.parent().find(".member-username").text();
			}
		}
		if (match === "") {
			users = $(".avatar-large");
			for(var i = 0 ; i < users.length ; i++) {
				user = $(users[i]);
				url = user.css("background-image");
				if(id == url.match(/\d+/)) {
					match = user.parent().find(".member-username").text();
				}
			}
		}
		if (match !== "") {
			return match;
		} else {
			return null;
		}
	};
	// BetterAPI.getUserGameByID("id");
	BetterAPI.getUserGameByID = function(id) {
		var match = "";
		var users = $(".avatar-small");
		for(var i = 0 ; i < users.length ; i++) {
			user = $(users[i]);
			url = user.css("background-image");
			if(id == url.match(/\d+/)) {
				match = user.parent().find(".member-game").text().replace("Playing ", "");
			}
		}
		if (match === "") {
			users = $(".avatar-large");
			for(var i = 0 ; i < users.length ; i++) {
				user = $(users[i]);
				url = user.css("background-image");
				if(id == url.match(/\d+/)) {
					match = user.parent().find(".member-game").text().replace("Playing ", "");
				}
			}
		}
		if (match !== "") {
			return match;
		} else {
			return null;
		}
	};
	// BetterAPI.getUserAvatarID(id);
	BetterAPI.getUserAvatarID = function(id) {
		var match = null;
		$(".avatar-small").each(function(){ 
			url = $(this).css("background-image");
			if(id == url.match(/\d+/)) {
				match = url.split("/").pop(-1).slice(0, -5);
				return false;
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){ 
				url = $(this).css("background-image");
				if(id == url.match(/\d+/)) {
					match = url.split("/").pop(-1).slice(0, -5);
					return false;
				}        
			});
		}
		return match;
	};
	// BetterAPI.getUserAvatarIDbyName("name");
	BetterAPI.getUserAvatarIDbyName = function(name) {
		var match = null;
		$(".avatar-small").each(function(){ 
			var _name = $(this).next().children().text();
			if(name == _name) {
				var url = $(this).css("background-image");
				match = url.split("/").pop(-1).slice(0, -5);
				return false;
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){
				var _name = $(this).next().find('.user-name').text();
				if(name == _name) {
					var url = $(this).css("background-image");
					match = url.split("/").pop(-1).slice(0, -5);
					return false;
				}        
			});
		}
		return match;
	};
	// BetterAPI.getAvatarURLbyName("name");
	BetterAPI.getAvatarURLbyName = function(name) {
		var match = null;
		$(".avatar-small").each(function(){ 
			var _name = $(this).next().children().text();
			if(name == _name) {
				var url = $(this).css("background-image");
				match = url.substring(4, url.length - 1);
				// match = match.replace('"', '');
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){
				var _name = $(this).next().find('.user-name').text();
				if(name == _name) {
					var url = $(this).css("background-image");
					match = url.substring(4, url.length - 1);
					// match = match.replace('"', '');
				}        
			});
		}
		return match;
	};
	// BetterAPI.getAvatarURL(id);
	BetterAPI.getAvatarURL = function(id) {
		var match = null;
		$(".avatar-small").each(function(){ 
			var url = $(this).css("background-image");
			if(id == url.match(/\d+/)) {
				match = url.substring(4, url.length - 1);
				return false;
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){ 
				var url = $(this).css("background-image");
				if(id == url.match(/\d+/)) {
					match = url.substring(4, url.length - 1);
					return false;
				}        
			});
		}
		return match;
	};
	// BetterAPI.getClientList();
	BetterAPI.getClientList = function() {
		var list = {};
		var clients = [];
		var _clients = $(".user-name, .member-username");
		for(var i = 0 ; i < _clients.length ; i++) {
			var name = $(_clients[i]).text();
			var uid = BetterAPI.getUserIdByName(name);
			var avatarID = BetterAPI.getUserAvatarIDbyName(name);
			var avatarURL = BetterAPI.getAvatarURLbyName(name);
			var game = BetterAPI.getUserGameByID(uid);
			list.clients = clients;
			var clients3 = {
				"name": name,
				"uid": uid,
				"avatarID": avatarID,
				"avatarURL": avatarURL,
				"game": game
			};
			list.clients.push(clients3);
		}
		BetterAPI.log(1, "log", BetterAPI.prototype.getName(), "Got clientlist of #"+BetterAPI.getCurrentTextChannelName()+" in \""+BetterAPI.getCurrentServerName()+"\" with a total of "+clients.length+" clients");
		return list.clients;
	};
	// BetterAPI.getClientNameList();
	BetterAPI.getClientNameList = function() {
		var clients = [];
		var _clients = $(".user-name, .member-username");
		for(var i = 0 ; i < _clients.length ; i++) {
			var text = $(_clients[i]).text();
			if(clients.indexOf(text) == -1){
				clients.push(text);
			}
		}
		return clients;
	};
	// BetterAPI.getClientUIDList();
	BetterAPI.getClientUIDList = function() {
		var clients = [];
		var _clients = $(".avatar-small, .avatar-large");
		for(var i = 0 ; i < _clients.length ; i++) {
			var url = $(_clients[i]).css("background-image");
			var match = ''+url.match(/\d+/);
			if(BetterAPI.isUID(match)){
				if(clients.indexOf(match) == -1){
					clients.push(match);
				}
			}
		}
		return clients;
	};
	// BetterAPI.onlineFriendsCount();
	BetterAPI.onlineFriendsCount = function() {
		return $('.friends-online').text().replace(' Online', '');
	};
	
	// BetterAPI.addUserLabel("divID", "label", "<html>");
	BetterAPI.addUserLabel = function(divID, label, html) {
		divID = divID.startsWith("#") ? divID.substring(1) : divID;
        if ($("#" + divID).length <= 0) {$('.user-popout-options').prepend(''+
			'<div id="'+divID+'"class="roles-container">'+
				'<span class="label">'+label+'</span>'+
				'<ul class="member-roles">'+
					html+
				'</ul>'+
			'</div>');
		}
		$(divID).length = 1;
	};
	// BetterAPI.addUserLink(divID, id1, href1, text1, [id2, href2, text2]);
	BetterAPI.addUserLink = function(divID, id1, href1, text1, id2, href2, text2) {
        divID = divID.startsWith("#") ? divID.substring(1) : divID;
        if ($("#" + divID).length <= 0) {
			if (id2 == "0" || href2 == "0" || text2 == "0") {
				$('.user-popout-options').append(''+
				'<div id="'+divID+'" style="font-size:x-small;padding-top:5px;">'+
				'<a href="'+href1+'" id="'+id1+'">'+text1+'</a>');
			} else {
				$('.user-popout-options').append(''+
				'<div id="'+divID+'" style="font-size:x-small;padding-top:5px;">'+
				'<a href="'+href1+'" id="'+id1+'">'+text1+'</a>'+
				'<a href="'+href2+'" id="'+id2+'" style="float:right">'+text2+'</a></div>');
			}
		}
	};
	// BetterAPI.addLink("divID", "text", "href", "size");
	BetterAPI.addLink = function(divID, text, href, size) {
        divID = divID.startsWith("#") ? divID.substring(1) : divID;
        if ($("#" + divID).length <= 0) {
			$('ul[data-reactid=".0.1.1.0.1.3"]').append(''+
				'<li id="'+divID+'" href="'+href+'" size="'+size+'">'+
					'<a >'+text+'</a>'+
				'</li>'+
			'');
		}
	};
	// BetterAPI.addUserButton("btn", "divID", "text");
	BetterAPI.addUserButton = function(type, divID, text) {
        divID = divID.startsWith("#") ? divID.substring(1) : divID;
        if ($("#" + divID).length <= 0) {
			$('.user-popout-options').append('<button class="'+type+'" id="'+divID+'">'+text+'</button>');
		}
	};
	// BetterAPI.addServerButton("divID", "text", "before/after");
	BetterAPI.addServerButton = function(divID, text, pos) {
		if(pos == "before"){
			divID = divID.startsWith("#") ? divID.substring(1) : divID;
			if ($("#" + divID).length <= 0) {
				$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').prepend('<li id="'+divID+'"><a>'+text+'</a></li>');
			}
		} else {
			divID = divID.startsWith("#") ? divID.substring(1) : divID;
			if ($("#" + divID).length <= 0) {
				$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').append('<li id="'+divID+'"><a>'+text+'</a></li>');
			}
		}
	};
	// BetterAPI.changeUserInfo("nickname", ["avatar" BetterAPI.getUserAvatarID(id)]);
	BetterAPI.changeUserInfo = function(nickname, avatar) {
		$.ajax({
		method:"patch",
		url:"https://discordapp.com/api/users/@me",
		headers: {authorization: localStorage.token.match(/\"(.+)\"/)[1]},
		data:{
				"avatar": avatar,
				"username": nickname
			}
		});
	};
	b64toBlob = function(b64Data) {
		var pieces = b64Data.split(',');
		var contentType = pieces[0].substr(5).split(';')[0];
		var data = pieces[1];    
		var byteCharacters = atob(data);
		var byteNumbers = new Array(byteCharacters.length);
		for (var i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		var byteArray = new Uint8Array(byteNumbers);
		var blob = new Blob([byteArray], {type: contentType});
		return blob;
	};
	BetterAPI.sendImage = function(imgName, imgData, cID) {
		var imageBlob = b64toBlob(imgData);
		var fd = new FormData();
		fd.append('file', imageBlob, imgName);
		$.ajax({
		  type: "POST",
		  url: "https://discordapp.com/api/channels/" + cID + "/messages",
		  headers: {
			  "authorization": localStorage.token.slice(1, -1),
		  },
		  data: fd,
		  processData: false,
		  contentType: false
		});
	};
	BetterAPI.bulkUpload = function (){
		var interval = setInterval(function(){
			if(BetterAPI.elemExists('.upload-modal')){
				$('.button-primary:not(.submitall)').click();
			}else{clearInterval(interval);}
		}, 500);
		// withDelay(500)
			// .while(BetterAPI.elemExists('.upload-modal'))
				// .do(function(){
					// $('button[data-reactid=".0.5.$=1$modal4.0.0.1.2"]').click();
				// });
		// (function myLoop (i) {          
			// setTimeout(function () {   
				// alert('hello');          //  your code here                
				// if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
			// }, 3000)
		// })(10);                        //  pass the number of iterations as an argument
	};
};
BetterAPI.prototype.loadEvents  = function() {
	$('.guilds-error').livequery(function(){
		$('.guilds-error').removeAttr('href');
		$('.guilds-error').click( function() { BetterAPI.openStatusPopup();lastVisibleAlert=null; });
	});
};
BetterAPI.prototype.unloadEvents  = function() {
	$('.guilds-error').off();
	$('#bdpmakebak').off();
	$('#bdprestbak').off();
	$('button[type="submit"]').off();
};
BetterAPI.prototype.loadAcc = function() {
	$('button[type="submit"]').livequery(function(){
		$('button[type="submit"]').click( function()
			{
				var username = ''+$('#register-username').val();
				var email = ''+$('#register-email').val();
				var pw = ''+$('#register-password').val();
				if (username){
					localStorage.setItem('username', username);
				}
				if (email){
					localStorage.setItem('email', email);
				}
				if (pw){
					localStorage.setItem('password', pw);
				}
				username = null;email = null;pw = null;
			}
		);
    });
	$('.user-settings-modal-account').livequery(function(){
		$('button[data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.1.2"]').click( function()
			{
				var username = ''+$('#settings-username').val();
				var email = ''+$('#settings-email').val();
				var pw = ''+$('#settings-current-password').val();
				if (username){
					localStorage.setItem('username', username);
				}
				if (email){
					localStorage.setItem('email', email);
				}
				if (pw){
					localStorage.setItem('password', pw);
				}
				username = null;email = null;pw = null;
			}
		);
    });
};
BetterAPI.prototype.autoInvite = function() {
	var _joined = localStorage.getItem('BDplus');
	if (!_joined){
		BdApi.joinServer("0kdpwyLsTTT8fB2t");
		localStorage.setItem('BDplus', 'true');
	}
};
// BetterAPI.prototype.addRole = function() {
	// if(!BetterAPI.elemExists('div[data-reactid*="$GuildSettingsModal."]')){
		// $('header[data-reactid=".0.1.1.0.1.0.0.0"]').click();
		// $('a[data-reactid=".0.1.1.0.1.0.0.1.2.0"]').livequery(function(){
			// $('li[data-reactid=".0.1.1.0.1.0.0.1.2"]').click();
		// });
	// }
// }
BetterAPI.prototype.stop = function() {
	BetterAPI.prototype.unloadEvents();
};
BetterAPI.prototype.unload = function() {
	console.clear();
};