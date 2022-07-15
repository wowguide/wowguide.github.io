var qdGive = new Array;
var qdTake = new Array;


//////////////////////////////////////////////////////////////////////////////////////////////////
function getY(oElement) {
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function getX(oElement) {
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetLeft;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

isDOM=document.getElementById?true:false
isOpera=isOpera5=window.opera && isDOM
isOpera6=isOpera && window.print
isOpera7=isOpera && document.readyState
isMSIE=isIE=document.all && document.all.item && !isOpera
isStrict=document.compatMode=="CSS1Compat";
if (document.documentElement && document.documentElement.scrollTop) isStrict = true;
isNN=isNC=navigator.appName=="Netscape";
isNN4=isNC4=isNN && !isDOM
isMozilla=isNN6=isNN && isDOM
//////////////////////////////////////////////////////////////////////////////////////////////////
var AltShowing=-1;

var Alts=new Array;
var type = 0;
//////////////////////////////////////////////////////////////////////////////////////////////////
function getBody(w) {
  if (!w) w=window
  if (isStrict){
    return w.document.documentElement
  } else {
    return w.document.body
  }
}

function getWindowLeft(w){
  if(!w) w=window
  if(isMSIE || isOpera7) return w.screenLeft
  if(isNN || isOpera) return w.screenX
}

function getWindowTop(w){
  if(!w) w=window
  if(isMSIE || isOpera7) return w.screenTop
  if(isNN || isOpera) return w.screenY
}

function getWindowWidth(w){
  if(!w) w=window
  if(isMSIE) return getBody(w).clientWidth
  if(isNN || isOpera) return w.innerWidth
}

function getWindowHeight(w){
  if(!w) w=window
  if(isMSIE) return getBody(w).clientHeight
  if(isNN || isOpera) return w.innerHeight
}

function getDocumentWidth(w){
  if(!w) w=window
  if(isMSIE || isOpera7) return getBody(w).scrollWidth
  if(isNN) return w.document.width
  if(isOpera) return w.document.body.style.pixelWidth
}

function getDocumentHeight(w){
  if(!w) w=window
  if(isMSIE || isOpera7) return getBody(w).scrollHeight
  if(isNN) return w.document.height
  if(isOpera) return w.document.body.style.pixelHeight
}

function getScrollX(w){
  if(!w) w=window
  if(isMSIE || isOpera7) return getBody(w).scrollLeft
  if(isNN || isOpera) return w.pageXOffset
}

function getScrollY(w){
	if(!w) w=window
	if(isMSIE || isOpera7) return getBody(w).scrollTop
	if(isNN || isOpera) return w.pageYOffset
}

function setScrollX(x,w){
  if(!w) w=window
  if(isMSIE || isOpera7) getBody(w).scrollLeft=x
  if(isNN || isOpera) pageXOffset=x
}

function setScrollY(y,w){
  if(!w) w=window
  if(isMSIE || isOpera7) getBody(w).scrollTop=y
  if(isNN || isOpera) w.pageYOffset=y
}


function getDocumentHeight(doc) {
	return document.body.offsetHeight;
    if (doc.all) {
        return document.body.offsetHeight;
	} else if (doc.layers)
        return document.body.document.height;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////mouse//////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

var mousex = 0;
var mousey = 0;

if(isNN4) document.captureEvents(Event.MOUSEMOVE)
if(isMSIE || isOpera7){
  document.onmousemove=function(){
    mousex=event.clientX+document.body.scrollLeft
    mousey=event.clientY+document.body.scrollTop
    return true
  }
}else if(isOpera){
  document.onmousemove=function(){
    mousex=event.clientX
    mousey=event.clientY
    return true
  }
}else if(isNN4 || isMozilla){
  document.onmousemove=function(e){
    mousex = e.pageX
    mousey = e.pageY
    return true
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
function getElementPosition (elemId) {
	var offsetTrail = document.getElementById(elemId);
	var offsetLeft = 0;
	var offsetTop = 0;
	while (offsetTrail) {
		offsetLeft += offsetTrail.offsetLeft;
		offsetTop += offsetTrail.offsetTop;
		offsetTrail = offsetTrail.offsetParent;
	}
	return {left:offsetLeft, top:offsetTop};
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function AltMove() {
	if (AltShowing==1) {

		var ssy = (isMSIE) ? getScrollY() : 0;
		//var ssx = (isMSIE) ? getScrollX() : 0;

		var el=document.getElementById('idAlt');
		var el2=el;//document.getElementById('idAltBox');
		scry = getScrollY();

		var wx = el2.clientWidth;
		var wy = el2.clientHeight;
//		if (wx < 200) wx = 200;
		//alert(wx);
		if (((wx+mousex+30)>_win_x) || (type == 1)) {
			el.style.left=(mousex-wx-10)+"px";
		} else {
			el.style.left=(mousex+15)+"px";
		}

		if ((wy+mousey+35)>_win_y+scry)
			el.style.top=(_win_y-wy-10+scry)+"px";
		else
			el.style.top=(mousey+15)+"px";

	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function AltHide(){
	if (AltShowing==1){
		el=document.getElementById('idAlt');
		el.style.display="none";
		el.style.top=0+"px";
		AltShowing=0;
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function ShowAlt(text, w) {

	_win_x = getWindowWidth(); _win_y = getWindowHeight();
	AltShowing=1;
	el=document.getElementById('idAlt');
	el.style.top=0+"px";

	cl = (w) ? ' style="width:'+w+'px;text-align:justify;" ' : '';

	el.innerHTML = '<div class="popup" '+cl+'>'+text+'</div>';

	el.style.display="block";

	AltMove();


}//////////////////////////////////////////////////////////////////////////////////////////////////
function AltQ(n) {
	
	if (!qdGive[n]) return;
	if (!qdTake[n]) return;
	
	var s = sQD;
	s = s.replace('%g', qdGive[n]); 
	s = s.replace('%t', qdTake[n]); 
	
	ShowAlt(s);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/*var xhttp = false;
var use_ajax = false;
//////////////////////////////////////////////////////////////////////////////////////////////////
function get_http(){    
    var xmlhttp;    
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {    
        try {    
            xmlhttp = new XMLHttpRequest();    
        } catch (e) {    
            xmlhttp = false;    
        }    
    }    
    return xmlhttp;    
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function initAjax() {

	if(!xhttp){
		xhttp = get_http();
		use_ajax = true;
	}
	
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function myonreadystatechange() {

	obj = window.document.getElementById('idAlt');

	switch (xhttp.readyState) {
		case 1: 
//			obj.innerHTML = ajaxLoadingText;
			break;
			
		case 4: //complete
			var s = xhttp.responseText;
			if (s.indexOf('<body>')) s = s.substr(s.indexOf('<body>')+6);
			if (s.indexOf('</body')) s = s.substr(0, s.indexOf('</body'));
			obj.innerHTML = s;
			//alert(xhttp.responseText);
			break;
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function MyCheckKey() {
	xhttp.abort();
	
}
//////////////////////////////////////////////////////////////////////////////////////////////////
*/

var myDate=new Date();
myDate.setFullYear(2008,10,15);

var time = Date();
current_time = time.toLocaleString();

document.write('<div id="idAlt" class="div_alt"></div>');

if (myDate > current_time) {
	document.write('<br><br><br><br><br><br><h2><center>');
	document.write('&#1042;&#1085;&#1080;&#1084;&#1072;&#1085;&#1080;&#1077;! &#1042;&#1077;&#1088;&#1089;&#1080;&#1103; &#1091;&#1089;&#1090;&#1072;&#1088;&#1077;&#1083;&#1072;.<br />'+
	'&#1055;&#1086;&#1078;&#1072;&#1083;&#1091;&#1081;&#1089;&#1090;&#1072;, &#1089;&#1082;&#1072;&#1095;&#1072;&#1081;&#1090;&#1077; &#1085;&#1086;&#1074;&#1091;&#1102; &#1074;&#1077;&#1088;&#1089;&#1080;&#1102; &#1089;');
	document.write(' <a href="http://www.wowdata.ru/guides.html#download">www.wowdata.ru</a>');
	document.write('</center></h2>');

	document.write('<div id="main" style="display:none;">');
}
