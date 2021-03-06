/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
var dj_currentContext=this;
function dj_undef(_1,_2){
return (typeof (_2||dj_currentContext)[_1]=="undefined");
}
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo.global=function(){
return dj_currentContext;
};
dojo.locale=djConfig.locale;
dojo.version={major:0,minor:4,patch:2,flag:"",revision:Number("$Rev: 7616 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
if((!_4)||(!_3)){
return undefined;
}
if(!dj_undef(_3,_4)){
return _4[_3];
}
return (_5?(_4[_3]={}):undefined);
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7||dojo.global());
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_e,_f){
if(typeof _e!="string"){
return dojo.global();
}
if(_e.indexOf(".")==-1){
return dojo.evalProp(_e,dojo.global(),_f);
}
var ref=dojo.parseObjPath(_e,dojo.global(),_f);
if(ref){
return dojo.evalProp(ref.prop,ref.obj,_f);
}
return null;
};
dojo.errorToString=function(_11){
if(!dj_undef("message",_11)){
return _11.message;
}else{
if(!dj_undef("description",_11)){
return _11.description;
}else{
return _11;
}
}
};
dojo.raise=function(_12,_13){
if(_13){
_12=_12+": "+dojo.errorToString(_13);
}else{
_12=dojo.errorToString(_12);
}
try{
if(djConfig.isDebug){
dojo.hostenv.println("FATAL exception raised: "+_12);
}
}
catch(e){
}
throw _13||Error(_12);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_15){
return dj_global.eval?dj_global.eval(_15):eval(_15);
}
dojo.unimplemented=function(_16,_17){
var _18="'"+_16+"' not implemented";
if(_17!=null){
_18+=" "+_17;
}
dojo.raise(_18);
};
dojo.deprecated=function(_19,_1a,_1b){
var _1c="DEPRECATED: "+_19;
if(_1a){
_1c+=" "+_1a;
}
if(_1b){
_1c+=" -- will be removed in version: "+_1b;
}
dojo.debug(_1c);
};
dojo.render=(function(){
function vscaffold(_1d,_1e){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_1d};
for(var i=0;i<_1e.length;i++){
tmp[_1e[i]]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _21={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,delayMozLoadingFix:false,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_21;
}else{
for(var _22 in _21){
if(typeof djConfig[_22]=="undefined"){
djConfig[_22]=_21[_22];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _25=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _26={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_27,_28){
this.modulePrefixes_[_27]={name:_27,value:_28};
},moduleHasPrefix:function(_29){
var mp=this.modulePrefixes_;
return Boolean(mp[_29]&&mp[_29].value);
},getModulePrefix:function(_2b){
if(this.moduleHasPrefix(_2b)){
return this.modulePrefixes_[_2b].value;
}
return _2b;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _2c in _26){
dojo.hostenv[_2c]=_26[_2c];
}
})();
dojo.hostenv.loadPath=function(_2d,_2e,cb){
var uri;
if(_2d.charAt(0)=="/"||_2d.match(/^\w+:/)){
uri=_2d;
}else{
uri=this.getBaseScriptUri()+_2d;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return !_2e?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_2e,cb);
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return true;
}
var _33=this.getText(uri,null,true);
if(!_33){
return false;
}
this.loadedUris[uri]=true;
if(cb){
_33="("+_33+")";
}
var _34=dj_eval(_33);
if(cb){
cb(_34);
}
return true;
};
dojo.hostenv.loadUriAndCheck=function(uri,_36,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return Boolean(ok&&this.findModule(_36,false));
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_3d){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_3d]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_40){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_40]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if(this.loadUriStack.length==0&&this.getTextStack.length==0){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"||(djConfig["useXDomain"]&&dojo.render.html.opera)){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_42){
var _43=_42.split(".");
for(var i=_43.length;i>0;i--){
var _45=_43.slice(0,i).join(".");
if((i==1)&&!this.moduleHasPrefix(_45)){
_43[0]="../"+_43[0];
}else{
var _46=this.getModulePrefix(_45);
if(_46!=_45){
_43.splice(0,i,_46);
break;
}
}
}
return _43;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_47,_48,_49){
if(!_47){
return;
}
_49=this._global_omit_module_check||_49;
var _4a=this.findModule(_47,false);
if(_4a){
return _4a;
}
if(dj_undef(_47,this.loading_modules_)){
this.addedToLoadingCount.push(_47);
}
this.loading_modules_[_47]=1;
var _4b=_47.replace(/\./g,"/")+".js";
var _4c=_47.split(".");
var _4d=this.getModuleSymbols(_47);
var _4e=((_4d[0].charAt(0)!="/")&&!_4d[0].match(/^\w+:/));
var _4f=_4d[_4d.length-1];
var ok;
if(_4f=="*"){
_47=_4c.slice(0,-1).join(".");
while(_4d.length){
_4d.pop();
_4d.push(this.pkgFileName);
_4b=_4d.join("/")+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,!_49?_47:null);
if(ok){
break;
}
_4d.pop();
}
}else{
_4b=_4d.join("/")+".js";
_47=_4c.join(".");
var _51=!_49?_47:null;
ok=this.loadPath(_4b,_51);
if(!ok&&!_48){
_4d.pop();
while(_4d.length){
_4b=_4d.join("/")+".js";
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
_4d.pop();
_4b=_4d.join("/")+"/"+this.pkgFileName+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
}
}
if(!ok&&!_49){
dojo.raise("Could not load '"+_47+"'; last tried '"+_4b+"'");
}
}
if(!_49&&!this["isXDomain"]){
_4a=this.findModule(_47,false);
if(!_4a){
dojo.raise("symbol '"+_47+"' is not defined after loading '"+_4b+"'");
}
}
return _4a;
};
dojo.hostenv.startPackage=function(_52){
var _53=String(_52);
var _54=_53;
var _55=_52.split(/\./);
if(_55[_55.length-1]=="*"){
_55.pop();
_54=_55.join(".");
}
var _56=dojo.evalObjPath(_54,true);
this.loaded_modules_[_53]=_56;
this.loaded_modules_[_54]=_56;
return _56;
};
dojo.hostenv.findModule=function(_57,_58){
var lmn=String(_57);
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
if(_58){
dojo.raise("no loaded module named '"+_57+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_5a){
var _5b=_5a["common"]||[];
var _5c=_5a[dojo.hostenv.name_]?_5b.concat(_5a[dojo.hostenv.name_]||[]):_5b.concat(_5a["default"]||[]);
for(var x=0;x<_5c.length;x++){
var _5e=_5c[x];
if(_5e.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_5e);
}else{
dojo.hostenv.loadModule(_5e);
}
}
};
dojo.require=function(_5f){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(_60,_61){
var _62=arguments[0];
if((_62===true)||(_62=="common")||(_62&&dojo.render[_62].capable)){
var _63=[];
for(var i=1;i<arguments.length;i++){
_63.push(arguments[i]);
}
dojo.require.apply(dojo,_63);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(_65){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.registerModulePath=function(_66,_67){
return dojo.hostenv.setModulePrefix(_66,_67);
};
if(djConfig["modulePaths"]){
for(var param in djConfig["modulePaths"]){
dojo.registerModulePath(param,djConfig["modulePaths"][param]);
}
}
dojo.setModulePrefix=function(_68,_69){
dojo.deprecated("dojo.setModulePrefix(\""+_68+"\", \""+_69+"\")","replaced by dojo.registerModulePath","0.5");
return dojo.registerModulePath(_68,_69);
};
dojo.exists=function(obj,_6b){
var p=_6b.split(".");
for(var i=0;i<p.length;i++){
if(!obj[p[i]]){
return false;
}
obj=obj[p[i]];
}
return true;
};
dojo.hostenv.normalizeLocale=function(_6e){
var _6f=_6e?_6e.toLowerCase():dojo.locale;
if(_6f=="root"){
_6f="ROOT";
}
return _6f;
};
dojo.hostenv.searchLocalePath=function(_70,_71,_72){
_70=dojo.hostenv.normalizeLocale(_70);
var _73=_70.split("-");
var _74=[];
for(var i=_73.length;i>0;i--){
_74.push(_73.slice(0,i).join("-"));
}
_74.push(false);
if(_71){
_74.reverse();
}
for(var j=_74.length-1;j>=0;j--){
var loc=_74[j]||"ROOT";
var _78=_72(loc);
if(_78){
break;
}
}
};
dojo.hostenv.localesGenerated;
dojo.hostenv.registerNlsPrefix=function(){
dojo.registerModulePath("nls","nls");
};
dojo.hostenv.preloadLocalizations=function(){
if(dojo.hostenv.localesGenerated){
dojo.hostenv.registerNlsPrefix();
function preload(_79){
_79=dojo.hostenv.normalizeLocale(_79);
dojo.hostenv.searchLocalePath(_79,true,function(loc){
for(var i=0;i<dojo.hostenv.localesGenerated.length;i++){
if(dojo.hostenv.localesGenerated[i]==loc){
dojo["require"]("nls.dojo_"+loc);
return true;
}
}
return false;
});
}
preload();
var _7c=djConfig.extraLocale||[];
for(var i=0;i<_7c.length;i++){
preload(_7c[i]);
}
}
dojo.hostenv.preloadLocalizations=function(){
};
};
dojo.requireLocalization=function(_7e,_7f,_80,_81){
dojo.hostenv.preloadLocalizations();
var _82=dojo.hostenv.normalizeLocale(_80);
var _83=[_7e,"nls",_7f].join(".");
var _84="";
if(_81){
var _85=_81.split(",");
for(var i=0;i<_85.length;i++){
if(_82.indexOf(_85[i])==0){
if(_85[i].length>_84.length){
_84=_85[i];
}
}
}
if(!_84){
_84="ROOT";
}
}
var _87=_81?_84:_82;
var _88=dojo.hostenv.findModule(_83);
var _89=null;
if(_88){
if(djConfig.localizationComplete&&_88._built){
return;
}
var _8a=_87.replace("-","_");
var _8b=_83+"."+_8a;
_89=dojo.hostenv.findModule(_8b);
}
if(!_89){
_88=dojo.hostenv.startPackage(_83);
var _8c=dojo.hostenv.getModuleSymbols(_7e);
var _8d=_8c.concat("nls").join("/");
var _8e;
dojo.hostenv.searchLocalePath(_87,_81,function(loc){
var _90=loc.replace("-","_");
var _91=_83+"."+_90;
var _92=false;
if(!dojo.hostenv.findModule(_91)){
dojo.hostenv.startPackage(_91);
var _93=[_8d];
if(loc!="ROOT"){
_93.push(loc);
}
_93.push(_7f);
var _94=_93.join("/")+".js";
_92=dojo.hostenv.loadPath(_94,null,function(_95){
var _96=function(){
};
_96.prototype=_8e;
_88[_90]=new _96();
for(var j in _95){
_88[_90][j]=_95[j];
}
});
}else{
_92=true;
}
if(_92&&_88[_90]){
_8e=_88[_90];
}else{
_88[_90]=_8e;
}
if(_81){
return true;
}
});
}
if(_81&&_82!=_84){
_88[_82.replace("-","_")]=_88[_84.replace("-","_")];
}
};
(function(){
var _98=djConfig.extraLocale;
if(_98){
if(!_98 instanceof Array){
_98=[_98];
}
var req=dojo.requireLocalization;
dojo.requireLocalization=function(m,b,_9c,_9d){
req(m,b,_9c,_9d);
if(_9c){
return;
}
for(var i=0;i<_98.length;i++){
req(m,b,_98[i],_9d);
}
};
}
})();
}
if(typeof window!="undefined"){
(function(){
if(djConfig.allowQueryConfig){
var _9f=document.location.toString();
var _a0=_9f.split("?",2);
if(_a0.length>1){
var _a1=_a0[1];
var _a2=_a1.split("&");
for(var x in _a2){
var sp=_a2[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _a6=document.getElementsByTagName("script");
var _a7=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_a6.length;i++){
var src=_a6[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_a7);
if(m){
var _ab=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
_ab+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=_ab;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=_ab;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _b3=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_b3>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_b3+6,_b3+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
var cm=document["compatMode"];
drh.quirks=(cm=="BackCompat")||(cm=="QuirksMode")||drh.ie55||drh.ie50;
dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
var _b5=window["document"];
var tdi=_b5["implementation"];
if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
if(drh.safari){
var tmp=dua.split("AppleWebKit/")[1];
var ver=parseFloat(tmp.split(" ")[0]);
if(ver>=420){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
}else{
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _b9=null;
var _ba=null;
try{
_b9=new XMLHttpRequest();
}
catch(e){
}
if(!_b9){
for(var i=0;i<3;++i){
var _bc=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
_b9=new ActiveXObject(_bc);
}
catch(e){
_ba=e;
}
if(_b9){
dojo.hostenv._XMLHTTP_PROGIDS=[_bc];
break;
}
}
}
if(!_b9){
return dojo.raise("XMLHTTP not available",_ba);
}
return _b9;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_be,_bf){
if(!_be){
this._blockAsync=true;
}
var _c0=this.getXmlhttpObject();
function isDocumentOk(_c1){
var _c2=_c1["status"];
return Boolean((!_c2)||((200<=_c2)&&(300>_c2))||(_c2==304));
}
if(_be){
var _c3=this,_c4=null,gbl=dojo.global();
var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
_c0.onreadystatechange=function(){
if(_c4){
gbl.clearTimeout(_c4);
_c4=null;
}
if(_c3._blockAsync||(xhr&&xhr._blockAsync)){
_c4=gbl.setTimeout(function(){
_c0.onreadystatechange.apply(this);
},10);
}else{
if(4==_c0.readyState){
if(isDocumentOk(_c0)){
_be(_c0.responseText);
}
}
}
};
}
_c0.open("GET",uri,_be?true:false);
try{
_c0.send(null);
if(_be){
return null;
}
if(!isDocumentOk(_c0)){
var err=Error("Unable to load "+uri+" status:"+_c0.status);
err.status=_c0.status;
err.responseText=_c0.responseText;
throw err;
}
}
catch(e){
this._blockAsync=false;
if((_bf)&&(!_be)){
return null;
}else{
throw e;
}
}
this._blockAsync=false;
return _c0.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_c8){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_c8);
}else{
try{
var _c9=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_c9){
_c9=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_c8));
_c9.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_c8+"</div>");
}
catch(e2){
window.status=_c8;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_cb,_cc,fp){
var _ce=_cb["on"+_cc]||function(){
};
_cb["on"+_cc]=function(){
fp.apply(_cb,arguments);
_ce.apply(_cb,arguments);
};
return true;
}
function dj_load_init(e){
var _d0=(e&&e.type)?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(_d0!="domcontentloaded"&&_d0!="load")){
return;
}
arguments.callee.initialized=true;
if(typeof (_timer)!="undefined"){
clearInterval(_timer);
delete _timer;
}
var _d1=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_d1();
dojo.hostenv.modulesLoaded();
}else{
dojo.hostenv.modulesLoadedListeners.unshift(_d1);
}
}
if(document.addEventListener){
if(dojo.render.html.opera||(dojo.render.html.moz&&(djConfig["enableMozDomContentLoaded"]===true))){
document.addEventListener("DOMContentLoaded",dj_load_init,null);
}
window.addEventListener("load",dj_load_init,null);
}
if(dojo.render.html.ie&&dojo.render.os.win){
document.attachEvent("onreadystatechange",function(e){
if(document.readyState=="complete"){
dj_load_init();
}
});
}
if(/(WebKit|khtml)/i.test(navigator.userAgent)){
var _timer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dj_load_init();
}
},10);
}
if(dojo.render.html.ie){
dj_addNodeEvtHdlr(window,"beforeunload",function(){
dojo.hostenv._unloading=true;
window.setTimeout(function(){
dojo.hostenv._unloading=false;
},0);
});
}
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
if((!dojo.render.html.ie)||(dojo.render.html.ie&&dojo.hostenv._unloading)){
dojo.hostenv.unloaded();
}
});
dojo.hostenv.makeWidgets=function(){
var _d3=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_d3=_d3.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_d3=_d3.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_d3.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _d4=new dojo.xml.Parse();
if(_d3.length>0){
for(var x=0;x<_d3.length;x++){
var _d6=document.getElementById(_d3[x]);
if(!_d6){
continue;
}
var _d7=_d4.parseElement(_d6,null,true);
dojo.widget.getParser().createComponents(_d7);
}
}else{
if(djConfig.parseWidgets){
var _d7=_d4.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(_d7);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
if(!dj_undef("document",this)){
dj_currentDocument=this.document;
}
dojo.doc=function(){
return dj_currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.byId=function(id,doc){
if((id)&&((typeof id=="string")||(id instanceof String))){
if(!doc){
doc=dj_currentDocument;
}
var ele=doc.getElementById(id);
if(ele&&(ele.id!=id)&&doc.all){
ele=null;
eles=doc.all[id];
if(eles){
if(eles.length){
for(var i=0;i<eles.length;i++){
if(eles[i].id==id){
ele=eles[i];
break;
}
}
}else{
ele=eles;
}
}
}
return ele;
}
return id;
};
dojo.setContext=function(_dc,_dd){
dj_currentContext=_dc;
dj_currentDocument=_dd;
};
dojo._fireCallback=function(_de,_df,_e0){
if((_df)&&((typeof _de=="string")||(_de instanceof String))){
_de=_df[_de];
}
return (_df?_de.apply(_df,_e0||[]):_de());
};
dojo.withGlobal=function(_e1,_e2,_e3,_e4){
var _e5;
var _e6=dj_currentContext;
var _e7=dj_currentDocument;
try{
dojo.setContext(_e1,_e1.document);
_e5=dojo._fireCallback(_e2,_e3,_e4);
}
finally{
dojo.setContext(_e6,_e7);
}
return _e5;
};
dojo.withDoc=function(_e8,_e9,_ea,_eb){
var _ec;
var _ed=dj_currentDocument;
try{
dj_currentDocument=_e8;
_ec=dojo._fireCallback(_e9,_ea,_eb);
}
finally{
dj_currentDocument=_ed;
}
return _ec;
};
}
dojo.requireIf((djConfig["isDebug"]||djConfig["debugAtAllCosts"]),"dojo.debug");
dojo.requireIf(djConfig["debugAtAllCosts"]&&!window.widget&&!djConfig["useXDomain"],"dojo.browser_debug");
dojo.requireIf(djConfig["debugAtAllCosts"]&&!window.widget&&djConfig["useXDomain"],"dojo.browser_debug_xd");
dojo.provide("dojo.lang.common");
dojo.lang.inherits=function(_ee,_ef){
if(!dojo.lang.isFunction(_ef)){
dojo.raise("dojo.inherits: superclass argument ["+_ef+"] must be a function (subclass: ["+_ee+"']");
}
_ee.prototype=new _ef();
_ee.prototype.constructor=_ee;
_ee.superclass=_ef.prototype;
_ee["super"]=_ef.prototype;
};
dojo.lang._mixin=function(obj,_f1){
var _f2={};
for(var x in _f1){
if((typeof _f2[x]=="undefined")||(_f2[x]!=_f1[x])){
obj[x]=_f1[x];
}
}
if(dojo.render.html.ie&&(typeof (_f1["toString"])=="function")&&(_f1["toString"]!=obj["toString"])&&(_f1["toString"]!=_f2["toString"])){
obj.toString=_f1.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_f5){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_f8,_f9){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_f8.prototype,arguments[i]);
}
return _f8;
};
dojo.inherits=dojo.lang.inherits;
dojo.mixin=dojo.lang.mixin;
dojo.extend=dojo.lang.extend;
dojo.lang.find=function(_fc,_fd,_fe,_ff){
if(!dojo.lang.isArrayLike(_fc)&&dojo.lang.isArrayLike(_fd)){
dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
var temp=_fc;
_fc=_fd;
_fd=temp;
}
var _101=dojo.lang.isString(_fc);
if(_101){
_fc=_fc.split("");
}
if(_ff){
var step=-1;
var i=_fc.length-1;
var end=-1;
}else{
var step=1;
var i=0;
var end=_fc.length;
}
if(_fe){
while(i!=end){
if(_fc[i]===_fd){
return i;
}
i+=step;
}
}else{
while(i!=end){
if(_fc[i]==_fd){
return i;
}
i+=step;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_105,_106,_107){
return dojo.lang.find(_105,_106,_107,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_108,_109){
return dojo.lang.find(_108,_109)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it&&it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if((!it)||(dojo.lang.isUndefined(it))){
return false;
}
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
return false;
}
if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
return (it instanceof Function||typeof it=="function");
};
(function(){
if((dojo.render.html.capable)&&(dojo.render.html["safari"])){
dojo.lang.isFunction=function(it){
if((typeof (it)=="function")&&(it=="[object NodeList]")){
return false;
}
return (it instanceof Function||typeof it=="function");
};
}
})();
dojo.lang.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((typeof (it)=="undefined")&&(it==undefined));
};
dojo.provide("dojo.lang");
dojo.deprecated("dojo.lang","replaced by dojo.lang.common","0.5");
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="function"){
try{
return wh instanceof Element;
}
catch(e){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getUniqueId=function(){
var _115=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_115.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_117,_118){
var node=_117.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_118&&node&&node.tagName&&node.tagName.toLowerCase()!=_118.toLowerCase()){
node=dojo.dom.nextElement(node,_118);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_11a,_11b){
var node=_11a.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_11b&&node&&node.tagName&&node.tagName.toLowerCase()!=_11b.toLowerCase()){
node=dojo.dom.prevElement(node,_11b);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_11e){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_11e&&_11e.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_11e);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_120){
if(!node){
return null;
}
if(_120){
_120=_120.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_120&&_120.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_120);
}
return node;
};
dojo.dom.moveChildren=function(_121,_122,trim){
var _124=0;
if(trim){
while(_121.hasChildNodes()&&_121.firstChild.nodeType==dojo.dom.TEXT_NODE){
_121.removeChild(_121.firstChild);
}
while(_121.hasChildNodes()&&_121.lastChild.nodeType==dojo.dom.TEXT_NODE){
_121.removeChild(_121.lastChild);
}
}
while(_121.hasChildNodes()){
_122.appendChild(_121.firstChild);
_124++;
}
return _124;
};
dojo.dom.copyChildren=function(_125,_126,trim){
var _128=_125.cloneNode(true);
return this.moveChildren(_128,_126,trim);
};
dojo.dom.replaceChildren=function(node,_12a){
var _12b=[];
if(dojo.render.html.ie){
for(var i=0;i<node.childNodes.length;i++){
_12b.push(node.childNodes[i]);
}
}
dojo.dom.removeChildren(node);
node.appendChild(_12a);
for(var i=0;i<_12b.length;i++){
dojo.dom.destroyNode(_12b[i]);
}
};
dojo.dom.removeChildren=function(node){
var _12e=node.childNodes.length;
while(node.hasChildNodes()){
dojo.dom.removeNode(node.firstChild);
}
return _12e;
};
dojo.dom.replaceNode=function(node,_130){
return node.parentNode.replaceChild(_130,node);
};
dojo.dom.destroyNode=function(node){
if(node.parentNode){
node=dojo.dom.removeNode(node);
}
if(node.nodeType!=3){
if(dojo.evalObjPath("dojo.event.browser.clean",false)){
dojo.event.browser.clean(node);
}
if(dojo.render.html.ie){
node.outerHTML="";
}
}
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_134,_135){
var _136=[];
var _137=(_134&&(_134 instanceof Function||typeof _134=="function"));
while(node){
if(!_137||_134(node)){
_136.push(node);
}
if(_135&&_136.length>0){
return _136[0];
}
node=node.parentNode;
}
if(_135){
return null;
}
return _136;
};
dojo.dom.getAncestorsByTag=function(node,tag,_13a){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_13a);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_13f,_140){
if(_140&&node){
node=node.parentNode;
}
while(node){
if(node==_13f){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _143=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _144=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_144.length;i++){
try{
doc=new ActiveXObject(_144[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_143.implementation)&&(_143.implementation.createDocument)){
doc=_143.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_147){
if(!_147){
_147="text/xml";
}
if(!dj_undef("DOMParser")){
var _148=new DOMParser();
return _148.parseFromString(str,_147);
}else{
if(!dj_undef("ActiveXObject")){
var _149=dojo.dom.createDocument();
if(_149){
_149.async=false;
_149.loadXML(str);
return _149;
}else{
dojo.debug("toXml didn't work?");
}
}else{
var _14a=dojo.doc();
if(_14a.createElement){
var tmp=_14a.createElement("xml");
tmp.innerHTML=str;
if(_14a.implementation&&_14a.implementation.createDocument){
var _14c=_14a.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_14c.importNode(tmp.childNodes.item(i),true);
}
return _14c;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_14f){
if(_14f.firstChild){
_14f.insertBefore(node,_14f.firstChild);
}else{
_14f.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_152){
if((_152!=true)&&(node===ref||node.nextSibling===ref)){
return false;
}
var _153=ref.parentNode;
_153.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_156){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_156!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_156);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_15a){
if((!node)||(!ref)||(!_15a)){
return false;
}
switch(_15a.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_15c,_15d){
var _15e=_15c.childNodes;
if(!_15e.length||_15e.length==_15d){
_15c.appendChild(node);
return true;
}
if(_15d==0){
return dojo.dom.prependChild(node,_15c);
}
return dojo.dom.insertAfter(node,_15e[_15d-1]);
};
dojo.dom.textContent=function(node,text){
if(arguments.length>1){
var _161=dojo.doc();
dojo.dom.replaceChildren(node,_161.createTextNode(text));
return text;
}else{
if(node.textContent!=undefined){
return node.textContent;
}
var _162="";
if(node==null){
return _162;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_162+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_162+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _162;
}
};
dojo.dom.hasParent=function(node){
return Boolean(node&&node.parentNode&&dojo.dom.isNode(node.parentNode));
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName==String(arguments[i])){
return String(arguments[i]);
}
}
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_168,_169,_16a){
if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
elem.setAttributeNS(_168,_169,_16a);
}else{
var _16b=elem.ownerDocument;
var _16c=_16b.createNode(2,_169,_168);
_16c.nodeValue=_16a;
elem.setAttributeNode(_16c);
}
};
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getViewport=function(){
var _16f=dojo.global();
var _170=dojo.doc();
var w=0;
var h=0;
if(dojo.render.html.mozilla){
w=_170.documentElement.clientWidth;
h=_16f.innerHeight;
}else{
if(!dojo.render.html.opera&&_16f.innerWidth){
w=_16f.innerWidth;
h=_16f.innerHeight;
}else{
if(!dojo.render.html.opera&&dojo.exists(_170,"documentElement.clientWidth")){
var w2=_170.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
h=_170.documentElement.clientHeight;
}else{
if(dojo.body().clientWidth){
w=dojo.body().clientWidth;
h=dojo.body().clientHeight;
}
}
}
}
return {width:w,height:h};
};
dojo.html.getScroll=function(){
var _174=dojo.global();
var _175=dojo.doc();
var top=_174.pageYOffset||_175.documentElement.scrollTop||dojo.body().scrollTop||0;
var left=_174.pageXOffset||_175.documentElement.scrollLeft||dojo.body().scrollLeft||0;
return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
var _17a=dojo.doc();
var _17b=dojo.byId(node);
type=type.toLowerCase();
while((_17b)&&(_17b.nodeName.toLowerCase()!=type)){
if(_17b==(_17a["body"]||_17a["documentElement"])){
return null;
}
_17b=_17b.parentNode;
}
return _17b;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _183={x:0,y:0};
if(e.pageX||e.pageY){
_183.x=e.pageX;
_183.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_183.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_183.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _183;
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
return String(arguments[i]).toLowerCase();
}
}
}
return "";
};
if(dojo.render.html.ie&&!dojo.render.html.ie70){
if(window.location.href.substr(0,6).toLowerCase()!="https:"){
(function(){
var _188=dojo.doc().createElement("script");
_188.src="javascript:'dojo.html.createExternalElement=function(doc, tag){ return doc.createElement(tag); }'";
dojo.doc().getElementsByTagName("head")[0].appendChild(_188);
})();
}
}else{
dojo.html.createExternalElement=function(doc,tag){
return doc.createElement(tag);
};
}
dojo.html._callDeprecated=function(_18b,_18c,args,_18e,_18f){
dojo.deprecated("dojo.html."+_18b,"replaced by dojo.html."+_18c+"("+(_18e?"node, {"+_18e+": "+_18e+"}":"")+")"+(_18f?"."+_18f:""),"0.5");
var _190=[];
if(_18e){
var _191={};
_191[_18e]=args[1];
_190.push(args[0]);
_190.push(_191);
}else{
_190=args;
}
var ret=dojo.html[_18c].apply(dojo.html,args);
if(_18f){
return ret[_18f];
}else{
return ret;
}
};
dojo.html.getViewportWidth=function(){
return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.moduleUri=function(_194,uri){
var loc=dojo.hostenv.getModuleSymbols(_194).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _197=loc.indexOf(":");
var _198=loc.indexOf("/");
if(loc.charAt(0)!="/"&&(_197==-1||_197>_198)){
loc=dojo.hostenv.getBaseScriptUri()+loc;
}
return new dojo.uri.Uri(loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _19b=new dojo.uri.Uri(arguments[i].toString());
var _19c=new dojo.uri.Uri(uri.toString());
if((_19b.path=="")&&(_19b.scheme==null)&&(_19b.authority==null)&&(_19b.query==null)){
if(_19b.fragment!=null){
_19c.fragment=_19b.fragment;
}
_19b=_19c;
}else{
if(_19b.scheme==null){
_19b.scheme=_19c.scheme;
if(_19b.authority==null){
_19b.authority=_19c.authority;
if(_19b.path.charAt(0)!="/"){
var path=_19c.path.substring(0,_19c.path.lastIndexOf("/")+1)+_19b.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_19b.path=segs.join("/");
}
}
}
}
uri="";
if(_19b.scheme!=null){
uri+=_19b.scheme+":";
}
if(_19b.authority!=null){
uri+="//"+_19b.authority;
}
uri+=_19b.path;
if(_19b.query!=null){
uri+="?"+_19b.query;
}
if(_19b.fragment!=null){
uri+="#"+_19b.fragment;
}
}
this.uri=uri.toString();
var _1a0="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_1a0));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_1a0="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_1a0));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_1a7){
return (new RegExp("(^|\\s+)"+_1a7+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_1a9){
_1a9+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_1a9);
};
dojo.html.addClass=function(node,_1ab){
if(dojo.html.hasClass(node,_1ab)){
return false;
}
_1ab=(dojo.html.getClass(node)+" "+_1ab).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_1ab);
};
dojo.html.setClass=function(node,_1ad){
node=dojo.byId(node);
var cs=new String(_1ad);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_1ad);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_1b0,_1b1){
try{
if(!_1b1){
var _1b2=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_1b0+"(\\s+|$)"),"$1$2");
}else{
var _1b2=dojo.html.getClass(node).replace(_1b0,"");
}
dojo.html.setClass(node,_1b2);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_1b4,_1b5){
dojo.html.removeClass(node,_1b5);
dojo.html.addClass(node,_1b4);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_1b6,_1b7,_1b8,_1b9,_1ba){
_1ba=false;
var _1bb=dojo.doc();
_1b7=dojo.byId(_1b7)||_1bb;
var _1bc=_1b6.split(/\s+/g);
var _1bd=[];
if(_1b9!=1&&_1b9!=2){
_1b9=0;
}
var _1be=new RegExp("(\\s|^)(("+_1bc.join(")|(")+"))(\\s|$)");
var _1bf=_1bc.join(" ").length;
var _1c0=[];
if(!_1ba&&_1bb.evaluate){
var _1c1=".//"+(_1b8||"*")+"[contains(";
if(_1b9!=dojo.html.classMatchType.ContainsAny){
_1c1+="concat(' ',@class,' '), ' "+_1bc.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_1b9==2){
_1c1+=" and string-length(@class)="+_1bf+"]";
}else{
_1c1+="]";
}
}else{
_1c1+="concat(' ',@class,' '), ' "+_1bc.join(" ') or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _1c2=_1bb.evaluate(_1c1,_1b7,null,XPathResult.ANY_TYPE,null);
var _1c3=_1c2.iterateNext();
while(_1c3){
try{
_1c0.push(_1c3);
_1c3=_1c2.iterateNext();
}
catch(e){
break;
}
}
return _1c0;
}else{
if(!_1b8){
_1b8="*";
}
_1c0=_1b7.getElementsByTagName(_1b8);
var node,i=0;
outer:
while(node=_1c0[i++]){
var _1c6=dojo.html.getClasses(node);
if(_1c6.length==0){
continue outer;
}
var _1c7=0;
for(var j=0;j<_1c6.length;j++){
if(_1be.test(_1c6[j])){
if(_1b9==dojo.html.classMatchType.ContainsAny){
_1bd.push(node);
continue outer;
}else{
_1c7++;
}
}else{
if(_1b9==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_1c7==_1bc.length){
if((_1b9==dojo.html.classMatchType.IsOnly)&&(_1c7==_1c6.length)){
_1bd.push(node);
}else{
if(_1b9==dojo.html.classMatchType.ContainsAll){
_1bd.push(node);
}
}
}
}
return _1bd;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_1c9){
var arr=_1c9.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.html.toSelectorCase=function(_1cd){
return _1cd.replace(/([A-Z])/g,"-$1").toLowerCase();
};
if(dojo.render.html.ie){
dojo.html.getComputedStyle=function(node,_1cf,_1d0){
node=dojo.byId(node);
if(!node||!node.style){
return _1d0;
}
return node.currentStyle[dojo.html.toCamelCase(_1cf)];
};
dojo.html.getComputedStyles=function(node){
return node.currentStyle;
};
}else{
dojo.html.getComputedStyle=function(node,_1d3,_1d4){
node=dojo.byId(node);
if(!node||!node.style){
return _1d4;
}
var s=document.defaultView.getComputedStyle(node,null);
return (s&&s[dojo.html.toCamelCase(_1d3)])||"";
};
dojo.html.getComputedStyles=function(node){
return document.defaultView.getComputedStyle(node,null);
};
}
dojo.html.getStyleProperty=function(node,_1d8){
node=dojo.byId(node);
return (node&&node.style?node.style[dojo.html.toCamelCase(_1d8)]:undefined);
};
dojo.html.getStyle=function(node,_1da){
var _1db=dojo.html.getStyleProperty(node,_1da);
return (_1db?_1db:dojo.html.getComputedStyle(node,_1da));
};
dojo.html.setStyle=function(node,_1dd,_1de){
node=dojo.byId(node);
if(node&&node.style){
var _1df=dojo.html.toCamelCase(_1dd);
node.style[_1df]=_1de;
}
};
dojo.html.setStyleText=function(_1e0,text){
try{
_1e0.style.cssText=text;
}
catch(e){
_1e0.setAttribute("style",text);
}
};
dojo.html.copyStyle=function(_1e2,_1e3){
if(!_1e3.style.cssText){
_1e2.setAttribute("style",_1e3.getAttribute("style"));
}else{
_1e2.style.cssText=_1e3.style.cssText;
}
dojo.html.addClass(_1e2,dojo.html.getClass(_1e3));
};
dojo.html.getUnitValue=function(node,_1e5,_1e6){
var s=dojo.html.getComputedStyle(node,_1e5);
if((!s)||((s=="auto")&&(_1e6))){
return {value:0,units:"px"};
}
var _1e8=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_1e8){
return dojo.html.getUnitValue.bad;
}
return {value:Number(_1e8[1]),units:_1e8[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
if(dojo.render.html.ie){
dojo.html.toPixelValue=function(_1e9,_1ea){
if(!_1ea){
return 0;
}
if(_1ea.slice(-2)=="px"){
return parseFloat(_1ea);
}
var _1eb=0;
with(_1e9){
var _1ec=style.left;
var _1ed=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_1ea||0;
_1eb=style.pixelLeft;
style.left=_1ec;
runtimeStyle.left=_1ed;
}
catch(e){
}
}
return _1eb;
};
}else{
dojo.html.toPixelValue=function(_1ee,_1ef){
return (_1ef&&(_1ef.slice(-2)=="px")?parseFloat(_1ef):0);
};
}
dojo.html.getPixelValue=function(node,_1f1,_1f2){
return dojo.html.toPixelValue(node,dojo.html.getComputedStyle(node,_1f1));
};
dojo.html.setPositivePixelValue=function(node,_1f4,_1f5){
if(isNaN(_1f5)){
return false;
}
node.style[_1f4]=Math.max(0,_1f5)+"px";
return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_1f6,_1f7,_1f8){
if(!dojo.html.styleSheet){
if(document.createStyleSheet){
dojo.html.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.html.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.html.styleSheet.cssRules){
_1f8=dojo.html.styleSheet.cssRules.length;
}else{
if(dojo.html.styleSheet.rules){
_1f8=dojo.html.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.html.styleSheet.insertRule){
var rule=_1f6+" { "+_1f7+" }";
return dojo.html.styleSheet.insertRule(rule,_1f8);
}else{
if(dojo.html.styleSheet.addRule){
return dojo.html.styleSheet.addRule(_1f6,_1f7,_1f8);
}else{
return null;
}
}
};
dojo.html.removeCssRule=function(_1fa){
if(!dojo.html.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.render.html.ie){
if(!_1fa){
_1fa=dojo.html.styleSheet.rules.length;
dojo.html.styleSheet.removeRule(_1fa);
}
}else{
if(document.styleSheets[0]){
if(!_1fa){
_1fa=dojo.html.styleSheet.cssRules.length;
}
dojo.html.styleSheet.deleteRule(_1fa);
}
}
return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_1fd,_1fe){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _1ff=dojo.hostenv.getText(URI,false,_1fe);
if(_1ff===null){
return;
}
_1ff=dojo.html.fixPathsInCssText(_1ff,URI);
if(_1fd){
var idx=-1,node,ent=dojo.html._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_1ff)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _204=doc.getElementsByTagName("style");
for(var i=0;i<_204.length;i++){
if(_204[i]==node){
return;
}
}
dojo.html._insertedCssFiles.shift(idx,1);
}
}
var _205=dojo.html.insertCssText(_1ff,doc);
dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_1ff,"nodeRef":_205});
if(_205&&djConfig.isDebug){
_205.setAttribute("dbgHref",URI);
}
return _205;
};
dojo.html.insertCssText=function(_206,doc,URI){
if(!_206){
return;
}
if(!doc){
doc=document;
}
if(URI){
_206=dojo.html.fixPathsInCssText(_206,URI);
}
var _209=doc.createElement("style");
_209.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_209);
}
if(_209.styleSheet){
var _20b=function(){
try{
_209.styleSheet.cssText=_206;
}
catch(e){
dojo.debug(e);
}
};
if(_209.styleSheet.disabled){
setTimeout(_20b,10);
}else{
_20b();
}
}else{
var _20c=doc.createTextNode(_206);
_209.appendChild(_20c);
}
return _209;
};
dojo.html.fixPathsInCssText=function(_20d,URI){
if(!_20d||!URI){
return;
}
var _20f,str="",url="",_212="[\\t\\s\\w\\(\\)\\/\\.\\\\'\"-:#=&?~]+";
var _213=new RegExp("url\\(\\s*("+_212+")\\s*\\)");
var _214=/(file|https?|ftps?):\/\//;
regexTrim=new RegExp("^[\\s]*(['\"]?)("+_212+")\\1[\\s]*?$");
if(dojo.render.html.ie55||dojo.render.html.ie60){
var _215=new RegExp("AlphaImageLoader\\((.*)src=['\"]("+_212+")['\"]");
while(_20f=_215.exec(_20d)){
url=_20f[2].replace(regexTrim,"$2");
if(!_214.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_20d.substring(0,_20f.index)+"AlphaImageLoader("+_20f[1]+"src='"+url+"'";
_20d=_20d.substr(_20f.index+_20f[0].length);
}
_20d=str+_20d;
str="";
}
while(_20f=_213.exec(_20d)){
url=_20f[1].replace(regexTrim,"$2");
if(!_214.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_20d.substring(0,_20f.index)+"url("+url+")";
_20d=_20d.substr(_20f.index+_20f[0].length);
}
return str+_20d;
};
dojo.html.setActiveStyleSheet=function(_216){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_216){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.applyBrowserClass=function(node){
var drh=dojo.render.html;
var _222={dj_ie:drh.ie,dj_ie55:drh.ie55,dj_ie6:drh.ie60,dj_ie7:drh.ie70,dj_iequirks:drh.ie&&drh.quirks,dj_opera:drh.opera,dj_opera8:drh.opera&&(Math.floor(dojo.render.version)==8),dj_opera9:drh.opera&&(Math.floor(dojo.render.version)==9),dj_khtml:drh.khtml,dj_safari:drh.safari,dj_gecko:drh.mozilla};
for(var p in _222){
if(_222[p]){
dojo.html.addClass(node,p);
}
}
};
dojo.kwCompoundRequire({common:["dojo.html.common","dojo.html.style"]});
dojo.provide("dojo.html.*");
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_225,_226){
node=dojo.byId(node);
_226(node,!_225(node));
return _225(node);
};
dojo.html.show=function(node){
node=dojo.byId(node);
if(dojo.html.getStyleProperty(node,"display")=="none"){
dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
dojo.html.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=dojo.html.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_22b){
dojo.html[(_22b?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
}
};
dojo.html.setDisplay=function(node,_231){
dojo.html.setStyle(node,"display",((_231 instanceof String||typeof _231=="string")?_231:(_231?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_235){
dojo.html.setStyle(node,"visibility",((_235 instanceof String||typeof _235=="string")?_235:(_235?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_239,_23a){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_23a){
if(_239>=1){
if(h.ie){
dojo.html.clearOpacity(node);
return;
}else{
_239=0.999999;
}
}else{
if(_239<0){
_239=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_239*100+")";
}
}
node.style.filter="Alpha(Opacity="+_239*100+")";
}else{
if(h.moz){
node.style.opacity=_239;
node.style.MozOpacity=_239;
}else{
if(h.safari){
node.style.opacity=_239;
node.style.KhtmlOpacity=_239;
}else{
node.style.opacity=_239;
}
}
}
};
dojo.html.clearOpacity=function(node){
node=dojo.byId(node);
var ns=node.style;
var h=dojo.render.html;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
dojo.html.getOpacity=function(node){
node=dojo.byId(node);
var h=dojo.render.html;
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _246=0;
while(node){
if(dojo.html.getComputedStyle(node,"position")=="fixed"){
return 0;
}
var val=node[prop];
if(val){
_246+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _246;
};
dojo.html.setStyleAttributes=function(node,_249){
node=dojo.byId(node);
var _24a=_249.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_24a.length;i++){
var _24c=_24a[i].split(":");
var name=_24c[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _24e=_24c[1].replace(/\s*$/,"").replace(/^\s*/,"");
switch(name){
case "opacity":
dojo.html.setOpacity(node,_24e);
break;
case "content-height":
dojo.html.setContentBox(node,{height:_24e});
break;
case "content-width":
dojo.html.setContentBox(node,{width:_24e});
break;
case "outer-height":
dojo.html.setMarginBox(node,{height:_24e});
break;
case "outer-width":
dojo.html.setMarginBox(node,{width:_24e});
break;
default:
node.style[dojo.html.toCamelCase(name)]=_24e;
}
}
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_250,_251){
node=dojo.byId(node,node.ownerDocument);
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_251){
_251=bs.CONTENT_BOX;
}
var _254=2;
var _255;
switch(_251){
case bs.MARGIN_BOX:
_255=3;
break;
case bs.BORDER_BOX:
_255=2;
break;
case bs.PADDING_BOX:
default:
_255=1;
break;
case bs.CONTENT_BOX:
_255=0;
break;
}
var h=dojo.render.html;
var db=document["body"]||document["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
_254=1;
try{
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _259;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_259=db;
}else{
_259=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _25b=node;
do{
var n=_25b["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_25b["offsetTop"];
ret.y+=isNaN(m)?0:m;
_25b=_25b.offsetParent;
}while((_25b!=_259)&&(_25b!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_250){
var _25e=dojo.html.getScroll();
ret.y+=_25e.top;
ret.x+=_25e.left;
}
var _25f=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_254>_255){
for(var i=_255;i<_254;++i){
ret.y+=_25f[i](node,"top");
ret.x+=_25f[i](node,"left");
}
}else{
if(_254<_255){
for(var i=_255;i>_254;--i){
ret.y-=_25f[i-1](node,"top");
ret.x-=_25f[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.isPositionAbsolute=function(node){
return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_263,_264){
var _265=0;
for(var x=0;x<_263.length;x++){
_265+=dojo.html.getPixelValue(node,_263[x],_264);
}
return _265;
};
dojo.html.getMargin=function(node){
return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
var pad=dojo.html.getPadding(node);
var _272=dojo.html.getBorder(node);
return {width:pad.width+_272.width,height:pad.height+_272.height};
};
dojo.html.getBoxSizing=function(node){
var h=dojo.render.html;
var bs=dojo.html.boxSizing;
if(((h.ie)||(h.opera))&&node.nodeName.toLowerCase()!="img"){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _277;
if(!h.ie){
_277=dojo.html.getStyle(node,"-moz-box-sizing");
if(!_277){
_277=dojo.html.getStyle(node,"box-sizing");
}
}
return (_277?_277:bs.CONTENT_BOX);
}
};
dojo.html.isBorderBox=function(node){
return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
var box=dojo.html.getBorderBox(node);
var _27c=dojo.html.getBorder(node);
return {width:box.width-_27c.width,height:box.height-_27c.height};
};
dojo.html.getContentBox=function(node){
node=dojo.byId(node);
var _27e=dojo.html.getPadBorder(node);
return {width:node.offsetWidth-_27e.width,height:node.offsetHeight-_27e.height};
};
dojo.html.setContentBox=function(node,args){
node=dojo.byId(node);
var _281=0;
var _282=0;
var isbb=dojo.html.isBorderBox(node);
var _284=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var ret={};
if(typeof args.width!="undefined"){
_281=args.width+_284.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_281);
}
if(typeof args.height!="undefined"){
_282=args.height+_284.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_282);
}
return ret;
};
dojo.html.getMarginBox=function(node){
var _287=dojo.html.getBorderBox(node);
var _288=dojo.html.getMargin(node);
return {width:_287.width+_288.width,height:_287.height+_288.height};
};
dojo.html.setMarginBox=function(node,args){
node=dojo.byId(node);
var _28b=0;
var _28c=0;
var isbb=dojo.html.isBorderBox(node);
var _28e=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var _28f=dojo.html.getMargin(node);
var ret={};
if(typeof args.width!="undefined"){
_28b=args.width-_28e.width;
_28b-=_28f.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_28b);
}
if(typeof args.height!="undefined"){
_28c=args.height-_28e.height;
_28c-=_28f.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_28c);
}
return ret;
};
dojo.html.getElementBox=function(node,type){
var bs=dojo.html.boxSizing;
switch(type){
case bs.MARGIN_BOX:
return dojo.html.getMarginBox(node);
case bs.BORDER_BOX:
return dojo.html.getBorderBox(node);
case bs.PADDING_BOX:
return dojo.html.getPaddingBox(node);
case bs.CONTENT_BOX:
default:
return dojo.html.getContentBox(node);
}
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_294,_295,_296){
if(_294 instanceof Array||typeof _294=="array"){
dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
while(_294.length<4){
_294.push(0);
}
while(_294.length>4){
_294.pop();
}
var ret={left:_294[0],top:_294[1],width:_294[2],height:_294[3]};
}else{
if(!_294.nodeType&&!(_294 instanceof String||typeof _294=="string")&&("width" in _294||"height" in _294||"left" in _294||"x" in _294||"top" in _294||"y" in _294)){
var ret={left:_294.left||_294.x||0,top:_294.top||_294.y||0,width:_294.width||0,height:_294.height||0};
}else{
var node=dojo.byId(_294);
var pos=dojo.html.abs(node,_295,_296);
var _29a=dojo.html.getMarginBox(node);
var ret={left:pos.left,top:pos.top,width:_29a.width,height:_29a.height};
}
}
ret.x=ret.left;
ret.y=ret.top;
return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_29c){
return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_29f){
return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_2a1){
return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_2a3){
return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_2a5){
return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_2a7){
return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_2b1){
return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_2b3){
return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_2b4){
return dojo.html.getDocumentWindow(_2b4.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
var fix=function(win){
win.document._parentWindow=win;
for(var i=0;i<win.frames.length;i++){
fix(win.frames[i]);
}
};
fix(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _2bc=dojo.html.getCursorPosition(e);
with(dojo.html){
var _2bd=getAbsolutePosition(node,true);
var bb=getBorderBox(node);
var _2bf=_2bd.x+(bb.width/2);
var _2c0=_2bd.y+(bb.height/2);
}
with(dojo.html.gravity){
return ((_2bc.x<_2bf?WEST:EAST)|(_2bc.y<_2c0?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_2c1,e){
_2c1=dojo.byId(_2c1);
var _2c3=dojo.html.getCursorPosition(e);
var bb=dojo.html.getBorderBox(_2c1);
var _2c5=dojo.html.getAbsolutePosition(_2c1,true,dojo.html.boxSizing.BORDER_BOX);
var top=_2c5.y;
var _2c7=top+bb.height;
var left=_2c5.x;
var _2c9=left+bb.width;
return (_2c3.x>=left&&_2c3.x<=_2c9&&_2c3.y>=top&&_2c3.y<=_2c7);
};
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _2cb="";
if(node==null){
return _2cb;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _2cd="unknown";
try{
_2cd=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_2cd){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_2cb+="\n";
_2cb+=dojo.html.renderedTextContent(node.childNodes[i]);
_2cb+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_2cb+="\n";
}else{
_2cb+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _2cf="unknown";
try{
_2cf=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_2cf){
case "capitalize":
var _2d0=text.split(" ");
for(var i=0;i<_2d0.length;i++){
_2d0[i]=_2d0[i].charAt(0).toUpperCase()+_2d0[i].substring(1);
}
text=_2d0.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_2cf){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_2cb)){
text.replace(/^\s/,"");
}
break;
}
_2cb+=text;
break;
default:
break;
}
}
return _2cb;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=txt.replace(/^\s+|\s+$/g,"");
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _2d4="none";
if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_2d4="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody>"+txt+"</tbody></table>";
_2d4="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table>"+txt+"</table>";
_2d4="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _2d5=null;
switch(_2d4){
case "cell":
_2d5=tn.getElementsByTagName("tr")[0];
break;
case "row":
_2d5=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_2d5=tn.getElementsByTagName("table")[0];
break;
default:
_2d5=tn;
break;
}
var _2d6=[];
for(var x=0;x<_2d5.childNodes.length;x++){
_2d6.push(_2d5.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.html.destroyNode(tn);
return _2d6;
};
dojo.html.placeOnScreen=function(node,_2d9,_2da,_2db,_2dc,_2dd,_2de){
if(_2d9 instanceof Array||typeof _2d9=="array"){
_2de=_2dd;
_2dd=_2dc;
_2dc=_2db;
_2db=_2da;
_2da=_2d9[1];
_2d9=_2d9[0];
}
if(_2dd instanceof String||typeof _2dd=="string"){
_2dd=_2dd.split(",");
}
if(!isNaN(_2db)){
_2db=[Number(_2db),Number(_2db)];
}else{
if(!(_2db instanceof Array||typeof _2db=="array")){
_2db=[0,0];
}
}
var _2df=dojo.html.getScroll().offset;
var view=dojo.html.getViewport();
node=dojo.byId(node);
var _2e1=node.style.display;
node.style.display="";
var bb=dojo.html.getBorderBox(node);
var w=bb.width;
var h=bb.height;
node.style.display=_2e1;
if(!(_2dd instanceof Array||typeof _2dd=="array")){
_2dd=["TL"];
}
var _2e5,_2e6,_2e7=Infinity,_2e8;
for(var _2e9=0;_2e9<_2dd.length;++_2e9){
var _2ea=_2dd[_2e9];
var _2eb=true;
var tryX=_2d9-(_2ea.charAt(1)=="L"?0:w)+_2db[0]*(_2ea.charAt(1)=="L"?1:-1);
var tryY=_2da-(_2ea.charAt(0)=="T"?0:h)+_2db[1]*(_2ea.charAt(0)=="T"?1:-1);
if(_2dc){
tryX-=_2df.x;
tryY-=_2df.y;
}
if(tryX<0){
tryX=0;
_2eb=false;
}
if(tryY<0){
tryY=0;
_2eb=false;
}
var x=tryX+w;
if(x>view.width){
x=view.width-w;
_2eb=false;
}else{
x=tryX;
}
x=Math.max(_2db[0],x)+_2df.x;
var y=tryY+h;
if(y>view.height){
y=view.height-h;
_2eb=false;
}else{
y=tryY;
}
y=Math.max(_2db[1],y)+_2df.y;
if(_2eb){
_2e5=x;
_2e6=y;
_2e7=0;
_2e8=_2ea;
break;
}else{
var dist=Math.pow(x-tryX-_2df.x,2)+Math.pow(y-tryY-_2df.y,2);
if(_2e7>dist){
_2e7=dist;
_2e5=x;
_2e6=y;
_2e8=_2ea;
}
}
}
if(!_2de){
node.style.left=_2e5+"px";
node.style.top=_2e6+"px";
}
return {left:_2e5,top:_2e6,x:_2e5,y:_2e6,dist:_2e7,corner:_2e8};
};
dojo.html.placeOnScreenPoint=function(node,_2f2,_2f3,_2f4,_2f5){
dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
return dojo.html.placeOnScreen(node,_2f2,_2f3,_2f4,_2f5,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_2f7,_2f8,_2f9,_2fa,_2fb){
var best,_2fd=Infinity;
_2f7=dojo.byId(_2f7);
var _2fe=_2f7.style.display;
_2f7.style.display="";
var mb=dojo.html.getElementBox(_2f7,_2f9);
var _300=mb.width;
var _301=mb.height;
var _302=dojo.html.getAbsolutePosition(_2f7,true,_2f9);
_2f7.style.display=_2fe;
for(var _303 in _2fa){
var pos,_305,_306;
var _307=_2fa[_303];
_305=_302.x+(_303.charAt(1)=="L"?0:_300);
_306=_302.y+(_303.charAt(0)=="T"?0:_301);
pos=dojo.html.placeOnScreen(node,_305,_306,_2f8,true,_307,true);
if(pos.dist==0){
best=pos;
break;
}else{
if(_2fd>pos.dist){
_2fd=pos.dist;
best=pos;
}
}
}
if(!_2fb){
node.style.left=best.left+"px";
node.style.top=best.top+"px";
}
return best;
};
dojo.html.scrollIntoView=function(node){
if(!node){
return;
}
if(dojo.render.html.ie){
if(dojo.html.getBorderBox(node.parentNode).height<=node.parentNode.scrollHeight){
node.scrollIntoView(false);
}
}else{
if(dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _309=node.parentNode;
var _30a=_309.scrollTop+dojo.html.getBorderBox(_309).height;
var _30b=node.offsetTop+dojo.html.getMarginBox(node).height;
if(_30a<_30b){
_309.scrollTop+=(_30b-_30a);
}else{
if(_309.scrollTop>node.offsetTop){
_309.scrollTop-=(_309.scrollTop-node.offsetTop);
}
}
}
}
};
dojo.provide("dojo.lang.array");
dojo.lang.mixin(dojo.lang,{has:function(obj,name){
try{
return typeof obj[name]!="undefined";
}
catch(e){
return false;
}
},isEmpty:function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _310=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_310++;
break;
}
}
return _310==0;
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
},map:function(arr,obj,_314){
var _315=dojo.lang.isString(arr);
if(_315){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_314)){
_314=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_314){
var _316=obj;
obj=_314;
_314=_316;
}
}
if(Array.map){
var _317=Array.map(arr,_314,obj);
}else{
var _317=[];
for(var i=0;i<arr.length;++i){
_317.push(_314.call(obj,arr[i]));
}
}
if(_315){
return _317.join("");
}else{
return _317;
}
},reduce:function(arr,_31a,obj,_31c){
var _31d=_31a;
if(arguments.length==2){
_31c=_31a;
_31d=arr[0];
arr=arr.slice(1);
}else{
if(arguments.length==3){
if(dojo.lang.isFunction(obj)){
_31c=obj;
obj=null;
}
}else{
if(dojo.lang.isFunction(obj)){
var tmp=_31c;
_31c=obj;
obj=tmp;
}
}
}
var ob=obj||dj_global;
dojo.lang.map(arr,function(val){
_31d=_31c.call(ob,_31d,val);
});
return _31d;
},forEach:function(_321,_322,_323){
if(dojo.lang.isString(_321)){
_321=_321.split("");
}
if(Array.forEach){
Array.forEach(_321,_322,_323);
}else{
if(!_323){
_323=dj_global;
}
for(var i=0,l=_321.length;i<l;i++){
_322.call(_323,_321[i],i,_321);
}
}
},_everyOrSome:function(_326,arr,_328,_329){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[_326?"every":"some"](arr,_328,_329);
}else{
if(!_329){
_329=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _32c=_328.call(_329,arr[i],i,arr);
if(_326&&!_32c){
return false;
}else{
if((!_326)&&(_32c)){
return true;
}
}
}
return Boolean(_326);
}
},every:function(arr,_32e,_32f){
return this._everyOrSome(true,arr,_32e,_32f);
},some:function(arr,_331,_332){
return this._everyOrSome(false,arr,_331,_332);
},filter:function(arr,_334,_335){
var _336=dojo.lang.isString(arr);
if(_336){
arr=arr.split("");
}
var _337;
if(Array.filter){
_337=Array.filter(arr,_334,_335);
}else{
if(!_335){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_335=dj_global;
}
_337=[];
for(var i=0;i<arr.length;i++){
if(_334.call(_335,arr[i],i,arr)){
_337.push(arr[i]);
}
}
}
if(_336){
return _337.join("");
}else{
return _337;
}
},unnest:function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
},toArray:function(_33c,_33d){
var _33e=[];
for(var i=_33d||0;i<_33c.length;i++){
_33e.push(_33c[i]);
}
return _33e;
}});
dojo.provide("dojo.gfx.color");
dojo.gfx.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.gfx.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.gfx.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.gfx.color.Color.fromArray=function(arr){
return new dojo.gfx.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.extend(dojo.gfx.color.Color,{toRgb:function(_346){
if(_346){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.gfx.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_347,_348){
var rgb=null;
if(dojo.lang.isArray(_347)){
rgb=_347;
}else{
if(_347 instanceof dojo.gfx.color.Color){
rgb=_347.toRgb();
}else{
rgb=new dojo.gfx.color.Color(_347).toRgb();
}
}
return dojo.gfx.color.blend(this.toRgb(),rgb,_348);
}});
dojo.gfx.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],lime:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.gfx.color.blend=function(a,b,_34c){
if(typeof a=="string"){
return dojo.gfx.color.blendHex(a,b,_34c);
}
if(!_34c){
_34c=0;
}
_34c=Math.min(Math.max(-1,_34c),1);
_34c=((_34c+1)/2);
var c=[];
for(var x=0;x<3;x++){
c[x]=parseInt(b[x]+((a[x]-b[x])*_34c));
}
return c;
};
dojo.gfx.color.blendHex=function(a,b,_351){
return dojo.gfx.color.rgb2hex(dojo.gfx.color.blend(dojo.gfx.color.hex2rgb(a),dojo.gfx.color.hex2rgb(b),_351));
};
dojo.gfx.color.extractRGB=function(_352){
var hex="0123456789abcdef";
_352=_352.toLowerCase();
if(_352.indexOf("rgb")==0){
var _354=_352.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_354.splice(1,3);
return ret;
}else{
var _356=dojo.gfx.color.hex2rgb(_352);
if(_356){
return _356;
}else{
return dojo.gfx.color.named[_352]||[255,255,255];
}
}
};
dojo.gfx.color.hex2rgb=function(hex){
var _358="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_358+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_358.indexOf(rgb[i].charAt(0))*16+_358.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.gfx.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_361,_362){
var fcn=(dojo.lang.isString(_362)?_361[_362]:_362)||function(){
};
return function(){
return fcn.apply(_361,arguments);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_364,_365,_366){
var nso=(_365||dojo.lang.anon);
if((_366)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
try{
if(nso[x]===_364){
return x;
}
}
catch(e){
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_364;
return ret;
};
dojo.lang.forward=function(_36a){
return function(){
return this[_36a].apply(this,arguments);
};
};
dojo.lang.curry=function(_36b,func){
var _36d=[];
_36b=_36b||dj_global;
if(dojo.lang.isString(func)){
func=_36b[func];
}
for(var x=2;x<arguments.length;x++){
_36d.push(arguments[x]);
}
var _36f=(func["__preJoinArity"]||func.length)-_36d.length;
function gather(_370,_371,_372){
var _373=_372;
var _374=_371.slice(0);
for(var x=0;x<_370.length;x++){
_374.push(_370[x]);
}
_372=_372-_370.length;
if(_372<=0){
var res=func.apply(_36b,_374);
_372=_373;
return res;
}else{
return function(){
return gather(arguments,_374,_372);
};
}
}
return gather([],_36d,_36f);
};
dojo.lang.curryArguments=function(_377,func,args,_37a){
var _37b=[];
var x=_37a||0;
for(x=_37a;x<args.length;x++){
_37b.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[_377,func].concat(_37b));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_381,_382){
if(!farr.length){
if(typeof _382=="function"){
_382();
}
return;
}
if((typeof _381=="undefined")&&(typeof cb=="number")){
_381=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_381){
_381=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_381,_382);
},_381);
};
dojo.provide("dojo.lfx.Animation");
dojo.lfx.Line=function(_383,end){
this.start=_383;
this.end=end;
if(dojo.lang.isArray(_383)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_383;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
if((dojo.render.html.khtml)&&(!dojo.render.html.safari)){
dojo.lfx.easeDefault=function(n){
return (parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2));
};
}else{
dojo.lfx.easeDefault=function(n){
return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
};
}
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:10,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_393,_394){
if(!_394){
_394=_393;
_393=this;
}
_394=dojo.lang.hitch(_393,_394);
var _395=this[evt]||function(){
};
this[evt]=function(){
var ret=_395.apply(this,arguments);
_394.apply(this,arguments);
return ret;
};
return this;
},fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
return this;
},repeat:function(_399){
this.repeatCount=_399;
return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_39a,_39b,_39c,_39d,_39e,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_39a)||(!_39a&&_39b.getValue)){
rate=_39e;
_39e=_39d;
_39d=_39c;
_39c=_39b;
_39b=_39a;
_39a=null;
}else{
if(_39a.getValue||dojo.lang.isArray(_39a)){
rate=_39d;
_39e=_39c;
_39d=_39b;
_39c=_39a;
_39b=null;
_39a=null;
}
}
if(dojo.lang.isArray(_39c)){
this.curve=new dojo.lfx.Line(_39c[0],_39c[1]);
}else{
this.curve=_39c;
}
if(_39b!=null&&_39b>0){
this.duration=_39b;
}
if(_39e){
this.repeatCount=_39e;
}
if(rate){
this.rate=rate;
}
if(_39a){
dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
if(_39a[item]){
this.connect(item,_39a[item]);
}
},this);
}
if(_39d&&dojo.lang.isFunction(_39d)){
this.easing=_39d;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_3a1,_3a2){
if(_3a2){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_3a1>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_3a2);
}),_3a1);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _3a4=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_3a4]);
this.fire("onBegin",[_3a4]);
}
this.fire("handler",["play",_3a4]);
this.fire("onPlay",[_3a4]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _3a5=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_3a5]);
this.fire("onPause",[_3a5]);
return this;
},gotoPercent:function(pct,_3a7){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_3a7){
this.play();
}
return this;
},stop:function(_3a8){
clearTimeout(this._timer);
var step=this._percent/100;
if(_3a8){
step=1;
}
var _3aa=this.curve.getValue(step);
this.fire("handler",["stop",_3aa]);
this.fire("onStop",[_3aa]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
return this;
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _3ad=this.curve.getValue(step);
this.fire("handler",["animate",_3ad]);
this.fire("onAnimate",[_3ad]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(_3ae){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _3af=arguments;
if(_3af.length==1&&(dojo.lang.isArray(_3af[0])||dojo.lang.isArrayLike(_3af[0]))){
_3af=_3af[0];
}
dojo.lang.forEach(_3af,function(anim){
this._anims.push(anim);
anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
},this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_3b1,_3b2){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_3b1>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_3b2);
}),_3b1);
return this;
}
if(_3b2||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_3b2);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_3b3){
this.fire("onStop");
this._animsCall("stop",_3b3);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_3b4){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _3b7=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_3b4](args);
},_3b7);
return this;
}});
dojo.lfx.Chain=function(_3b9){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _3ba=arguments;
if(_3ba.length==1&&(dojo.lang.isArray(_3ba[0])||dojo.lang.isArrayLike(_3ba[0]))){
_3ba=_3ba[0];
}
var _3bb=this;
dojo.lang.forEach(_3ba,function(anim,i,_3be){
this._anims.push(anim);
if(i<_3be.length-1){
anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
}else{
anim.connect("onEnd",dojo.lang.hitch(this,function(){
this.fire("onEnd");
}));
}
},this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_3bf,_3c0){
if(!this._anims.length){
return this;
}
if(_3c0||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _3c1=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_3bf>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_3c0);
}),_3bf);
return this;
}
if(_3c1){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_3c1.play(null,_3c0);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _3c2=this._anims[this._currAnim];
if(_3c2){
if(!_3c2._active||_3c2._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _3c3=this._anims[this._currAnim];
if(_3c3){
_3c3.stop();
this.fire("onStop",[this._currAnim]);
}
return _3c3;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(_3c4){
var _3c5=arguments;
if(dojo.lang.isArray(arguments[0])){
_3c5=arguments[0];
}
if(_3c5.length==1){
return _3c5[0];
}
return new dojo.lfx.Combine(_3c5);
};
dojo.lfx.chain=function(_3c6){
var _3c7=arguments;
if(dojo.lang.isArray(arguments[0])){
_3c7=arguments[0];
}
if(_3c7.length==1){
return _3c7[0];
}
return new dojo.lfx.Chain(_3c7);
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
node=dojo.byId(node);
var _3c9;
do{
_3c9=dojo.html.getStyle(node,"background-color");
if(_3c9.toLowerCase()=="rgba(0, 0, 0, 0)"){
_3c9="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(["transparent",""],_3c9));
if(_3c9=="transparent"){
_3c9=[255,255,255,0];
}else{
_3c9=dojo.gfx.color.extractRGB(_3c9);
}
return _3c9;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_3ca){
if(!_3ca){
return [];
}
if(dojo.lang.isArrayLike(_3ca)){
if(!_3ca.alreadyChecked){
var n=[];
dojo.lang.forEach(_3ca,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _3ca;
}
}else{
var n=[];
n.push(dojo.byId(_3ca));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_3cd,_3ce,_3cf,_3d0,_3d1){
_3cd=dojo.lfx.html._byId(_3cd);
var _3d2={"propertyMap":_3ce,"nodes":_3cd,"duration":_3cf,"easing":_3d0||dojo.lfx.easeDefault};
var _3d3=function(args){
if(args.nodes.length==1){
var pm=args.propertyMap;
if(!dojo.lang.isArray(args.propertyMap)){
var parr=[];
for(var _3d7 in pm){
pm[_3d7].property=_3d7;
parr.push(pm[_3d7]);
}
pm=args.propertyMap=parr;
}
dojo.lang.forEach(pm,function(prop){
if(dj_undef("start",prop)){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
}else{
prop.start=dojo.html.getOpacity(args.nodes[0]);
}
}
});
}
};
var _3d9=function(_3da){
var _3db=[];
dojo.lang.forEach(_3da,function(c){
_3db.push(Math.round(c));
});
return _3db;
};
var _3dd=function(n,_3df){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _3df){
try{
if(s=="opacity"){
dojo.html.setOpacity(n,_3df[s]);
}else{
n.style[s]=_3df[s];
}
}
catch(e){
dojo.debug(e);
}
}
};
var _3e1=function(_3e2){
this._properties=_3e2;
this.diffs=new Array(_3e2.length);
dojo.lang.forEach(_3e2,function(prop,i){
if(dojo.lang.isFunction(prop.start)){
prop.start=prop.start(prop,i);
}
if(dojo.lang.isFunction(prop.end)){
prop.end=prop.end(prop,i);
}
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.gfx.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _3e9=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.gfx.color.Color){
_3e9=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_3e9+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_3e9+=")";
}else{
_3e9=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.html.toCamelCase(prop.property)]=_3e9;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({beforeBegin:function(){
_3d3(_3d2);
anim.curve=new _3e1(_3d2.propertyMap);
},onAnimate:function(_3ec){
dojo.lang.forEach(_3d2.nodes,function(node){
_3dd(node,_3ec);
});
}},_3d2.duration,null,_3d2.easing);
if(_3d1){
for(var x in _3d1){
if(dojo.lang.isFunction(_3d1[x])){
anim.connect(x,anim,_3d1[x]);
}
}
}
return anim;
};
dojo.lfx.html._makeFadeable=function(_3ef){
var _3f0=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_3ef)){
dojo.lang.forEach(_3ef,_3f0);
}else{
_3f0(_3ef);
}
};
dojo.lfx.html.fade=function(_3f2,_3f3,_3f4,_3f5,_3f6){
_3f2=dojo.lfx.html._byId(_3f2);
var _3f7={property:"opacity"};
if(!dj_undef("start",_3f3)){
_3f7.start=_3f3.start;
}else{
_3f7.start=function(){
return dojo.html.getOpacity(_3f2[0]);
};
}
if(!dj_undef("end",_3f3)){
_3f7.end=_3f3.end;
}else{
dojo.raise("dojo.lfx.html.fade needs an end value");
}
var anim=dojo.lfx.propertyAnimation(_3f2,[_3f7],_3f4,_3f5);
anim.connect("beforeBegin",function(){
dojo.lfx.html._makeFadeable(_3f2);
});
if(_3f6){
anim.connect("onEnd",function(){
_3f6(_3f2,anim);
});
}
return anim;
};
dojo.lfx.html.fadeIn=function(_3f9,_3fa,_3fb,_3fc){
return dojo.lfx.html.fade(_3f9,{end:1},_3fa,_3fb,_3fc);
};
dojo.lfx.html.fadeOut=function(_3fd,_3fe,_3ff,_400){
return dojo.lfx.html.fade(_3fd,{end:0},_3fe,_3ff,_400);
};
dojo.lfx.html.fadeShow=function(_401,_402,_403,_404){
_401=dojo.lfx.html._byId(_401);
dojo.lang.forEach(_401,function(node){
dojo.html.setOpacity(node,0);
});
var anim=dojo.lfx.html.fadeIn(_401,_402,_403,_404);
anim.connect("beforeBegin",function(){
if(dojo.lang.isArrayLike(_401)){
dojo.lang.forEach(_401,dojo.html.show);
}else{
dojo.html.show(_401);
}
});
return anim;
};
dojo.lfx.html.fadeHide=function(_407,_408,_409,_40a){
var anim=dojo.lfx.html.fadeOut(_407,_408,_409,function(){
if(dojo.lang.isArrayLike(_407)){
dojo.lang.forEach(_407,dojo.html.hide);
}else{
dojo.html.hide(_407);
}
if(_40a){
_40a(_407,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_40c,_40d,_40e,_40f){
_40c=dojo.lfx.html._byId(_40c);
var _410=[];
dojo.lang.forEach(_40c,function(node){
var _412={};
var _413,_414,_415;
with(node.style){
_413=top;
_414=left;
_415=position;
top="-9999px";
left="-9999px";
position="absolute";
display="";
}
var _416=dojo.html.getBorderBox(node).height;
with(node.style){
top=_413;
left=_414;
position=_415;
display="none";
}
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:1,end:function(){
return _416;
}}},_40d,_40e);
anim.connect("beforeBegin",function(){
_412.overflow=node.style.overflow;
_412.height=node.style.height;
with(node.style){
overflow="hidden";
height="1px";
}
dojo.html.show(node);
});
anim.connect("onEnd",function(){
with(node.style){
overflow=_412.overflow;
height=_412.height;
}
if(_40f){
_40f(node,anim);
}
});
_410.push(anim);
});
return dojo.lfx.combine(_410);
};
dojo.lfx.html.wipeOut=function(_418,_419,_41a,_41b){
_418=dojo.lfx.html._byId(_418);
var _41c=[];
dojo.lang.forEach(_418,function(node){
var _41e={};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
return dojo.html.getContentBox(node).height;
},end:1}},_419,_41a,{"beforeBegin":function(){
_41e.overflow=node.style.overflow;
_41e.height=node.style.height;
with(node.style){
overflow="hidden";
}
dojo.html.show(node);
},"onEnd":function(){
dojo.html.hide(node);
with(node.style){
overflow=_41e.overflow;
height=_41e.height;
}
if(_41b){
_41b(node,anim);
}
}});
_41c.push(anim);
});
return dojo.lfx.combine(_41c);
};
dojo.lfx.html.slideTo=function(_420,_421,_422,_423,_424){
_420=dojo.lfx.html._byId(_420);
var _425=[];
var _426=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_421)){
dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
_421={top:_421[0],left:_421[1]};
}
dojo.lang.forEach(_420,function(node){
var top=null;
var left=null;
var init=(function(){
var _42b=node;
return function(){
var pos=_426(_42b,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_426(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_426(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_42b,true);
dojo.html.setStyleAttributes(_42b,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_421.top||0)},"left":{start:left,end:(_421.left||0)}},_422,_423,{"beforeBegin":init});
if(_424){
anim.connect("onEnd",function(){
_424(_420,anim);
});
}
_425.push(anim);
});
return dojo.lfx.combine(_425);
};
dojo.lfx.html.slideBy=function(_42f,_430,_431,_432,_433){
_42f=dojo.lfx.html._byId(_42f);
var _434=[];
var _435=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_430)){
dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
_430={top:_430[0],left:_430[1]};
}
dojo.lang.forEach(_42f,function(node){
var top=null;
var left=null;
var init=(function(){
var _43a=node;
return function(){
var pos=_435(_43a,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_435(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_435(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_43a,true);
dojo.html.setStyleAttributes(_43a,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_430.top||0)},"left":{start:left,end:left+(_430.left||0)}},_431,_432).connect("beforeBegin",init);
if(_433){
anim.connect("onEnd",function(){
_433(_42f,anim);
});
}
_434.push(anim);
});
return dojo.lfx.combine(_434);
};
dojo.lfx.html.explode=function(_43e,_43f,_440,_441,_442){
var h=dojo.html;
_43e=dojo.byId(_43e);
_43f=dojo.byId(_43f);
var _444=h.toCoordinateObject(_43e,true);
var _445=document.createElement("div");
h.copyStyle(_445,_43f);
if(_43f.explodeClassName){
_445.className=_43f.explodeClassName;
}
with(_445.style){
position="absolute";
display="none";
var _446=h.getStyle(_43e,"background-color");
backgroundColor=_446?_446.toLowerCase():"transparent";
backgroundColor=(backgroundColor=="transparent")?"rgb(221, 221, 221)":backgroundColor;
}
dojo.body().appendChild(_445);
with(_43f.style){
visibility="hidden";
display="block";
}
var _447=h.toCoordinateObject(_43f,true);
with(_43f.style){
display="none";
visibility="visible";
}
var _448={opacity:{start:0.5,end:1}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_448[type]={start:_444[type],end:_447[type]};
});
var anim=new dojo.lfx.propertyAnimation(_445,_448,_440,_441,{"beforeBegin":function(){
h.setDisplay(_445,"block");
},"onEnd":function(){
h.setDisplay(_43f,"block");
_445.parentNode.removeChild(_445);
}});
if(_442){
anim.connect("onEnd",function(){
_442(_43f,anim);
});
}
return anim;
};
dojo.lfx.html.implode=function(_44b,end,_44d,_44e,_44f){
var h=dojo.html;
_44b=dojo.byId(_44b);
end=dojo.byId(end);
var _451=dojo.html.toCoordinateObject(_44b,true);
var _452=dojo.html.toCoordinateObject(end,true);
var _453=document.createElement("div");
dojo.html.copyStyle(_453,_44b);
if(_44b.explodeClassName){
_453.className=_44b.explodeClassName;
}
dojo.html.setOpacity(_453,0.3);
with(_453.style){
position="absolute";
display="none";
backgroundColor=h.getStyle(_44b,"background-color").toLowerCase();
}
dojo.body().appendChild(_453);
var _454={opacity:{start:1,end:0.5}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_454[type]={start:_451[type],end:_452[type]};
});
var anim=new dojo.lfx.propertyAnimation(_453,_454,_44d,_44e,{"beforeBegin":function(){
dojo.html.hide(_44b);
dojo.html.show(_453);
},"onEnd":function(){
_453.parentNode.removeChild(_453);
}});
if(_44f){
anim.connect("onEnd",function(){
_44f(_44b,anim);
});
}
return anim;
};
dojo.lfx.html.highlight=function(_457,_458,_459,_45a,_45b){
_457=dojo.lfx.html._byId(_457);
var _45c=[];
dojo.lang.forEach(_457,function(node){
var _45e=dojo.html.getBackgroundColor(node);
var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
var _460=dojo.html.getStyle(node,"background-image");
var _461=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_45e.length>3){
_45e.pop();
}
var rgb=new dojo.gfx.color.Color(_458);
var _463=new dojo.gfx.color.Color(_45e);
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_463}},_459,_45a,{"beforeBegin":function(){
if(_460){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
},"onEnd":function(){
if(_460){
node.style.backgroundImage=_460;
}
if(_461){
node.style.backgroundColor="transparent";
}
if(_45b){
_45b(node,anim);
}
}});
_45c.push(anim);
});
return dojo.lfx.combine(_45c);
};
dojo.lfx.html.unhighlight=function(_465,_466,_467,_468,_469){
_465=dojo.lfx.html._byId(_465);
var _46a=[];
dojo.lang.forEach(_465,function(node){
var _46c=new dojo.gfx.color.Color(dojo.html.getBackgroundColor(node));
var rgb=new dojo.gfx.color.Color(_466);
var _46e=dojo.html.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_46c,end:rgb}},_467,_468,{"beforeBegin":function(){
if(_46e){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_46c.toRgb().join(",")+")";
},"onEnd":function(){
if(_469){
_469(node,anim);
}
}});
_46a.push(anim);
});
return dojo.lfx.combine(_46a);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.kwCompoundRequire({browser:["dojo.lfx.html"],dashboard:["dojo.lfx.html"]});
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(func,_471){
var _472=window,_473=2;
if(!dojo.lang.isFunction(func)){
_472=func;
func=_471;
_471=arguments[2];
_473++;
}
if(dojo.lang.isString(func)){
func=_472[func];
}
var args=[];
for(var i=_473;i<arguments.length;i++){
args.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
func.apply(_472,args);
},_471);
};
dojo.lang.clearTimeout=function(_476){
dojo.global().clearTimeout(_476);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj,deep){
var i,ret;
if(obj===null){
return null;
}
if(dojo.lang.isObject(obj)){
ret=new obj.constructor();
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}
}else{
if(dojo.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}else{
ret=obj;
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_47f,_480,_481){
with(dojo.parseObjPath(_47f,_480,_481)){
return dojo.evalProp(prop,obj,_481);
}
};
dojo.lang.setObjPathValue=function(_482,_483,_484,_485){
dojo.deprecated("dojo.lang.setObjPathValue","use dojo.parseObjPath and the '=' operator","0.6");
if(arguments.length<4){
_485=true;
}
with(dojo.parseObjPath(_482,_484,_485)){
if(obj&&(_485||(prop in obj))){
obj[prop]=_483;
}
}
};
dojo.provide("dojo.event.common");
dojo.event=new function(){
this._canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_487){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false,maxCalls:-1};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _48a=dl.nameAnonFunc(args[2],ao.adviceObj,_487);
ao.adviceFunc=_48a;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _48a=dl.nameAnonFunc(args[0],ao.srcObj,_487);
ao.srcFunc=_48a;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _48a=dl.nameAnonFunc(args[1],dj_global,_487);
ao.srcFunc=_48a;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _48a=dl.nameAnonFunc(args[3],dj_global,_487);
ao.adviceObj=dj_global;
ao.adviceFunc=_48a;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
ao.maxCalls=(!isNaN(parseInt(args[11])))?args[11]:-1;
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _48a=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_487);
ao.aroundFunc=_48a;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
if(!ao.adviceFunc){
dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
dojo.debugShallow(ao);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _48c={};
for(var x in ao){
_48c[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_48c.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_48c));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _494;
if((arguments.length==1)&&(typeof a1=="object")){
_494=a1;
}else{
_494={srcObj:a1,srcFunc:a2};
}
_494.adviceFunc=function(){
var _495=[];
for(var x=0;x<arguments.length;x++){
_495.push(arguments[x]);
}
dojo.debug("("+_494.srcObj+")."+_494.srcFunc,":",_495.join(", "));
};
this.kwConnect(_494);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this.connectRunOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.maxCalls=1;
return this.connect(ao);
};
this._kwConnectImpl=function(_49d,_49e){
var fn=(_49e)?"disconnect":"connect";
if(typeof _49d["srcFunc"]=="function"){
_49d.srcObj=_49d["srcObj"]||dj_global;
var _4a0=dojo.lang.nameAnonFunc(_49d.srcFunc,_49d.srcObj,true);
_49d.srcFunc=_4a0;
}
if(typeof _49d["adviceFunc"]=="function"){
_49d.adviceObj=_49d["adviceObj"]||dj_global;
var _4a0=dojo.lang.nameAnonFunc(_49d.adviceFunc,_49d.adviceObj,true);
_49d.adviceFunc=_4a0;
}
_49d.srcObj=_49d["srcObj"]||dj_global;
_49d.adviceObj=_49d["adviceObj"]||_49d["targetObj"]||dj_global;
_49d.adviceFunc=_49d["adviceFunc"]||_49d["targetFunc"];
return dojo.event[fn](_49d);
};
this.kwConnect=function(_4a1){
return this._kwConnectImpl(_4a1,false);
};
this.disconnect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(!ao.adviceFunc){
return;
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.disconnect(ao);
}
ao.srcFunc="onkeypress";
}
if(!ao.srcObj[ao.srcFunc]){
return null;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc,true);
mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
return mjp;
};
this.kwDisconnect=function(_4a4){
return this._kwConnectImpl(_4a4,true);
};
};
dojo.event.MethodInvocation=function(_4a5,obj,args){
this.jp_=_4a5;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_4ad){
this.object=obj||dj_global;
this.methodname=_4ad;
this.methodfunc=this.object[_4ad];
this.squelch=false;
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_4af){
if(!obj){
obj=dj_global;
}
var ofn=obj[_4af];
if(!ofn){
ofn=obj[_4af]=function(){
};
if(!obj[_4af]){
dojo.raise("Cannot set do-nothing method on that object "+_4af);
}
}else{
if((typeof ofn!="function")&&(!dojo.lang.isFunction(ofn))&&(!dojo.lang.isAlien(ofn))){
return null;
}
}
var _4b1=_4af+"$joinpoint";
var _4b2=_4af+"$joinpoint$method";
var _4b3=obj[_4b1];
if(!_4b3){
var _4b4=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_4b4=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_4b1,_4b2,_4af]);
}
}
var _4b5=ofn.length;
obj[_4b2]=ofn;
_4b3=obj[_4b1]=new dojo.event.MethodJoinPoint(obj,_4b2);
if(!_4b4){
obj[_4af]=function(){
return _4b3.run.apply(_4b3,arguments);
};
}else{
obj[_4af]=function(){
var args=[];
if(!arguments.length){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
if(obj.event){
evt=obj.event;
}else{
evt=window.event;
}
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _4b3.run.apply(_4b3,args);
};
}
obj[_4af].__preJoinArity=_4b5;
}
return _4b3;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{squelch:false,unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _4bb=[];
for(var x=0;x<args.length;x++){
_4bb[x]=args[x];
}
var _4bd=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _4bf=marr[0]||dj_global;
var _4c0=marr[1];
if(!_4bf[_4c0]){
dojo.raise("function \""+_4c0+"\" does not exist on \""+_4bf+"\"");
}
var _4c1=marr[2]||dj_global;
var _4c2=marr[3];
var msg=marr[6];
var _4c4=marr[7];
if(_4c4>-1){
if(_4c4==0){
return;
}
marr[7]--;
}
var _4c5;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _4bf[_4c0].apply(_4bf,to.args);
}};
to.args=_4bb;
var _4c7=parseInt(marr[4]);
var _4c8=((!isNaN(_4c7))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _4cb=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event._canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_4bd(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_4c2){
_4c1[_4c2].call(_4c1,to);
}else{
if((_4c8)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_4bf[_4c0].call(_4bf,to);
}else{
_4bf[_4c0].apply(_4bf,args);
}
},_4c7);
}else{
if(msg){
_4bf[_4c0].call(_4bf,to);
}else{
_4bf[_4c0].apply(_4bf,args);
}
}
}
};
var _4ce=function(){
if(this.squelch){
try{
return _4bd.apply(this,arguments);
}
catch(e){
dojo.debug(e);
}
}else{
return _4bd.apply(this,arguments);
}
};
if((this["before"])&&(this.before.length>0)){
dojo.lang.forEach(this.before.concat(new Array()),_4ce);
}
var _4cf;
try{
if((this["around"])&&(this.around.length>0)){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_4cf=mi.proceed();
}else{
if(this.methodfunc){
_4cf=this.object[this.methodname].apply(this.object,args);
}
}
}
catch(e){
if(!this.squelch){
dojo.debug(e,"when calling",this.methodname,"on",this.object,"with arguments",args);
dojo.raise(e);
}
}
if((this["after"])&&(this.after.length>0)){
dojo.lang.forEach(this.after.concat(new Array()),_4ce);
}
return (this.methodfunc)?_4cf:null;
},getArr:function(kind){
var type="after";
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
type="before";
}else{
if(kind=="around"){
type="around";
}
}
if(!this[type]){
this[type]=[];
}
return this[type];
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"],args["maxCalls"]);
},addAdvice:function(_4d4,_4d5,_4d6,_4d7,_4d8,_4d9,once,_4db,rate,_4dd,_4de){
var arr=this.getArr(_4d8);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_4d4,_4d5,_4d6,_4d7,_4db,rate,_4dd,_4de];
if(once){
if(this.hasAdvice(_4d4,_4d5,_4d8,arr)>=0){
return;
}
}
if(_4d9=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_4e1,_4e2,_4e3,arr){
if(!arr){
arr=this.getArr(_4e3);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _4e2=="object")?(new String(_4e2)).toString():_4e2;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_4e1)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_4e9,_4ea,_4eb,once){
var arr=this.getArr(_4eb);
var ind=this.hasAdvice(_4e9,_4ea,_4eb,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_4e9,_4ea,_4eb,arr);
}
return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_4ef){
if(!this.topics[_4ef]){
this.topics[_4ef]=new this.TopicImpl(_4ef);
}
return this.topics[_4ef];
};
this.registerPublisher=function(_4f0,obj,_4f2){
var _4f0=this.getTopic(_4f0);
_4f0.registerPublisher(obj,_4f2);
};
this.subscribe=function(_4f3,obj,_4f5){
var _4f3=this.getTopic(_4f3);
_4f3.subscribe(obj,_4f5);
};
this.unsubscribe=function(_4f6,obj,_4f8){
var _4f6=this.getTopic(_4f6);
_4f6.unsubscribe(obj,_4f8);
};
this.destroy=function(_4f9){
this.getTopic(_4f9).destroy();
delete this.topics[_4f9];
};
this.publishApply=function(_4fa,args){
var _4fa=this.getTopic(_4fa);
_4fa.sendMessage.apply(_4fa,args);
};
this.publish=function(_4fc,_4fd){
var _4fc=this.getTopic(_4fc);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_4fc.sendMessage.apply(_4fc,args);
};
};
dojo.event.topic.TopicImpl=function(_500){
this.topicName=_500;
this.subscribe=function(_501,_502){
var tf=_502||_501;
var to=(!_502)?dj_global:_501;
return dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_505,_506){
var tf=(!_506)?_505:_506;
var to=(!_506)?null:_505;
return dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this._getJoinPoint=function(){
return dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage");
};
this.setSquelch=function(_509){
this._getJoinPoint().squelch=_509;
};
this.destroy=function(){
this._getJoinPoint().disconnect();
};
this.registerPublisher=function(_50a,_50b){
dojo.event.connect(_50a,_50b,this,"sendMessage");
};
this.sendMessage=function(_50c){
};
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_50f){
var na;
var tna;
if(_50f){
tna=_50f.all||_50f.getElementsByTagName("*");
na=[_50f];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _513={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
try{
if(el&&el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
catch(e){
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
if(dojo.widget){
for(var name in dojo.widget._templateCache){
if(dojo.widget._templateCache[name].node){
dojo.dom.destroyNode(dojo.widget._templateCache[name].node);
dojo.widget._templateCache[name].node=null;
delete dojo.widget._templateCache[name].node;
}
}
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _518=0;
this.normalizedEventName=function(_519){
switch(_519){
case "CheckboxStateChange":
case "DOMAttrModified":
case "DOMMenuItemActive":
case "DOMMenuItemInactive":
case "DOMMouseScroll":
case "DOMNodeInserted":
case "DOMNodeRemoved":
case "RadioStateChange":
return _519;
break;
default:
var lcn=_519.toLowerCase();
return (lcn.indexOf("on")==0)?lcn.substr(2):lcn;
break;
}
};
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_51e){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_51e.length;x++){
node.__clobberAttrs__.push(_51e[x]);
}
};
this.removeListener=function(node,_521,fp,_523){
if(!_523){
var _523=false;
}
_521=dojo.event.browser.normalizedEventName(_521);
if(_521=="key"){
if(dojo.render.html.ie){
this.removeListener(node,"onkeydown",fp,_523);
}
_521="keypress";
}
if(node.removeEventListener){
node.removeEventListener(_521,fp,_523);
}
};
this.addListener=function(node,_525,fp,_527,_528){
if(!node){
return;
}
if(!_527){
var _527=false;
}
_525=dojo.event.browser.normalizedEventName(_525);
if(_525=="key"){
if(dojo.render.html.ie){
this.addListener(node,"onkeydown",fp,_527,_528);
}
_525="keypress";
}
if(!_528){
var _529=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_527){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_529=fp;
}
if(node.addEventListener){
node.addEventListener(_525,_529,_527);
return _529;
}else{
_525="on"+_525;
if(typeof node[_525]=="function"){
var _52c=node[_525];
node[_525]=function(e){
_52c(e);
return _529(e);
};
}else{
node[_525]=_529;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_525]);
}
return _529;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(obj)&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_52f,_530){
if(typeof _52f!="function"){
dojo.raise("listener not a function: "+_52f);
}
dojo.event.browser.currentEvent.currentTarget=_530;
return _52f.call(_530,dojo.event.browser.currentEvent);
};
this._stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this._preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_CLEAR:12,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_HELP:47,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_NUMPAD_0:96,KEY_NUMPAD_1:97,KEY_NUMPAD_2:98,KEY_NUMPAD_3:99,KEY_NUMPAD_4:100,KEY_NUMPAD_5:101,KEY_NUMPAD_6:102,KEY_NUMPAD_7:103,KEY_NUMPAD_8:104,KEY_NUMPAD_9:105,KEY_NUMPAD_MULTIPLY:106,KEY_NUMPAD_PLUS:107,KEY_NUMPAD_ENTER:108,KEY_NUMPAD_MINUS:109,KEY_NUMPAD_PERIOD:110,KEY_NUMPAD_DIVIDE:111,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_F13:124,KEY_F14:125,KEY_F15:126,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_533){
if(!evt){
if(window["event"]){
evt=window.event;
}
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if(evt["type"]=="keydown"&&dojo.render.html.ie){
switch(evt.keyCode){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_LEFT_WINDOW:
case evt.KEY_RIGHT_WINDOW:
case evt.KEY_SELECT:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
case evt.KEY_NUMPAD_0:
case evt.KEY_NUMPAD_1:
case evt.KEY_NUMPAD_2:
case evt.KEY_NUMPAD_3:
case evt.KEY_NUMPAD_4:
case evt.KEY_NUMPAD_5:
case evt.KEY_NUMPAD_6:
case evt.KEY_NUMPAD_7:
case evt.KEY_NUMPAD_8:
case evt.KEY_NUMPAD_9:
case evt.KEY_NUMPAD_PERIOD:
break;
case evt.KEY_NUMPAD_MULTIPLY:
case evt.KEY_NUMPAD_PLUS:
case evt.KEY_NUMPAD_ENTER:
case evt.KEY_NUMPAD_MINUS:
case evt.KEY_NUMPAD_DIVIDE:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
case evt.KEY_PAGE_UP:
case evt.KEY_PAGE_DOWN:
case evt.KEY_END:
case evt.KEY_HOME:
case evt.KEY_LEFT_ARROW:
case evt.KEY_UP_ARROW:
case evt.KEY_RIGHT_ARROW:
case evt.KEY_DOWN_ARROW:
case evt.KEY_INSERT:
case evt.KEY_DELETE:
case evt.KEY_F1:
case evt.KEY_F2:
case evt.KEY_F3:
case evt.KEY_F4:
case evt.KEY_F5:
case evt.KEY_F6:
case evt.KEY_F7:
case evt.KEY_F8:
case evt.KEY_F9:
case evt.KEY_F10:
case evt.KEY_F11:
case evt.KEY_F12:
case evt.KEY_F12:
case evt.KEY_F13:
case evt.KEY_F14:
case evt.KEY_F15:
case evt.KEY_CLEAR:
case evt.KEY_HELP:
evt.key=evt.keyCode;
break;
default:
if(evt.ctrlKey||evt.altKey){
var _535=evt.keyCode;
if(_535>=65&&_535<=90&&evt.shiftKey==false){
_535+=32;
}
if(_535>=1&&_535<=26&&evt.ctrlKey){
_535+=96;
}
evt.key=String.fromCharCode(_535);
}
}
}else{
if(evt["type"]=="keypress"){
if(dojo.render.html.opera){
if(evt.which==0){
evt.key=evt.keyCode;
}else{
if(evt.which>0){
switch(evt.which){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
evt.key=evt.which;
break;
default:
var _535=evt.which;
if((evt.ctrlKey||evt.altKey||evt.metaKey)&&(evt.which>=65&&evt.which<=90&&evt.shiftKey==false)){
_535+=32;
}
evt.key=String.fromCharCode(_535);
}
}
}
}else{
if(dojo.render.html.ie){
if(!evt.ctrlKey&&!evt.altKey&&evt.keyCode>=evt.KEY_SPACE){
evt.key=String.fromCharCode(evt.keyCode);
}
}else{
if(dojo.render.html.safari){
switch(evt.keyCode){
case 25:
evt.key=evt.KEY_TAB;
evt.shift=true;
break;
case 63232:
evt.key=evt.KEY_UP_ARROW;
break;
case 63233:
evt.key=evt.KEY_DOWN_ARROW;
break;
case 63234:
evt.key=evt.KEY_LEFT_ARROW;
break;
case 63235:
evt.key=evt.KEY_RIGHT_ARROW;
break;
case 63236:
evt.key=evt.KEY_F1;
break;
case 63237:
evt.key=evt.KEY_F2;
break;
case 63238:
evt.key=evt.KEY_F3;
break;
case 63239:
evt.key=evt.KEY_F4;
break;
case 63240:
evt.key=evt.KEY_F5;
break;
case 63241:
evt.key=evt.KEY_F6;
break;
case 63242:
evt.key=evt.KEY_F7;
break;
case 63243:
evt.key=evt.KEY_F8;
break;
case 63244:
evt.key=evt.KEY_F9;
break;
case 63245:
evt.key=evt.KEY_F10;
break;
case 63246:
evt.key=evt.KEY_F11;
break;
case 63247:
evt.key=evt.KEY_F12;
break;
case 63250:
evt.key=evt.KEY_PAUSE;
break;
case 63272:
evt.key=evt.KEY_DELETE;
break;
case 63273:
evt.key=evt.KEY_HOME;
break;
case 63275:
evt.key=evt.KEY_END;
break;
case 63276:
evt.key=evt.KEY_PAGE_UP;
break;
case 63277:
evt.key=evt.KEY_PAGE_DOWN;
break;
case 63302:
evt.key=evt.KEY_INSERT;
break;
case 63248:
case 63249:
case 63289:
break;
default:
evt.key=evt.charCode>=evt.KEY_SPACE?String.fromCharCode(evt.charCode):evt.keyCode;
}
}else{
evt.key=evt.charCode>0?String.fromCharCode(evt.charCode):evt.keyCode;
}
}
}
}
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_533?_533:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
var _537=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_537.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_537.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this._stopPropagation;
evt.preventDefault=this._preventDefault;
}
return evt;
};
this.stopEvent=function(evt){
if(window.event){
evt.cancelBubble=true;
evt.returnValue=false;
}else{
evt.preventDefault();
evt.stopPropagation();
}
};
};
dojo.kwCompoundRequire({common:["dojo.event.common","dojo.event.topic"],browser:["dojo.event.browser"],dashboard:["dojo.event.browser"]});
dojo.provide("dojo.event.*");
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_539,_53a,init,_53c){
if((dojo.lang.isFunction(_53c))||((!_53c)&&(!dojo.lang.isFunction(init)))){
var temp=_53c;
_53c=init;
init=temp;
}
var _53e=[];
if(dojo.lang.isArray(_53a)){
_53e=_53a;
_53a=_53e.shift();
}
if(!init){
init=dojo.evalObjPath(_539,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_53a?_53a.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _53a();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_53e;
for(var i=0,l=_53e.length;i<l;i++){
dojo.lang.extend(ctor,_53e[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_539;
if(dojo.lang.isArray(_53c)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_53c));
}else{
dojo.lang.extend(ctor,(_53c)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare._common);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
var _543=dojo.parseObjPath(_539,null,true);
_543.obj[_543.prop]=ctor;
return ctor;
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this._inherited("constructor",arguments);
}else{
this._contextMethod(s,"constructor",arguments);
}
}
var ms=(self.constructor.mixins)||([]);
for(var i=0,m;(m=ms[i]);i++){
(((m.prototype)&&(m.prototype.initializer))||(m)).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare._common={_getPropContext:function(){
return (this.___proto||this);
},_contextMethod:function(_549,_54a,args){
var _54c,_54d=this.___proto;
this.___proto=_549;
try{
_54c=_549[_54a].apply(this,(args||[]));
}
catch(e){
throw e;
}
finally{
this.___proto=_54d;
}
return _54c;
},_inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._contextMethod(p,prop,args):p[prop]);
},inherited:function(prop,args){
dojo.deprecated("'inherited' method is dangerous, do not up-call! 'inherited' is slated for removal in 0.5; name your super class (or use superclass property) instead.","0.5");
this._inherited(prop,args);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.logging.Logger");
dojo.provide("dojo.logging.LogFilter");
dojo.provide("dojo.logging.Record");
dojo.provide("dojo.log");
dojo.logging.Record=function(_553,_554){
this.level=_553;
this.message="";
this.msgArgs=[];
this.time=new Date();
if(dojo.lang.isArray(_554)){
if(_554.length>0&&dojo.lang.isString(_554[0])){
this.message=_554.shift();
}
this.msgArgs=_554;
}else{
this.message=_554;
}
};
dojo.logging.LogFilter=function(_555){
this.passChain=_555||"";
this.filter=function(_556){
return true;
};
};
dojo.logging.Logger=function(){
this.cutOffLevel=0;
this.propagate=true;
this.parent=null;
this.data=[];
this.filters=[];
this.handlers=[];
};
dojo.extend(dojo.logging.Logger,{_argsToArr:function(args){
var ret=[];
for(var x=0;x<args.length;x++){
ret.push(args[x]);
}
return ret;
},setLevel:function(lvl){
this.cutOffLevel=parseInt(lvl);
},isEnabledFor:function(lvl){
return parseInt(lvl)>=this.cutOffLevel;
},getEffectiveLevel:function(){
if((this.cutOffLevel==0)&&(this.parent)){
return this.parent.getEffectiveLevel();
}
return this.cutOffLevel;
},addFilter:function(flt){
this.filters.push(flt);
return this.filters.length-1;
},removeFilterByIndex:function(_55d){
if(this.filters[_55d]){
delete this.filters[_55d];
return true;
}
return false;
},removeFilter:function(_55e){
for(var x=0;x<this.filters.length;x++){
if(this.filters[x]===_55e){
delete this.filters[x];
return true;
}
}
return false;
},removeAllFilters:function(){
this.filters=[];
},filter:function(rec){
for(var x=0;x<this.filters.length;x++){
if((this.filters[x]["filter"])&&(!this.filters[x].filter(rec))||(rec.level<this.cutOffLevel)){
return false;
}
}
return true;
},addHandler:function(hdlr){
this.handlers.push(hdlr);
return this.handlers.length-1;
},handle:function(rec){
if((!this.filter(rec))||(rec.level<this.cutOffLevel)){
return false;
}
for(var x=0;x<this.handlers.length;x++){
if(this.handlers[x]["handle"]){
this.handlers[x].handle(rec);
}
}
return true;
},log:function(lvl,msg){
if((this.propagate)&&(this.parent)&&(this.parent.rec.level>=this.cutOffLevel)){
this.parent.log(lvl,msg);
return false;
}
this.handle(new dojo.logging.Record(lvl,msg));
return true;
},debug:function(msg){
return this.logType("DEBUG",this._argsToArr(arguments));
},info:function(msg){
return this.logType("INFO",this._argsToArr(arguments));
},warning:function(msg){
return this.logType("WARNING",this._argsToArr(arguments));
},error:function(msg){
return this.logType("ERROR",this._argsToArr(arguments));
},critical:function(msg){
return this.logType("CRITICAL",this._argsToArr(arguments));
},exception:function(msg,e,_56e){
if(e){
var _56f=[e.name,(e.description||e.message)];
if(e.fileName){
_56f.push(e.fileName);
_56f.push("line "+e.lineNumber);
}
msg+=" "+_56f.join(" : ");
}
this.logType("ERROR",msg);
if(!_56e){
throw e;
}
},logType:function(type,args){
return this.log.apply(this,[dojo.logging.log.getLevel(type),args]);
},warn:function(){
this.warning.apply(this,arguments);
},err:function(){
this.error.apply(this,arguments);
},crit:function(){
this.critical.apply(this,arguments);
}});
dojo.logging.LogHandler=function(_572){
this.cutOffLevel=(_572)?_572:0;
this.formatter=null;
this.data=[];
this.filters=[];
};
dojo.lang.extend(dojo.logging.LogHandler,{setFormatter:function(_573){
dojo.unimplemented("setFormatter");
},flush:function(){
},close:function(){
},handleError:function(){
dojo.deprecated("dojo.logging.LogHandler.handleError","use handle()","0.6");
},handle:function(_574){
if((this.filter(_574))&&(_574.level>=this.cutOffLevel)){
this.emit(_574);
}
},emit:function(_575){
dojo.unimplemented("emit");
}});
void (function(){
var _576=["setLevel","addFilter","removeFilterByIndex","removeFilter","removeAllFilters","filter"];
var tgt=dojo.logging.LogHandler.prototype;
var src=dojo.logging.Logger.prototype;
for(var x=0;x<_576.length;x++){
tgt[_576[x]]=src[_576[x]];
}
})();
dojo.logging.log=new dojo.logging.Logger();
dojo.logging.log.levels=[{"name":"DEBUG","level":1},{"name":"INFO","level":2},{"name":"WARNING","level":3},{"name":"ERROR","level":4},{"name":"CRITICAL","level":5}];
dojo.logging.log.loggers={};
dojo.logging.log.getLogger=function(name){
if(!this.loggers[name]){
this.loggers[name]=new dojo.logging.Logger();
this.loggers[name].parent=this;
}
return this.loggers[name];
};
dojo.logging.log.getLevelName=function(lvl){
for(var x=0;x<this.levels.length;x++){
if(this.levels[x].level==lvl){
return this.levels[x].name;
}
}
return null;
};
dojo.logging.log.getLevel=function(name){
for(var x=0;x<this.levels.length;x++){
if(this.levels[x].name.toUpperCase()==name.toUpperCase()){
return this.levels[x].level;
}
}
return null;
};
dojo.declare("dojo.logging.MemoryLogHandler",dojo.logging.LogHandler,{initializer:function(_57f,_580,_581,_582){
dojo.logging.LogHandler.call(this,_57f);
this.numRecords=(typeof djConfig["loggingNumRecords"]!="undefined")?djConfig["loggingNumRecords"]:((_580)?_580:-1);
this.postType=(typeof djConfig["loggingPostType"]!="undefined")?djConfig["loggingPostType"]:(_581||-1);
this.postInterval=(typeof djConfig["loggingPostInterval"]!="undefined")?djConfig["loggingPostInterval"]:(_581||-1);
},emit:function(_583){
if(!djConfig.isDebug){
return;
}
var _584=String(dojo.log.getLevelName(_583.level)+": "+_583.time.toLocaleTimeString())+": "+_583.message;
if(!dj_undef("println",dojo.hostenv)){
dojo.hostenv.println(_584,_583.msgArgs);
}
this.data.push(_583);
if(this.numRecords!=-1){
while(this.data.length>this.numRecords){
this.data.shift();
}
}
}});
dojo.logging.logQueueHandler=new dojo.logging.MemoryLogHandler(0,50,0,10000);
dojo.logging.log.addHandler(dojo.logging.logQueueHandler);
dojo.log=dojo.logging.log;
dojo.kwCompoundRequire({common:[["dojo.logging.Logger",false,false]],rhino:["dojo.logging.RhinoLogger"]});
dojo.provide("dojo.logging.*");
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_58b,_58c){
var out="";
for(var i=0;i<_58b;i++){
out+=str;
if(_58c&&i<_58b-1){
out+=_58c;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string");
dojo.provide("dojo.io.common");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_59b,_59c,_59d){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_59b){
this.mimetype=_59b;
}
if(_59c){
this.transport=_59c;
}
if(arguments.length>=4){
this.changeUrl=_59d;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,_5a0,_5a1){
},error:function(type,_5a3,_5a4,_5a5){
},timeout:function(type,_5a7,_5a8,_5a9){
},handle:function(type,data,_5ac,_5ad){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_5ae){
if(_5ae["url"]){
_5ae.url=_5ae.url.toString();
}
if(_5ae["formNode"]){
_5ae.formNode=dojo.byId(_5ae.formNode);
}
if(!_5ae["method"]&&_5ae["formNode"]&&_5ae["formNode"].method){
_5ae.method=_5ae["formNode"].method;
}
if(!_5ae["handle"]&&_5ae["handler"]){
_5ae.handle=_5ae.handler;
}
if(!_5ae["load"]&&_5ae["loaded"]){
_5ae.load=_5ae.loaded;
}
if(!_5ae["changeUrl"]&&_5ae["changeURL"]){
_5ae.changeUrl=_5ae.changeURL;
}
_5ae.encoding=dojo.lang.firstValued(_5ae["encoding"],djConfig["bindEncoding"],"");
_5ae.sendTransport=dojo.lang.firstValued(_5ae["sendTransport"],djConfig["ioSendTransport"],false);
var _5af=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_5ae[fn]&&_5af(_5ae[fn])){
continue;
}
if(_5ae["handle"]&&_5af(_5ae["handle"])){
_5ae[fn]=_5ae.handle;
}
}
dojo.lang.mixin(this,_5ae);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_5b6){
if(!(_5b6 instanceof dojo.io.Request)){
try{
_5b6=new dojo.io.Request(_5b6);
}
catch(e){
dojo.debug(e);
}
}
var _5b7="";
if(_5b6["transport"]){
_5b7=_5b6["transport"];
if(!this[_5b7]){
dojo.io.sendBindError(_5b6,"No dojo.io.bind() transport with name '"+_5b6["transport"]+"'.");
return _5b6;
}
if(!this[_5b7].canHandle(_5b6)){
dojo.io.sendBindError(_5b6,"dojo.io.bind() transport with name '"+_5b6["transport"]+"' cannot handle this type of request.");
return _5b6;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_5b6))){
_5b7=tmp;
break;
}
}
if(_5b7==""){
dojo.io.sendBindError(_5b6,"None of the loaded transports for dojo.io.bind()"+" can handle the request.");
return _5b6;
}
}
this[_5b7].bind(_5b6);
_5b6.bindSuccess=true;
return _5b6;
};
dojo.io.sendBindError=function(_5ba,_5bb){
if((typeof _5ba.error=="function"||typeof _5ba.handle=="function")&&(typeof setTimeout=="function"||typeof setTimeout=="object")){
var _5bc=new dojo.io.Error(_5bb);
setTimeout(function(){
_5ba[(typeof _5ba.error=="function")?"error":"handle"]("error",_5bc,null,_5ba);
},50);
}else{
dojo.raise(_5bb);
}
};
dojo.io.queueBind=function(_5bd){
if(!(_5bd instanceof dojo.io.Request)){
try{
_5bd=new dojo.io.Request(_5bd);
}
catch(e){
dojo.debug(e);
}
}
var _5be=_5bd.load;
_5bd.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_5be.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _5c0=_5bd.error;
_5bd.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_5c0.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_5bd);
dojo.io._dispatchNextQueueBind();
return _5bd;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_5c3,last){
var enc=/utf/i.test(_5c3||"")?encodeURIComponent:dojo.string.encodeAscii;
var _5c6=[];
var _5c7=new Object();
for(var name in map){
var _5c9=function(elt){
var val=enc(name)+"="+enc(elt);
_5c6[(last==name)?"push":"unshift"](val);
};
if(!_5c7[name]){
var _5cc=map[name];
if(dojo.lang.isArray(_5cc)){
dojo.lang.forEach(_5cc,_5c9);
}else{
_5c9(_5cc);
}
}
}
return _5c6.join("&");
};
dojo.io.setIFrameSrc=function(_5cd,src,_5cf){
try{
var r=dojo.render.html;
if(!_5cf){
if(r.safari){
_5cd.location=src;
}else{
frames[_5cd.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_5cd.contentWindow.document;
}else{
if(r.safari){
idoc=_5cd.document;
}else{
idoc=_5cd.contentWindow;
}
}
if(!idoc){
_5cd.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_5d2,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _5d2.replace(/\%\{(\w+)\}/g,function(_5d5,key){
if(typeof (map[key])!="undefined"&&map[key]!=null){
return map[key];
}
dojo.raise("Substitution not found: "+key);
});
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _5d8=str.split(" ");
for(var i=0;i<_5d8.length;i++){
_5d8[i]=_5d8[i].charAt(0).toUpperCase()+_5d8[i].substring(1);
}
return _5d8.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _5dd=escape(str);
var _5de,re=/%u([0-9A-F]{4})/i;
while((_5de=_5dd.match(re))){
var num=Number("0x"+_5de[1]);
var _5e1=escape("&#"+num+";");
ret+=_5dd.substring(0,_5de.index)+_5e1;
_5dd=_5dd.substring(_5de.index+_5de[0].length);
}
ret+=_5dd.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_5e6){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_5e6){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}
return str.substring(0,len).replace(/\.+$/,"")+"...";
};
dojo.string.endsWith=function(str,end,_5ef){
if(_5ef){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_5f3,_5f4){
if(_5f4){
str=str.toLowerCase();
_5f3=_5f3.toLowerCase();
}
return str.indexOf(_5f3)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_5fa){
if(_5fa=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_5fa=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n").replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_5fc){
var _5fd=[];
for(var i=0,_5ff=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_5fc){
_5fd.push(str.substring(_5ff,i));
_5ff=i+1;
}
}
_5fd.push(str.substr(_5ff));
return _5fd;
};
dojo.provide("dojo.undo.browser");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(djConfig["dojoIframeHistoryUrl"]||dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:(!dj_undef("window"))?window.location.href:"",initialHash:(!dj_undef("window"))?window.location.hash:"",moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState=this._createState(this.initialHref,args,this.initialHash);
},addToHistory:function(args){
this.forwardStack=[];
var hash=null;
var url=null;
if(!this.historyIframe){
if(djConfig["useXDomain"]&&!djConfig["dojoIframeHistoryUrl"]){
dojo.debug("dojo.undo.browser: When using cross-domain Dojo builds,"+" please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"+" to the path on your domain to iframe_history.html");
}
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if(args["changeUrl"]){
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
if(this.historyStack.length==0&&this.initialState.urlHash==hash){
this.initialState=this._createState(url,args,hash);
return;
}else{
if(this.historyStack.length>0&&this.historyStack[this.historyStack.length-1].urlHash==hash){
this.historyStack[this.historyStack.length-1]=this._createState(url,args,hash);
return;
}
}
this.changingUrl=true;
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
url=this._loadIframeHistory();
var _604=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_606){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_604.apply(this,[_606]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
var _607=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_609){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_607){
_607.apply(this,[_609]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}else{
url=this._loadIframeHistory();
}
this.historyStack.push(this._createState(url,args,hash));
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_60c){
if(!dojo.render.html.opera){
var _60d=this._getUrlQuery(_60c.href);
if(_60d==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_60d==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_60d==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _60e=this.historyStack.pop();
if(!_60e){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_60e);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_createState:function(url,args,hash){
return {"url":url,"kwArgs":args,"urlHash":hash};
},_getUrlQuery:function(url){
var _615=url.split("?");
if(_615.length<2){
return null;
}else{
return _615[1];
}
},_loadIframeHistory:function(){
var url=(djConfig["dojoIframeHistoryUrl"]||dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
return url;
}};
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _618=false;
var _619=node.getElementsByTagName("input");
dojo.lang.forEach(_619,function(_61a){
if(_618){
return;
}
if(_61a.getAttribute("type")=="file"){
_618=true;
}
});
return _618;
};
dojo.io.formHasFile=function(_61b){
return dojo.io.checkChildrenForFile(_61b);
};
dojo.io.updateNode=function(node,_61d){
node=dojo.byId(node);
var args=_61d;
if(dojo.lang.isString(_61d)){
args={url:_61d};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_624,_625,_626){
if((!_624)||(!_624.tagName)||(!_624.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_626){
_626=dojo.io.formFilter;
}
var enc=/utf/i.test(_625||"")?encodeURIComponent:dojo.string.encodeAscii;
var _628=[];
for(var i=0;i<_624.elements.length;i++){
var elm=_624.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_626(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_628.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_628.push(name+"="+enc(elm.value));
}
}else{
_628.push(name+"="+enc(elm.value));
}
}
}
var _62e=_624.getElementsByTagName("input");
for(var i=0;i<_62e.length;i++){
var _62f=_62e[i];
if(_62f.type.toLowerCase()=="image"&&_62f.form==_624&&_626(_62f)){
var name=enc(_62f.name);
_628.push(name+"="+enc(_62f.value));
_628.push(name+".x=0");
_628.push(name+".y=0");
}
}
return _628.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _635=form.getElementsByTagName("input");
for(var i=0;i<_635.length;i++){
var _636=_635[i];
if(_636.type.toLowerCase()=="image"&&_636.form==form){
this.connect(_636,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _63d=false;
if(node.disabled||!node.name){
_63d=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_63d=node==this.clickedButton;
}else{
_63d=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _63d;
},connect:function(_63e,_63f,_640){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_63e,_63f,this,_640);
}else{
var fcn=dojo.lang.hitch(this,_640);
_63e[_63f]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _643=this;
var _644={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_646,_647){
return url+"|"+_646+"|"+_647.toLowerCase();
}
function addToCache(url,_649,_64a,http){
_644[getCacheKey(url,_649,_64a)]=http;
}
function getFromCache(url,_64d,_64e){
return _644[getCacheKey(url,_64d,_64e)];
}
this.clearCache=function(){
_644={};
};
function doLoad(_64f,http,url,_652,_653){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_64f.method.toLowerCase()=="head"){
var _655=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _655;
};
var _656=_655.split(/[\r\n]+/g);
for(var i=0;i<_656.length;i++){
var pair=_656[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_64f.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_64f.mimetype=="text/json"||_64f.mimetype=="application/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_64f.mimetype=="application/xml")||(_64f.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_653){
addToCache(url,_652,_64f.method,http);
}
_64f[(typeof _64f.load=="function")?"load":"handle"]("load",ret,http,_64f);
}else{
var _659=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_64f[(typeof _64f.error=="function")?"error":"handle"]("error",_659,http,_64f);
}
}
function setHeaders(http,_65b){
if(_65b["headers"]){
for(var _65c in _65b["headers"]){
if(_65c.toLowerCase()=="content-type"&&!_65b["contentType"]){
_65b["contentType"]=_65b["headers"][_65c];
}else{
http.setRequestHeader(_65c,_65b["headers"][_65c]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_643._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _660=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_660,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _661=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_662){
return _661&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json","application/json"],(_662["mimetype"].toLowerCase()||""))&&!(_662["formNode"]&&dojo.io.formHasFile(_662["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_663){
if(!_663["url"]){
if(!_663["formNode"]&&(_663["backButton"]||_663["back"]||_663["changeUrl"]||_663["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_663);
return true;
}
}
var url=_663.url;
var _665="";
if(_663["formNode"]){
var ta=_663.formNode.getAttribute("action");
if((ta)&&(!_663["url"])){
url=ta;
}
var tp=_663.formNode.getAttribute("method");
if((tp)&&(!_663["method"])){
_663.method=tp;
}
_665+=dojo.io.encodeForm(_663.formNode,_663.encoding,_663["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_663["file"]){
_663.method="post";
}
if(!_663["method"]){
_663.method="get";
}
if(_663.method.toLowerCase()=="get"){
_663.multipart=false;
}else{
if(_663["file"]){
_663.multipart=true;
}else{
if(!_663["multipart"]){
_663.multipart=false;
}
}
}
if(_663["backButton"]||_663["back"]||_663["changeUrl"]){
dojo.undo.browser.addToHistory(_663);
}
var _668=_663["content"]||{};
if(_663.sendTransport){
_668["dojo.transport"]="xmlhttp";
}
do{
if(_663.postContent){
_665=_663.postContent;
break;
}
if(_668){
_665+=dojo.io.argsFromMap(_668,_663.encoding);
}
if(_663.method.toLowerCase()=="get"||!_663.multipart){
break;
}
var t=[];
if(_665.length){
var q=_665.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_663.file){
if(dojo.lang.isArray(_663.file)){
for(var i=0;i<_663.file.length;++i){
var o=_663.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_663.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_665=t.join("\r\n");
}
}while(false);
var _66e=_663["sync"]?false:true;
var _66f=_663["preventCache"]||(this.preventCache==true&&_663["preventCache"]!=false);
var _670=_663["useCache"]==true||(this.useCache==true&&_663["useCache"]!=false);
if(!_66f&&_670){
var _671=getFromCache(url,_665,_663.method);
if(_671){
doLoad(_663,_671,url,_665,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_663);
var _673=false;
if(_66e){
var _674=this.inFlight.push({"req":_663,"http":http,"url":url,"query":_665,"useCache":_670,"startTime":_663.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_643._blockAsync=true;
}
if(_663.method.toLowerCase()=="post"){
if(!_663.user){
http.open("POST",url,_66e);
}else{
http.open("POST",url,_66e,_663.user,_663.password);
}
setHeaders(http,_663);
http.setRequestHeader("Content-Type",_663.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_663.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_665);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_663,{status:404},url,_665,_670);
}
}else{
var _675=url;
if(_665!=""){
_675+=(_675.indexOf("?")>-1?"&":"?")+_665;
}
if(_66f){
_675+=(dojo.string.endsWithAny(_675,"?","&")?"":(_675.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_663.user){
http.open(_663.method.toUpperCase(),_675,_66e);
}else{
http.open(_663.method.toUpperCase(),_675,_66e,_663.user,_663.password);
}
setHeaders(http,_663);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_663,{status:404},url,_665,_670);
}
}
if(!_66e){
doLoad(_663,http,url,_665,_670);
_643._blockAsync=false;
}
_663.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_677,days,path,_67a,_67b){
var _67c=-1;
if((typeof days=="number")&&(days>=0)){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_67c=d.toGMTString();
}
_677=escape(_677);
document.cookie=name+"="+_677+";"+(_67c!=-1?" expires="+_67c+";":"")+(path?"path="+path:"")+(_67a?"; domain="+_67a:"")+(_67b?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _680=document.cookie.substring(idx+name.length+1);
var end=_680.indexOf(";");
if(end==-1){
end=_680.length;
}
_680=_680.substring(0,end);
_680=unescape(_680);
return _680;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_687,_688,_689){
if(arguments.length==5){
_689=_687;
_687=null;
_688=null;
}
var _68a=[],_68b,_68c="";
if(!_689){
_68b=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!_68b){
_68b={};
}
for(var prop in obj){
if(obj[prop]==null){
delete _68b[prop];
}else{
if((typeof obj[prop]=="string")||(typeof obj[prop]=="number")){
_68b[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in _68b){
_68a.push(escape(prop)+"="+escape(_68b[prop]));
}
_68c=_68a.join("&");
}
dojo.io.cookie.setCookie(name,_68c,days,path,_687,_688);
};
dojo.io.cookie.getObjectCookie=function(name){
var _68f=null,_690=dojo.io.cookie.getCookie(name);
if(_690){
_68f={};
var _691=_690.split("&");
for(var i=0;i<_691.length;i++){
var pair=_691[i].split("=");
var _694=pair[1];
if(isNaN(_694)){
_694=unescape(pair[1]);
}
_68f[unescape(pair[0])]=_694;
}
}
return _68f;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _695=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_695=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.kwCompoundRequire({common:["dojo.io.common"],rhino:["dojo.io.RhinoIO"],browser:["dojo.io.BrowserIO","dojo.io.cookie"],dashboard:["dojo.io.BrowserIO","dojo.io.cookie"]});
dojo.provide("dojo.io.*");
dojo.kwCompoundRequire({common:[["dojo.uri.Uri",false,false]]});
dojo.provide("dojo.uri.*");
dojo.provide("dojo.io.IframeIO");
dojo.io.createIFrame=function(_696,_697,uri){
if(window[_696]){
return window[_696];
}
if(window.frames[_696]){
return window.frames[_696];
}
var r=dojo.render.html;
var _69a=null;
var turi=uri;
if(!turi){
if(djConfig["useXDomain"]&&!djConfig["dojoIframeHistoryUrl"]){
dojo.debug("dojo.io.createIFrame: When using cross-domain Dojo builds,"+" please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"+" to the path on your domain to iframe_history.html");
}
turi=(djConfig["dojoIframeHistoryUrl"]||dojo.uri.moduleUri("dojo","../iframe_history.html"))+"#noInit=true";
}
var _69c=((r.ie)&&(dojo.render.os.win))?"<iframe name=\""+_696+"\" src=\""+turi+"\" onload=\""+_697+"\">":"iframe";
_69a=document.createElement(_69c);
with(_69a){
name=_696;
setAttribute("name",_696);
id=_696;
}
dojo.body().appendChild(_69a);
window[_696]=_69a;
with(_69a.style){
if(!r.safari){
position="absolute";
}
left=top="0px";
height=width="1px";
visibility="hidden";
}
if(!r.ie){
dojo.io.setIFrameSrc(_69a,turi,true);
_69a.onload=new Function(_697);
}
return _69a;
};
dojo.io.IframeTransport=new function(){
var _69d=this;
this.currentRequest=null;
this.requestQueue=[];
this.iframeName="dojoIoIframe";
this.fireNextRequest=function(){
try{
if((this.currentRequest)||(this.requestQueue.length==0)){
return;
}
var cr=this.currentRequest=this.requestQueue.shift();
cr._contentToClean=[];
var fn=cr["formNode"];
var _6a0=cr["content"]||{};
if(cr.sendTransport){
_6a0["dojo.transport"]="iframe";
}
if(fn){
if(_6a0){
for(var x in _6a0){
if(!fn[x]){
var tn;
if(dojo.render.html.ie){
tn=document.createElement("<input type='hidden' name='"+x+"' value='"+_6a0[x]+"'>");
fn.appendChild(tn);
}else{
tn=document.createElement("input");
fn.appendChild(tn);
tn.type="hidden";
tn.name=x;
tn.value=_6a0[x];
}
cr._contentToClean.push(x);
}else{
fn[x].value=_6a0[x];
}
}
}
if(cr["url"]){
cr._originalAction=fn.getAttribute("action");
fn.setAttribute("action",cr.url);
}
if(!fn.getAttribute("method")){
fn.setAttribute("method",(cr["method"])?cr["method"]:"post");
}
cr._originalTarget=fn.getAttribute("target");
fn.setAttribute("target",this.iframeName);
fn.target=this.iframeName;
fn.submit();
}else{
var _6a3=dojo.io.argsFromMap(this.currentRequest.content);
var _6a4=cr.url+(cr.url.indexOf("?")>-1?"&":"?")+_6a3;
dojo.io.setIFrameSrc(this.iframe,_6a4,true);
}
}
catch(e){
this.iframeOnload(e);
}
};
this.canHandle=function(_6a5){
return ((dojo.lang.inArray(["text/plain","text/html","text/javascript","text/json","application/json"],_6a5["mimetype"]))&&(dojo.lang.inArray(["post","get"],_6a5["method"].toLowerCase()))&&(!((_6a5["sync"])&&(_6a5["sync"]==true))));
};
this.bind=function(_6a6){
if(!this["iframe"]){
this.setUpIframe();
}
this.requestQueue.push(_6a6);
this.fireNextRequest();
return;
};
this.setUpIframe=function(){
this.iframe=dojo.io.createIFrame(this.iframeName,"dojo.io.IframeTransport.iframeOnload();");
};
this.iframeOnload=function(_6a7){
if(!_69d.currentRequest){
_69d.fireNextRequest();
return;
}
var req=_69d.currentRequest;
if(req.formNode){
var _6a9=req._contentToClean;
for(var i=0;i<_6a9.length;i++){
var key=_6a9[i];
if(dojo.render.html.safari){
var _6ac=req.formNode;
for(var j=0;j<_6ac.childNodes.length;j++){
var _6ae=_6ac.childNodes[j];
if(_6ae.name==key){
var _6af=_6ae.parentNode;
_6af.removeChild(_6ae);
break;
}
}
}else{
var _6b0=req.formNode[key];
req.formNode.removeChild(_6b0);
req.formNode[key]=null;
}
}
if(req["_originalAction"]){
req.formNode.setAttribute("action",req._originalAction);
}
if(req["_originalTarget"]){
req.formNode.setAttribute("target",req._originalTarget);
req.formNode.target=req._originalTarget;
}
}
var _6b1=function(_6b2){
var doc=_6b2.contentDocument||((_6b2.contentWindow)&&(_6b2.contentWindow.document))||((_6b2.name)&&(document.frames[_6b2.name])&&(document.frames[_6b2.name].document))||null;
return doc;
};
var _6b4;
var _6b5=false;
if(_6a7){
this._callError(req,"IframeTransport Request Error: "+_6a7);
}else{
var ifd=_6b1(_69d.iframe);
try{
var cmt=req.mimetype;
if((cmt=="text/javascript")||(cmt=="text/json")||(cmt=="application/json")){
var js=ifd.getElementsByTagName("textarea")[0].value;
if(cmt=="text/json"||cmt=="application/json"){
js="("+js+")";
}
_6b4=dj_eval(js);
}else{
if(cmt=="text/html"){
_6b4=ifd;
}else{
_6b4=ifd.getElementsByTagName("textarea")[0].value;
}
}
_6b5=true;
}
catch(e){
this._callError(req,"IframeTransport Error: "+e);
}
}
try{
if(_6b5&&dojo.lang.isFunction(req["load"])){
req.load("load",_6b4,req);
}
}
catch(e){
throw e;
}
finally{
_69d.currentRequest=null;
_69d.fireNextRequest();
}
};
this._callError=function(req,_6ba){
var _6bb=new dojo.io.Error(_6ba);
if(dojo.lang.isFunction(req["error"])){
req.error("error",_6bb,req);
}
};
dojo.io.transports.addTransport("IframeTransport");
};
dojo.provide("dojo.date");
dojo.deprecated("dojo.date","use one of the modules in dojo.date.* instead","0.5");
dojo.provide("dojo.string.Builder");
dojo.string.Builder=function(str){
this.arrConcat=(dojo.render.html.capable&&dojo.render.html["ie"]);
var a=[];
var b="";
var _6bf=this.length=b.length;
if(this.arrConcat){
if(b.length>0){
a.push(b);
}
b="";
}
this.toString=this.valueOf=function(){
return (this.arrConcat)?a.join(""):b;
};
this.append=function(){
for(var x=0;x<arguments.length;x++){
var s=arguments[x];
if(dojo.lang.isArrayLike(s)){
this.append.apply(this,s);
}else{
if(this.arrConcat){
a.push(s);
}else{
b+=s;
}
_6bf+=s.length;
this.length=_6bf;
}
}
return this;
};
this.clear=function(){
a=[];
b="";
_6bf=this.length=0;
return this;
};
this.remove=function(f,l){
var s="";
if(this.arrConcat){
b=a.join("");
}
a=[];
if(f>0){
s=b.substring(0,(f-1));
}
b=s+b.substring(f+l);
_6bf=this.length=b.length;
if(this.arrConcat){
a.push(b);
b="";
}
return this;
};
this.replace=function(o,n){
if(this.arrConcat){
b=a.join("");
}
a=[];
b=b.replace(o,n);
_6bf=this.length=b.length;
if(this.arrConcat){
a.push(b);
b="";
}
return this;
};
this.insert=function(idx,s){
if(this.arrConcat){
b=a.join("");
}
a=[];
if(idx==0){
b=s+b;
}else{
var t=b.split("");
t.splice(idx,0,s);
b=t.join("");
}
_6bf=this.length=b.length;
if(this.arrConcat){
a.push(b);
b="";
}
return this;
};
this.append.apply(this,arguments);
};
dojo.kwCompoundRequire({common:["dojo.string","dojo.string.common","dojo.string.extras","dojo.string.Builder"]});
dojo.provide("dojo.string.*");
if(!this["dojo"]){
alert("\"dojo/__package__.js\" is now located at \"dojo/dojo.js\". Please update your includes accordingly");
}
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_6ca){
this.pairs=[];
this.returnWrappers=_6ca||false;
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(name,_6cc,wrap,_6ce,_6cf){
var type=(_6cf)?"unshift":"push";
this.pairs[type]([name,_6cc,wrap,_6ce]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dojo.json");
dojo.json={jsonRegistry:new dojo.AdapterRegistry(),register:function(name,_6d7,wrap,_6d9){
dojo.json.jsonRegistry.register(name,_6d7,wrap,_6d9);
},evalJson:function(json){
try{
return eval("("+json+")");
}
catch(e){
dojo.debug(e);
return json;
}
},serialize:function(o){
var _6dc=typeof (o);
if(_6dc=="undefined"){
return "undefined";
}else{
if((_6dc=="number")||(_6dc=="boolean")){
return o+"";
}else{
if(o===null){
return "null";
}
}
}
if(_6dc=="string"){
return dojo.string.escapeString(o);
}
var me=arguments.callee;
var _6de;
if(typeof (o.__json__)=="function"){
_6de=o.__json__();
if(o!==_6de){
return me(_6de);
}
}
if(typeof (o.json)=="function"){
_6de=o.json();
if(o!==_6de){
return me(_6de);
}
}
if(_6dc!="function"&&typeof (o.length)=="number"){
var res=[];
for(var i=0;i<o.length;i++){
var val=me(o[i]);
if(typeof (val)!="string"){
val="undefined";
}
res.push(val);
}
return "["+res.join(",")+"]";
}
try{
window.o=o;
_6de=dojo.json.jsonRegistry.match(o);
return me(_6de);
}
catch(e){
}
if(_6dc=="function"){
return null;
}
res=[];
for(var k in o){
var _6e3;
if(typeof (k)=="number"){
_6e3="\""+k+"\"";
}else{
if(typeof (k)=="string"){
_6e3=dojo.string.escapeString(k);
}else{
continue;
}
}
val=me(o[k]);
if(typeof (val)!="string"){
continue;
}
res.push(_6e3+":"+val);
}
return "{"+res.join(",")+"}";
}};
dojo.provide("dojo.Deferred");
dojo.Deferred=function(_6e4){
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=_6e4;
this.silentlyCancelled=false;
};
dojo.lang.extend(dojo.Deferred,{getFunctionFromArgs:function(){
var a=arguments;
if((a[0])&&(!a[1])){
if(dojo.lang.isFunction(a[0])){
return a[0];
}else{
if(dojo.lang.isString(a[0])){
return dj_global[a[0]];
}
}
}else{
if((a[0])&&(a[1])){
return dojo.lang.hitch(a[0],a[1]);
}
}
return null;
},makeCalled:function(){
var _6e6=new dojo.Deferred();
_6e6.callback();
return _6e6;
},repr:function(){
var _6e7;
if(this.fired==-1){
_6e7="unfired";
}else{
if(this.fired==0){
_6e7="success";
}else{
_6e7="error";
}
}
return "Deferred("+this.id+", "+_6e7+")";
},toString:dojo.lang.forward("repr"),_nextId:(function(){
var n=1;
return function(){
return n++;
};
})(),cancel:function(){
if(this.fired==-1){
if(this.canceller){
this.canceller(this);
}else{
this.silentlyCancelled=true;
}
if(this.fired==-1){
this.errback(new Error(this.repr()));
}
}else{
if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){
this.results[0].cancel();
}
}
},_pause:function(){
this.paused++;
},_unpause:function(){
this.paused--;
if((this.paused==0)&&(this.fired>=0)){
this._fire();
}
},_continue:function(res){
this._resback(res);
this._unpause();
},_resback:function(res){
this.fired=((res instanceof Error)?1:0);
this.results[this.fired]=res;
this._fire();
},_check:function(){
if(this.fired!=-1){
if(!this.silentlyCancelled){
dojo.raise("already called!");
}
this.silentlyCancelled=false;
return;
}
},callback:function(res){
this._check();
this._resback(res);
},errback:function(res){
this._check();
if(!(res instanceof Error)){
res=new Error(res);
}
this._resback(res);
},addBoth:function(cb,cbfn){
var _6ef=this.getFunctionFromArgs(cb,cbfn);
if(arguments.length>2){
_6ef=dojo.lang.curryArguments(null,_6ef,arguments,2);
}
return this.addCallbacks(_6ef,_6ef);
},addCallback:function(cb,cbfn){
var _6f2=this.getFunctionFromArgs(cb,cbfn);
if(arguments.length>2){
_6f2=dojo.lang.curryArguments(null,_6f2,arguments,2);
}
return this.addCallbacks(_6f2,null);
},addErrback:function(cb,cbfn){
var _6f5=this.getFunctionFromArgs(cb,cbfn);
if(arguments.length>2){
_6f5=dojo.lang.curryArguments(null,_6f5,arguments,2);
}
return this.addCallbacks(null,_6f5);
return this.addCallbacks(null,cbfn);
},addCallbacks:function(cb,eb){
this.chain.push([cb,eb]);
if(this.fired>=0){
this._fire();
}
return this;
},_fire:function(){
var _6f8=this.chain;
var _6f9=this.fired;
var res=this.results[_6f9];
var self=this;
var cb=null;
while(_6f8.length>0&&this.paused==0){
var pair=_6f8.shift();
var f=pair[_6f9];
if(f==null){
continue;
}
try{
res=f(res);
_6f9=((res instanceof Error)?1:0);
if(res instanceof dojo.Deferred){
cb=function(res){
self._continue(res);
};
this._pause();
}
}
catch(err){
_6f9=1;
res=err;
}
}
this.fired=_6f9;
this.results[_6f9]=res;
if((cb)&&(this.paused)){
res.addBoth(cb);
}
}});
dojo.provide("dojo.rpc.RpcService");
dojo.rpc.RpcService=function(url){
if(url){
this.connect(url);
}
};
dojo.lang.extend(dojo.rpc.RpcService,{strictArgChecks:true,serviceUrl:"",parseResults:function(obj){
return obj;
},errorCallback:function(_702){
return function(type,e){
_702.errback(new Error(e.message));
};
},resultCallback:function(_705){
var tf=dojo.lang.hitch(this,function(type,obj,e){
if(obj["error"]!=null){
var err=new Error(obj.error);
err.id=obj.id;
_705.errback(err);
}else{
var _70b=this.parseResults(obj);
_705.callback(_70b);
}
});
return tf;
},generateMethod:function(_70c,_70d,url){
return dojo.lang.hitch(this,function(){
var _70f=new dojo.Deferred();
if((this.strictArgChecks)&&(_70d!=null)&&(arguments.length!=_70d.length)){
dojo.raise("Invalid number of parameters for remote method.");
}else{
this.bind(_70c,arguments,_70f,url);
}
return _70f;
});
},processSmd:function(_710){
dojo.debug("RpcService: Processing returned SMD.");
if(_710.methods){
dojo.lang.forEach(_710.methods,function(m){
if(m&&m["name"]){
dojo.debug("RpcService: Creating Method: this.",m.name,"()");
this[m.name]=this.generateMethod(m.name,m.parameters,m["url"]||m["serviceUrl"]||m["serviceURL"]);
if(dojo.lang.isFunction(this[m.name])){
dojo.debug("RpcService: Successfully created",m.name,"()");
}else{
dojo.debug("RpcService: Failed to create",m.name,"()");
}
}
},this);
}
this.serviceUrl=_710.serviceUrl||_710.serviceURL;
dojo.debug("RpcService: Dojo RpcService is ready for use.");
},connect:function(_712){
dojo.debug("RpcService: Attempting to load SMD document from:",_712);
dojo.io.bind({url:_712,mimetype:"text/json",load:dojo.lang.hitch(this,function(type,_714,e){
return this.processSmd(_714);
}),sync:true});
}});
dojo.provide("dojo.rpc.JsonService");
dojo.rpc.JsonService=function(args){
if(args){
if(dojo.lang.isString(args)){
this.connect(args);
}else{
if(args["smdUrl"]){
this.connect(args.smdUrl);
}
if(args["smdStr"]){
this.processSmd(dj_eval("("+args.smdStr+")"));
}
if(args["smdObj"]){
this.processSmd(args.smdObj);
}
if(args["serviceUrl"]){
this.serviceUrl=args.serviceUrl;
}
if(typeof args["strictArgChecks"]!="undefined"){
this.strictArgChecks=args.strictArgChecks;
}
}
}
};
dojo.inherits(dojo.rpc.JsonService,dojo.rpc.RpcService);
dojo.extend(dojo.rpc.JsonService,{bustCache:false,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(_717,_718){
var _719=new dojo.Deferred();
this.bind(_717,_718,_719);
return _719;
},bind:function(_71a,_71b,_71c,url){
dojo.io.bind({url:url||this.serviceUrl,postContent:this.createRequest(_71a,_71b),method:"POST",contentType:this.contentType,mimetype:"text/json",load:this.resultCallback(_71c),error:this.errorCallback(_71c),preventCache:this.bustCache});
},createRequest:function(_71e,_71f){
var req={"params":_71f,"method":_71e,"id":++this.lastSubmissionId};
var data=dojo.json.serialize(req);
dojo.debug("JsonService: JSON-RPC Request: "+data);
return data;
},parseResults:function(obj){
if(!obj){
return;
}
if(obj["Result"]!=null){
return obj["Result"];
}else{
if(obj["result"]!=null){
return obj["result"];
}else{
if(obj["ResultSet"]){
return obj["ResultSet"];
}else{
return obj;
}
}
}
}});
dojo.kwCompoundRequire({common:[["dojo.rpc.JsonService",false,false]]});
dojo.provide("dojo.rpc.*");
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
var isIE=((dojo.render.html.capable)&&(dojo.render.html.ie));
function getTagName(node){
try{
return node.tagName.toLowerCase();
}
catch(e){
return "";
}
}
function getDojoTagName(node){
var _726=getTagName(node);
if(!_726){
return "";
}
if((dojo.widget)&&(dojo.widget.tags[_726])){
return _726;
}
var p=_726.indexOf(":");
if(p>=0){
return _726;
}
if(_726.substr(0,5)=="dojo:"){
return _726;
}
if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"){
return node.scopeName.toLowerCase()+":"+_726;
}
if(_726.substr(0,4)=="dojo"){
return "dojo:"+_726.substring(4);
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
djt=node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type");
if(djt){
return "dojo:"+djt.toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((dj_global["djConfig"])&&(!djConfig["ignoreClassNames"])){
var _729=node.className||node.getAttribute("class");
if((_729)&&(_729.indexOf)&&(_729.indexOf("dojo-")!=-1)){
var _72a=_729.split(" ");
for(var x=0,c=_72a.length;x<c;x++){
if(_72a[x].slice(0,5)=="dojo-"){
return "dojo:"+_72a[x].substr(5).toLowerCase();
}
}
}
}
return "";
}
this.parseElement=function(node,_72e,_72f,_730){
var _731=getTagName(node);
if(isIE&&_731.indexOf("/")==0){
return null;
}
try{
var attr=node.getAttribute("parseWidgets");
if(attr&&attr.toLowerCase()=="false"){
return {};
}
}
catch(e){
}
var _733=true;
if(_72f){
var _734=getDojoTagName(node);
_731=_734||_731;
_733=Boolean(_734);
}
var _735={};
_735[_731]=[];
var pos=_731.indexOf(":");
if(pos>0){
var ns=_731.substring(0,pos);
_735["ns"]=ns;
if((dojo.ns)&&(!dojo.ns.allow(ns))){
_733=false;
}
}
if(_733){
var _738=this.parseAttributes(node);
for(var attr in _738){
if((!_735[_731][attr])||(typeof _735[_731][attr]!="array")){
_735[_731][attr]=[];
}
_735[_731][attr].push(_738[attr]);
}
_735[_731].nodeRef=node;
_735.tagName=_731;
_735.index=_730||0;
}
var _739=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
var ctn=getDojoTagName(tcn)||getTagName(tcn);
if(!_735[ctn]){
_735[ctn]=[];
}
_735[ctn].push(this.parseElement(tcn,true,_72f,_739));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_735[ctn][_735[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
_739++;
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_735[_731].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _735;
};
this.parseAttributes=function(node){
var _73e={};
var atts=node.attributes;
var _740,i=0;
while((_740=atts[i++])){
if(isIE){
if(!_740){
continue;
}
if((typeof _740=="object")&&(typeof _740.nodeValue=="undefined")||(_740.nodeValue==null)||(_740.nodeValue=="")){
continue;
}
}
var nn=_740.nodeName.split(":");
nn=(nn.length==2)?nn[1]:_740.nodeName;
_73e[nn]={value:_740.nodeValue};
}
return _73e;
};
};
dojo.kwCompoundRequire({common:["dojo.dom"],browser:["dojo.html.*"],dashboard:["dojo.html.*"]});
dojo.provide("dojo.xml.*");
dojo.provide("dojo.undo.Manager");
dojo.undo.Manager=function(_743){
this.clear();
this._parent=_743;
};
dojo.extend(dojo.undo.Manager,{_parent:null,_undoStack:null,_redoStack:null,_currentManager:null,canUndo:false,canRedo:false,isUndoing:false,isRedoing:false,onUndo:function(_744,item){
},onRedo:function(_746,item){
},onUndoAny:function(_748,item){
},onRedoAny:function(_74a,item){
},_updateStatus:function(){
this.canUndo=this._undoStack.length>0;
this.canRedo=this._redoStack.length>0;
},clear:function(){
this._undoStack=[];
this._redoStack=[];
this._currentManager=this;
this.isUndoing=false;
this.isRedoing=false;
this._updateStatus();
},undo:function(){
if(!this.canUndo){
return false;
}
this.endAllTransactions();
this.isUndoing=true;
var top=this._undoStack.pop();
if(top instanceof dojo.undo.Manager){
top.undoAll();
}else{
top.undo();
}
if(top.redo){
this._redoStack.push(top);
}
this.isUndoing=false;
this._updateStatus();
this.onUndo(this,top);
if(!(top instanceof dojo.undo.Manager)){
this.getTop().onUndoAny(this,top);
}
return true;
},redo:function(){
if(!this.canRedo){
return false;
}
this.isRedoing=true;
var top=this._redoStack.pop();
if(top instanceof dojo.undo.Manager){
top.redoAll();
}else{
top.redo();
}
this._undoStack.push(top);
this.isRedoing=false;
this._updateStatus();
this.onRedo(this,top);
if(!(top instanceof dojo.undo.Manager)){
this.getTop().onRedoAny(this,top);
}
return true;
},undoAll:function(){
while(this._undoStack.length>0){
this.undo();
}
},redoAll:function(){
while(this._redoStack.length>0){
this.redo();
}
},push:function(undo,redo,_750){
if(!undo){
return;
}
if(this._currentManager==this){
this._undoStack.push({undo:undo,redo:redo,description:_750});
}else{
this._currentManager.push.apply(this._currentManager,arguments);
}
this._redoStack=[];
this._updateStatus();
},concat:function(_751){
if(!_751){
return;
}
if(this._currentManager==this){
for(var x=0;x<_751._undoStack.length;x++){
this._undoStack.push(_751._undoStack[x]);
}
if(_751._undoStack.length>0){
this._redoStack=[];
}
this._updateStatus();
}else{
this._currentManager.concat.apply(this._currentManager,arguments);
}
},beginTransaction:function(_753){
if(this._currentManager==this){
var mgr=new dojo.undo.Manager(this);
mgr.description=_753?_753:"";
this._undoStack.push(mgr);
this._currentManager=mgr;
return mgr;
}else{
this._currentManager=this._currentManager.beginTransaction.apply(this._currentManager,arguments);
}
},endTransaction:function(_755){
if(this._currentManager==this){
if(this._parent){
this._parent._currentManager=this._parent;
if(this._undoStack.length==0||_755){
var idx=dojo.lang.find(this._parent._undoStack,this);
if(idx>=0){
this._parent._undoStack.splice(idx,1);
if(_755){
for(var x=0;x<this._undoStack.length;x++){
this._parent._undoStack.splice(idx++,0,this._undoStack[x]);
}
this._updateStatus();
}
}
}
return this._parent;
}
}else{
this._currentManager=this._currentManager.endTransaction.apply(this._currentManager,arguments);
}
},endAllTransactions:function(){
while(this._currentManager!=this){
this.endTransaction();
}
},getTop:function(){
if(this._parent){
return this._parent.getTop();
}else{
return this;
}
}});
dojo.provide("dojo.undo.*");
dojo.provide("dojo.crypto");
dojo.crypto.cipherModes={ECB:0,CBC:1,PCBC:2,CFB:3,OFB:4,CTR:5};
dojo.crypto.outputTypes={Base64:0,Hex:1,String:2,Raw:3};
dojo.provide("dojo.crypto.MD5");
dojo.crypto.MD5=new function(){
var _758=8;
var mask=(1<<_758)-1;
function toWord(s){
var wa=[];
for(var i=0;i<s.length*_758;i+=_758){
wa[i>>5]|=(s.charCodeAt(i/_758)&mask)<<(i%32);
}
return wa;
}
function toString(wa){
var s=[];
for(var i=0;i<wa.length*32;i+=_758){
s.push(String.fromCharCode((wa[i>>5]>>>(i%32))&mask));
}
return s.join("");
}
function toHex(wa){
var h="0123456789abcdef";
var s=[];
for(var i=0;i<wa.length*4;i++){
s.push(h.charAt((wa[i>>2]>>((i%4)*8+4))&15)+h.charAt((wa[i>>2]>>((i%4)*8))&15));
}
return s.join("");
}
function toBase64(wa){
var p="=";
var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var s=[];
for(var i=0;i<wa.length*4;i+=3){
var t=(((wa[i>>2]>>8*(i%4))&255)<<16)|(((wa[i+1>>2]>>8*((i+1)%4))&255)<<8)|((wa[i+2>>2]>>8*((i+2)%4))&255);
for(var j=0;j<4;j++){
if(i*8+j*6>wa.length*32){
s.push(p);
}else{
s.push(tab.charAt((t>>6*(3-j))&63));
}
}
}
return s.join("");
}
function add(x,y){
var l=(x&65535)+(y&65535);
var m=(x>>16)+(y>>16)+(l>>16);
return (m<<16)|(l&65535);
}
function R(n,c){
return (n<<c)|(n>>>(32-c));
}
function C(q,a,b,x,s,t){
return add(R(add(add(a,q),add(x,t)),s),b);
}
function FF(a,b,c,d,x,s,t){
return C((b&c)|((~b)&d),a,b,x,s,t);
}
function GG(a,b,c,d,x,s,t){
return C((b&d)|(c&(~d)),a,b,x,s,t);
}
function HH(a,b,c,d,x,s,t){
return C(b^c^d,a,b,x,s,t);
}
function II(a,b,c,d,x,s,t){
return C(c^(b|(~d)),a,b,x,s,t);
}
function core(x,len){
x[len>>5]|=128<<((len)%32);
x[(((len+64)>>>9)<<4)+14]=len;
var a=1732584193;
var b=-271733879;
var c=-1732584194;
var d=271733878;
for(var i=0;i<x.length;i+=16){
var olda=a;
var oldb=b;
var oldc=c;
var oldd=d;
a=FF(a,b,c,d,x[i+0],7,-680876936);
d=FF(d,a,b,c,x[i+1],12,-389564586);
c=FF(c,d,a,b,x[i+2],17,606105819);
b=FF(b,c,d,a,x[i+3],22,-1044525330);
a=FF(a,b,c,d,x[i+4],7,-176418897);
d=FF(d,a,b,c,x[i+5],12,1200080426);
c=FF(c,d,a,b,x[i+6],17,-1473231341);
b=FF(b,c,d,a,x[i+7],22,-45705983);
a=FF(a,b,c,d,x[i+8],7,1770035416);
d=FF(d,a,b,c,x[i+9],12,-1958414417);
c=FF(c,d,a,b,x[i+10],17,-42063);
b=FF(b,c,d,a,x[i+11],22,-1990404162);
a=FF(a,b,c,d,x[i+12],7,1804603682);
d=FF(d,a,b,c,x[i+13],12,-40341101);
c=FF(c,d,a,b,x[i+14],17,-1502002290);
b=FF(b,c,d,a,x[i+15],22,1236535329);
a=GG(a,b,c,d,x[i+1],5,-165796510);
d=GG(d,a,b,c,x[i+6],9,-1069501632);
c=GG(c,d,a,b,x[i+11],14,643717713);
b=GG(b,c,d,a,x[i+0],20,-373897302);
a=GG(a,b,c,d,x[i+5],5,-701558691);
d=GG(d,a,b,c,x[i+10],9,38016083);
c=GG(c,d,a,b,x[i+15],14,-660478335);
b=GG(b,c,d,a,x[i+4],20,-405537848);
a=GG(a,b,c,d,x[i+9],5,568446438);
d=GG(d,a,b,c,x[i+14],9,-1019803690);
c=GG(c,d,a,b,x[i+3],14,-187363961);
b=GG(b,c,d,a,x[i+8],20,1163531501);
a=GG(a,b,c,d,x[i+13],5,-1444681467);
d=GG(d,a,b,c,x[i+2],9,-51403784);
c=GG(c,d,a,b,x[i+7],14,1735328473);
b=GG(b,c,d,a,x[i+12],20,-1926607734);
a=HH(a,b,c,d,x[i+5],4,-378558);
d=HH(d,a,b,c,x[i+8],11,-2022574463);
c=HH(c,d,a,b,x[i+11],16,1839030562);
b=HH(b,c,d,a,x[i+14],23,-35309556);
a=HH(a,b,c,d,x[i+1],4,-1530992060);
d=HH(d,a,b,c,x[i+4],11,1272893353);
c=HH(c,d,a,b,x[i+7],16,-155497632);
b=HH(b,c,d,a,x[i+10],23,-1094730640);
a=HH(a,b,c,d,x[i+13],4,681279174);
d=HH(d,a,b,c,x[i+0],11,-358537222);
c=HH(c,d,a,b,x[i+3],16,-722521979);
b=HH(b,c,d,a,x[i+6],23,76029189);
a=HH(a,b,c,d,x[i+9],4,-640364487);
d=HH(d,a,b,c,x[i+12],11,-421815835);
c=HH(c,d,a,b,x[i+15],16,530742520);
b=HH(b,c,d,a,x[i+2],23,-995338651);
a=II(a,b,c,d,x[i+0],6,-198630844);
d=II(d,a,b,c,x[i+7],10,1126891415);
c=II(c,d,a,b,x[i+14],15,-1416354905);
b=II(b,c,d,a,x[i+5],21,-57434055);
a=II(a,b,c,d,x[i+12],6,1700485571);
d=II(d,a,b,c,x[i+3],10,-1894986606);
c=II(c,d,a,b,x[i+10],15,-1051523);
b=II(b,c,d,a,x[i+1],21,-2054922799);
a=II(a,b,c,d,x[i+8],6,1873313359);
d=II(d,a,b,c,x[i+15],10,-30611744);
c=II(c,d,a,b,x[i+6],15,-1560198380);
b=II(b,c,d,a,x[i+13],21,1309151649);
a=II(a,b,c,d,x[i+4],6,-145523070);
d=II(d,a,b,c,x[i+11],10,-1120210379);
c=II(c,d,a,b,x[i+2],15,718787259);
b=II(b,c,d,a,x[i+9],21,-343485551);
a=add(a,olda);
b=add(b,oldb);
c=add(c,oldc);
d=add(d,oldd);
}
return [a,b,c,d];
}
function hmac(data,key){
var wa=toWord(key);
if(wa.length>16){
wa=core(wa,key.length*_758);
}
var l=[],r=[];
for(var i=0;i<16;i++){
l[i]=wa[i]^909522486;
r[i]=wa[i]^1549556828;
}
var h=core(l.concat(toWord(data)),512+data.length*_758);
return core(r.concat(h),640);
}
this.compute=function(data,_7a6){
var out=_7a6||dojo.crypto.outputTypes.Base64;
switch(out){
case dojo.crypto.outputTypes.Hex:
return toHex(core(toWord(data),data.length*_758));
case dojo.crypto.outputTypes.String:
return toString(core(toWord(data),data.length*_758));
default:
return toBase64(core(toWord(data),data.length*_758));
}
};
this.getHMAC=function(data,key,_7aa){
var out=_7aa||dojo.crypto.outputTypes.Base64;
switch(out){
case dojo.crypto.outputTypes.Hex:
return toHex(hmac(data,key));
case dojo.crypto.outputTypes.String:
return toString(hmac(data,key));
default:
return toBase64(hmac(data,key));
}
};
}();
dojo.kwCompoundRequire({common:["dojo.crypto","dojo.crypto.MD5"]});
dojo.provide("dojo.crypto.*");
dojo.provide("dojo.collections.Collections");
dojo.collections.DictionaryEntry=function(k,v){
this.key=k;
this.value=v;
this.valueOf=function(){
return this.value;
};
this.toString=function(){
return String(this.value);
};
};
dojo.collections.Iterator=function(arr){
var a=arr;
var _7b0=0;
this.element=a[_7b0]||null;
this.atEnd=function(){
return (_7b0>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_7b0++];
return this.element;
};
this.map=function(fn,_7b2){
var s=_7b2||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_7b0=0;
this.element=a[_7b0];
};
};
dojo.collections.DictionaryIterator=function(obj){
var a=[];
var _7b8={};
for(var p in obj){
if(!_7b8[p]){
a.push(obj[p]);
}
}
var _7ba=0;
this.element=a[_7ba]||null;
this.atEnd=function(){
return (_7ba>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_7ba++];
return this.element;
};
this.map=function(fn,_7bc){
var s=_7bc||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_7ba=0;
this.element=a[_7ba];
};
};
dojo.provide("dojo.collections.ArrayList");
dojo.collections.ArrayList=function(arr){
var _7c1=[];
if(arr){
_7c1=_7c1.concat(arr);
}
this.count=_7c1.length;
this.add=function(obj){
_7c1.push(obj);
this.count=_7c1.length;
};
this.addRange=function(a){
if(a.getIterator){
var e=a.getIterator();
while(!e.atEnd()){
this.add(e.get());
}
this.count=_7c1.length;
}else{
for(var i=0;i<a.length;i++){
_7c1.push(a[i]);
}
this.count=_7c1.length;
}
};
this.clear=function(){
_7c1.splice(0,_7c1.length);
this.count=0;
};
this.clone=function(){
return new dojo.collections.ArrayList(_7c1);
};
this.contains=function(obj){
for(var i=0;i<_7c1.length;i++){
if(_7c1[i]==obj){
return true;
}
}
return false;
};
this.forEach=function(fn,_7c9){
var s=_7c9||dj_global;
if(Array.forEach){
Array.forEach(_7c1,fn,s);
}else{
for(var i=0;i<_7c1.length;i++){
fn.call(s,_7c1[i],i,_7c1);
}
}
};
this.getIterator=function(){
return new dojo.collections.Iterator(_7c1);
};
this.indexOf=function(obj){
for(var i=0;i<_7c1.length;i++){
if(_7c1[i]==obj){
return i;
}
}
return -1;
};
this.insert=function(i,obj){
_7c1.splice(i,0,obj);
this.count=_7c1.length;
};
this.item=function(i){
return _7c1[i];
};
this.remove=function(obj){
var i=this.indexOf(obj);
if(i>=0){
_7c1.splice(i,1);
}
this.count=_7c1.length;
};
this.removeAt=function(i){
_7c1.splice(i,1);
this.count=_7c1.length;
};
this.reverse=function(){
_7c1.reverse();
};
this.sort=function(fn){
if(fn){
_7c1.sort(fn);
}else{
_7c1.sort();
}
};
this.setByIndex=function(i,obj){
_7c1[i]=obj;
this.count=_7c1.length;
};
this.toArray=function(){
return [].concat(_7c1);
};
this.toString=function(_7d7){
return _7c1.join((_7d7||","));
};
};
dojo.provide("dojo.collections.Queue");
dojo.collections.Queue=function(arr){
var q=[];
if(arr){
q=q.concat(arr);
}
this.count=q.length;
this.clear=function(){
q=[];
this.count=q.length;
};
this.clone=function(){
return new dojo.collections.Queue(q);
};
this.contains=function(o){
for(var i=0;i<q.length;i++){
if(q[i]==o){
return true;
}
}
return false;
};
this.copyTo=function(arr,i){
arr.splice(i,0,q);
};
this.dequeue=function(){
var r=q.shift();
this.count=q.length;
return r;
};
this.enqueue=function(o){
this.count=q.push(o);
};
this.forEach=function(fn,_7e1){
var s=_7e1||dj_global;
if(Array.forEach){
Array.forEach(q,fn,s);
}else{
for(var i=0;i<q.length;i++){
fn.call(s,q[i],i,q);
}
}
};
this.getIterator=function(){
return new dojo.collections.Iterator(q);
};
this.peek=function(){
return q[0];
};
this.toArray=function(){
return [].concat(q);
};
};
dojo.provide("dojo.collections.Stack");
dojo.collections.Stack=function(arr){
var q=[];
if(arr){
q=q.concat(arr);
}
this.count=q.length;
this.clear=function(){
q=[];
this.count=q.length;
};
this.clone=function(){
return new dojo.collections.Stack(q);
};
this.contains=function(o){
for(var i=0;i<q.length;i++){
if(q[i]==o){
return true;
}
}
return false;
};
this.copyTo=function(arr,i){
arr.splice(i,0,q);
};
this.forEach=function(fn,_7eb){
var s=_7eb||dj_global;
if(Array.forEach){
Array.forEach(q,fn,s);
}else{
for(var i=0;i<q.length;i++){
fn.call(s,q[i],i,q);
}
}
};
this.getIterator=function(){
return new dojo.collections.Iterator(q);
};
this.peek=function(){
return q[(q.length-1)];
};
this.pop=function(){
var r=q.pop();
this.count=q.length;
return r;
};
this.push=function(o){
this.count=q.push(o);
};
this.toArray=function(){
return [].concat(q);
};
};
dojo.provide("dojo.dnd.DragAndDrop");
dojo.declare("dojo.dnd.DragSource",null,{type:"",onDragEnd:function(evt){
},onDragStart:function(evt){
},onSelected:function(evt){
},unregister:function(){
dojo.dnd.dragManager.unregisterDragSource(this);
},reregister:function(){
dojo.dnd.dragManager.registerDragSource(this);
}});
dojo.declare("dojo.dnd.DragObject",null,{type:"",register:function(){
var dm=dojo.dnd.dragManager;
if(dm["registerDragObject"]){
dm.registerDragObject(this);
}
},onDragStart:function(evt){
},onDragMove:function(evt){
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragEnd:function(evt){
},onDragLeave:dojo.lang.forward("onDragOut"),onDragEnter:dojo.lang.forward("onDragOver"),ondragout:dojo.lang.forward("onDragOut"),ondragover:dojo.lang.forward("onDragOver")});
dojo.declare("dojo.dnd.DropTarget",null,{acceptsType:function(type){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
if(!dojo.lang.inArray(this.acceptedTypes,type)){
return false;
}
}
return true;
},accepts:function(_7fa){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
for(var i=0;i<_7fa.length;i++){
if(!dojo.lang.inArray(this.acceptedTypes,_7fa[i].type)){
return false;
}
}
}
return true;
},unregister:function(){
dojo.dnd.dragManager.unregisterDropTarget(this);
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragMove:function(evt){
},onDropStart:function(evt){
},onDrop:function(evt){
},onDropEnd:function(){
}},function(){
this.acceptedTypes=[];
});
dojo.dnd.DragEvent=function(){
this.dragSource=null;
this.dragObject=null;
this.target=null;
this.eventStatus="success";
};
dojo.declare("dojo.dnd.DragManager",null,{selectedSources:[],dragObjects:[],dragSources:[],registerDragSource:function(_801){
},dropTargets:[],registerDropTarget:function(_802){
},lastDragTarget:null,currentDragTarget:null,onKeyDown:function(){
},onMouseOut:function(){
},onMouseMove:function(){
},onMouseUp:function(){
}});
dojo.provide("dojo.dnd.HtmlDragManager");
dojo.declare("dojo.dnd.HtmlDragManager",dojo.dnd.DragManager,{disabled:false,nestedTargets:false,mouseDownTimer:null,dsCounter:0,dsPrefix:"dojoDragSource",dropTargetDimensions:[],currentDropTarget:null,previousDropTarget:null,_dragTriggered:false,selectedSources:[],dragObjects:[],dragSources:[],dropTargets:[],currentX:null,currentY:null,lastX:null,lastY:null,mouseDownX:null,mouseDownY:null,threshold:7,dropAcceptable:false,cancelEvent:function(e){
e.stopPropagation();
e.preventDefault();
},registerDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _806=dp+"Idx_"+(this.dsCounter++);
ds.dragSourceId=_806;
this.dragSources[_806]=ds;
ds.domNode.setAttribute(dp,_806);
if(dojo.render.html.ie){
dojo.event.browser.addListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},unregisterDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _809=ds.dragSourceId;
delete ds.dragSourceId;
delete this.dragSources[_809];
ds.domNode.setAttribute(dp,null);
if(dojo.render.html.ie){
dojo.event.browser.removeListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},registerDropTarget:function(dt){
this.dropTargets.push(dt);
},unregisterDropTarget:function(dt){
var _80c=dojo.lang.find(this.dropTargets,dt,true);
if(_80c>=0){
this.dropTargets.splice(_80c,1);
}
},getDragSource:function(e){
var tn=e.target;
if(tn===dojo.body()){
return;
}
var ta=dojo.html.getAttribute(tn,this.dsPrefix);
while((!ta)&&(tn)){
tn=tn.parentNode;
if((!tn)||(tn===dojo.body())){
return;
}
ta=dojo.html.getAttribute(tn,this.dsPrefix);
}
return this.dragSources[ta];
},onKeyDown:function(e){
},onMouseDown:function(e){
if(this.disabled){
return;
}
if(dojo.render.html.ie){
if(e.button!=1){
return;
}
}else{
if(e.which!=1){
return;
}
}
var _812=e.target.nodeType==dojo.html.TEXT_NODE?e.target.parentNode:e.target;
if(dojo.html.isTag(_812,"button","textarea","input","select","option")){
return;
}
var ds=this.getDragSource(e);
if(!ds){
return;
}
if(!dojo.lang.inArray(this.selectedSources,ds)){
this.selectedSources.push(ds);
ds.onSelected();
}
this.mouseDownX=e.pageX;
this.mouseDownY=e.pageY;
e.preventDefault();
dojo.event.connect(document,"onmousemove",this,"onMouseMove");
},onMouseUp:function(e,_815){
if(this.selectedSources.length==0){
return;
}
this.mouseDownX=null;
this.mouseDownY=null;
this._dragTriggered=false;
e.dragSource=this.dragSource;
if((!e.shiftKey)&&(!e.ctrlKey)){
if(this.currentDropTarget){
this.currentDropTarget.onDropStart();
}
dojo.lang.forEach(this.dragObjects,function(_816){
var ret=null;
if(!_816){
return;
}
if(this.currentDropTarget){
e.dragObject=_816;
var ce=this.currentDropTarget.domNode.childNodes;
if(ce.length>0){
e.dropTarget=ce[0];
while(e.dropTarget==_816.domNode){
e.dropTarget=e.dropTarget.nextSibling;
}
}else{
e.dropTarget=this.currentDropTarget.domNode;
}
if(this.dropAcceptable){
ret=this.currentDropTarget.onDrop(e);
}else{
this.currentDropTarget.onDragOut(e);
}
}
e.dragStatus=this.dropAcceptable&&ret?"dropSuccess":"dropFailure";
dojo.lang.delayThese([function(){
try{
_816.dragSource.onDragEnd(e);
}
catch(err){
var _819={};
for(var i in e){
if(i=="type"){
_819.type="mouseup";
continue;
}
_819[i]=e[i];
}
_816.dragSource.onDragEnd(_819);
}
},function(){
_816.onDragEnd(e);
}]);
},this);
this.selectedSources=[];
this.dragObjects=[];
this.dragSource=null;
if(this.currentDropTarget){
this.currentDropTarget.onDropEnd();
}
}else{
}
dojo.event.disconnect(document,"onmousemove",this,"onMouseMove");
this.currentDropTarget=null;
},onScroll:function(){
for(var i=0;i<this.dragObjects.length;i++){
if(this.dragObjects[i].updateDragOffset){
this.dragObjects[i].updateDragOffset();
}
}
if(this.dragObjects.length){
this.cacheTargetLocations();
}
},_dragStartDistance:function(x,y){
if((!this.mouseDownX)||(!this.mouseDownX)){
return;
}
var dx=Math.abs(x-this.mouseDownX);
var dx2=dx*dx;
var dy=Math.abs(y-this.mouseDownY);
var dy2=dy*dy;
return parseInt(Math.sqrt(dx2+dy2),10);
},cacheTargetLocations:function(){
dojo.profile.start("cacheTargetLocations");
this.dropTargetDimensions=[];
dojo.lang.forEach(this.dropTargets,function(_822){
var tn=_822.domNode;
if(!tn||!_822.accepts([this.dragSource])){
return;
}
var abs=dojo.html.getAbsolutePosition(tn,true);
var bb=dojo.html.getBorderBox(tn);
this.dropTargetDimensions.push([[abs.x,abs.y],[abs.x+bb.width,abs.y+bb.height],_822]);
},this);
dojo.profile.end("cacheTargetLocations");
},onMouseMove:function(e){
if((dojo.render.html.ie)&&(e.button!=1)){
this.currentDropTarget=null;
this.onMouseUp(e,true);
return;
}
if((this.selectedSources.length)&&(!this.dragObjects.length)){
var dx;
var dy;
if(!this._dragTriggered){
this._dragTriggered=(this._dragStartDistance(e.pageX,e.pageY)>this.threshold);
if(!this._dragTriggered){
return;
}
dx=e.pageX-this.mouseDownX;
dy=e.pageY-this.mouseDownY;
}
this.dragSource=this.selectedSources[0];
dojo.lang.forEach(this.selectedSources,function(_829){
if(!_829){
return;
}
var tdo=_829.onDragStart(e);
if(tdo){
tdo.onDragStart(e);
tdo.dragOffset.y+=dy;
tdo.dragOffset.x+=dx;
tdo.dragSource=_829;
this.dragObjects.push(tdo);
}
},this);
this.previousDropTarget=null;
this.cacheTargetLocations();
}
dojo.lang.forEach(this.dragObjects,function(_82b){
if(_82b){
_82b.onDragMove(e);
}
});
if(this.currentDropTarget){
var c=dojo.html.toCoordinateObject(this.currentDropTarget.domNode,true);
var dtp=[[c.x,c.y],[c.x+c.width,c.y+c.height]];
}
if((!this.nestedTargets)&&(dtp)&&(this.isInsideBox(e,dtp))){
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}else{
var _82e=this.findBestTarget(e);
if(_82e.target===null){
if(this.currentDropTarget){
this.currentDropTarget.onDragOut(e);
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget=null;
}
this.dropAcceptable=false;
return;
}
if(this.currentDropTarget!==_82e.target){
if(this.currentDropTarget){
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget.onDragOut(e);
}
this.currentDropTarget=_82e.target;
e.dragObjects=this.dragObjects;
this.dropAcceptable=this.currentDropTarget.onDragOver(e);
}else{
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}
}
},findBestTarget:function(e){
var _830=this;
var _831=new Object();
_831.target=null;
_831.points=null;
dojo.lang.every(this.dropTargetDimensions,function(_832){
if(!_830.isInsideBox(e,_832)){
return true;
}
_831.target=_832[2];
_831.points=_832;
return Boolean(_830.nestedTargets);
});
return _831;
},isInsideBox:function(e,_834){
if((e.pageX>_834[0][0])&&(e.pageX<_834[1][0])&&(e.pageY>_834[0][1])&&(e.pageY<_834[1][1])){
return true;
}
return false;
},onMouseOver:function(e){
},onMouseOut:function(e){
}});
dojo.dnd.dragManager=new dojo.dnd.HtmlDragManager();
(function(){
var d=document;
var dm=dojo.dnd.dragManager;
dojo.event.connect(d,"onkeydown",dm,"onKeyDown");
dojo.event.connect(d,"onmouseover",dm,"onMouseOver");
dojo.event.connect(d,"onmouseout",dm,"onMouseOut");
dojo.event.connect(d,"onmousedown",dm,"onMouseDown");
dojo.event.connect(d,"onmouseup",dm,"onMouseUp");
dojo.event.connect(window,"onscroll",dm,"onScroll");
})();
dojo.provide("dojo.html.selection");
dojo.html.selectionType={NONE:0,TEXT:1,CONTROL:2};
dojo.html.clearSelection=function(){
var _839=dojo.global();
var _83a=dojo.doc();
try{
if(_839["getSelection"]){
if(dojo.render.html.safari){
_839.getSelection().collapse();
}else{
_839.getSelection().removeAllRanges();
}
}else{
if(_83a.selection){
if(_83a.selection.empty){
_83a.selection.empty();
}else{
if(_83a.selection.clear){
_83a.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_83b){
_83b=dojo.byId(_83b)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_83b.style.MozUserSelect="none";
}else{
if(h.safari){
_83b.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_83b.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_83d){
_83d=dojo.byId(_83d)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_83d.style.MozUserSelect="";
}else{
if(h.safari){
_83d.style.KhtmlUserSelect="";
}else{
if(h.ie){
_83d.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_83f){
dojo.deprecated("dojo.html.selectElement","replaced by dojo.html.selection.selectElementChildren",0.5);
};
dojo.html.selectInputText=function(_840){
var _841=dojo.global();
var _842=dojo.doc();
_840=dojo.byId(_840);
if(_842["selection"]&&dojo.body()["createTextRange"]){
var _843=_840.createTextRange();
_843.moveStart("character",0);
_843.moveEnd("character",_840.value.length);
_843.select();
}else{
if(_841["getSelection"]){
var _844=_841.getSelection();
_840.setSelectionRange(0,_840.value.length);
}
}
_840.focus();
};
dojo.html.isSelectionCollapsed=function(){
dojo.deprecated("dojo.html.isSelectionCollapsed","replaced by dojo.html.selection.isCollapsed",0.5);
return dojo.html.selection.isCollapsed();
};
dojo.lang.mixin(dojo.html.selection,{getType:function(){
if(dojo.doc()["selection"]){
return dojo.html.selectionType[dojo.doc().selection.type.toUpperCase()];
}else{
var _845=dojo.html.selectionType.TEXT;
var oSel;
try{
oSel=dojo.global().getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _847=oSel.getRangeAt(0);
if(_847.startContainer==_847.endContainer&&(_847.endOffset-_847.startOffset)==1&&_847.startContainer.nodeType!=dojo.dom.TEXT_NODE){
_845=dojo.html.selectionType.CONTROL;
}
}
return _845;
}
},isCollapsed:function(){
var _848=dojo.global();
var _849=dojo.doc();
if(_849["selection"]){
return _849.selection.createRange().text=="";
}else{
if(_848["getSelection"]){
var _84a=_848.getSelection();
if(dojo.lang.isString(_84a)){
return _84a=="";
}else{
return _84a.isCollapsed||_84a.toString()=="";
}
}
}
},getSelectedElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
if(dojo.doc()["selection"]){
var _84b=dojo.doc().selection.createRange();
if(_84b&&_84b.item){
return dojo.doc().selection.createRange().item(0);
}
}else{
var _84c=dojo.global().getSelection();
return _84c.anchorNode.childNodes[_84c.anchorOffset];
}
}
},getParentElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
var p=dojo.html.selection.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(dojo.doc()["selection"]){
return dojo.doc().selection.createRange().parentElement();
}else{
var _84e=dojo.global().getSelection();
if(_84e){
var node=_84e.anchorNode;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.parentNode;
}
return node;
}
}
}
},getSelectedText:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().text;
}else{
var _850=dojo.global().getSelection();
if(_850){
return _850.toString();
}
}
},getSelectedHtml:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().htmlText;
}else{
var _851=dojo.global().getSelection();
if(_851&&_851.rangeCount){
var frag=_851.getRangeAt(0).cloneContents();
var div=document.createElement("div");
div.appendChild(frag);
return div.innerHTML;
}
return null;
}
},hasAncestorElement:function(_854){
return (dojo.html.selection.getAncestorElement.apply(this,arguments)!=null);
},getAncestorElement:function(_855){
var node=dojo.html.selection.getSelectedElement()||dojo.html.selection.getParentElement();
while(node){
if(dojo.html.selection.isTag(node,arguments).length>0){
return node;
}
node=node.parentNode;
}
return null;
},isTag:function(node,tags){
if(node&&node.tagName){
for(var i=0;i<tags.length;i++){
if(node.tagName.toLowerCase()==String(tags[i]).toLowerCase()){
return String(tags[i]).toLowerCase();
}
}
}
return "";
},selectElement:function(_85a){
var _85b=dojo.global();
var _85c=dojo.doc();
_85a=dojo.byId(_85a);
if(_85c.selection&&dojo.body().createTextRange){
try{
var _85d=dojo.body().createControlRange();
_85d.addElement(_85a);
_85d.select();
}
catch(e){
dojo.html.selection.selectElementChildren(_85a);
}
}else{
if(_85b["getSelection"]){
var _85e=_85b.getSelection();
if(_85e["removeAllRanges"]){
var _85d=_85c.createRange();
_85d.selectNode(_85a);
_85e.removeAllRanges();
_85e.addRange(_85d);
}
}
}
},selectElementChildren:function(_85f){
var _860=dojo.global();
var _861=dojo.doc();
_85f=dojo.byId(_85f);
if(_861.selection&&dojo.body().createTextRange){
var _862=dojo.body().createTextRange();
_862.moveToElementText(_85f);
_862.select();
}else{
if(_860["getSelection"]){
var _863=_860.getSelection();
if(_863["setBaseAndExtent"]){
_863.setBaseAndExtent(_85f,0,_85f,_85f.innerText.length-1);
}else{
if(_863["selectAllChildren"]){
_863.selectAllChildren(_85f);
}
}
}
}
},getBookmark:function(){
var _864;
var _865=dojo.doc();
if(_865["selection"]){
var _866=_865.selection.createRange();
_864=_866.getBookmark();
}else{
var _867;
try{
_867=dojo.global().getSelection();
}
catch(e){
}
if(_867){
var _866=_867.getRangeAt(0);
_864=_866.cloneRange();
}else{
dojo.debug("No idea how to store the current selection for this browser!");
}
}
return _864;
},moveToBookmark:function(_868){
var _869=dojo.doc();
if(_869["selection"]){
var _86a=_869.selection.createRange();
_86a.moveToBookmark(_868);
_86a.select();
}else{
var _86b;
try{
_86b=dojo.global().getSelection();
}
catch(e){
}
if(_86b&&_86b["removeAllRanges"]){
_86b.removeAllRanges();
_86b.addRange(_868);
}else{
dojo.debug("No idea how to restore selection for this browser!");
}
}
},collapse:function(_86c){
if(dojo.global()["getSelection"]){
var _86d=dojo.global().getSelection();
if(_86d.removeAllRanges){
if(_86c){
_86d.collapseToStart();
}else{
_86d.collapseToEnd();
}
}else{
dojo.global().getSelection().collapse(_86c);
}
}else{
if(dojo.doc().selection){
var _86e=dojo.doc().selection.createRange();
_86e.collapse(_86c);
_86e.select();
}
}
},remove:function(){
if(dojo.doc().selection){
var _86f=dojo.doc().selection;
if(_86f.type.toUpperCase()!="NONE"){
_86f.clear();
}
return _86f;
}else{
var _86f=dojo.global().getSelection();
for(var i=0;i<_86f.rangeCount;i++){
_86f.getRangeAt(i).deleteContents();
}
return _86f;
}
}});
dojo.provide("dojo.html.iframe");
dojo.html.iframeContentWindow=function(_871){
var win=dojo.html.getDocumentWindow(dojo.html.iframeContentDocument(_871))||dojo.html.iframeContentDocument(_871).__parent__||(_871.name&&document.frames[_871.name])||null;
return win;
};
dojo.html.iframeContentDocument=function(_873){
var doc=_873.contentDocument||((_873.contentWindow)&&(_873.contentWindow.document))||((_873.name)&&(document.frames[_873.name])&&(document.frames[_873.name].document))||null;
return doc;
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe src='javascript:false'"+" style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=dojo.doc().createElement(html);
this.iframe.tabIndex=-1;
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _877=dojo.html.getMarginBox(this.domNode);
if(_877.width==0||_877.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
this.iframe.style.width=_877.width+"px";
this.iframe.style.height=_877.height+"px";
}
},size:function(node){
if(!this.iframe){
return;
}
var _879=dojo.html.toCoordinateObject(node,true,dojo.html.boxSizing.BORDER_BOX);
with(this.iframe.style){
width=_879.width+"px";
height=_879.height+"px";
left=_879.left+"px";
top=_879.top+"px";
}
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
}
}
},show:function(){
if(this.iframe){
this.iframe.style.display="block";
}
},hide:function(){
if(this.iframe){
this.iframe.style.display="none";
}
},remove:function(){
if(this.iframe){
dojo.html.removeNode(this.iframe,true);
delete this.iframe;
this.iframe=null;
}
}});
dojo.provide("dojo.dnd.HtmlDragAndDrop");
dojo.declare("dojo.dnd.HtmlDragSource",dojo.dnd.DragSource,{dragClass:"",onDragStart:function(){
var _87b=new dojo.dnd.HtmlDragObject(this.dragObject,this.type);
if(this.dragClass){
_87b.dragClass=this.dragClass;
}
if(this.constrainToContainer){
_87b.constrainTo(this.constrainingContainer||this.domNode.parentNode);
}
return _87b;
},setDragHandle:function(node){
node=dojo.byId(node);
dojo.dnd.dragManager.unregisterDragSource(this);
this.domNode=node;
dojo.dnd.dragManager.registerDragSource(this);
},setDragTarget:function(node){
this.dragObject=node;
},constrainTo:function(_87e){
this.constrainToContainer=true;
if(_87e){
this.constrainingContainer=_87e;
}
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragSource(this.dragObjects[i]));
}
},addDragObjects:function(el){
for(var i=0;i<arguments.length;i++){
this.dragObjects.push(dojo.byId(arguments[i]));
}
}},function(node,type){
node=dojo.byId(node);
this.dragObjects=[];
this.constrainToContainer=false;
if(node){
this.domNode=node;
this.dragObject=node;
this.type=(type)||(this.domNode.nodeName.toLowerCase());
dojo.dnd.DragSource.prototype.reregister.call(this);
}
});
dojo.declare("dojo.dnd.HtmlDragObject",dojo.dnd.DragObject,{dragClass:"",opacity:0.5,createIframe:true,disableX:false,disableY:false,createDragNode:function(){
var node=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
var ltn=node.tagName.toLowerCase();
var isTr=(ltn=="tr");
if((isTr)||(ltn=="tbody")){
var doc=this.domNode.ownerDocument;
var _888=doc.createElement("table");
if(isTr){
var _889=doc.createElement("tbody");
_888.appendChild(_889);
_889.appendChild(node);
}else{
_888.appendChild(node);
}
var _88a=((isTr)?this.domNode:this.domNode.firstChild);
var _88b=((isTr)?node:node.firstChild);
var _88c=_88a.childNodes;
var _88d=_88b.childNodes;
for(var i=0;i<_88c.length;i++){
if((_88d[i])&&(_88d[i].style)){
_88d[i].style.width=dojo.html.getContentBox(_88c[i]).width+"px";
}
}
node=_888;
}
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(node.style){
top="0px";
left="0px";
}
var _88f=document.createElement("div");
_88f.appendChild(node);
this.bgIframe=new dojo.html.BackgroundIframe(_88f);
_88f.appendChild(this.bgIframe.iframe);
node=_88f;
}
node.style.zIndex=999;
return node;
},onDragStart:function(e){
dojo.html.clearSelection();
this.scrollOffset=dojo.html.getScroll().offset;
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.dragClone=this.createDragNode();
this.containingBlockPosition=this.domNode.offsetParent?dojo.html.getAbsolutePosition(this.domNode.offsetParent,true):{x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
with(this.dragClone.style){
position="absolute";
top=this.dragOffset.y+e.pageY+"px";
left=this.dragOffset.x+e.pageX+"px";
}
dojo.body().appendChild(this.dragClone);
dojo.event.topic.publish("dragStart",{source:this});
},getConstraints:function(){
if(this.constrainingContainer.nodeName.toLowerCase()=="body"){
var _891=dojo.html.getViewport();
var _892=_891.width;
var _893=_891.height;
var _894=dojo.html.getScroll().offset;
var x=_894.x;
var y=_894.y;
}else{
var _897=dojo.html.getContentBox(this.constrainingContainer);
_892=_897.width;
_893=_897.height;
x=this.containingBlockPosition.x+dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=this.containingBlockPosition.y+dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
}
var mb=dojo.html.getMarginBox(this.domNode);
return {minX:x,minY:y,maxX:x+_892-mb.width,maxY:y+_893-mb.height};
},updateDragOffset:function(){
var _899=dojo.html.getScroll().offset;
if(_899.y!=this.scrollOffset.y){
var diff=_899.y-this.scrollOffset.y;
this.dragOffset.y+=diff;
this.scrollOffset.y=_899.y;
}
if(_899.x!=this.scrollOffset.x){
var diff=_899.x-this.scrollOffset.x;
this.dragOffset.x+=diff;
this.scrollOffset.x=_899.x;
}
},onDragMove:function(e){
this.updateDragOffset();
var x=this.dragOffset.x+e.pageX;
var y=this.dragOffset.y+e.pageY;
if(this.constrainToContainer){
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
this.setAbsolutePosition(x,y);
dojo.event.topic.publish("dragMove",{source:this});
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.dragClone.style.top=y+"px";
}
if(!this.disableX){
this.dragClone.style.left=x+"px";
}
},onDragEnd:function(e){
switch(e.dragStatus){
case "dropSuccess":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
case "dropFailure":
var _8a1=dojo.html.getAbsolutePosition(this.dragClone,true);
var _8a2={left:this.dragStartPosition.x+1,top:this.dragStartPosition.y+1};
var anim=dojo.lfx.slideTo(this.dragClone,_8a2,300);
var _8a4=this;
dojo.event.connect(anim,"onEnd",function(e){
dojo.html.removeNode(_8a4.dragClone);
_8a4.dragClone=null;
});
anim.play();
break;
}
dojo.event.topic.publish("dragEnd",{source:this});
},constrainTo:function(_8a6){
this.constrainToContainer=true;
if(_8a6){
this.constrainingContainer=_8a6;
}else{
this.constrainingContainer=this.domNode.parentNode;
}
}},function(node,type){
this.domNode=dojo.byId(node);
this.type=type;
this.constrainToContainer=false;
this.dragSource=null;
dojo.dnd.DragObject.prototype.register.call(this);
});
dojo.declare("dojo.dnd.HtmlDropTarget",dojo.dnd.DropTarget,{vertical:false,onDragOver:function(e){
if(!this.accepts(e.dragObjects)){
return false;
}
this.childBoxes=[];
for(var i=0,_8ab;i<this.domNode.childNodes.length;i++){
_8ab=this.domNode.childNodes[i];
if(_8ab.nodeType!=dojo.html.ELEMENT_NODE){
continue;
}
var pos=dojo.html.getAbsolutePosition(_8ab,true);
var _8ad=dojo.html.getBorderBox(_8ab);
this.childBoxes.push({top:pos.y,bottom:pos.y+_8ad.height,left:pos.x,right:pos.x+_8ad.width,height:_8ad.height,width:_8ad.width,node:_8ab});
}
return true;
},_getNodeUnderMouse:function(e){
for(var i=0,_8b0;i<this.childBoxes.length;i++){
with(this.childBoxes[i]){
if(e.pageX>=left&&e.pageX<=right&&e.pageY>=top&&e.pageY<=bottom){
return i;
}
}
}
return -1;
},createDropIndicator:function(){
this.dropIndicator=document.createElement("div");
with(this.dropIndicator.style){
position="absolute";
zIndex=999;
if(this.vertical){
borderLeftWidth="1px";
borderLeftColor="black";
borderLeftStyle="solid";
height=dojo.html.getBorderBox(this.domNode).height+"px";
top=dojo.html.getAbsolutePosition(this.domNode,true).y+"px";
}else{
borderTopWidth="1px";
borderTopColor="black";
borderTopStyle="solid";
width=dojo.html.getBorderBox(this.domNode).width+"px";
left=dojo.html.getAbsolutePosition(this.domNode,true).x+"px";
}
}
},onDragMove:function(e,_8b2){
var i=this._getNodeUnderMouse(e);
if(!this.dropIndicator){
this.createDropIndicator();
}
var _8b4=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
var hide=false;
if(i<0){
if(this.childBoxes.length){
var _8b6=(dojo.html.gravity(this.childBoxes[0].node,e)&_8b4);
if(_8b6){
hide=true;
}
}else{
var _8b6=true;
}
}else{
var _8b7=this.childBoxes[i];
var _8b6=(dojo.html.gravity(_8b7.node,e)&_8b4);
if(_8b7.node===_8b2[0].dragSource.domNode){
hide=true;
}else{
var _8b8=_8b6?(i>0?this.childBoxes[i-1]:_8b7):(i<this.childBoxes.length-1?this.childBoxes[i+1]:_8b7);
if(_8b8.node===_8b2[0].dragSource.domNode){
hide=true;
}
}
}
if(hide){
this.dropIndicator.style.display="none";
return;
}else{
this.dropIndicator.style.display="";
}
this.placeIndicator(e,_8b2,i,_8b6);
if(!dojo.html.hasParent(this.dropIndicator)){
dojo.body().appendChild(this.dropIndicator);
}
},placeIndicator:function(e,_8ba,_8bb,_8bc){
var _8bd=this.vertical?"left":"top";
var _8be;
if(_8bb<0){
if(this.childBoxes.length){
_8be=_8bc?this.childBoxes[0]:this.childBoxes[this.childBoxes.length-1];
}else{
this.dropIndicator.style[_8bd]=dojo.html.getAbsolutePosition(this.domNode,true)[this.vertical?"x":"y"]+"px";
}
}else{
_8be=this.childBoxes[_8bb];
}
if(_8be){
this.dropIndicator.style[_8bd]=(_8bc?_8be[_8bd]:_8be[this.vertical?"right":"bottom"])+"px";
if(this.vertical){
this.dropIndicator.style.height=_8be.height+"px";
this.dropIndicator.style.top=_8be.top+"px";
}else{
this.dropIndicator.style.width=_8be.width+"px";
this.dropIndicator.style.left=_8be.left+"px";
}
}
},onDragOut:function(e){
if(this.dropIndicator){
dojo.html.removeNode(this.dropIndicator);
delete this.dropIndicator;
}
},onDrop:function(e){
this.onDragOut(e);
var i=this._getNodeUnderMouse(e);
var _8c2=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
if(i<0){
if(this.childBoxes.length){
if(dojo.html.gravity(this.childBoxes[0].node,e)&_8c2){
return this.insert(e,this.childBoxes[0].node,"before");
}else{
return this.insert(e,this.childBoxes[this.childBoxes.length-1].node,"after");
}
}
return this.insert(e,this.domNode,"append");
}
var _8c3=this.childBoxes[i];
if(dojo.html.gravity(_8c3.node,e)&_8c2){
return this.insert(e,_8c3.node,"before");
}else{
return this.insert(e,_8c3.node,"after");
}
},insert:function(e,_8c5,_8c6){
var node=e.dragObject.domNode;
if(_8c6=="before"){
return dojo.html.insertBefore(node,_8c5);
}else{
if(_8c6=="after"){
return dojo.html.insertAfter(node,_8c5);
}else{
if(_8c6=="append"){
_8c5.appendChild(node);
return true;
}
}
}
return false;
}},function(node,_8c9){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
dojo.dnd.DropTarget.call(this);
if(_8c9&&dojo.lang.isString(_8c9)){
_8c9=[_8c9];
}
this.acceptedTypes=_8c9||[];
dojo.dnd.dragManager.registerDropTarget(this);
});
dojo.kwCompoundRequire({common:["dojo.dnd.DragAndDrop"],browser:["dojo.dnd.HtmlDragAndDrop"],dashboard:["dojo.dnd.HtmlDragAndDrop"]});
dojo.provide("dojo.dnd.*");
dojo.provide("dojo.ns");
dojo.ns={namespaces:{},failed:{},loading:{},loaded:{},register:function(name,_8cb,_8cc,_8cd){
if(!_8cd||!this.namespaces[name]){
this.namespaces[name]=new dojo.ns.Ns(name,_8cb,_8cc);
}
},allow:function(name){
if(this.failed[name]){
return false;
}
if((djConfig.excludeNamespace)&&(dojo.lang.inArray(djConfig.excludeNamespace,name))){
return false;
}
return ((name==this.dojo)||(!djConfig.includeNamespace)||(dojo.lang.inArray(djConfig.includeNamespace,name)));
},get:function(name){
return this.namespaces[name];
},require:function(name){
var ns=this.namespaces[name];
if((ns)&&(this.loaded[name])){
return ns;
}
if(!this.allow(name)){
return false;
}
if(this.loading[name]){
dojo.debug("dojo.namespace.require: re-entrant request to load namespace \""+name+"\" must fail.");
return false;
}
var req=dojo.require;
this.loading[name]=true;
try{
if(name=="dojo"){
req("dojo.namespaces.dojo");
}else{
if(!dojo.hostenv.moduleHasPrefix(name)){
dojo.registerModulePath(name,"../"+name);
}
req([name,"manifest"].join("."),false,true);
}
if(!this.namespaces[name]){
this.failed[name]=true;
}
}
finally{
this.loading[name]=false;
}
return this.namespaces[name];
}};
dojo.ns.Ns=function(name,_8d4,_8d5){
this.name=name;
this.module=_8d4;
this.resolver=_8d5;
this._loaded=[];
this._failed=[];
};
dojo.ns.Ns.prototype.resolve=function(name,_8d7,_8d8){
if(!this.resolver||djConfig["skipAutoRequire"]){
return false;
}
var _8d9=this.resolver(name,_8d7);
if((_8d9)&&(!this._loaded[_8d9])&&(!this._failed[_8d9])){
var req=dojo.require;
req(_8d9,false,true);
if(dojo.hostenv.findModule(_8d9,false)){
this._loaded[_8d9]=true;
}else{
if(!_8d8){
dojo.raise("dojo.ns.Ns.resolve: module '"+_8d9+"' not found after loading via namespace '"+this.name+"'");
}
this._failed[_8d9]=true;
}
}
return Boolean(this._loaded[_8d9]);
};
dojo.registerNamespace=function(name,_8dc,_8dd){
dojo.ns.register.apply(dojo.ns,arguments);
};
dojo.registerNamespaceResolver=function(name,_8df){
var n=dojo.ns.namespaces[name];
if(n){
n.resolver=_8df;
}
};
dojo.registerNamespaceManifest=function(_8e1,path,name,_8e4,_8e5){
dojo.registerModulePath(name,path);
dojo.registerNamespace(name,_8e4,_8e5);
};
dojo.registerNamespace("dojo","dojo.widget");
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _8e6={};
var _8e7=[];
this.getUniqueId=function(_8e8){
var _8e9;
do{
_8e9=_8e8+"_"+(_8e6[_8e8]!=undefined?++_8e6[_8e8]:_8e6[_8e8]=0);
}while(this.getWidgetById(_8e9));
return _8e9;
};
this.add=function(_8ea){
this.widgets.push(_8ea);
if(!_8ea.extraArgs["id"]){
_8ea.extraArgs["id"]=_8ea.extraArgs["ID"];
}
if(_8ea.widgetId==""){
if(_8ea["id"]){
_8ea.widgetId=_8ea["id"];
}else{
if(_8ea.extraArgs["id"]){
_8ea.widgetId=_8ea.extraArgs["id"];
}else{
_8ea.widgetId=this.getUniqueId(_8ea.ns+"_"+_8ea.widgetType);
}
}
}
if(this.widgetIds[_8ea.widgetId]){
dojo.debug("widget ID collision on ID: "+_8ea.widgetId);
}
this.widgetIds[_8ea.widgetId]=_8ea;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_8ec){
if(dojo.lang.isNumber(_8ec)){
var tw=this.widgets[_8ec].widgetId;
delete this.topWidgets[tw];
delete this.widgetIds[tw];
this.widgets.splice(_8ec,1);
}else{
this.removeById(_8ec);
}
};
this.removeById=function(id){
if(!dojo.lang.isString(id)){
id=id["widgetId"];
if(!id){
dojo.debug("invalid widget or id passed to removeById");
return;
}
}
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
if(dojo.lang.isString(id)){
return this.widgetIds[id];
}
return id;
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var _8f3=(type.indexOf(":")<0?function(x){
return x.widgetType.toLowerCase();
}:function(x){
return x.getNamespacedType();
});
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(_8f3(x)==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsByFilter=function(_8f8,_8f9){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_8f8(x)){
ret.push(x);
if(_8f9){
return false;
}
}
return true;
});
return (_8f9?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _8ff={};
var _900=["dojo.widget"];
for(var i=0;i<_900.length;i++){
_900[_900[i]]=true;
}
this.registerWidgetPackage=function(_902){
if(!_900[_902]){
_900[_902]=true;
_900.push(_902);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_900,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_904,_905,_906,ns){
var impl=this.getImplementationName(_904,ns);
if(impl){
var ret=_905?new impl(_905):new impl();
return ret;
}
};
function buildPrefixCache(){
for(var _90a in dojo.render){
if(dojo.render[_90a]["capable"]===true){
var _90b=dojo.render[_90a].prefixes;
for(var i=0;i<_90b.length;i++){
_8e7.push(_90b[i].toLowerCase());
}
}
}
}
var _90d=function(_90e,_90f){
if(!_90f){
return null;
}
for(var i=0,l=_8e7.length,_912;i<=l;i++){
_912=(i<l?_90f[_8e7[i]]:_90f);
if(!_912){
continue;
}
for(var name in _912){
if(name.toLowerCase()==_90e){
return _912[name];
}
}
}
return null;
};
var _914=function(_915,_916){
var _917=dojo.evalObjPath(_916,false);
return (_917?_90d(_915,_917):null);
};
this.getImplementationName=function(_918,ns){
var _91a=_918.toLowerCase();
ns=ns||"dojo";
var imps=_8ff[ns]||(_8ff[ns]={});
var impl=imps[_91a];
if(impl){
return impl;
}
if(!_8e7.length){
buildPrefixCache();
}
var _91d=dojo.ns.get(ns);
if(!_91d){
dojo.ns.register(ns,ns+".widget");
_91d=dojo.ns.get(ns);
}
if(_91d){
_91d.resolve(_918);
}
impl=_914(_91a,_91d.module);
if(impl){
return (imps[_91a]=impl);
}
_91d=dojo.ns.require(ns);
if((_91d)&&(_91d.resolver)){
_91d.resolve(_918);
impl=_914(_91a,_91d.module);
if(impl){
return (imps[_91a]=impl);
}
}
dojo.deprecated("dojo.widget.Manager.getImplementationName","Could not locate widget implementation for \""+_918+"\" in \""+_91d.module+"\" registered to namespace \""+_91d.name+"\". "+"Developers must specify correct namespaces for all non-Dojo widgets","0.5");
for(var i=0;i<_900.length;i++){
impl=_914(_91a,_900[i]);
if(impl){
return (imps[_91a]=impl);
}
}
throw new Error("Could not locate widget implementation for \""+_918+"\" in \""+_91d.module+"\" registered to namespace \""+_91d.name+"\"");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _920=this.topWidgets[id];
if(_920.checkSize){
_920.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_925,_926){
dw[(_926||_925)]=h(_925);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _928=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _928[n];
}
return _928;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.a11y");
dojo.a11y={imgPath:dojo.uri.moduleUri("dojo.widget","templates/images"),doAccessibleCheck:true,accessible:null,checkAccessible:function(){
if(this.accessible===null){
this.accessible=false;
if(this.doAccessibleCheck==true){
this.accessible=this.testAccessible();
}
}
return this.accessible;
},testAccessible:function(){
this.accessible=false;
if(dojo.render.html.ie||dojo.render.html.mozilla){
var div=document.createElement("div");
div.style.backgroundImage="url(\""+this.imgPath+"/tab_close.gif\")";
dojo.body().appendChild(div);
var _92a=null;
if(window.getComputedStyle){
var _92b=getComputedStyle(div,"");
_92a=_92b.getPropertyValue("background-image");
}else{
_92a=div.currentStyle.backgroundImage;
}
var _92c=false;
if(_92a!=null&&(_92a=="none"||_92a=="url(invalid-url:)")){
this.accessible=true;
}
dojo.body().removeChild(div);
}
return this.accessible;
},setCheckAccessible:function(_92d){
this.doAccessibleCheck=_92d;
},setAccessibleMode:function(){
if(this.accessible===null){
if(this.checkAccessible()){
dojo.render.html.prefixes.unshift("a11y");
}
}
return this.accessible;
}};
dojo.provide("dojo.widget.Widget");
dojo.declare("dojo.widget.Widget",null,function(){
this.children=[];
this.extraArgs={};
},{parent:null,isTopLevel:false,disabled:false,isContainer:false,widgetId:"",widgetType:"Widget",ns:"dojo",getNamespacedType:function(){
return (this.ns?this.ns+":"+this.widgetType:this.widgetType).toLowerCase();
},toString:function(){
return "[Widget "+this.getNamespacedType()+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.disabled=false;
},disable:function(){
this.disabled=true;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _92f=this.children[i];
if(_92f.onResized){
_92f.onResized();
}
}
},create:function(args,_931,_932,ns){
if(ns){
this.ns=ns;
}
this.satisfyPropertySets(args,_931,_932);
this.mixInProperties(args,_931,_932);
this.postMixInProperties(args,_931,_932);
dojo.widget.manager.add(this);
this.buildRendering(args,_931,_932);
this.initialize(args,_931,_932);
this.postInitialize(args,_931,_932);
this.postCreate(args,_931,_932);
return this;
},destroy:function(_934){
if(this.parent){
this.parent.removeChild(this);
}
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_934);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
var _935;
var i=0;
while(this.children.length>i){
_935=this.children[i];
if(_935 instanceof dojo.widget.Widget){
this.removeChild(_935);
_935.destroy();
continue;
}
i++;
}
},getChildrenOfType:function(type,_938){
var ret=[];
var _93a=dojo.lang.isFunction(type);
if(!_93a){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_93a){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_938){
ret=ret.concat(this.children[x].getChildrenOfType(type,_938));
}
}
return ret;
},getDescendants:function(){
var _93c=[];
var _93d=[this];
var elem;
while((elem=_93d.pop())){
_93c.push(elem);
if(elem.children){
dojo.lang.forEach(elem.children,function(elem){
_93d.push(elem);
});
}
}
return _93c;
},isFirstChild:function(){
return this===this.parent.children[0];
},isLastChild:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _944;
var _945=dojo.widget.lcArgsCache[this.widgetType];
if(_945==null){
_945={};
for(var y in this){
_945[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_945;
}
var _947={};
for(var x in args){
if(!this[x]){
var y=_945[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_947[x]){
continue;
}
_947[x]=true;
if((typeof this[x])!=(typeof _944)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.kwConnect({srcObj:this,srcFunc:x,adviceObj:this,adviceFunc:tn});
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=dojo.uri.dojoUri(args[x]);
}else{
var _949=args[x].split(";");
for(var y=0;y<_949.length;y++){
var si=_949[y].indexOf(":");
if((si!=-1)&&(_949[y].length>si)){
this[x][_949[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_949[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(args,frag,_94d){
},initialize:function(args,frag,_950){
return false;
},postInitialize:function(args,frag,_953){
return false;
},postCreate:function(args,frag,_956){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(args,frag,_959){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},addedTo:function(_95a){
},addChild:function(_95b){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_95c){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_95c){
this.children.splice(x,1);
_95c.parent=null;
break;
}
}
return _95c;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.parent.children[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.parent.children.length-1){
return null;
}
if(idx<0){
return null;
}
return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
dojo.deprecated("addParseTreeHandler",". ParseTreeHandlers are now reserved for components. Any unfiltered DojoML tag without a ParseTreeHandler is assumed to be a widget","0.5");
};
dojo.widget.tags["dojo:propertyset"]=function(_961,_962,_963){
var _964=_962.parseProperties(_961["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_965,_966,_967){
var _968=_966.parseProperties(_965["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_96b,_96c,_96d,_96e){
dojo.a11y.setAccessibleMode();
var _96f=type.split(":");
_96f=(_96f.length==2)?_96f[1]:type;
var _970=_96e||_96b.parseProperties(frag[frag["ns"]+":"+_96f]);
var _971=dojo.widget.manager.getImplementation(_96f,null,null,frag["ns"]);
if(!_971){
throw new Error("cannot find \""+type+"\" widget");
}else{
if(!_971.create){
throw new Error("\""+type+"\" widget object has no \"create\" method and does not appear to implement *Widget");
}
}
_970["dojoinsertionindex"]=_96d;
var ret=_971.create(_970,frag,_96c,frag["ns"]);
return ret;
};
dojo.widget.defineWidget=function(_973,_974,_975,init,_977){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_97a,_97b,_97c,init,_97e){
var _97f=_97a.split(".");
var type=_97f.pop();
var regx="\\.("+(_97b?_97b+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_97a.search(new RegExp(regx));
_97f=(r<0?_97f.join("."):_97a.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_97f);
var pos=_97f.indexOf(".");
var _984=(pos>-1)?_97f.substring(0,pos):_97f;
_97e=(_97e)||{};
_97e.widgetType=type;
if((!init)&&(_97e["classConstructor"])){
init=_97e.classConstructor;
delete _97e.classConstructor;
}
dojo.declare(_97a,_97c,init,_97e);
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_985){
this.propertySetsList=[];
this.fragment=_985;
this.createComponents=function(frag,_987){
var _988=[];
var _989=false;
try{
if(frag&&frag.tagName&&(frag!=frag.nodeRef)){
var _98a=dojo.widget.tags;
var tna=String(frag.tagName).split(";");
for(var x=0;x<tna.length;x++){
var ltn=tna[x].replace(/^\s+|\s+$/g,"").toLowerCase();
frag.tagName=ltn;
var ret;
if(_98a[ltn]){
_989=true;
ret=_98a[ltn](frag,this,_987,frag.index);
_988.push(ret);
}else{
if(ltn.indexOf(":")==-1){
ltn="dojo:"+ltn;
}
ret=dojo.widget.buildWidgetFromParseTree(ltn,frag,this,_987,frag.index);
if(ret){
_989=true;
_988.push(ret);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_989){
_988=_988.concat(this.createSubComponents(frag,_987));
}
return _988;
};
this.createSubComponents=function(_98f,_990){
var frag,_992=[];
for(var item in _98f){
frag=_98f[item];
if(frag&&typeof frag=="object"&&(frag!=_98f.nodeRef)&&(frag!=_98f.tagName)&&(!dojo.dom.isNode(frag))){
_992=_992.concat(this.createComponents(frag,_990));
}
}
return _992;
};
this.parsePropertySets=function(_994){
return [];
};
this.parseProperties=function(_995){
var _996={};
for(var item in _995){
if((_995[item]==_995.tagName)||(_995[item]==_995.nodeRef)){
}else{
var frag=_995[item];
if(frag.tagName&&dojo.widget.tags[frag.tagName.toLowerCase()]){
}else{
if(frag[0]&&frag[0].value!=""&&frag[0].value!=null){
try{
if(item.toLowerCase()=="dataprovider"){
var _999=this;
this.getDataProvider(_999,frag[0].value);
_996.dataProvider=this.dataProvider;
}
_996[item]=frag[0].value;
var _99a=this.parseProperties(frag);
for(var _99b in _99a){
_996[_99b]=_99a[_99b];
}
}
catch(e){
dojo.debug(e);
}
}
}
switch(item.toLowerCase()){
case "checked":
case "disabled":
if(typeof _996[item]!="boolean"){
_996[item]=true;
}
break;
}
}
}
return _996;
};
this.getDataProvider=function(_99c,_99d){
dojo.io.bind({url:_99d,load:function(type,_99f){
if(type=="load"){
_99c.dataProvider=_99f;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_9a0){
for(var x=0;x<this.propertySetsList.length;x++){
if(_9a0==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_9a2){
var _9a3=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl.componentClass||cpl.componentType||null;
var _9a7=this.propertySetsList[x]["id"][0].value;
if(cpcc&&(_9a7==cpcc[0].value)){
_9a3.push(cpl);
}
}
return _9a3;
};
this.getPropertySets=function(_9a8){
var ppl="dojo:propertyproviderlist";
var _9aa=[];
var _9ab=_9a8.tagName;
if(_9a8[ppl]){
var _9ac=_9a8[ppl].value.split(" ");
for(var _9ad in _9ac){
if((_9ad.indexOf("..")==-1)&&(_9ad.indexOf("://")==-1)){
var _9ae=this.getPropertySetById(_9ad);
if(_9ae!=""){
_9aa.push(_9ae);
}
}else{
}
}
}
return this.getPropertySetsByType(_9ab).concat(_9aa);
};
this.createComponentFromScript=function(_9af,_9b0,_9b1,ns){
_9b1.fastMixIn=true;
var ltn=(ns||"dojo")+":"+_9b0.toLowerCase();
if(dojo.widget.tags[ltn]){
return [dojo.widget.tags[ltn](_9b1,this,null,null,_9b1)];
}
return [dojo.widget.buildWidgetFromParseTree(ltn,_9b1,this,null,null,_9b1)];
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_9b6,_9b7,_9b8){
var _9b9=false;
var _9ba=(typeof name=="string");
if(_9ba){
var pos=name.indexOf(":");
var ns=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
var _9bd=name.toLowerCase();
var _9be=ns+":"+_9bd;
_9b9=(dojo.byId(name)&&!dojo.widget.tags[_9be]);
}
if((arguments.length==1)&&(_9b9||!_9ba)){
var xp=new dojo.xml.Parse();
var tn=_9b9?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function fromScript(_9c1,name,_9c3,ns){
_9c3[_9be]={dojotype:[{value:_9bd}],nodeRef:_9c1,fastMixIn:true};
_9c3.ns=ns;
return dojo.widget.getParser().createComponentFromScript(_9c1,name,_9c3,ns);
}
_9b6=_9b6||{};
var _9c5=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_9b7){
_9c5=true;
_9b7=tn;
if(h){
dojo.body().appendChild(_9b7);
}
}else{
if(_9b8){
dojo.dom.insertAtPosition(tn,_9b7,_9b8);
}else{
tn=_9b7;
}
}
var _9c7=fromScript(tn,name.toLowerCase(),_9b6,ns);
if((!_9c7)||(!_9c7[0])||(typeof _9c7[0].widgetType=="undefined")){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
try{
if(_9c5&&_9c7[0].domNode.parentNode){
_9c7[0].domNode.parentNode.removeChild(_9c7[0].domNode);
}
}
catch(e){
dojo.debug(e);
}
return _9c7[0];
};
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),dojoWidgetModuleUri:dojo.uri.moduleUri("dojo.widget"),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.fillFromTemplateCache=function(obj,_9c9,_9ca,_9cb){
var _9cc=_9c9||obj.templatePath;
var _9cd=dojo.widget._templateCache;
if(!_9cc&&!obj["widgetType"]){
do{
var _9ce="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_9cd[_9ce]);
obj.widgetType=_9ce;
}
var wt=_9cc?_9cc.toString():obj.widgetType;
var ts=_9cd[wt];
if(!ts){
_9cd[wt]={"string":null,"node":null};
if(_9cb){
ts={};
}else{
ts=_9cd[wt];
}
}
if((!obj.templateString)&&(!_9cb)){
obj.templateString=_9ca||ts["string"];
}
if(obj.templateString){
obj.templateString=this._sanitizeTemplateString(obj.templateString);
}
if((!obj.templateNode)&&(!_9cb)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_9cc)){
var _9d1=this._sanitizeTemplateString(dojo.hostenv.getText(_9cc));
obj.templateString=_9d1;
if(!_9cb){
_9cd[wt]["string"]=_9d1;
}
}
if((!ts["string"])&&(!_9cb)){
ts.string=obj.templateString;
}
};
dojo.widget._sanitizeTemplateString=function(_9d2){
if(_9d2){
_9d2=_9d2.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _9d3=_9d2.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_9d3){
_9d2=_9d3[1];
}
}else{
_9d2="";
}
return _9d2;
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole","namespace":"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState","namespace":"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_9d7){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_9d7);
}else{
node.setAttributeNS(this[ns]["namespace"],attr,this[ns].prefix+_9d7);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns]["namespace"],attr);
}
},removeAttr:function(node,ns,attr){
var _9de=true;
if(dojo.render.html.ie){
_9de=node.removeAttribute(this[ns].alias+":"+attr);
}else{
node.removeAttributeNS(this[ns]["namespace"],attr);
}
return _9de;
}};
dojo.widget.attachTemplateNodes=function(_9df,_9e0,_9e1){
var _9e2=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_9df){
_9df=_9e0.domNode;
}
if(_9df.nodeType!=_9e2){
return;
}
var _9e4=_9df.all||_9df.getElementsByTagName("*");
var _9e5=_9e0;
for(var x=-1;x<_9e4.length;x++){
var _9e7=(x==-1)?_9df:_9e4[x];
var _9e8=[];
if(!_9e0.widgetsInTemplate||!_9e7.getAttribute("dojoType")){
for(var y=0;y<this.attachProperties.length;y++){
var _9ea=_9e7.getAttribute(this.attachProperties[y]);
if(_9ea){
_9e8=_9ea.split(";");
for(var z=0;z<_9e8.length;z++){
if(dojo.lang.isArray(_9e0[_9e8[z]])){
_9e0[_9e8[z]].push(_9e7);
}else{
_9e0[_9e8[z]]=_9e7;
}
}
break;
}
}
var _9ec=_9e7.getAttribute(this.eventAttachProperty);
if(_9ec){
var evts=_9ec.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _9ee=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _9f0=tevt.split(":");
tevt=trim(_9f0[0]);
_9ee=trim(_9f0[1]);
}
if(!_9ee){
_9ee=tevt;
}
var tf=function(){
var ntf=new String(_9ee);
return function(evt){
if(_9e5[ntf]){
_9e5[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_9e7,tevt,tf,false,true);
}
}
for(var y=0;y<_9e1.length;y++){
var _9f4=_9e7.getAttribute(_9e1[y]);
if((_9f4)&&(_9f4.length)){
var _9ee=null;
var _9f5=_9e1[y].substr(4);
_9ee=trim(_9f4);
var _9f6=[_9ee];
if(_9ee.indexOf(";")>=0){
_9f6=dojo.lang.map(_9ee.split(";"),trim);
}
for(var z=0;z<_9f6.length;z++){
if(!_9f6[z].length){
continue;
}
var tf=function(){
var ntf=new String(_9f6[z]);
return function(evt){
if(_9e5[ntf]){
_9e5[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_9e7,_9f5,tf,false,true);
}
}
}
}
var _9f9=_9e7.getAttribute(this.templateProperty);
if(_9f9){
_9e0[_9f9]=_9e7;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_9e7.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_9e7,wai.name,"role",val);
}else{
var _9fd=val.split("-");
dojo.widget.wai.setAttr(_9e7,wai.name,_9fd[0],_9fd[1]);
}
}
},this);
var _9fe=_9e7.getAttribute(this.onBuildProperty);
if(_9fe){
eval("var node = baseNode; var widget = targetObj; "+_9fe);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].length<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,widgetsInTemplate:false,addChild:function(_a06,_a07,pos,ref,_a0a){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_a0a==undefined){
_a0a=this.children.length;
}
this.addWidgetAsDirectChild(_a06,_a07,pos,ref,_a0a);
this.registerChild(_a06,_a0a);
}
return _a06;
},addWidgetAsDirectChild:function(_a0b,_a0c,pos,ref,_a0f){
if((!this.containerNode)&&(!_a0c)){
this.containerNode=this.domNode;
}
var cn=(_a0c)?_a0c:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_a0f){
_a0f=0;
}
_a0b.domNode.setAttribute("dojoinsertionindex",_a0f);
if(!ref){
cn.appendChild(_a0b.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_a0b.domNode,ref.parentNode,_a0f);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_a0b.domNode);
}else{
dojo.dom.insertAtPosition(_a0b.domNode,cn,pos);
}
}
}
},registerChild:function(_a11,_a12){
_a11.dojoInsertionIndex=_a12;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<=_a12){
idx=i;
}
}
this.children.splice(idx+1,0,_a11);
_a11.parent=this;
_a11.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_a11.widgetId];
},removeChild:function(_a15){
dojo.dom.removeNode(_a15.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_a15);
},getFragNodeRef:function(frag){
if(!frag){
return null;
}
if(!frag[this.getNamespacedType()]){
dojo.raise("Error: no frag for widget type "+this.getNamespacedType()+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag[this.getNamespacedType()]["nodeRef"];
},postInitialize:function(args,frag,_a19){
var _a1a=this.getFragNodeRef(frag);
if(_a19&&(_a19.snarfChildDomOutput||!_a1a)){
_a19.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_a1a);
}else{
if(_a1a){
if(this.domNode&&(this.domNode!==_a1a)){
this._sourceNodeRef=dojo.dom.replaceNode(_a1a,this.domNode);
}
}
}
if(_a19){
_a19.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.widgetsInTemplate){
var _a1b=new dojo.xml.Parse();
var _a1c;
var _a1d=this.domNode.getElementsByTagName("*");
for(var i=0;i<_a1d.length;i++){
if(_a1d[i].getAttribute("dojoAttachPoint")=="subContainerWidget"){
_a1c=_a1d[i];
}
if(_a1d[i].getAttribute("dojoType")){
_a1d[i].setAttribute("isSubWidget",true);
}
}
if(this.isContainer&&!this.containerNode){
if(_a1c){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,_a1c);
frag["dojoDontFollow"]=true;
}
}else{
dojo.debug("No subContainerWidget node can be found in template file for widget "+this);
}
}
var _a20=_a1b.parseElement(this.domNode,null,true);
dojo.widget.getParser().createSubComponents(_a20,this);
var _a21=[];
var _a22=[this];
var w;
while((w=_a22.pop())){
for(var i=0;i<w.children.length;i++){
var _a24=w.children[i];
if(_a24._processedSubWidgets||!_a24.extraArgs["issubwidget"]){
continue;
}
_a21.push(_a24);
if(_a24.isContainer){
_a22.push(_a24);
}
}
}
for(var i=0;i<_a21.length;i++){
var _a25=_a21[i];
if(_a25._processedSubWidgets){
dojo.debug("This should not happen: widget._processedSubWidgets is already true!");
return;
}
_a25._processedSubWidgets=true;
if(_a25.extraArgs["dojoattachevent"]){
var evts=_a25.extraArgs["dojoattachevent"].split(";");
for(var j=0;j<evts.length;j++){
var _a28=null;
var tevt=dojo.string.trim(evts[j]);
if(tevt.indexOf(":")>=0){
var _a2a=tevt.split(":");
tevt=dojo.string.trim(_a2a[0]);
_a28=dojo.string.trim(_a2a[1]);
}
if(!_a28){
_a28=tevt;
}
if(dojo.lang.isFunction(_a25[tevt])){
dojo.event.kwConnect({srcObj:_a25,srcFunc:tevt,targetObj:this,targetFunc:_a28});
}else{
alert(tevt+" is not a function in widget "+_a25);
}
}
}
if(_a25.extraArgs["dojoattachpoint"]){
this[_a25.extraArgs["dojoattachpoint"]]=_a25;
}
}
}
if(this.isContainer&&!frag["dojoDontFollow"]){
dojo.widget.getParser().createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
var _a2e=args["templateCssPath"]||this.templateCssPath;
if(_a2e&&!dojo.widget._cssFiles[_a2e.toString()]){
if((!this.templateCssString)&&(_a2e)){
this.templateCssString=dojo.hostenv.getText(_a2e);
this.templateCssPath=null;
}
dojo.widget._cssFiles[_a2e.toString()]=true;
}
if((this["templateCssString"])&&(!dojo.widget._cssStrings[this.templateCssString])){
dojo.html.insertCssText(this.templateCssString,null,_a2e);
dojo.widget._cssStrings[this.templateCssString]=true;
}
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _a31=false;
if(args["templatepath"]){
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_a31);
var ts=dojo.widget._templateCache[this.templatePath?this.templatePath.toString():this.widgetType];
if((ts)&&(!_a31)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _a33=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_a33=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_a33){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_a33.length;i++){
var key=_a33[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _a3a;
if((kval)||(dojo.lang.isString(kval))){
_a3a=new String((dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval);
while(_a3a.indexOf("\"")>-1){
_a3a=_a3a.replace("\"","&quot;");
}
tstr=tstr.replace(_a33[i],_a3a);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_a31){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_a33)){
dojo.debug("DomWidget.buildFromTemplate: could not create template");
return false;
}else{
if(!_a33){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes();
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_a3c,_a3d){
if(!_a3c){
_a3c=this.domNode;
}
if(!_a3d){
_a3d=this;
}
return dojo.widget.attachTemplateNodes(_a3c,_a3d,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
dojo.dom.destroyNode(this.domNode);
delete this.domNode;
}
catch(e){
}
if(this._sourceNodeRef){
try{
dojo.dom.destroyNode(this._sourceNodeRef);
}
catch(e){
}
}
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_a3f,_a40,_a41){
dojo.html.show(node);
if(dojo.lang.isFunction(_a41)){
_a41();
}
},hide:function(node,_a43,_a44,_a45){
dojo.html.hide(node);
if(dojo.lang.isFunction(_a45)){
_a45();
}
}};
dojo.lfx.toggle.fade={show:function(node,_a47,_a48,_a49){
dojo.lfx.fadeShow(node,_a47,_a48,_a49).play();
},hide:function(node,_a4b,_a4c,_a4d){
dojo.lfx.fadeHide(node,_a4b,_a4c,_a4d).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_a4f,_a50,_a51){
dojo.lfx.wipeIn(node,_a4f,_a50,_a51).play();
},hide:function(node,_a53,_a54,_a55){
dojo.lfx.wipeOut(node,_a53,_a54,_a55).play();
}};
dojo.lfx.toggle.explode={show:function(node,_a57,_a58,_a59,_a5a){
dojo.lfx.explode(_a5a||{x:0,y:0,width:0,height:0},node,_a57,_a58,_a59).play();
},hide:function(node,_a5c,_a5d,_a5e,_a5f){
dojo.lfx.implode(node,_a5f||{x:0,y:0,width:0,height:0},_a5c,_a5d,_a5e).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{templateCssPath:null,templatePath:null,lang:"",toggle:"plain",toggleDuration:150,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
if(this.lang===""){
this.lang=null;
}
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_a66){
try{
if(this.bgIframe){
this.bgIframe.remove();
delete this.bgIframe;
}
if(!_a66&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
dojo.widget.HtmlWidget.superclass.destroyRendering.call(this);
}
catch(e){
}
},isShowing:function(){
return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isShowing()){
this.hide();
}else{
this.show();
}
},show:function(){
if(this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
if(!this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
var wh=dojo.html.getMarginBox(this.domNode);
var _a6a=w||wh.width;
var _a6b=h||wh.height;
if(this.width==_a6a&&this.height==_a6b){
return false;
}
this.width=_a6a;
this.height=_a6b;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
if(this.isShowing()){
this.onResized();
}
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_a6e){
if(_a6e.checkSize){
_a6e.checkSize();
}
});
}});
dojo.kwCompoundRequire({common:["dojo.xml.Parse","dojo.widget.Widget","dojo.widget.Parse","dojo.widget.Manager"],browser:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],dashboard:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],svg:["dojo.widget.SvgWidget"],rhino:["dojo.widget.SwtWidget"]});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.math");
dojo.math.degToRad=function(x){
return (x*Math.PI)/180;
};
dojo.math.radToDeg=function(x){
return (x*180)/Math.PI;
};
dojo.math.factorial=function(n){
if(n<1){
return 0;
}
var _a72=1;
for(var i=1;i<=n;i++){
_a72*=i;
}
return _a72;
};
dojo.math.permutations=function(n,k){
if(n==0||k==0){
return 1;
}
return (dojo.math.factorial(n)/dojo.math.factorial(n-k));
};
dojo.math.combinations=function(n,r){
if(n==0||r==0){
return 1;
}
return (dojo.math.factorial(n)/(dojo.math.factorial(n-r)*dojo.math.factorial(r)));
};
dojo.math.bernstein=function(t,n,i){
return (dojo.math.combinations(n,i)*Math.pow(t,i)*Math.pow(1-t,n-i));
};
dojo.math.gaussianRandom=function(){
var k=2;
do{
var i=2*Math.random()-1;
var j=2*Math.random()-1;
k=i*i+j*j;
}while(k>=1);
k=Math.sqrt((-2*Math.log(k))/k);
return i*k;
};
dojo.math.mean=function(){
var _a7e=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
var mean=0;
for(var i=0;i<_a7e.length;i++){
mean+=_a7e[i];
}
return mean/_a7e.length;
};
dojo.math.round=function(_a81,_a82){
if(!_a82){
var _a83=1;
}else{
var _a83=Math.pow(10,_a82);
}
return Math.round(_a81*_a83)/_a83;
};
dojo.math.sd=dojo.math.standardDeviation=function(){
var _a84=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
return Math.sqrt(dojo.math.variance(_a84));
};
dojo.math.variance=function(){
var _a85=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
var mean=0,_a87=0;
for(var i=0;i<_a85.length;i++){
mean+=_a85[i];
_a87+=Math.pow(_a85[i],2);
}
return (_a87/_a85.length)-Math.pow(mean/_a85.length,2);
};
dojo.math.range=function(a,b,step){
if(arguments.length<2){
b=a;
a=0;
}
if(arguments.length<3){
step=1;
}
var _a8c=[];
if(step>0){
for(var i=a;i<b;i+=step){
_a8c.push(i);
}
}else{
if(step<0){
for(var i=a;i>b;i+=step){
_a8c.push(i);
}
}else{
throw new Error("dojo.math.range: step must be non-zero");
}
}
return _a8c;
};
dojo.provide("dojo.math.curves");
dojo.math.curves={Line:function(_a8e,end){
this.start=_a8e;
this.end=end;
this.dimensions=_a8e.length;
for(var i=0;i<_a8e.length;i++){
_a8e[i]=Number(_a8e[i]);
}
for(var i=0;i<end.length;i++){
end[i]=Number(end[i]);
}
this.getValue=function(n){
var _a92=new Array(this.dimensions);
for(var i=0;i<this.dimensions;i++){
_a92[i]=((this.end[i]-this.start[i])*n)+this.start[i];
}
return _a92;
};
return this;
},Bezier:function(pnts){
this.getValue=function(step){
if(step>=1){
return this.p[this.p.length-1];
}
if(step<=0){
return this.p[0];
}
var _a96=new Array(this.p[0].length);
for(var k=0;j<this.p[0].length;k++){
_a96[k]=0;
}
for(var j=0;j<this.p[0].length;j++){
var C=0;
var D=0;
for(var i=0;i<this.p.length;i++){
C+=this.p[i][j]*this.p[this.p.length-1][0]*dojo.math.bernstein(step,this.p.length,i);
}
for(var l=0;l<this.p.length;l++){
D+=this.p[this.p.length-1][0]*dojo.math.bernstein(step,this.p.length,l);
}
_a96[j]=C/D;
}
return _a96;
};
this.p=pnts;
return this;
},CatmullRom:function(pnts,c){
this.getValue=function(step){
var _aa0=step*(this.p.length-1);
var node=Math.floor(_aa0);
var _aa2=_aa0-node;
var i0=node-1;
if(i0<0){
i0=0;
}
var i=node;
var i1=node+1;
if(i1>=this.p.length){
i1=this.p.length-1;
}
var i2=node+2;
if(i2>=this.p.length){
i2=this.p.length-1;
}
var u=_aa2;
var u2=_aa2*_aa2;
var u3=_aa2*_aa2*_aa2;
var _aaa=new Array(this.p[0].length);
for(var k=0;k<this.p[0].length;k++){
var x1=(-this.c*this.p[i0][k])+((2-this.c)*this.p[i][k])+((this.c-2)*this.p[i1][k])+(this.c*this.p[i2][k]);
var x2=(2*this.c*this.p[i0][k])+((this.c-3)*this.p[i][k])+((3-2*this.c)*this.p[i1][k])+(-this.c*this.p[i2][k]);
var x3=(-this.c*this.p[i0][k])+(this.c*this.p[i1][k]);
var x4=this.p[i][k];
_aaa[k]=x1*u3+x2*u2+x3*u+x4;
}
return _aaa;
};
if(!c){
this.c=0.7;
}else{
this.c=c;
}
this.p=pnts;
return this;
},Arc:function(_ab0,end,ccw){
var _ab3=dojo.math.points.midpoint(_ab0,end);
var _ab4=dojo.math.points.translate(dojo.math.points.invert(_ab3),_ab0);
var rad=Math.sqrt(Math.pow(_ab4[0],2)+Math.pow(_ab4[1],2));
var _ab6=dojo.math.radToDeg(Math.atan(_ab4[1]/_ab4[0]));
if(_ab4[0]<0){
_ab6-=90;
}else{
_ab6+=90;
}
dojo.math.curves.CenteredArc.call(this,_ab3,rad,_ab6,_ab6+(ccw?-180:180));
},CenteredArc:function(_ab7,_ab8,_ab9,end){
this.center=_ab7;
this.radius=_ab8;
this.start=_ab9||0;
this.end=end;
this.getValue=function(n){
var _abc=new Array(2);
var _abd=dojo.math.degToRad(this.start+((this.end-this.start)*n));
_abc[0]=this.center[0]+this.radius*Math.sin(_abd);
_abc[1]=this.center[1]-this.radius*Math.cos(_abd);
return _abc;
};
return this;
},Circle:function(_abe,_abf){
dojo.math.curves.CenteredArc.call(this,_abe,_abf,0,360);
return this;
},Path:function(){
var _ac0=[];
var _ac1=[];
var _ac2=[];
var _ac3=0;
this.add=function(_ac4,_ac5){
if(_ac5<0){
dojo.raise("dojo.math.curves.Path.add: weight cannot be less than 0");
}
_ac0.push(_ac4);
_ac1.push(_ac5);
_ac3+=_ac5;
computeRanges();
};
this.remove=function(_ac6){
for(var i=0;i<_ac0.length;i++){
if(_ac0[i]==_ac6){
_ac0.splice(i,1);
_ac3-=_ac1.splice(i,1)[0];
break;
}
}
computeRanges();
};
this.removeAll=function(){
_ac0=[];
_ac1=[];
_ac3=0;
};
this.getValue=function(n){
var _ac9=false,_aca=0;
for(var i=0;i<_ac2.length;i++){
var r=_ac2[i];
if(n>=r[0]&&n<r[1]){
var subN=(n-r[0])/r[2];
_aca=_ac0[i].getValue(subN);
_ac9=true;
break;
}
}
if(!_ac9){
_aca=_ac0[_ac0.length-1].getValue(1);
}
for(var j=0;j<i;j++){
_aca=dojo.math.points.translate(_aca,_ac0[j].getValue(1));
}
return _aca;
};
function computeRanges(){
var _acf=0;
for(var i=0;i<_ac1.length;i++){
var end=_acf+_ac1[i]/_ac3;
var len=end-_acf;
_ac2[i]=[_acf,end,len];
_acf=end;
}
}
return this;
}};
dojo.provide("dojo.math.points");
dojo.math.points={translate:function(a,b){
if(a.length!=b.length){
dojo.raise("dojo.math.translate: points not same size (a:["+a+"], b:["+b+"])");
}
var c=new Array(a.length);
for(var i=0;i<a.length;i++){
c[i]=a[i]+b[i];
}
return c;
},midpoint:function(a,b){
if(a.length!=b.length){
dojo.raise("dojo.math.midpoint: points not same size (a:["+a+"], b:["+b+"])");
}
var c=new Array(a.length);
for(var i=0;i<a.length;i++){
c[i]=(a[i]+b[i])/2;
}
return c;
},invert:function(a){
var b=new Array(a.length);
for(var i=0;i<a.length;i++){
b[i]=-a[i];
}
return b;
},distance:function(a,b){
return Math.sqrt(Math.pow(b[0]-a[0],2)+Math.pow(b[1]-a[1],2));
}};
dojo.kwCompoundRequire({common:[["dojo.math",false,false],["dojo.math.curves",false,false],["dojo.math.points",false,false]]});
dojo.provide("dojo.math.*");

