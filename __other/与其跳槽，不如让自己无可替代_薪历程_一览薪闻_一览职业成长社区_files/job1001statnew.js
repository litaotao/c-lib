(function(){
		  
function addCookie(objName,objValue,objHours){//���cookie
	var str = objName + "=" + escape(objValue);
	if(objHours > 0){//Ϊ0ʱ���趨����ʱ�䣬������ر�ʱcookie�Զ���ʧ
		var date = new Date();
		var ms = objHours;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString();
	}
	document.cookie = str;
	return true;
};
function getCookie(objName){//��ȡָ�����Ƶ�cookie��ֵ
	var arrStr = document.cookie.split("; ");
	for(var i = 0;i < arrStr.length;i ++){
		var temp = arrStr[i].split("=");
		if(temp[0] == objName) return unescape(temp[1]);
	}
	return '';
};


var v=window.location;//��ȡ��ǰҳ���url��Ϣ
var r=document.referrer;//��Դurl
var c="";//��ɫ
var cookieflag='';//�ͻ���Ψһ��ʶ
var cookieflagall='';//��
var time = '';
var s='';//��С

time = new Date();

//��ȡ�������ɫ���
if (navigator.appName=="Netscape"){c=screen.pixelDepth;}else {c=screen.colorDepth;}
//��ȡ��������С
s=screen.width+'*'+screen.height;
/*
* ��ȡ�����ñ�ʶ��Ψһ�û���cookie
*/
var newview=0;
try{
	cookieflag=getCookie('cookieflag');
	cookieflagall=getCookie('cookieflagall');
	cookiesession=getCookie('cookiesession');
	
	//�˲ź���ҵ
	cu=getCookie('c_job1001UserId');
	u=getCookie('job1001EnterId');
	if(typeof job1001EnterId!='undefined') u=job1001EnterId;
	//��վ����
	title=document.title;
	
	
	if (cookieflag==''){
		var rand = Math.random()+"";
		rand = rand.substr(2,6);
		cookieflag = rand;
	}else
		newview=1;

	if(cookieflagall==''){
		rand = Math.random()+"";
		rand = rand.substr(2,6);
		cookieflagall = rand;
	}
	if(cookiesession==''){
		var date = new Date();
		rand = Math.random()+"";
		cookiesession=date.getTime()+rand;
		
	}
	var d1=new Date(time.getFullYear(),time.getMonth()+1,time.getDate(),'23','59','59'); 
	//console.log(time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+'-'+'23 59 59');
	addCookie('cookieflag',cookieflag,d1.getTime()-time.getTime());
	addCookie('cookieflagall',cookieflagall,365 * 24 * 60 * 60 * 1000);
	addCookie('cookiesession',cookiesession,0);
}catch(e){}

//version=getBrowserVersion();
//l=getLocalLanguage();
var siteid='';
var sarr=document.getElementsByTagName('script');
//var host='192.168.60.200/workfile/xieqh/statnew/statnew.php';
var host='tj198.job1001.com/statnew.php';
for(var i in sarr){
	if(typeof sarr[i].src!='undefined'){
		var mr=sarr[i].src;
		if(mr.indexOf('job1001statnew.js')!=-1){
			siteid=mr.substring(mr.indexOf("siteid")+7,mr.length);
			break;
		}	
	}
	
}

//alert(vn.indexOf("siteid"));
//alert(siteid);
//var s=document.getElementsByTagName();
//���ݵĲ�����tpages��cookie  AJSTAT_ok_pages��ֵ�������ϴλ����ϼ�1�����ֵ��ttimes��cookie  AJSTAT_ok_times  ��ֵ��a9226ot����������ʱ��ͱ���ʱ���ʱ���λСʱ��tcolor���������ɫ��ȣ�sSize����Ļ�ߴ磻referrer����Դurl��vpage��������ҳ���url
/*document.write('<div style="display:none"><img style="width:0px;height:0px;display:none" id="tongjimmm" src="http://192.168.60.200/workfile/xieqh/statnew/statnew.php?tzone='+(0-time.getTimezoneOffset()/60)+'&cookieflag='+cookieflag+'&cookieflagall='+cookieflagall+'&tcolor='+a9226color+'&sSize='+screen.width+'*'+screen.height+'&vpage='+escape(a9226op)+'&referrer='+escape(a9226of)+'&browser='+encodeURIComponent(version)+'&os='+encodeURIComponent(navigator.platform)+'&language='+encodeURIComponent(language)+'&siteid=4611351566367256" /></div>');
*/
/*
document.write('<div style="display:none"><img style="width:0px;height:0px;display:none" id="tongjimmm" src="http://'+host+'?co='+cookieflag+'&ca='+cookieflagall+'&c='+c+'&s='+s+'&v='+escape(v)+'&r='+escape(r)+'&siteid='+siteid+'" /></div>');
*/
var url='http://'+host+'?co='+cookieflag+'&cs='+cookiesession+'&ca='+cookieflagall+'&c='+c+'&s='+s+'&v='+escape(v)+'&r='+escape(r)+'&siteid='+siteid+'&cu='+cu+'&u='+u+'&t='+encodeURIComponent(title)+"&vt="+Math.random()+'&newview='+newview;
//var b=document.createElement("script");
//b.setAttribute("type","text/javascript");
//b.setAttribute("src",url);
//a=document.getElementsByTagName("script")[0];
//a.parentNode.insertBefore(b,a);
//document.body.appendChild(b);
var img=new Image();
img.src=url+'&msit='+time.getTime()+''+parseInt(Math.random()*1000);
})();








