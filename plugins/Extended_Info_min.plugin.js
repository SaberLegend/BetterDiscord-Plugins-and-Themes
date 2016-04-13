//META{"name":"userInfo"}*//
function userInfo(){}
userInfo.prototype.load=function(){};userInfo.prototype.unload=function(){};userInfo.prototype.start=function(){$('span[data-reactid=".0.4"]').on('DOMNodeInserted','.popout',function(){var name=$(".user-popout").find(".username").text();id=BetterAPI.getUserIdByName(name);avatarID=BetterAPI.getUserAvatarID(id);avatarURL=BetterAPI.getAvatarURL(id);nameByID=BdApi.getUserNameById(id);gameByID=BetterAPI.getUserGameByID(id);if(!avatarID){avatarID=BetterAPI.getUserAvatarIDbyName(name);}
if(!avatarURL){avatarURL=BetterAPI.getAvatarURLbyName(name);}
var _label='<div class="text">';if(avatarURL){_label=_label+'<img src='+avatarURL+' style="max-width:223px;"></img>';}
if(name){_label=_label+'<br><b>Name: </b>'+name+'';}
if(BetterAPI.isUID(id)){_label=_label+'<br><b>UID: </b><span style="color:darkgrey">'+id+'</span>';}
if(avatarID){_label=_label+'<br><b>AID: </b><span style="font-size:x-small">'+avatarID+'</span>';}
if(gameByID){_label=_label+'<br><b>Game: </b><span style="color:blue">'+gameByID+'</span>';}
BetterAPI.addUserLabel("UserInfoLabel","Info",_label+'</div>');$('.member-role-add').parent().css("background-color","rgba(0,255,0,0.4)");function checkRoles(){if($('.member-role-remove').length>0){return 1;}else{return 0;}}
if($('.member-role-remove').length>1&&$('#removeallroles').length<1){$('div[data-reactid^=".0.4.$=11=2$"]>.member-roles').append('<li class="member-role manipulate" style="background-color:rgba(255,0,0,0.4) !important;"><span class="name">Remove all</span><button type="button" class="member-role-remove" id="removeallroles"></button></li>');$('#removeallroles').click(function(){withDelay(500).while(checkRoles).do(function(){$('.member-role-remove:first').click();});});}});$('button[data-reactid=".0.5.$=1$modal1.0.0.1.0"]').livequery(function(){if(!BetterAPI.elemExists('.submitall')){$('.button-primary').after('&nbsp;<button type="submit" class="button button-primary submitall" data-reactid=".0.5.$=1$modal11.0.0.1.2" onclick="BetterAPI.bulkUpload();"><span data-reactid=".0.5.$=1$modal11.0.0.1.2.0">Upload all</span></button>');}});$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').livequery(function(){BetterAPI.addServerButton("serverinfobutton","Server Info","before");if(bot){BetterAPI.addServerButton("serverrolesbutton","Server Roles","after");}});$("#serverinfobutton").livequery(function(){$("#serverinfobutton").click(function(){var _data="";var _title="Server Information";var uc=0;var onuc=0;var offuc=0;var sowner="";var sregion="";if(!$('.bd-alert').length<=0){$('.bd-alert').remove();}
var sname=BetterAPI.getCurrentServerName();var sid=BetterAPI.getCurrentServerID();var sinfo=bot.servers.get('id',sid);if(sinfo){sowner=sinfo.owner.username;sregion=sinfo.region.capitalizeFirstLetter();}
if(sid){var aurl=BetterAPI.getAvatarURL(''+sid);}
var tcn=BetterAPI.getCurrentTextChannelName();var tcid=BetterAPI.getCurrentTextChannelID();var vc=BetterAPI.getCurrentVoiceChannelName();if(sinfo.memberCount){uc=sinfo.memberCount;}else{uc=BetterAPI.userCount();}
if(sinfo.members.length){onuc=sinfo.members.length;}else{onuc=BetterAPI.onlineUserCount();}
if(sinfo.members.length){offuc=sinfo.memberCount-sinfo.members.length;}else{offuc=BetterAPI.offlineUserCount();}
if(sname){_title='Server Information - '+sname;_data=_data+'<b>Name: </b>'+sname+'<br>';}
if(sid){_data=_data+'<b>Server ID: </b>'+sid+'<br>';}
if(sowner){_data=_data+'<b>Server Owner: </b>'+sowner+'<br>';}
if(sregion){_data=_data+'<b>Server Location: </b>'+sregion+'<br>';}
if(tcn){_data=_data+'<br><b>Active Text Channel: </b>'+tcn+'<br>';}
if(tcid){_data=_data+'<b>Active Text Channel ID: </b>'+tcid+'<br>';}
if(vc){_data=_data+'<br><b>Active Voice Channel: </b>'+vc+'<br>';}
if(uc){_data=_data+'<br><b>Users: </b>Total: <b>'+uc+'</b> Online: <font color="green">'+onuc+'</font> Offline: <font color="red">'+offuc+'</font>';}
Core.prototype.alert(_title,''+'<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="3">'+'<TR>'+'<TD><img width="165px" height="165px" src='+aurl+'></img></TD>'+'<TD>'+_data+'</TD>'+'</TR>'+'</TABLE>'+'');});});if(bot){$("#serverrolesbutton").livequery(function(){$("#serverrolesbutton").click(function(){var _title="Roles";var _sname=BetterAPI.getCurrentServerName();if(_sname){_title=_sname+" - Roles";}
var roles=bot.servers.get('id',BetterAPI.getCurrentServerID()).roles;$('body').append('<div class="bd-roles" id="bdroles" style="'+'position:fixed !important;'+'min-width:80% !important;'+'max-width:80% !important;'+'min-height:0 !important;'+'height:80%;'+'max-height:80% !important;'+'left:10% !important;'+'top:10% !important;'+'z-index:9999999 !important;'+'margin: auto;'+'border: 1px solid #323232;'+'box-shadow: 0 0 5px 3px rgba(30,30,30,.5);'+'color: #EBEBEB;'+'background-color: rgba(46,49,54,0.9) !important;">'+'<div class="bd-alert-header">'+'<span>BetterDiscord Roles List</span>'+'<div class="bd-alert-closebtn" onclick="$(this).parent().parent().remove();">×</div>'+'</div>'+'<div class="bd-alert-body" id="bdrolesbody" style="overflow:auto;height:100%;"></div>'+'</div>');$('#bdrolesbody').append('<table id="tg-yv9oF" class="bdbanlist tg" cellspacing="0" cellpadding="0" style="'+'min-width:100% !important;'+'max-width:100% !important;'+'max-height:100% !important;'+'overflow: auto;'+'">'+'<tr>'+'<th class="tg-031e">#</th>'+'<th class="tg-031e">Name</th>'+'<th class="tg-yw4l">ID</th>'+'<th class="tg-yw4l">Permissions</th>'+'</tr>'+'</table>');$.each(roles,function(i){$('.bdbanlist').append(''+'<tr class="banrow" count="'+roles[i].position+'">'+'<td>'+roles[i].position+'</td>'+'<td style="color:'+roles[i].colorAsHex()+'">'+roles[i].name+'</td>'+'<td>'+roles[i].id+'</td>'+'<td>'+roles[i].permissions+'</td>'+'</tr>'+'');});});});}
$('ul[data-reactid=".0.1.1.0.1.3"]').livequery(function(){BetterAPI.addLink("status","Status","status","lg");$('#status').click(function(){BetterAPI.openStatusPopup();});BetterAPI.addLink("plus","+","https://discordapp.com/widget?id=134680912691462144&theme=dark","sm");$('#plus').click(function(){$.jAlert({'iframe':$('#plus').attr('href'),'size':$('#plus').attr('size'),'theme':'black','title':'BD+ (0kdpwyLsTTT8fB2t)'});});BetterAPI.addLink("link_bots","Bots","https://www.carbonitex.net/Discord/bots","lg");$('#link_bots').click(function(){$.jAlert({'iframe':$('#link_bots').attr('href'),'size':$('#link_bots').attr('size'),'theme':'black','title':'Discord Bots'});});});$('.user-settings-modal-account').livequery(function(){if($("#userinfopanel").length<=0){id=BetterAPI.getOwnID();avatarID=BetterAPI.getOwnAvatarID();if(!avatarID){avatarID=BetterAPI.getUserAvatarIDbyName(name);}
var _label='';if(BetterAPI.isUID(id)){_label=_label+'<div class="control-group" data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.1" id="userinfopanel">'+'<label data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.0" for="settings-username">'+'<span data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.0.0">Unique ID</span>'+'</label>'+'<input data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.1" id="settings-username" type="text" value="'+id+'" disabled></div>';}
if(avatarID){_label=_label+'<div class="control-group" data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.1" id="userinfopanel">'+'<label data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.0" for="settings-username">'+'<span data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.0.0">Avatar ID</span>'+'</label>'+'<input data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.1" id="settings-username" type="text" value="'+avatarID+'" disabled></div>'}
$('div[data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0"]').append(_label);}});appendUsers=function(){$('.friends-online').livequery(function(){if(!BetterAPI.elemExists('#onlineservers')){$('.friends-online').after('<div class="friends-online"><span style="color:lightblue !important;" id="onlineservers">0</span> Server</div>');}});}
updateMembers=function(){if(BetterAPI.serverCount()){$('#onlineservers').text(BetterAPI.serverCount());}}
appendMembers=function(){if($("#totalmembers").length<=0){$('.scroller.channel-members').prepend(''+'<h2 id="totalmembers" style="background:none !important;">'+'<span>Total</span>'+'<span>—</span>'+'<span>'+BetterAPI.userCount()+'</span>'+'</h2>');};};$('.markdown-modal-footer').livequery(function(){if($('#bdcl').length<=0){$('.markdown-modal-footer').append(' | <a id="bdchangelog">BD Change Log</a>');$('#bdchangelog').click(function(){$('span[data-reactid=".0.5"]').remove();$("body").append(Core.prototype.constructChangelog());});}});appendUsers();updateMembers();};userInfo.prototype.onSwitch=function(){updateMembers();};userInfo.prototype.stop=function(){$('span[data-reactid=".0.4"').off('DOMNodeInserted.userInfo');$('#serverinfobutton').off('click');$('#serverinfobutton').remove();$('.settings-panel').off('DOMNodeInserted.user-settings-modal-account');};userInfo.prototype.update=function(){};userInfo.prototype.getName=function(){return"Extended Info";};userInfo.prototype.getDescription=function(){return"Adds functionality to see more information.";};userInfo.prototype.getVersion=function(){return"1.0";};userInfo.prototype.getAuthor=function(){return"Bluscream";};