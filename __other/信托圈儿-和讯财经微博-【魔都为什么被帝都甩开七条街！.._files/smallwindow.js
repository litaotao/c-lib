document.write("<script language='javascript' src='http://t.hexun.com/js/windowBase.js' ></script>"); 

//����ǩ
function checkTag(tObj,IObj,KObj)
{
    var Title=E(tObj).value;
    Title=escape(Title);
    var Content=E(IObj).value;
    Content=escape(Content);
    $.getIfModified(ApiFile,{getTag:1,Title:Title,Content:Content},
    function(response)
    {
        if(response!=null&&response!="")
        {
            E(KObj).value=response;
        }
    });
}
function cpen(windowObj,w,h,wtop,wleft) {
    //���д򿪵���Ƶ�ȹر�
    $('.preview_big_4').click();
   
	if(E("bodyshade")&&E("windowbg")) wclose(windowObj);
	//1.������������
	var bodyshade = Element.create("div");
	bodyshade.id = "bodyshade";
	with(bodyshade.style) {
		position = "absolute";
		background = "#666";
		width = document.documentElement.scrollWidth+"px";
		
		height = (document.documentElement.clientHeight>document.documentElement.scrollHeight)?document.documentElement.clientHeight+"px":document.documentElement.scrollHeight+"px";
		//height = document.documentElement.scrollHeight+"px";
		top = "0px";
		left = "0px";
		filter="Alpha(opacity=50)";
		opacity = 0.5;
		zIndex=999;
		}
	
	//2.�������ڱ���
	var windowbg = Element.create("div");
	windowbg.id = "windowbg";
	with(windowbg.style) {
		position = "absolute";
		background = "#CCC";
		width = parseInt(w)+2+"px";
		height = parseInt(h)+2+"px";
		left = wleft;
		top = wtop;
		filter="Alpha(opacity=0)";
		opacity = 0;
		marginLeft = -w/2+document.documentElement.scrollLeft+"px";
		marginTop = -h/2+document.documentElement.scrollTop+document.body.scrollTop+"px";
		//alert(marginTop);
		zIndex=999;
		}
	    //3.��ʾ
	    window.setTimeout(function()
	    {
           Element.show(windowObj);
           E(windowObj).style.top =wtop;
           E(windowObj).style.left = wleft;
           E(windowObj).style.marginLeft = -w/2-2+document.documentElement.scrollLeft+"px";
           E(windowObj).style.marginTop = -h/2-2+document.documentElement.scrollTop+document.body.scrollTop+"px";
           E(windowObj).style.zIndex = 9999;
	    },250);
	 
   }
//����΢Ⱥ
CreateGrp=function(windowObj,w,h)
{
    $.getIfModified(ApiFile,{createq:1}, 
     function(response)
     {
         var flag=response.split('|')[0];
        
         if(flag==-1)
         {
              document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
         }
         else if(flag==0)
         {
             var message=response.split('|')[1];
             woopenError(windowObj,w,h,"�������ܴ���΢Ⱥ",message);
         }
         else if(flag==2)
         {
            E(windowObj).style.width="489px";
            cpen(windowObj,w,h,'30%','50%');
           
            var html="<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">";
            html+="<tbody><tr>";
            html+="<td class=\"tdbgT\" colspan=\"3\"></td>";
            html+="</tr>";
            html+="<tr>";
            html+="<td class=\"tdbgL\"></td>";
            html+=" <td class=\"tdbgC\"><h3><span onclick=\"wclose('turn2Window');\"></span><strong>�����ҵ�΢Ⱥ</strong></h3>";
            
            html+=" <div class=\"sorry\"><img src=\"/images/common/SORRY.jpg\" /></div>";
	        
	        //html+="<div class=\"createHelp\">";
	        //html+="<p><strong>������ͨ�����·�ʽ��������Ⱥ����</strong></p>";
	        //html+="<p>�õ�100����ע   ---�����û���ע����100ʱ��<br />";
            //html+="��Ϊ��֤�û�  <a href=\"#\">�����Ϊ��֤�û�</a><br />";
            //html+="�� <a href=\"http://t.hexun.com/hecaiwei/default.html\" target=_blank>�β�ޱ</a> Ѱ�����</p></div>";
            
            var creategrp=response.split('|')[4];
           
            if(creategrp!=""&&creategrp!=null)
            {
                var list=creategrp.split('$');
                
                if(list.length>0)
                {
                    for(var i=0;i<list.length;i++)
                    {
                        var loadgroupid=list[i].split('#')[0];
                        var loadgroupname=list[i].split('#')[1];
                        var membercount=list[i].split('#')[2];
                        var TotalVisits=list[i].split('#')[3];
                        var gLogo=list[i].split('#')[4];
                        if(i==0)
                        {
                            html+="<div class=\"created\">";
		                    html+="<h2><strong>�Ѵ�����΢Ⱥ</strong></h2>";
                        }
                       
                        html+="<div class=\"createdBox\">";
		                html+="<div class=\"createdBoxL\"><a href=\"http://q.t.hexun.com/"+loadgroupid+"/default.html\" target=_blank><img src=\""+gLogo+"\" /></a></div>";
		                html+="<div class=\"createdBoxR\"><a href=\"http://q.t.hexun.com/"+loadgroupid+"/default.html\" target=_blank>"+loadgroupname+"</a>";
                        html+="<p>ȺԱ��"+membercount+"<br/>��������"+TotalVisits+"<br/><a href=\"http://q.t.hexun.com/"+loadgroupid+"/default.html\" target=_blank>��������</a> <a href=\"javascript:void(0);\" onclick=\"DisMissGrp('"+loadgroupid+"','"+loadgroupname+"','turn2Window','360','230');\"> ��ɢ</a></p>";
		                html+="</div></div>";
                        if(i==list.length)
                        {
                            html+="</div>";
                        }
                    }
                }
            }
            html+="</td>";
            html+="<td class=\"tdbgR\"></td>";
            html+="</tr>";
            html+=" <tr>";
            html+=" <td class=\"tdbgT\" colspan=\"3\"></td>";
            html+="</tr>";
            html+="</tbody></table>";
            E(windowObj).innerHTML=html;
            
         }
         else
         {
            var totalcreate=response.split('|')[1];
            var hasCreate=response.split('|')[2];
            var enableCreate=response.split('|')[3];
            E(windowObj).style.width="489px";
            cpen(windowObj,w,h,'30%','50%');
           
            var html="<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">";
            html+="<tbody><tr>";
            html+="<td class=\"tdbgT\" colspan=\"3\"></td>";
            html+="</tr>";
            html+="<tr>";
            html+="<td class=\"tdbgL\"></td>";
            html+=" <td class=\"tdbgC\"><h3><span onclick=\"wclose('turn2Window');\"></span><strong>�����ҵ�΢Ⱥ</strong></h3>";
            if(hasCreate==0)
            {
               html+="<p class=\"green createP\">�����Դ���"+totalcreate+"��΢Ⱥ����ʼ������Ⱥ�ɡ�</p>";
            }
            else
            {
	           html+="<p class=\"green createP\">�����Դ���"+totalcreate+"��΢Ⱥ���������Ѿ�������"+hasCreate+"��΢Ⱥ�������ٴ���"+enableCreate+"����Ⱥ��</p>";
	        }
            html+="<table class=\"create_table\">";
            html+="<tbody><tr>";
            html+=" <td width=\"82\" class=\"algR\">΢Ⱥ���ƣ�</td> ";
            html+=" <td width=\"242\">";
            html+="   <input type=\"text\" class=\"inp1\" id=grpname name=grpname onkeypress=\"TextValidate(0)\" value=\"2-10�����ֻ�4-20��Ӣ����ĸ\" onfocus=\"if(this.value=='2-10�����ֻ�4-20��Ӣ����ĸ'){this.value='';}\" onclick=\"if(this.value=='2-10�����ֻ�4-20��Ӣ����ĸ'){this.value='';}\">           </td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td valign=\"top\" class=\"algR\">΢Ⱥ��飺</td> <td valign=\"top\"><textarea class=\"inp2\" rows=\"\" cols=\"\" id=\"intro\" name=\"intro\" onfocus=\"if(this.value=='���200����'){this.value='';}\" onclick=\"if(this.value=='���200����'){this.value='';}\" onkeypress=\"TextValidate(1)\">���200����</textarea></td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td valign=\"top\" class=\"algR\">��ǩ��</td> ";
            html+="<td><input type=\"text\"  value=\"���磺���� ��Ϸ ��Ʊ\" onfocus=\"if(this.value=='���磺���� ��Ϸ ��Ʊ'){this.value='';}\" onclick=\"if(this.value=='���磺���� ��Ϸ ��Ʊ'){this.value='';}\" class=\"inp1 \" id=keyname name=keyname>&nbsp;<input type=button  class=\"btn2\" style=\"cursor:pointer;width:90px;\" value=\"�Զ���ȡ��ǩ\" onclick=\"checkTag('grpname','intro','keyname');\" /></td>";
            html+="</tr>";
		    html+="<tr>";
            html+="<td valign=\"top\" class=\"algR\">�������ƣ�</td> ";
            html+="<td><form id=tblcreate><input type=radio  name=addlimit value=0 checked> �κ������뼴����������<br><input type=radio  name=addlimit value=1> ";
            html+=" ������Ҫ��׼�ſɼ���<br>";
            html+=" <input  type=radio  name=addlimit value=2> �������û�����<br></form></td>";
            html+=" </tr>";
            html+="<tr>";
            html+=" <td valign=\"top\">&nbsp;</td>";
		    html+="<td>";
            html+="<p style=\" padding:6px 5px 0px 0px;\"><input type=checkbox id=autofw name=autofw checked> �Զ�����һ��΢��֪ͨ </p></td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td valign=\"top\">&nbsp;</td>";
		    html+="<td>";
            html+="<p style=\" padding:0px 5px 0px 0px;\"><input type=\"button\" style=\"float: left;cursor:pointer;width:90px;\" onclick=\"addGrp('turn1Window','"+w+"','"+h+"')\" value=\"����΢Ⱥ\" title=\"����΢Ⱥ\" ></p></td>";
            html+="</tr>";
            html+="<tr>";
            html+="<td valign=\"top\" class=\"algR\">&nbsp;</td>";
		    html+="<td>";
            html+="<p id=errorp style='color:red;display:none;'></p></td>";
            html+="</tr>";
            html+="</tbody></table>";
            var creategrp=response.split('|')[4];
           
            if(creategrp!=""&&creategrp!=null)
            {
                var list=creategrp.split('$');
                
                if(list.length>0)
                {
                    for(var i=0;i<list.length;i++)
                    {
                        var loadgroupid=list[i].split('#')[0];
                        var loadgroupname=list[i].split('#')[1];
                        var membercount=list[i].split('#')[2];
                        var TotalVisits=list[i].split('#')[3];
                        var gLogo=list[i].split('#')[4];
                        if(i==0)
                        {
                            html+="<div class=\"created\">";
		                    html+="<h2><strong>�Ѵ�����΢Ⱥ</strong></h2>";
                        }
                       
                        html+="<div class=\"createdBox\">";
		                html+="<div class=\"createdBoxL\"><a href=\"http://q.t.hexun.com/"+loadgroupid+"/default.html\" target=_blank><img src=\""+gLogo+"\" /></a></div>";
		                html+="<div class=\"createdBoxR\"><a href=\"http://q.t.hexun.com/"+loadgroupid+"/default.html\" target=_blank>"+loadgroupname+"</a>";
                        html+="<p>ȺԱ��"+membercount+"<br/>��������"+TotalVisits+"<br/><a href=\"http://q.t.hexun.com/"+loadgroupid+"/default.html\" target=_blank>��������</a> <a href=\"javascript:void(0);\" onclick=\"DisMissGrp('"+loadgroupid+"','"+loadgroupname+"','turn2Window','360','230');\"> ��ɢ</a></p>";
		                html+="</div></div>";
                        if(i==list.length)
                        {
                            html+="</div>";
                        }
                    }
                }
            }
            html+="</td>";
            html+="<td class=\"tdbgR\"></td>";
            html+="</tr>";
            html+=" <tr>";
            html+=" <td class=\"tdbgT\" colspan=\"3\"></td>";
            html+="</tr>";
            html+="</tbody></table>";
            E(windowObj).innerHTML=html;
         }
     });
}
errortip=function(tip,errormes)
{
    E("errorp").style.display='block';
    E("errorp").innerHTML=tip+":"+errormes;
    setTimeout(function(){
              E("errorp").style.display='none';
                },6000);
}
DisMissGrp=function(gid,gname,windowObj,w,h)
{
    winconfirm(windowObj,w,h,"��ɢ΢Ⱥȷ��","ȷ����ɢ΢Ⱥ��"+gname+"����","delTbtn_" + gid,"delFbtn_" + gid);
    var delTbtn= E("delTbtn_" + gid);
    delTbtn.onclick=function()
    {
        $.getIfModified(ApiFile,{DisMiss:1,gid:gid},
        function(response)
        {
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             }
             else if(flag==0)
             {
                 
             }
             else if(flag==1)
             {
                 CreateGrp(windowObj,w,h);
             }
             
        })
    }
    var delFbtn= E("delFbtn_" + gid);
    delFbtn.onclick=function()
    {
       CreateGrp(windowObj,w,h);
    }
}
addGrp=function(windowObj,w,h)
{
    var Tip="������ʾ";
    var groupname = E("grpname").value;
    if (groupname == null || groupname == '') {
        errortip(Tip,"Ⱥ������Ϊ��");
        return;
    }
    var group_min = Math.floor(byteLength(trim(groupname)) / 2);
    var group_max = Math.ceil(byteLength(trim(groupname)) / 2);

    if (group_min < 2) {
        errortip(Tip,"Ⱥ������С��2�����ֻ�4���ַ�");
        return;
    }
    if (group_max > 10) {
        errortip(Tip,"Ⱥ�����ܴ���10�����ֻ�20���ַ�");
        return;
    }
    var groupintro = E("intro").value;
    if (groupintro == null || groupintro == '') {
        errortip(Tip,"������ݲ���Ϊ��");
        return;
    }
    var intro_max = Math.ceil(byteLength(trim(groupintro)) / 2);
    if (intro_max > 200){
        errortip(Tip,"������ݳ���200");
        return;
    }
    var keyname = E("keyname").value;
    var kc = 0;
    if (keyname != null && keyname != "") {
        keyname = keyname.replace(/\,/g, " ").replace(/\;/g, " ").replace(/\��/g, " ").replace(/\��/g, " ");
        var keylist = keyname.split(' ');
        for (var i = 0; i < keylist.length; i++) {
            if (keylist[i] != null && keylist[i] != "") {
                kc++;
            }
        }
    }
    if (kc > 10) {
        errortip(Tip,"��ǩ���Ϊ10��");
        return;
    }
    var addlimit = "-1";
    obj=E("tblcreate");
    for (var i = 0; i < E(obj).addlimit.length; i++) {
        if (E(obj).addlimit[i].checked) {
            addlimit = E(obj).addlimit[i].value;
            break;
        }
    }
    if (addlimit == "-1") {
        errortip(Tip,"��ѡ���������");
        return;
    }
    var isSyn = 0;
    if (E("autofw") != null && E("autofw").checked) {
        isSyn = 1;
    }
    var visitlimit = "0";
    $.getIfModified(ApiFile,{addq:1,GroupName:escape(groupname),GroupIntro:escape(groupintro),KeyName:escape(keyname),AddLimit:addlimit,VisitLimit:visitlimit,IsSyn:isSyn},
    function(response)
    {
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         if(flag==-1)
         {
              document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
         }
         else if(flag==0)
         {
             errortip(Tip,message);
         }
         else if(flag==1)
         {
             wclose('turn2Window');
             confirmResult(true,windowObj,w,h,'�����ҵ�΢Ⱥ','΢Ⱥ�����ɹ�','btnTrue','');
             var btnTrue=E("btnTrue");
             btnTrue.onclick=function(){
                wclose(windowObj);
                document.location="http://q.t.hexun.com/"+message+"/groupinvitefriends.html";
             }
             setTimeout(function(){
                wclose(windowObj);
                document.location="http://q.t.hexun.com/"+message+"/groupinvitefriends.html";
             },2000);
             
         }
    });
}
//�ղز���	
collect=function(windowObj,w,h,aid)
{
   var html="";
   $.getIfModified(ApiFile,{CollectArticle:1,aid:aid},
   function(response)
   {
       var flag=response.split('|')[0];
       var message=response.split('|')[1];
       if(flag==-1)
       {
          document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
       }
       else if(flag==3)
       {
           confirmResult(true,windowObj,w,h,"�ղ�΢��","���Ѿ��ɹ����ò��ļ����ղؼ�","collect_"+aid,"<a target =\"_blank\" href=\"/collect.html\">���������ҵ��ղؼ�</a>(5����Զ��ر�)");
           var collectBtn=E("collect_"+aid);
           collectBtn.onclick=function(){
                wclose(windowObj);
                //document.location="/collect.html";
                
           }
           setTimeout(function(){
                wclose(windowObj);
                //document.location="/collect.html";
                },5000);
        }
        else
        {
            confirmResult(false,windowObj,w,h,"�ղ�΢��",message,"collect_"+aid);
            var collectBtn=E("collect_"+aid);
            collectBtn.onclick=function(){
                wclose(windowObj);
            }
        }
    })
}
//�ղز���	
collect2=function(windowObj,w,h,aid)
{
   var html="";
   $.getIfModified(ApiFile,{CollectArticle:1,aid:aid},
   function(response)
   {
       var flag=response.split('|')[0];
       var message=response.split('|')[1];
       if(flag==-1)
       {
           parent.document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.parent.document.location);
       }
       else if(flag==3)
       {
           confirmResult2(true,windowObj,w,h,"�ղ�΢��","���Ѿ��ɹ����ò��ļ����ղؼ�","collect_"+aid,"<a  target =\"_blank\" href=\"/collect.html\">���������ҵ��ղؼ�</a>(5����Զ��ر�)");
           var collectBtn=parent.document.getElementById("collect_"+aid);
           collectBtn.onclick=function(){
                wclose2(windowObj);
                //parent.document.location="/collect.html";
           }
           setTimeout(function(){
                wclose2(windowObj);
                //parent.document.location="/collect.html";
                },5000);
        }
        else
        {
            confirmResult2(false,windowObj,w,h,"�ղ�΢����ʾ",message,"collect_"+aid);
            var collectBtn= parent.document.getElementById("collect_"+aid);
            collectBtn.onclick=function(){
                wclose2(windowObj);
            }
        }
    })
}
confirmResult2=function(result,windowObj,w,h,title,info,btnsubmit,remark)
{
    wopen2(windowObj,w,h);
    html="  <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td class=\"tdbgL\"></td>";
    html+="	<td class=\"tdbgC\">";
    html+="		<h3><span onclick=\"wclose('turn2Window');\"></span>"+title+"��</h3>";
    html+="		<form>";
    html+="		<div class=\"win_con\">";
    if(result)
    {
       html+="			<p class=\"successfulp\">"+info+"</p>";
    }
    else
    {
       html+="			<p class=\"errorp\">"+info+"</p>";
    }
    if(remark!=null&&remark!="")
    {
       html+="			<p class=\"huizip\">"+remark+"</p>";
    }
    html+="			<p class=\"fabup\">";
    html+="<span><input type=button  style='cursor:pointer;' value='ȷ��' class='conBgbtn_1' id=\""+btnsubmit+"\"></span>";
    html+="			</p>";
    html+="		</div>";
    html+="		</form>";
    html+="	</td>";
    html+="	<td class=\"tdbgR\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="</table>";
    if(result)
    {
       Element.hide( parent.document.getElementById("bodyshade"));
       Element.hide( parent.document.getElementById("windowbg"));
	}
     parent.document.getElementById(windowObj).innerHTML=html; 
     parent.document.getElementById(windowObj).style.display="";

}
confirmResult=function(result,windowObj,w,h,title,info,btnsubmit,remark)
{
    wopen(windowObj,w,h);
    html="  <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td class=\"tdbgL\"></td>";
    html+="	<td class=\"tdbgC\">";
    html+="		<h3><span onclick=\"wclose('turn2Window');\"></span>"+title+"��</h3>";
    html+="		<form>";
    html+="		<div class=\"win_con\">";
    if(result)
    {
       html+="			<p class=\"successfulp\">"+info+"</p>";
    }
    else
    {
       html+="			<p class=\"errorp\">"+info+"</p>";
    }
    if(remark!=null&&remark!="")
    {
       html+="			<p class=\"huizip\">"+remark+"</p>";
    }
    html+="			<p class=\"fabup\">";
    html+="<span><input type=button  style='cursor:pointer;' value='ȷ��' class='conBgbtn_1' id=\""+btnsubmit+"\"></span>";
    html+="			</p>";
    html+="		</div>";
    html+="		</form>";
    html+="	</td>";
    html+="	<td class=\"tdbgR\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="</table>";
    if(result)
    {
       Element.hide(E("bodyshade"));
       Element.hide(E("windowbg"));
	}
    E(windowObj).innerHTML=html;  
}
winconfirm=function(windowObj,w,h,title,info,btnsubmit,btncancel,remark)
{
    //debugger;
    wopen(windowObj,w,h);
  ��var html="  <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
	html+="<tr>";
	html+="	<td class=\"tdbgL\"></td>";
	html+="	<td class=\"tdbgC\">";
	html+="		<h3><span onclick=\"wclose('turn2Window');\"></span>"+title+"��</h3>";
	html+="		<form>";
	html+="		<div class=\"win_con\">";
	html+="			<p class=\"confirmp\">"+info+"</p>";
	if(remark!=""&&remark!=null)
	{
	   html+="			<p class=\"huizip\">"+remark+"</p>";
	}
	html+="<p class=\"fabup\"><span><input type=button  value=\"ȷ��\" class=\"conBgbtn_1\" style='cursor:pointer;' id=\""+btnsubmit+"\">&nbsp;<input type=button value='ȡ��' class=\"conBgbtn_1\" style='cursor:pointer;'  id=\""+btncancel+"\"></span></p>";
    html+="		</div>";
	html+="		</form>";
	html+="	</td>";
	html+="	<td class=\"tdbgR\"></td>";
	html+="</tr>";
	html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
    html+="</table>";
    E(windowObj).innerHTML=html; 
}
//ɾ��΢���ղ�
DelCollect=function(windowObj,w,h,aid)
{
    winconfirm(windowObj,w,h,"ȡ���ղ�ȷ��","ȷ��ȡ��΢���ղأ�","delTbtn_" + aid,"delFbtn_" + aid);
    var delTbtn= E("delTbtn_" + aid);
    delTbtn.onclick=function()
    {
        $.getIfModified(ApiFile,{DelCollect:1,aid:aid},
        function(response)
        {
            var flag=response.split('|')[0];
            var message=response.split('|')[1];
            
            if(flag==-1)
            {
               wclose(windowObj);
               document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
            }
            else if(flag==2)
            {
               wclose(windowObj);
               document.location.reload(); 
                
           }
           else
           {
              woopenError('turn2Window',360,230,"ɾ��ʧ��",message);
           }
       })
    }
    var delFbtn= E("delFbtn_" + aid);
    delFbtn.onclick=function()
    {
       wclose(windowObj);
    }
}
//ɾ��΢��
DelArticle=function(windowObj,w,h,uid,aid,content)
{

    winconfirm(windowObj,w,h,"ɾ��ȷ��","ȷ��ɾ����"+leftInfo(content,15)+"����","delTbtn_"+aid,"delFbtn_"+aid,"ɾ�����޷��ָ�");
    var delTbtn= E("delTbtn_" + aid);
    delTbtn.onclick=function()
    {
        $.getIfModified(ApiFile,{ArticleDel:1,userid:uid,aid:aid},
        function(response)
        {
            var flag=response.split('|')[0];
            var message=response.split('|')[1];
            
            if(flag==-1)
            {
               wclose(windowObj);
               document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
            }
            else if(flag==2)
            {
               wclose(windowObj);
               var delItem=E("articelItem_"+message);
               if(delItem!=null)
               {
                   delItem.style.display="none";
               }
               var delLine=E("line_"+message);
               if(delLine!=null)
               {
                  delLine.style.display="none";
               }
            }
           else
           {
              woopenError('turn2Window',360,230,"ɾ��ʧ��",message);
           }
       })
    }
    var delFbtn= E("delFbtn_" + aid);
    delFbtn.onclick=function()
    {
       wclose(windowObj);
    }
}
//Js���ۻ�д
loadComment=function(aid,layer,uid,ffaid,commentDiv)
{
    
    $.getIfModified(ApiFile,{LoadComment:Math.random(),aid:aid,layer:layer,uid:uid,ffaid:ffaid},
    function(response)
    {
       
       if(response=="-1")
       {
           document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
           return;
       }
       
       commentDiv.innerHTML=response;
       var quickReplyF=function(evt)
       {
           
           return isShowAtUser(evt,"textcomment_" + aid  ,"PopDivID_" + aid  , uid  ,8,65,69);
        };
        if(navigator.userAgent.indexOf("MSIE")>0)
        { 
            document.getElementById("textcomment_" + aid ).attachEvent("onkeyup",quickReplyF);
        }
        else
        {
            document.getElementById("textcomment_" + aid ).addEventListener('keyup',quickReplyF ,false);
        }

    }
    )
}
//���ۼ���
commentAritcle=function(aid,layer,uid,ffaid)
{
    var commentDiv=E("comment_"+aid);
    if(commentDiv!=null)
    {
    �� if(commentDiv.style.display=="none")
       {
         commentDiv.innerHTML="<h4 class=\"conbg_2\"></h4><div style='height:50px'><img src=\"/images/loading.gif\"/></div>";
         commentDiv.style.display="block";
        
         loadComment(aid,layer,uid,ffaid,commentDiv);
       }
       else
       {
          commentDiv.style.display="none";
       }
    }
}
//����ҳɾ������
MyComDel=function(parentid,commentid,layer,uid,ffaid)
{
    winconfirm("turn2Window",360,230,"ɾ��ȷ��","ȷ��ɾ����","delTbtn_"+commentid,"delFbtn_"+commentid,"ɾ�����޷��ָ�");
    var delTbtn= E("delTbtn_" + commentid);
    delTbtn.onclick=function()
    {
        $.getIfModified(ApiFile,{commentDel:1,parentid:parentid,layer:layer,commentid:commentid,uid:uid,ffaid:ffaid},
        function(response)
        {
           var flag=response.split('|')[0];
           var message=response.split('|')[1];
           if(flag=="-1")
           {
               document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
               return;
           }
           else if(flag==2)
           {
              wclose("turn2Window");
              var MyComDel=E("MyCom_"+commentid);
              if(MyComDel!=null)
              {
                 MyComDel.style.display="none";
              }
           }
           else
           {
              woopenError('turn2Window',360,230,"����ɾ��ʧ��",message);
              return;
           }
        })
   }
   var delFbtn= E("delFbtn_" + commentid);
   delFbtn.onclick=function()
   {
       wclose("turn2Window");
   }
}
GroupMyComDel=function(parentid,commentid,layer,uid,ffaid,gid)
{
    winconfirm("turn2Window",360,230,"ɾ��ȷ��","ȷ��ɾ����","delTbtn_"+commentid,"delFbtn_"+commentid,"ɾ�����޷��ָ�");
    var delTbtn= E("delTbtn_" + commentid);
    delTbtn.onclick=function()
    {
        $.getIfModified(ApiFile,{groupcommentDel:1,parentid:parentid,layer:layer,commentid:commentid,uid:uid,ffaid:ffaid,groupid:gid},
        function(response)
        {
           var flag=response.split('|')[0];
           var message=response.split('|')[1];
           if(flag=="-1")
           {
               document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
               return;
           }
           else if(flag==2)
           {
              wclose("turn2Window");
              var MyComDel=E("MyCom_"+commentid);
              if(MyComDel!=null)
              {
                 MyComDel.style.display="none";
              }
           }
           else
           {
              woopenError('turn2Window',360,230,"����ɾ��ʧ��",message);
              return;
           }
        })
   }
   var delFbtn= E("delFbtn_" + commentid);
   delFbtn.onclick=function()
   {
       wclose("turn2Window");
   }
}
//����ҳɾ��������
GroupMyCom2Del=function(parentid,commentid,layer,uid,ffaid,gid)
{
    winconfirm("turn2Window",360,230,"ɾ��ȷ��","ȷ��ɾ����","delTbtn_"+commentid,"delFbtn_"+commentid,"ɾ�����޷��ָ�");
    var delTbtn= E("delTbtn_" + commentid);
    delTbtn.onclick=function()
    {
        $.getIfModified(ApiFile,{groupcommentDel:1,parentid:parentid,layer:layer,commentid:commentid,uid:uid,ffaid:ffaid,groupid:gid},
        function(response)
        {
           var flag=response.split('|')[0];
           var message=response.split('|')[1];
           if(flag=="-1")
           {
               document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
               return;
           }
           else if(flag==2)
           {
              wclose("turn2Window");
              var obj=E("CommentP_"+commentid);
              if(obj!=null)
              {
                  obj.style.display="none";
              }
           }
           else
           {
              woopenError('turn2Window',360,230,"����ɾ��ʧ��",message);
              return;
           }
        })
   }
   var delFbtn= E("delFbtn_" + commentid);
   delFbtn.onclick=function()
   {
       wclose("turn2Window");
   }
}
MyCom2Del=function(parentid,commentid,layer,uid,ffaid)
{
    winconfirm("turn2Window",360,230,"ɾ��ȷ��","ȷ��ɾ����","delTbtn_"+commentid,"delFbtn_"+commentid,"ɾ�����޷��ָ�");
    var delTbtn= E("delTbtn_" + commentid);
    delTbtn.onclick=function()
    {
        $.getIfModified(ApiFile,{commentDel:1,parentid:parentid,layer:layer,commentid:commentid,uid:uid,ffaid:ffaid},
        function(response)
        {
           var flag=response.split('|')[0];
           var message=response.split('|')[1];
           if(flag=="-1")
           {
               document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
               return;
           }
           else if(flag==2)
           {
              wclose("turn2Window");
              var obj=E("CommentP_"+commentid);
              if(obj!=null)
              {
                  obj.style.display="none";
              }
           }
           else
           {
              woopenError('turn2Window',360,230,"����ɾ��ʧ��",message);
              return;
           }
        })
   }
   var delFbtn= E("delFbtn_" + commentid);
   delFbtn.onclick=function()
   {
       wclose("turn2Window");
   }
}
//��ϸҳɾ������ layer=1
comDel=function(parentid,commentid,layer,uid,ffaid)
{
    winconfirm("turn2Window",360,230,"ɾ��ȷ��","ȷ��ɾ����","delTbtn_"+commentid,"delFbtn_"+commentid,"ɾ�����޷��ָ�");
    var delTbtn= E("delTbtn_" + commentid);
    delTbtn.onclick=function()
    {
        $.getIfModified(ApiFile,{commentDel:1,parentid:parentid,layer:layer,commentid:commentid,uid:uid,ffaid:ffaid},
        function(response)
        {
           var flag=response.split('|')[0];
           var message=response.split('|')[1];
           if(flag=="-1")
           {
               document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
               return;
           }
           else if(flag==2)
           {
               if(layer == 1)
               {
                   wclose("turn2Window");
               
                   var commentDiv=E("comment_"+parentid);
                   loadComment(parentid,layer,uid,ffaid,commentDiv);
                   var commentFont=E("commentfont_"+parentid);
              
                   if(commentFont!=null)
                   {
                        var replyInner=commentFont.innerHTML;
                        replyInner=replyInner.replace("(","");
                        replyInner=replyInner.replace(")","");
                        var count=parseInt(replyInner);
                        if(count>1)
                        {
                           count=count-1;
                           commentFont.innerHTML="("+count+")";
                        }
                        else
                        {
                           commentFont.style.display="none";
                        }
                   }
               
                   var delItem=E("PComment_"+commentid);
                   if(delItem!=null)
                   {
                       delItem.style.display="none";
                   }
                   else
                   {
                      document.location.reload(); 
                   }
              }
              else
              {
                 document.location.reload();
              }
           }
           else
           {
              woopenError('turn2Window',360,230,"����ɾ��ʧ��",message);
              return;
           }
        })
   }
   var delFbtn= E("delFbtn_" + commentid);
   delFbtn.onclick=function()
   {
       wclose("turn2Window");
   }
}
//ɾ������
commentDel=function(parentid,commentid,layer,uid,ffaid)
{
    $.getIfModified(ApiFile,{commentDel:1,parentid:parentid,layer:layer,commentid:commentid,uid:uid,ffaid:ffaid},
    function(response)
    {
       var flag=response.split('|')[0];
       var message=response.split('|')[1];
       if(flag=="-1")
       {
           document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
           return;
       }
       else if(flag==2)
       {
           var commentDiv=E("comment_"+parentid);
           if(layer==1)
           {
               var commentDiv=E("comment_"+parentid);
               loadComment(parentid,layer,uid,ffaid,commentDiv);
               var commentFont=E("commentfont_"+parentid);
              
               if(commentFont!=null)
               {
                    var replyInner=commentFont.innerHTML;
                    replyInner=replyInner.replace("(","");
                    replyInner=replyInner.replace(")","");
                    var count=parseInt(replyInner);
                    if(count>1)
                    {
                       count=count-1;
                       commentFont.innerHTML="("+count+")";
                    }
                    else
                    {
                       commentFont.style.display="none";
                    }
               }
            }
            else
            {
               loadComment(parentid,1,uid,ffaid,commentDiv);
            }
       }
       else
       {
          woopenError('turn2Window',360,230,"����ɾ��ʧ��",message);
          return;
       }
       
    }
   )
}
//ɾ������ add for default2 layer2 delete
commentDelLayer2=function(aid,parentid,commentid,layer,uid,ffaid)
{
    winconfirm("turn2Window",360,230,"ɾ��ȷ��","ȷ��ɾ����","delTbtn_"+commentid,"delFbtn_"+commentid,"ɾ�����޷��ָ�");
     var delTbtn= E("delTbtn_" + commentid);
    delTbtn.onclick=function()
    {
    $.getIfModified(ApiFile,{commentDel:1,parentid:parentid,layer:layer,commentid:commentid,uid:uid,ffaid:ffaid},
    function(response)
    { 
       var flag=response.split('|')[0];
       var message=response.split('|')[1];
       if(flag=="-1")
       {
           document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
           return;
       }
       else if(flag==2)
       {
       
           wclose("turn2Window");
           
           var commentDiv=E("comment_"+parentid);
           loadComment(parentid,1,uid,ffaid,commentDiv);
           
           var delItem=E("replyComment_"+commentid);
           if(delItem!=null)
           {
               delItem.style.display="none";
           }
           else
           {
              document.location.reload(); 
           }
       }
       else
       {
          woopenError('turn2Window',360,230,"����ɾ��ʧ��",message);
          return;
       }
       
    }
   )
  }
   var delFbtn= E("delFbtn_" + commentid);
   delFbtn.onclick=function()
   {
       wclose("turn2Window");
   }
}

GroupAddCom2=function(cmtid,layer,cmtuid,aid,auid,ffid,parentid,gid,gname) //cmtID ����ID,cmtuid�����û�ID,aid ����ID,auid,�����û�ID,ffid,�����ת��,
{
   
   //alert(cmtid+"|"+layer+"|"+cmtuid+"|"+aid+"|"+auid+"|"+ffid+"|"+parentid);
   
   var maxLen=168;
   var commenttxt2=E("commentTwo_"+cmtid);
   var commentBtn=E("commentBtnTwo_"+cmtid);
  
   if(commentBtn!=null)
   {
       commentBtn.value="";
       commentBtn.disabled=true;
       commentBtn.style.background = "url(/images/common/hf_gray.gif)";
   }
   var num = Math.ceil(byteLength(trim(commenttxt2.value)) / 2);
   if(num>maxLen) 
   { 
     woopenError('turn2Window',360,230,"�ظ���������168����������");
     return;
    }
   if(num==0)
   {
     woopenError('turn2Window',360,230,"������ظ�����");
     return;
   }
   var content=commenttxt2.value;
   if(parentid!=null)
   {
      cmtid=parentid;
   }
   var CmtFwdFlag=0;
   if(E("chkcommentTwo_"+cmtid)!=null&&E("chkcommentTwo_"+cmtid).checked)
   {
      CmtFwdFlag=1;
   }
   var CurCmtID=0;
   if(E("hidcmt_"+cmtid)!=null)
   {
       CurCmtID=E("hidcmt_"+cmtid).value;
   }
   
   $.getIfModified(ApiFile,{GroupCommentArticle:1,aid:cmtid,uid:cmtuid,content:escape(content),forwardFlag:CmtFwdFlag,layer:layer,ffaid:aid,ffauid:auid,CurCmtID:CurCmtID,fromforwardId:ffid,groupid:gid,groupname:escape(gname)},
   function(response)
   {
        var flag=response.split('|')[0];
        var message=response.split('|')[1];
        if(flag==-1)
        {
      ��   document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
        }
        else if(flag==2)
        {
           document.location.reload();
        }
        else
        {
            if(flag==3)
            {
               woopenSurpAlert('turn2Window',360,230,"�ظ����۳ɹ���������ˡ�",message);
            }
            else
            {
               woopenError('turn2Window',360,230,"�ظ�ʧ��",message);
            }
            
            if(commentBtn!=null)
            {
               commentBtn.value="�ظ�";
               commentBtn.disabled=false;
               commentBtn.style.background = "transparent url(/images/common/btn43_23.gif) no-repeat scroll 0% 0%";
            }
            return;
        }
   })
}
//��ϸҳ��������
AddCom2=function(cmtid,layer,cmtuid,aid,auid,ffid,parentid) //cmtID ����ID,cmtuid�����û�ID,aid ����ID,auid,�����û�ID,ffid,�����ת��,
{
   
   //alert(cmtid+"|"+layer+"|"+cmtuid+"|"+aid+"|"+auid+"|"+ffid+"|"+parentid);
   
   var maxLen=168;
   var commenttxt2=E("commentTwo_"+cmtid);
   var commentBtn=E("commentBtnTwo_"+cmtid);
  
   if(commentBtn!=null)
   {
       commentBtn.value="";
       commentBtn.disabled=true;
       commentBtn.style.background = "url(/images/common/hf_gray.gif)";
   }
   var num = Math.ceil(byteLength(trim(commenttxt2.value)) / 2);
   if(num>maxLen) 
   { 
     woopenError('turn2Window',360,230,"�ظ���������168����������");
     return;
    }
   if(num==0)
   {
     woopenError('turn2Window',360,230,"������ظ�����");
     return;
   }
   var content=commenttxt2.value;
   if(RecordL==content)
   {
     woopenError('turn2Window',360,230,"�ظ����ݲ���Ϊ��");
     return;
   }
   if(parentid!=null)
   {
      cmtid=parentid;
   }
   var CmtFwdFlag=0;
   if(E("chkcommentTwo_"+cmtid)!=null&&E("chkcommentTwo_"+cmtid).checked)
   {
      CmtFwdFlag=1;
   }
   var CurCmtID=0;
   if(E("hidcmt_"+cmtid)!=null)
   {
       CurCmtID=E("hidcmt_"+cmtid).value;
   }
   
   $.getIfModified(ApiFile,{CommentArticle:1,aid:cmtid,uid:cmtuid,content:escape(content),forwardFlag:CmtFwdFlag,layer:layer,ffaid:aid,ffauid:auid,CurCmtID:CurCmtID,fromforwardId:ffid},
   function(response)
   {
        var flag=response.split('|')[0];
        var message=response.split('|')[1];
        if(flag==-1)
        {
      ��   document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
        }
        else if(flag==2)
        {
           document.location.reload();
        }
        else
        {
            if(flag==3)
            {
               woopenSurpAlert('turn2Window',360,230,"�ظ����۳ɹ���������ˡ�",message);
            }
            else
            {
               woopenError('turn2Window',360,230,"�ظ�ʧ��",message);
            }
            
            if(commentBtn!=null)
            {
               commentBtn.value="�ظ�";
               commentBtn.disabled=false;
               commentBtn.style.background = "transparent url(/images/common/btn43_23.gif) no-repeat scroll 0% 0%";
            }
            return;
        }
   })
}
//����ҳ�ӻظ�
GroupAddMyCom2=function(cmtid,layer,cmtuid,aid,auid,ffid,gid,gname,parentid)
{
   
   var maxLen=168;
   var commenttxt2=E("commentTwo_"+cmtid);
   var commentBtn=E("commentBtnTwo_"+cmtid);
   if(commentBtn!=null)
   {
       commentBtn.value="";
       commentBtn.disabled=true;
       commentBtn.style.background = "url(/images/common/hf_gray.gif)";
   }
   var num = Math.ceil(byteLength(trim(commenttxt2.value)) / 2);
   if(num>maxLen) 
   { 
     woopenError('turn2Window',360,230,"�ظ���������168����������");
     return;
    }
   if(num==0)
   {
     woopenError('turn2Window',360,230,"������ظ�����");
     return;
   }
   var content=commenttxt2.value;
   if(parentid!=null)
   {
      cmtid=parentid;
   }
  
   var CmtFwdFlag=0;
   if(E("chkcommentTwo_"+cmtid)!=null&&E("chkcommentTwo_"+cmtid).checked)
   {
      CmtFwdFlag=1;
   }
   var CurCmtID=0;
   if(E("hidcmt_"+cmtid)!=null)
   {
       CurCmtID=E("hidcmt_"+cmtid).value;
   }
  
   $.getIfModified(ApiFile,{GroupCommentArticle:1,aid:cmtid,uid:cmtuid,content:escape(content),forwardFlag:CmtFwdFlag,layer:layer,ffaid:aid,ffauid:auid,CurCmtID:CurCmtID,fromforwardId:ffid,groupid:gid,groupname:escape(gname)},
   function(response)
   {
        var flag=response.split('|')[0];
        var message=response.split('|')[1];
        if(flag==-1)
        {
      ��   document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
        }
        else if(flag==2)
        {
           
         
           var LastCommentDiv=E("LastComment_"+cmtid);
           
           if(LastCommentDiv!=null)
           {
              var curHtml=LastCommentDiv.innerHTML;
              curHtml=curHtml.replace("nr_pingC_5","nr_pingC_2");
              curHtml=curHtml.replace("<EM>New!</EM>","");
              curHtml=curHtml.replace("<em>New!</em>","");
              var newData="<p class=\"nr_pingC_5\" style=\"width:360px;\"><a>�ң�</a>"+content+"<b class=\"f999\">(1����֮ǰ)</b><em>New!</em></p>";
              LastCommentDiv.innerHTML=curHtml+newData;
              if(LastCommentDiv.style.display=="none");
              {
                 LastCommentDiv.style.display="";
              }
              var CmtTxt=E("commentTwo_"+cmtid);
              if(CmtTxt!=null)
              {
                 CmtTxt.value="";
              }
           }
          
        }
        else
        {
            if(flag==3)
            {
               woopenSurpAlert('turn2Window',360,230,"�ظ����۳ɹ���������ˡ�",message);
            }
            else
            {
                woopenError('turn2Window',360,230,"�ظ�ʧ��",message);
            }
            if(commentBtn!=null)
            {
               commentBtn.value="�ظ�";
               commentBtn.disabled=false;
               commentBtn.style.background = "transparent url(/images/common/btn43_23.gif) no-repeat scroll 0% 0%";
            }
            return;
        }
   })
}
//����ҳ�ӻظ�
AddMyCom2=function(cmtid,layer,cmtuid,aid,auid,ffid,parentid)
{
   
   var maxLen=168;
   var commenttxt2=E("commentTwo_"+cmtid);
   var commentBtn=E("commentBtnTwo_"+cmtid);
   if(commentBtn!=null)
   {
       commentBtn.value="";
       commentBtn.disabled=true;
       commentBtn.style.background = "url(/images/common/hf_gray.gif)";
   }
   var num = Math.ceil(byteLength(trim(commenttxt2.value)) / 2);
   if(num>maxLen) 
   { 
     woopenError('turn2Window',360,230,"�ظ���������168����������");
     return;
   }
   if(num==0)
   {
     woopenError('turn2Window',360,230,"������ظ�����");
     return;
   }
   var content=commenttxt2.value;
   if(RecordL==content)
   {
      woopenError('turn2Window',360,230,"�ظ����ݲ���Ϊ��");
      return;
   }
   if(parentid!=null)
   {
      cmtid=parentid;
   }
   
   var CmtFwdFlag=0;
   if(E("chkcommentTwo_"+cmtid)!=null&&E("chkcommentTwo_"+cmtid).checked)
   {
      CmtFwdFlag=1;
   }
   var CurCmtID=0;
   if(E("hidcmt_"+cmtid)!=null)
   {
       CurCmtID=E("hidcmt_"+cmtid).value;
   }
   
   $.getIfModified(ApiFile,{CommentArticle:1,aid:cmtid,uid:cmtuid,content:escape(content),forwardFlag:CmtFwdFlag,layer:layer,ffaid:aid,ffauid:auid,CurCmtID:CurCmtID,fromforwardId:ffid},
   function(response)
   {
        var flag=response.split('|')[0];
        var message=response.split('|')[1];
        if(flag==-1)
        {
      ��   document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
        }
        else if(flag==2)
        {
           var LastCommentDiv=E("LastComment_"+cmtid);
           
           if(LastCommentDiv!=null)
           {
              var curHtml=LastCommentDiv.innerHTML;
              curHtml=curHtml.replace("nr_pingC_5","nr_pingC_2");
              curHtml=curHtml.replace("<EM>New!</EM>","");
              curHtml=curHtml.replace("<em>New!</em>","");
              var newData="<p class=\"nr_pingC_5\" style=\"width:360px;\"><a>�ң�</a>"+content+"<b class=\"f999\">(1����֮ǰ)</b><em>New!</em></p>";
              LastCommentDiv.innerHTML=curHtml+newData;
              if(LastCommentDiv.style.display=="none");
              {
                 LastCommentDiv.style.display="";
              }
              var CmtTxt=E("commentTwo_"+cmtid);
              if(CmtTxt!=null)
              {
                 CmtTxt.value="";
              }
           }
          
        }
        else
        {
            if(flag==3)
            {
               woopenSurpAlert('turn2Window',360,230,"�ظ����۳ɹ���������ˡ�",message);
            }
            else
            {
                woopenError('turn2Window',360,230,"�ظ�ʧ��",message);
            }
            if(commentBtn!=null)
            {
               commentBtn.value="�ظ�";
               commentBtn.disabled=false;
               commentBtn.style.background = "transparent url(/images/common/btn43_23.gif) no-repeat scroll 0% 0%";
            }
            return;
        }
   })
}
quickComment2=function(evt,cmtid,layer,cmtuid,aid,auid,ffid)
{
    var evt=evt||window.event;
    var keycode=evt.keyCode;
    
    if(keycode==13)
    {
       AddComment2(cmtid,layer,cmtuid,aid,auid,ffid);
    } 
}
//����������
AddComment2=function(cmtid,layer,cmtuid,aid,auid,ffid)
{
   var maxLen=168;
   var commentDiv=E("comment_"+aid);
   var commenttxt2=E("commentTwo_"+cmtid);
   var commentBtn=E("commentBtnTwo_"+cmtid);
   if(commentBtn!=null)
   {
      commentBtn.value="";
      commentBtn.disabled=true;
      commentBtn.style.background = "url(/images/common/hf_gray.gif)";
   }
   var num = Math.ceil(byteLength(trim(commenttxt2.value)) / 2);
    
   if(num>maxLen) 
   { 
     woopenError('turn2Window',360,230,"�ظ���������168����������");
     return;
   }
   if(num==0)
   {
     woopenError('turn2Window',360,230,"������ظ�����");
     return;
   }
   
 
   var content=commenttxt2.value;
   if(RecordL==content)
   {
      woopenError('turn2Window',360,230,"�ظ����ݲ���Ϊ��");
      return;
   }
   
   var CmtFwdFlag=0;
   if(E("chkcommentTwo_"+cmtid)!=null&&E("chkcommentTwo_"+cmtid).checked)
   {
      CmtFwdFlag=1;
   }
   var CurCmtID=0;
   if(E("hidcmt_"+cmtid)!=null)
   {
       CurCmtID=E("hidcmt_"+cmtid).value;
   }
   
   $.getIfModified(ApiFile,{CommentArticle:1,aid:cmtid,uid:cmtuid,content:escape(content),forwardFlag:CmtFwdFlag,layer:layer,ffaid:aid,ffauid:auid,CurCmtID:CurCmtID,fromforwardId:ffid},
   function(response)
   {
        
        var flag=response.split('|')[0];
         
         var message=response.split('|')[1];
        
         if(flag==-1)
         {
      ��    document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
         }
         else if(flag==2)
         {
             loadComment(aid,1,auid,ffid,commentDiv);
         }
         else
         {
            if(flag==3)
            {
               woopenSurpAlert('turn2Window',360,230,"�ظ����۳ɹ���������ˡ�",message);
            }
            else
            {
                woopenError('turn2Window',360,230,"�ظ�ʧ��",message);
             }
             if(commentBtn!=null)
             {
                commentBtn.value="�ظ�";
                commentBtn.disabled=false;
                commentBtn.style.background = "transparent url(/images/common/btn43_23.gif) no-repeat scroll 0 0";
             }
             return;
        }
    }
   )

 }

//��ϸҳ��������
DetailAddCmt=function(aid,layer,uid,ffaid)
{
   var maxLen=168;
   var commenttxt=E("commentTextarea");
   if(E("cmtBtn")!=null)
   {
      E("cmtBtn").disabled=true;
      E("cmtBtn").style.background = "url(/images/common/pl_gray.gif)";
   }
   var num=Math.ceil(byteLength(trim(commenttxt.value)) / 2); 
   if(num>maxLen)
   {
       woopenError('turn2Window',360,230,"����������������");
       return;
   }
   else if(num==0)
   {
       woopenError('turn2Window',360,230,"��������������");
       return;
   }
   var forwardFlag=0; 
   if (E("chkforward") && E("chkforward").checked) 
   {
      forwardFlag = 1;
   }
   var content=commenttxt.value;
   $.getIfModified(ApiFile,{CommentArticle:1,aid:aid,uid:uid,content:escape(content),forwardFlag:forwardFlag,layer:layer,ffaid:ffaid},
   function(response)
   {
      var flag=response.split('|')[0];
      var message=response.split('|')[1];
     
      if(flag==-1)
      {
  ��     document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
      }
      else if(flag==2)
      {
         document.location.reload();
      }
      else
      {
         if(flag==3)
         {
            woopenSurpAlert('turn2Window',360,230,"�������۳ɹ���������ˡ�",message);
         }
         else
         {
            woopenError('turn2Window',360,230,"��������ʧ��",message);
         }
         if(E("cmtBtn")!=null)
         {
            E("cmtBtn").disabled=false;
            E("cmtBtn").style.background = "transparent url(/images/001/icon2.gif) no-repeat scroll 0 0";
         }
         return;
     }
   }
   )
}

//���ڽ�����ϸҳ��������
DetailAddCmtDzjy = function (aid, layer, uid, ffaid) {
    var maxLen = 168;
    var commenttxt = E("commentTextarea");
    var num = Math.ceil(byteLength(trim(commenttxt.value)) / 2);
    if (num > maxLen) {
        woopenError('turn2Window', 360, 230, "����������������");
        return;
    }
    else if (num == 0) {
        woopenError('turn2Window', 360, 230, "��������������");
        return;
    }
    var forwardFlag = 0;
    if (E("chkforward") && E("chkforward").checked) {
        forwardFlag = 1;
    }
    var content = commenttxt.value;
    $.getIfModified(ApiFile, { CommentArticle: 1, aid: aid, uid: uid, content: escape(content), forwardFlag: forwardFlag, layer: layer, ffaid: ffaid },
   function (response) {
       var flag = response.split('|')[0];
       var message = response.split('|')[1];

       if (flag == -1) {
           document.location = "http://t.hexun.com/login.aspx?gourl=" + escape(window.document.location);
       }
       else if (flag == 2) {
           document.location.reload();
       }
       else {
           if (flag == 3) {
               woopenSurpAlert('turn2Window', 360, 230, "�������۳ɹ���������ˡ�", message);
           }
           else {
               woopenError('turn2Window', 360, 230, "��������ʧ��", message);
           }
           if (E("cmtBtn") != null) {
               E("cmtBtn").disabled = false;
               E("cmtBtn").style.background = "transparent url(/images/001/icon2.gif) no-repeat scroll 0 0";
           }
           return;
       }
   }
   )
}

quickComment=function(evt,aid,layer,uid,ffaid)
{
    var evt=evt||window.event;
    var keycode=evt.keyCode;
   
    if(keycode==13)
    {
       AddComment(aid,layer,uid,ffaid);
    } 
}
//��������
AddComment=function(aid,layer,uid,ffaid)
{
    
    var maxLen=168;
    var commentDiv=E("comment_"+aid);
    var commenttxt=E("textcomment_"+aid);
    var commentBtn=E("commentbtn_"+aid);
    if(commentBtn!=null)
    {
       commentBtn.disabled=true;
       commentBtn.style.background = "url(/images/common/pl_gray.gif)";
    }
    var num = Math.ceil(byteLength(trim(commenttxt.value)) / 2); 
   
        if(num>maxLen)
        {
           woopenError('turn2Window',360,230,"��������ʧ��","����������������");
           return;
        }
        else if(num==0)
        {
           woopenError('turn2Window',360,230,"��������ʧ��","��������������");
           return;
        }
        var forwardFlag=0; 
        if (E("chkforward") && E("chkforward").checked) 
        {
           forwardFlag = 1;
        }
        
        var content=commenttxt.value;
       
        $.getIfModified(ApiFile,{CommentArticle:1,aid:aid,uid:uid,content:escape(content),forwardFlag:forwardFlag,layer:layer,ffaid:ffaid},
        function(response)
        {
           
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
            
             if(flag==-1)
             {
              ��document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             }
             else if(flag==2)
             {
                 if (message != '���۳ɹ�')
                    alertSuccess(message);
                 loadComment(aid,layer,uid,ffaid,commentDiv);
                 var commentFont=E("commentfont_"+aid);
                 var replyInner=commentFont.innerHTML;
                 replyInner=replyInner.replace("(","");
                 replyInner=replyInner.replace(")","");
                 if(commentFont!=null)
                 {
                     var count=parseInt(replyInner);
                     count=count+1;
                     commentFont.innerHTML="("+count+")";
                     if(commentFont.style.display=="none")
                     {
                         commentFont.style.display="";
                     }
                 }
                 if(forwardFlag==1)
                 {
                     var forwardfont=E("forwardfont_"+aid);
                     if(forwardfont!=null)
                     {
                         var forwardInner=forwardfont.innerHTML;
                         forwardInner=forwardInner.replace("(","");
                         forwardInner=forwardInner.replace(")","");
                         if(forwardfont!=null)
                         {
                             var count=parseInt(forwardInner);
                             count=count+1;
                             forwardfont.innerHTML="("+count+")";
                             if(forwardfont.style.display=="none")
                             {
                                 forwardfont.style.display="";
                             }
                         }
                    }
                 }
             }
             else
             {
                if(flag==3)
                {
                    woopenSurpAlert('turn2Window',360,230,"�������۳ɹ���������ˡ�",message);
                }
                else
                {
                    woopenError('turn2Window',360,230,"��������ʧ��",message);
                    
                }
                commentBtn.disabled=false;
                commentBtn.style.background = "transparent url(/images/001/icon.gif) no-repeat scroll 0 -80px";
                return;
             }
     })
}
CommendUser=function(windowObj,w,h,uname,uid,blogname)
{
    $.getIfModified(ApiFile,{IsActive:1},
    function(response)
    {
         if(response==-1)
         {
            document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
         }
         else if(response==0)
         {
            woopenError('turn2Window',w,h,"����δ����΢��");
         }
         else
         {
            CommendUserAdd(windowObj,w,h,uname,uid,blogname);
         }     
   }); 
}
var teamLen=6;
var TeamAipFile="/Team/TeamResponse.aspx";
//��������
AddTeam=function(windowObj,w,h,type)
{
    wopen(windowObj,w,h);
    var html="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
	html+="<tr>";
	html+="	<td class=\"tdbgL\"></td>";
	html+="	<td class=\"tdbgC\">";
	html+="		<h3><span onclick=\"wclose('fzWindow');\"></span>�����·���</h3>";
	html+="		<form id=htmlfrm>";
	html+="		<div class=\"conBg_fzC\">";
	
    var clientAgent = navigator.userAgent.toLowerCase();
    if(clientAgent.indexOf('hermes/1.0')>=0)
    {
    
            html+="<span style=\"margin-bottom:6px;display:block;\"><label><input type=\"text\" id=\"AddTeam_Text\" name=\"AddTeam_Text\" class=\"fzinp1\" value=\"�����������...\"  onfocus=\"hxclient.uiapp.enablekeyboard(true);\" onblur=\"hxclient.uiapp.enablekeyboard(false);\"  /></label>";
            html+="&nbsp;<label><input type=\"button\"  class=\"conBgbtn_2\" id=\"addTeam_Btn\" style=\"margin-top:2px\" value=\"ȷ��\" title=\"ȷ��\" /></label></span>";				
    }
    else
    {
    	    html+="<span style=\"margin-bottom:6px;display:block;\"><label><input type=\"text\" id=\"AddTeam_Text\" name=\"AddTeam_Text\" class=\"fzinp1\" value=\"�����������...\" onFocus=\"if (this.value=='�����������...'){this.value=''}\" onBlur=\"if (this.value==''){this.value='�����������...'}\" /></label>";
            html+="&nbsp;<label><input type=\"button\"  class=\"conBgbtn_2\" id=\"addTeam_Btn\" style=\"margin-top:2px\" value=\"ȷ��\" title=\"ȷ��\" /></label></span>";				
    }
	
	html+="<span style=\"color:#C24F03;display:none;\" id=\"addTeam_ErrorSpan\"></span>";
	html+="		</div>";
	html+="		</form>";
	html+="	</td>";
	html+="	<td class=\"tdbgR\"></td>";
	html+="</tr>";
	html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
    html+="</table>";
    E(windowObj).innerHTML=html; 
    
    var addTeam_text=E("AddTeam_Text");
    var addTeam_Btn=E("addTeam_Btn");
    var addTeam_ErrorSpan=E("addTeam_ErrorSpan");
    addTeam_Btn.onclick=function(){
        var num = Math.ceil(byteLength(trim(addTeam_text.value)) / 2);
        if(num>teamLen)
        {   
            addTeam_ErrorSpan.innerHTML="����������"+teamLen+"����";
            addTeam_ErrorSpan.style.display="";
            return false;
        }
        if(num==0|| addTeam_text.value=="�����������...")
        {
            addTeam_ErrorSpan.innerHTML="��������Ϊ��";
            addTeam_ErrorSpan.style.display="";
            return false;
        }
        
        $.getIfModified(TeamAipFile,{addteam:1,teamname:escape(trim(addTeam_text.value)),type:type},
         function(response)
         {   
            
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return false;
             }
             else if(flag==0)
             {
                  addTeam_ErrorSpan.innerHTML=message;
                  addTeam_ErrorSpan.style.display="";
                  return false;
             }
             else if(flag==1)
             {
                 addTeam_ErrorSpan.style.display="none"; 
                 wclose(windowObj);
                 document.location.reload();
                 
                 /*if(type==0)
                 {
                     var hfhtml=response.split('|')[2];
                     if(E("Rnav_DL")!=null)
                     {
                 ��     hfhtml=hfhtml.replace('��','|');
                        E("Rnav_DL").innerHTML=hfhtml;
                     }
                 }
                 else
                 {
                     document.location.reload();
                 }*/
                
            }
          });
        
    }
}
//ɾ������
DelTeam=function(windowObj,w,h,tid,blogname)
{
   winconfirm(windowObj,w,h,'ɾ������ȷ��','��ȷ��Ҫɾ���˷�����','DelTeamBtn','DelTeamCancel','ɾ�����û����Ϊδ����״̬������ȡ����ע');
   var DelTeamBtn=E("DelTeamBtn");
   DelTeamBtn.onclick=function()
   {
        $.getIfModified(TeamAipFile,{deleteteam:1,teamid:tid},
        function(response)
        {   
            
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return false;
             }
             else if(flag==0)
             {
                 //error
             }
             else if(flag==1)
             {
                 document.location="http://t.hexun.com/"+blogname+"/MyFollow.html";
             }
         });
   }
   var delFbtn= E("DelTeamCancel");
   delFbtn.onclick=function()
   {
       wclose("turn2Window");
   }
}
//�޸ķ�������
ModTeamName=function(windowObj,w,h,tid,tname)
{
   wopen(windowObj,w,h);
    var html="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
	html+="<tr>";
	html+="	<td class=\"tdbgL\"></td>";
	html+="	<td class=\"tdbgC\">";
	html+="		<h3><span onclick=\"wclose('fzWindow');\"></span>�޸�����</h3>";
	html+="		<form id=htmlfrm>";
	html+="		<div class=\"conBg_fzC\">";
	
	html+="<span style=\"margin-bottom:6px;display:block;\">ԭ������"+tname+"</span><span style=\"display:block;\"><label><input type=\"text\" id=\"AddTeam_Text\" name=\"AddTeam_Text\" class=\"fzinp1\" value=\"�����µķ�������...\" onFocus=\"if (this.value=='�����µķ�������...'){this.value=''}\" onBlur=\"if (this.value==''){this.value='�����µķ�������...'}\" /></label>";
    html+="&nbsp;<label><input type=\"button\"  class=\"conBgbtn_2\" id=\"addTeam_Btn\" style=\"margin-top:2px\" value=\"ȷ��\" title=\"ȷ��\" /></label></span>";				
	html+="<span style=\"color:#C24F03;display:none;\" id=\"addTeam_ErrorSpan\"></span>";
	html+="		</div>";
	html+="		</form>";
	html+="	</td>";
	html+="	<td class=\"tdbgR\"></td>";
	html+="</tr>";
	html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
    html+="</table>";
    E(windowObj).innerHTML=html;
    
    var addTeam_text=E("AddTeam_Text");
    var addTeam_Btn=E("addTeam_Btn");
    var addTeam_ErrorSpan=E("addTeam_ErrorSpan");
    addTeam_Btn.onclick=function()
    {
        var num = Math.ceil(byteLength(trim(addTeam_text.value)) / 2);
        
        if(num>teamLen)
        {   
            addTeam_ErrorSpan.innerHTML="����������"+teamLen+"����";
            addTeam_ErrorSpan.style.display="";
            return false;
        }
        if(num==0)
        {
            addTeam_ErrorSpan.innerHTML="��������Ϊ��";
            addTeam_ErrorSpan.style.display="";
            return false;
        }
        
        $.getIfModified(TeamAipFile,{editteam:1,teamid:tid,teamname:escape(trim(addTeam_text.value))},
        function(response)
        {   
            
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return false;
             }
             else if(flag==0)
             {
                  addTeam_ErrorSpan.innerHTML=message;
                  addTeam_ErrorSpan.style.display="";
                  return false;
             }
             else if(flag==1)
             {
                 addTeam_ErrorSpan.style.display="none"; 
                 wclose(windowObj);
                 if(E("font_TN")!=null)
                 {
                    E("font_TN").innerHTML=addTeam_text.value;
                 }
                 
                 if(typeof(flwarray)!="undefined"&&flwarray!=null)
                 {
                     var len=flwarray.length;
                     if(flwarray!=null&&len>0)
                     {
                         for(var i=0;i<len;i++)
                         {
                             var flw=flwarray[i];
                             if(E("FLWUserSpan_"+flw)!=null)
                             {
                                 E("FLWUserSpan_"+flw).innerHTML=addTeam_text.value;
                             }
                         }
                     }
                 }
             }
          });
        
    }
    
}
//�޸ķ���Ӵ�������
ModAddTeam=function(tarray,modid,fuserid)
{
    var ModTeamTxt=E("ModTeamTxt");
    var Error_P=E("Error_P");
    var num = Math.ceil(byteLength(trim(ModTeamTxt.value)) / 2);
    if(ModTeamTxt.value=="�����µķ�������...")
    {
         Error_P.innerHTML="��������Ϊ��";
         Error_P.style.display="";
         return false;
    }
    if(num>teamLen)
    {   
         Error_P.innerHTML="����������"+teamLen+"����";
         Error_P.style.display="";
         return false;
    }
    if(num==0)
    {
         Error_P.innerHTML="��������Ϊ��";
         Error_P.style.display="";
         return false;
    }
    $.getIfModified(TeamAipFile,{addteam:1,teamname:escape(trim(ModTeamTxt.value)),type:2},
    function(response)
    {   
            //alert("ModAddTeam");

             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return false;
             }
             else if(flag==0)
             {
                  Error_P.innerHTML=message;
                  Error_P.style.display="";
                  return false;
             }
             else if(flag==1)
             {
                 
                 var newid=response.split('|')[2];
                 tarray.push(newid+"|"+ModTeamTxt.value+"|0");
                 var len=tarray.length;
                 var html="";
                 html+="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"xgfz01\">";
	             for(var i=0;i<len;i++)
	             {
	               var tid=tarray[i].split('|')[0];
	               var tname=tarray[i].split('|')[1];
	               var tflag=tarray[i].split('|')[2];
	               var ck="";
	               if(modid==tid)
	               {
	                   ck="checked";
	               }
	               if(i<len-1)
	               {
	                   if(i%2==0)
	                   {
	                      html+="<tr><td><input type='radio' id='cktradion_"+fuserid+"' name='cktradion' value='"+tid+"' "+ck+" tname='"+tname+"'>"+tname+"</td>";
	                   }
	                   else
	                   {
	                      html+="<td><input type='radio' id='cktradion_"+fuserid+"' name='cktradion' value='"+tid+"' "+ck+" tname='"+tname+"'>"+tname+"</td></tr>";
	                   }
	               }
	               else
	               {
	                   html+="<td><input type='radio' id='cktradion_"+fuserid+"' name='cktradion' value='"+tid+"' "+ck+" tname='"+tname+"'>"+tname+"</td></tr>";
	               }
	             }
	             if(len<11)
	             {
	                   html+="<tr>";
	                   html+="				<td colspan=\"2\">";
	                   html+="					<a href=\"javascript:void(0)\" onclick=\"document.getElementById('xfzL').style.display='block';document.getElementById('xfzC').style.display='none'\" id=\"xfzC\"><strong>+�����·���</strong></a>";
	                   
	                   html+="						<p id=\"xfzL\" style=\"display:none;\">";	  
	                   var clientAgent = navigator.userAgent.toLowerCase();
	                   if(clientAgent.indexOf('hermes/1.0')>=0)
	                   {
	                       html+="                           <input type=\"text\" name=\"ModTeamTxt\" id=\"ModTeamTxt\" class=\"fzinp1\" value=\"�����µķ�������...\" onfocus=\"hxclient.uiapp.enablekeyboard(true);\" onblur=\"hxclient.uiapp.enablekeyboard(false);\" style=\"height:21px;\" />";
	                   }
	                   else
	                   {
	                       html+="                           <input type=\"text\" name=\"ModTeamTxt\" id=\"ModTeamTxt\" class=\"fzinp1\" value=\"�����µķ�������...\" onFocus=\"if (this.value=='�����µķ�������...'){this.value=''}\" onBlur=\"if (this.value==''){this.value='�����µķ�������...'}\" style=\"height:21px;\" />";
	                   }
	                   html+="                           <input type=\"button\" id=\"ModTeamBtn\" name=\"ModTeamBtn\"  class=\"btn43_23\" value=\"���\" title=\"���\" /></p>";
	                   
	                   html+="                      <p id=\"Error_P\" style=\"color:red;display:none\"></p>";
	                   html+="					</td>";
	                   html+="				</tr>";
	             }
                 html+="<tr><td colspan=\"2\"><input type=\"button\"  class=\"conBgbtn_2\" id=\"SetTeam_Btn\"  value=\"ȷ��\" title=\"ȷ��\" /><P id=\"SetP\" style=\"color:red;display:none\"></p></td></tr>";
                 html+="</table>";
                 E("fzc_Div").innerHTML=html;
	             var ModTeamBtn=E("ModTeamBtn");
	             if(ModTeamBtn!=null)
	             {
                     ModTeamBtn.onclick=function()
                     {
                         ModAddTeam(teamarray,modid,fuserid);
                     }
                 }
                 var SetTeam_Btn=E("SetTeam_Btn");
                 if(SetTeam_Btn!=null)
                 {
                     SetTeam_Btn.onclick=function()
                     {
                        FollowAddByTeam(modid,fuserid);
                     }
                 }
            }
       });
        
}
//ѡ�����
ModTeam=function(windowObj,w,h,modid,fuserid)
{
    //alert("ModTeam");
    E(windowObj).style.width="350px";
    wopen(windowObj,w,h);
    var html="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";

	html+="<tr>";
	html+="	<td class=\"tdbgL\"></td>";
	html+="	<td class=\"tdbgC\">";
	html+="		<h3><span onclick=\"wclose('fzWindow');\"></span>ѡ�����</h3>";
	html+="		<form id=htmlfrm>";
	html+="		<div class=\"conBg_fzC\" id=\"fzc_Div\">";
	html+="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"xgfz01\">";
	var len=teamarray.length;
	for(var i=0;i<len;i++)
	{
	   var tid=teamarray[i].split('|')[0];
	   var tname=teamarray[i].split('|')[1];
	   var tflag=teamarray[i].split('|')[2];
	   var ck="";
	   if(modid==tid)
	   {
	       ck="checked";
	   }
	   
	   if(i<len-1)
	   {
	       if(i%2==0)
	       {
	          html+="<tr><td><input type='radio' id='cktradion_"+fuserid+"' name='cktradion' value='"+tid+"' "+ck+" tname='"+tname+"'>"+tname+"</td>";
	       }
	       else
	       {
	          html+="<td><input type='radio' id='cktradion_"+fuserid+"' name='cktradion' value='"+tid+"' "+ck+" tname='"+tname+"'>"+tname+"</td></tr>";
	       }
	   }
	   else
	   {
	       html+="<td><input type='radio' id='cktradion_"+fuserid+"' name='cktradion' value='"+tid+"' "+ck+" tname='"+tname+"'>"+tname+"</td></tr>";
	   }
	}
	if(len<11)
	{
	   html+="<tr>";
	   html+="				<td colspan=\"2\">";
	   html+="					<a href=\"javascript:void(0)\" onclick=\"document.getElementById('xfzL').style.display='block';document.getElementById('xfzC').style.display='none'\" id=\"xfzC\"><strong>+�����·���</strong></a>";
	   
	   html+="						<p id=\"xfzL\" style=\"display:none;\">";
	   var clientAgent = navigator.userAgent.toLowerCase();	   
	   if(clientAgent.indexOf('hermes/1.0')>=0)
	   {
	        html+="                          <input type=\"text\" name=\"ModTeamTxt\" id=\"ModTeamTxt\" class=\"fzinp1\" value=\"�����µķ�������...\"  onfocus=\"hxclient.uiapp.enablekeyboard(true);\" onblur=\"hxclient.uiapp.enablekeyboard(false);\" style=\"height:21px;\" />";
	   }
	   else
	   {
	        html+="                          <input type=\"text\" name=\"ModTeamTxt\" id=\"ModTeamTxt\" class=\"fzinp1\" value=\"�����µķ�������...\" onFocus=\"if (this.value=='�����µķ�������...'){this.value=''}\" onBlur=\"if (this.value==''){this.value='�����µķ�������...'}\" style=\"height:21px;\" />";
       }
	   html+="                          <input type=\"button\" id=\"ModTeamBtn\" name=\"ModTeamBtn\"  class=\"btn43_23\" value=\"���\" title=\"���\" /></p>";   
	   html+="                      <p id=\"Error_P\" style=\"color:red;display:none\"></p>";
	   html+="					</td>";
	   html+="				</tr>";
	}
    html+="<tr><td colspan=\"2\"><input type=\"button\"  class=\"conBgbtn_2\" id=\"SetTeam_Btn\"  value=\"ȷ��\" title=\"ȷ��\" /><P id=\"SetP\" style=\"color:red;display:none\"></p></td></tr>";
    html+="</table>";
	html+="		</div>";
	html+="		</form>";
	html+="	</td>";
	html+="	<td class=\"tdbgR\"></td>";
	html+="</tr>";

	html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
    html+="</table>";
   
   E(windowObj).innerHTML=html; 
   var ModTeamBtn=E("ModTeamBtn");
   if(ModTeamBtn!=null)
   {
       ModTeamBtn.onclick=function()
       {
           ModAddTeam(teamarray,modid,fuserid);
       }
   }
   var SetTeam_Btn=E("SetTeam_Btn");
   if(SetTeam_Btn!=null)
   {
      SetTeam_Btn.onclick=function()
      {
         FollowAddByTeam(modid,fuserid);
      }
   }
}
AddTeamUser=function(tid)
{
    var fuserid=E("hiduser").value;
    var fusername='';
    if(fuserid==null||fuserid==0)
    {
       fusername=E("TeamInput").value;
    }
    
     //E("Error_Lable").style.display="none";
     $.getIfModified(TeamAipFile,{insertteam:1,fuserid:fuserid,uid:1,teamid:tid,fusername:escape(fusername)},
     function(response)
     {
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         
         if(flag==-1)
         {
             document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             return;
         }
         else if(flag==0)
         {
             E("Error_Lable").style.display="";
             E("Error_Lable").innerHTML=message;
             return;
         }
         else
         {
             document.location.reload();
         }
     });
     
}

//��ȡ�ҵĹ�Ʊ��Ϣ
GetMyStockInfo = function()
{
     $.getIfModified(ApiFile, {GetMyStockInfo:1},
     function(response)
     {
         E("myStockInfo").innerHTML = response;
     });
}

//��������û�
FollowAddByTeam=function(modid,fuserid)
{
     var chkvalue=0;
     var chktname="";
     var chkteam=document.getElementById("htmlfrm").cktradion;
     var chklen   =  chkteam.length;   
     for(var i =0;i<chklen;i++)
     {   
         if(chkteam[i].checked)
         {   
            chkvalue=chkteam[i].value;
            chktname=chkteam[i].getAttribute('tname');
         }   
     }
     if(chkvalue<0)
     {
         E("SetP").style.display="";
         E("SetP").innerHTML="��ѡ��һ������";
         return;
     }
     else
     {
         E("SetP").style.display="none";
         $.getIfModified(TeamAipFile,{insertteam:1,fuserid:fuserid,uid:1,teamid:chkvalue},
         function(response)
         {
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return;
             }
             else if(flag==0)
             {
                  E("SetP").style.display="";
                  E("SetP").innerHTML=message;
                  return;
             }
             else
             {
                  wclose("fzWindow");
                  var ht= E("hidtid").value; 
                  
                  if(ht==0)
                  {
                      
                      E("FLWUserSpan_"+fuserid).innerHTML=chktname;
                      
                      E("FLWUserSpan_"+fuserid).onclick=function()
                      {
                          ModTeam('fzWindow','275','160',chkvalue,fuserid);
                      }
                  }
                  else
                  {
                      if(chkvalue!=modid)
                      {
                          E("gz_"+fuserid).style.display="none";
                      }
                  }
             }
         });
         
     }
}
//������ʾ����
setShow=function(windowObj,w,h)
{
    //alert("setShow");
    E(windowObj).style.width="350px";
    wopen(windowObj,w,h);
    var html="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";

	html+="<tr>";
	html+="	<td class=\"tdbgL\"></td>";
	html+="	<td class=\"tdbgC\">";
	html+="		<h3><span onclick=\"wclose('fzWindow');\"></span>���÷�����ʾ</h3>";
	html+="		<form id=htmlfrm>";
	html+="		<div class=\"conBg_fzC\">";
	html+="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"xgfz01\">";
	var len=teamarray.length;
	for(var i=0;i<len;i++)
	{
	   var tid=teamarray[i].split('|')[0];
	   var tname=teamarray[i].split('|')[1];
	   var tflag=teamarray[i].split('|')[2];
	   var ck="";
	   if(tflag==0)
	   {
	       ck="checked";
	   }
	   if(i<len-1)
	   {
	       if(i%2==0)
	       {
	          html+="<tr><td><input type=checkbox id='chk_"+tid+"'  "+ck+">"+tname+"</td>";
	       }
	       else
	       {
	          html+="<td><input type=checkbox id='chk_"+tid+"'  "+ck+">"+tname+"</span></td></tr>";
	       }
	   }
	   else
	   {
	       html+="<td><input type=checkbox id='chk_"+tid+"'  "+ck+">"+tname+"</span></td></tr>";
	   }
	}
	
    html+="<tr><td colspan=\"2\"><input type=\"button\"  class=\"conBgbtn_2\" id=\"SetTeam_Btn\" style=\"margin-top:2px\" value=\"ȷ��\" title=\"ȷ��\" /></td></tr>";
    html+="</table>";
	html+="		</div>";
	html+="		</form>";
	html+="	</td>";
	html+="	<td class=\"tdbgR\"></td>";
	html+="</tr>";

	html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
    html+="</table>";
   
   E(windowObj).innerHTML=html; 
   var SetTeam_Btn=E("SetTeam_Btn");
   
   SetTeam_Btn.onclick=function()
   {
      var setting="";
      for(var j=0;j<len;j++)
	  {
	      var tid=teamarray[j].split('|')[0];
	      var tflag=1;
	      if(E("chk_"+tid)!=null&&E("chk_"+tid).checked)
	      {
	          tflag=0;
	      }
	      setting+=tid+"|"+tflag+",";
	  }
	  $.getIfModified(TeamAipFile,{setShow:1,setting:setting},
      function(response)
      {
           
           var flag=response.split('|')[0];
           var message=response.split('|')[1];
           if(flag==-1)
           {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return false;
           }
           else if(flag==0)
           {
               return false;
           }
           else
           {
               wclose(windowObj);
               document.location.reload();
           }
      });
	  
   }
}
//�Ƽ�����
CommendUserAdd=function(windowObj,w,h,uname,uid,blogname)
{
   wopen(windowObj,w,h);
   var html="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
   html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
	html+="<tr>";
	html+="	<td class=\"tdbgL\"></td>";
	html+="	<td class=\"tdbgC\">";
	html+="		<h3><span onclick=\"wclose('turn3Window');\"></span>��"+uname+"�Ƽ�������</h3>";
	html+="		<form id=htmlfrm>";
	html+="		<div class=\"win_con2\">";
				
	html+="			<div class=\"win_con2_2\"><span id=\"tipInfoBoxCommend\">����������<strong>168</strong>����</span></div>";
	html+="			<p><textarea class=\"conBgtex_1\"  id=\"forwardtextarea_Commend\">�������� @"+uname+" ��΢��</textarea></p>";
	html+="			<p class=\"fabup\">";
	html+="			 <span style=\"float:left;\"><input type=checkbox id=chktt name=chktt>ͬʱ�����ҵ��ر��Ƽ�</span>	<span><input type=\"button\" id=\"forwardbtn_Commend\" value=\"ȷ��\" class=\"conBgbtn_2\" /> &nbsp;<input type=\"button\" class=\"conBgbtn_2\" value=\"ȡ��\" onclick=\"wclose('turn3Window');\" ></span>";
	html+="			</p>";
	html+="		</div>";
	html+="		</form>";
	html+="	</td>";
	html+="	<td class=\"tdbgR\"></td>";
	html+="</tr>";
	html+="<tr>";
	html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	html+="</tr>";
    html+="</table>";
   
   E(windowObj).innerHTML=html; 
   var mdforwardtextarea = E("forwardtextarea_Commend"); 
   
   forwardInputLimit(mdforwardtextarea,"Commend");
  
   mdforwardtextarea.onkeyup = function()
   {
        forwardInputLimit(mdforwardtextarea,"Commend");
   }
   var forwardbtn=E("forwardbtn_Commend");
   forwardbtn.onclick = function() {
   if (!forwardInputLimit(mdforwardtextarea,"Commend")) 
   {
      woopenalert('turn2Window',w,h,"�Ƽ�������������");
      return false;
   }
   if(mdforwardtextarea.value==null||mdforwardtextarea.value=="")
   {
      woopenalert('turn2Window',w,h,"�Ƽ����ݲ���Ϊ��");
      return false;
   }
   forwardbtn.disabled=true;
   var ttFlag=0; 
   if (E("chktt") && E("chktt").checked) 
   {
       ttFlag = 1;
   }
   var appendurl=document.location.href;
   var contentFinal= mdforwardtextarea.value =leftB(mdforwardtextarea.value, 336);
   contentFinal=contentFinal.indexOf("@" + uname) != -1 ? contentFinal.replace(/'@'+uname/gi, "@" + uname + " ").replace(/\uff20/ig, "@") + " " + appendurl: (contentFinal + " @" + uname).replace(/\uff20/ig, "@") + " " + appendurl;
   $.getIfModified(ApiFile,{addcommend:1,forwardId:uid,testForwardName:escape(uname),testForwardBlogName:escape(blogname),content:escape(contentFinal),ttFlag:ttFlag},
   function(response)
   {
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         if(flag==-1)
         {
            document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
         }
         else if(flag==2)
         {
            wclose(windowObj);
            confirmResult(true,'turn2Window',w,h,'�Ƽ�����','�Ƽ��ɹ�','btnSucT','(2����Զ��ر�)');
            var btnSucT=E("btnSucT");
            btnSucT.onclick=function(){
              wclose('turn2Window');
            }
            setTimeout(function(){
            wclose('turn2Window');},2000);
            
         }
         else if(flag==3)
         {
            wclose(windowObj);
            confirmResult(true,'turn2Window',w,h,'�Ƽ�����','�Ƽ��ɹ�,���ĺ����Ѿ��Ƽ��������ر��Ƽ���','btnSucT','(2����Զ��ر�)');
            var btnSucT=E("btnSucT");
            btnSucT.onclick=function(){
              wclose('turn2Window');
            }
            setTimeout(function(){
            wclose('turn2Window');},2000);
         }
         else if(flag==4)
         {
            wclose(windowObj);
            confirmResult(true,'turn2Window',w,h,'�Ƽ�����','�Ƽ��ɹ�','btnSucT','<p style=\"padding:0 0 0 20px\"><font color=red>���������ر��Ƽ������Ѿ����꣬�ر��Ƽ�ʧ�ܡ�</font><br/><br/><a href=\"http://t.hexun.com/myrecommend.html\"><font color=blue>�����ҵ��ر��Ƽ�</font></a></p>');
            var btnSucT=E("btnSucT");
            btnSucT.onclick=function(){
              wclose('turn2Window');
            }
            
         }
         else if(flag==5)
         {
            wclose(windowObj);
            confirmResult(true,'turn2Window',w,h,'�Ƽ�����','�Ƽ��ɹ�','btnSucT','<p style=\"padding:0 0 0 20px\"><font color=red>�Ƽ��ĺ����Ѿ��������ر��Ƽ��У��ر��Ƽ�ʧ�ܡ�</font><br/><br/><a href=\"http://t.hexun.com/myrecommend.html\"><font color=blue>�����ҵ��ر��Ƽ�</font></a></p>');
            var btnSucT=E("btnSucT");
            btnSucT.onclick=function(){
              wclose('turn2Window');
            }
            
         }
         else
         {
            wclose(windowObj);
            woopenError('turn2Window',w,h,"�Ƽ�ʧ��",message);
            return;
         }
     }
    );
  }
}

helpRecommend = function(windowObj,w,h,uname,uid,blogname)
{
   var mdforwardtextarea = E("forwardtextarea_helpRecommend");
   var forwardbtn=E("forwardbtn_helpRecommend");
   if (!forwardInputLimit(mdforwardtextarea,"helpRecommend")) 
   {
      woopenalert('turn2Window',w,h,"�Ƽ�������������");
      return false;
   }
   if(mdforwardtextarea.value==null||mdforwardtextarea.value=="")
   {
      woopenalert('turn2Window',w,h,"�Ƽ����ݲ���Ϊ��");
      return false;
   }
   forwardbtn.disabled=true;
   var appendurl=document.location.href;
   var contentFinal= mdforwardtextarea.value =leftB(mdforwardtextarea.value, 280);
   //contentFinal=contentFinal.indexOf("@" + uname) != -1 ? contentFinal.replace(/'@'+uname/gi, "@" + uname + " ").replace(/\uff20/ig, "@") + " " + appendurl: (contentFinal + " @" + uname).replace(/\uff20/ig, "@") + " " + appendurl;
   $.getIfModified(ApiFile,{addcommend:1,forwardId:uid,testForwardName:escape(uname),testForwardBlogName:escape(blogname),content:escape(contentFinal),isHelpRecommend:1},
   function(response)
   {
         //alert(response);
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         if(flag==-1)
         {
            document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
         }
         else if(flag==2)
         {
            document.getElementById('BTRecbg').style.display='none';
            document.getElementById('fade').style.display='none';
            forwardbtn.disabled = false;
            confirmResult(true,'turn2Window',w,h,'�����Ƽ�','���Ƴɹ�','btnSucT','(2����Զ��ر�)');
            var btnSucT=E("btnSucT");
            btnSucT.onclick=function(){
              wclose('turn2Window');
            }
            setTimeout(function(){
            wclose('turn2Window');},2000);
            
         }
         else
         {
            //wclose(windowObj);
            woopenError('turn2Window',w,h,"����ʧ��",message);
            return;
         }
     }
    );
}

StockMarket20Years = function(windowObj,w,h,uname,uid,blogname)
{
   var mdforwardtextarea = E("forwardtextarea_StockMarket20Years");
   mdforwardtextarea.value = "#����20��֮"+E("yearValue").value+"#"+ mdforwardtextarea.value
   
   var forwardbtn=E("forwardbtn_StockMarket20Years");
   if (!forwardInputLimit(mdforwardtextarea,"StockMarket20Years")) 
   {
      //woopenalert('turn2Window',w,h,"΢��������������");
      document.getElementById("message_p").innerHTML="΢��������������";
		    //����������
      var popup = new Popup({width:'317px',height:'231px',title:'',html:HX.$('messageBox').innerHTML});
      return false;
   }
   if(mdforwardtextarea.value==null||mdforwardtextarea.value=="")
   {      
      document.getElementById("message_p").innerHTML="΢�����ݲ���Ϊ��";
		    //����������
      var popup = new Popup({width:'317px',height:'231px',title:'',html:HX.$('messageBox').innerHTML});
      return false;
   }
   forwardbtn.disabled=true;
   var appendurl=document.location.href;
   var contentFinal= mdforwardtextarea.value =leftB(mdforwardtextarea.value, 280);
   //contentFinal=contentFinal.indexOf("@" + uname) != -1 ? contentFinal.replace(/'@'+uname/gi, "@" + uname + " ").replace(/\uff20/ig, "@") + " " + appendurl: (contentFinal + " @" + uname).replace(/\uff20/ig, "@") + " " + appendurl;
   $.getIfModified(ApiFile,{addcommend:1,forwardId:uid,testForwardName:escape(uname),testForwardBlogName:escape(blogname),content:escape(contentFinal),isStockMarket20Years:1},
   function(response)
   {
         //alert(response);
         //return;
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         if(flag==-1)
         {
            document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
         }
         else if(flag==2)
         {            
            forwardbtn.disabled = false;
            initFade();
            document.getElementById("fade").style.display="block";
		    document.getElementById("message_p").innerHTML="�����ɹ�";
		    mdforwardtextarea.value= "";
		    E("yearValue").value="";
		    //����������
		    var popup = new Popup({width:'317px',height:'231px',title:'',html:HX.$('messageBox').innerHTML});
		    setTimeout(function(){
            closeBg();},2000);
         }
         else
         {
            //wclose(windowObj);
            //woopenError('turn2Window',w,h,"����ʧ��",message);
            return;
         }
     }
    );
}

StockMarket20YearsMess = function(windowObj,w,h,uname,uid,blogname)
{
   
   var mdforwardtextarea = E("forwardtextarea_StockMarket20YearsMess");   
   if(E("yearValue1")!=null && E("yearValue1").value!="")
   {       
       mdforwardtextarea.value = "#����20��֮"+E("yearValue1").value+"#"+ mdforwardtextarea.value
   }
   else   
   { 
       mdforwardtextarea.value = "#����20��#"+ mdforwardtextarea.value
   }
   
   //alert(mdforwardtextarea.value);
   //return;
   var forwardbtn=E("forwardbtn_StockMarket20YearsMess");
   if (!forwardInputLimit(mdforwardtextarea,"StockMarket20YearsMess")) 
   {
      //woopenalert('turn2Window',w,h,"΢��������������");
      document.getElementById("message_p").innerHTML="΢��������������";
		    //����������
      var popup = new Popup({width:'317px',height:'231px',title:'',html:HX.$('messageBox').innerHTML});
      return false;
   }
   if(mdforwardtextarea.value==null||mdforwardtextarea.value=="")
   {      
      document.getElementById("message_p").innerHTML="΢�����ݲ���Ϊ��";
		    //����������
      var popup = new Popup({width:'317px',height:'231px',title:'',html:HX.$('messageBox').innerHTML});
      return false;
   }
   forwardbtn.disabled=true;
   var appendurl=document.location.href;
   var contentFinal= mdforwardtextarea.value =leftB(mdforwardtextarea.value, 280);
   //contentFinal=contentFinal.indexOf("@" + uname) != -1 ? contentFinal.replace(/'@'+uname/gi, "@" + uname + " ").replace(/\uff20/ig, "@") + " " + appendurl: (contentFinal + " @" + uname).replace(/\uff20/ig, "@") + " " + appendurl;
   $.getIfModified(ApiFile,{addcommend:1,forwardId:uid,testForwardName:escape(uname),testForwardBlogName:escape(blogname),content:escape(contentFinal),isStockMarket20Years:1},
   function(response)
   {
         //alert(response);
         //return;
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         if(flag==-1)
         {
            document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
         }
         else if(flag==2)
         {            
            forwardbtn.disabled = false;
            initFade();
            document.getElementById("fade").style.display="block";
		    document.getElementById("message_p").innerHTML="�����ɹ�";
		    mdforwardtextarea.value= "";
		    //����������
		    var popup = new Popup({width:'317px',height:'231px',title:'',html:HX.$('messageBox').innerHTML});
		    setTimeout(function(){
            closeBg();},2000);
         }
         else
         {
            //wclose(windowObj);
            //woopenError('turn2Window',w,h,"����ʧ��",message);
            return;
         }
     }
    );
}

ForwardArticle=function(windowObj,w,h,content,forwardcontent,el)
{

     var lastUID=el.getAttribute("lastUID");
     var firstUID=el.getAttribute("firstUID");
     
     $.getIfModified(ApiFile,{IsActive:1,firstUID:firstUID,lastUID:lastUID},
     function(response)
     {
         if(response==-1)
         {
            document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
         }
         else if(response==0)
         {
            woopenError('turn2Window',w,h,"����δ����΢��");
         }
        else if(response==-2)
         {  //�����û���˿ת�� 2012-05-02 ���Ʒ�
            woopenError('turn2Window',w,h,"�ǳ���Ǹ��ֻ�з�˿����ת��");
         }
         else if(response==-3)
         {  //�����û���˿ת�� 2012-05-02 ���Ʒ�         
            woopenError('turn2Window',w,h,"�ǳ���Ǹ����ʱ������ת��");
         }
         else
         {
            ForwardArticleAdd(windowObj,w,h,content,forwardcontent,el);
         }     
     }); 
}
ForwardArticle2=function(windowObj,w,h,content,forwardcontent,el)
{
     $.getIfModified(ApiFile,{IsActive:1},
     function(response)
     {
         if(response==-1)
         {
            parent.document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.parent.document.location);
         }
         else if(response==0)
         {
            woopenalert('turn2Window',w,h,"����δ����΢��");
         }
         else
         {
            ForwardArticleAdd2(windowObj,w,h,content,forwardcontent,el);
           
         }     
     });     
}
woopenalert=function(windowObj,w,h,errorinfo,errormess)
{
    wopen(windowObj,w,h);
    html="  <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td class=\"tdbgL\"></td>";
    html+="	<td class=\"tdbgC\">";
    html+="		<h3><span onclick=\"Element.hide(E('"+windowObj+"'));\"></span>��ʾ��</h3>";
    html+="		<form>";
    html+="		<div class=\"win_con\">";
    html+="			<p class=\"errorp\">"+errorinfo+"</p>";
    if(errormess!=null)
    {
          html+="<p class=\"huizip\">"+errormess+"</p>";
    }
    html+="			<p class=\"fabup\">";
    html+="<span><input type=button  style='cursor:pointer;' value='ȷ��' class='conBgbtn_1' onclick=\"Element.hide(E('"+windowObj+"'));\"></span>";
    html+="			</p>";
    html+="		</div>";
    html+="		</form>";
    html+="	</td>";
    html+="	<td class=\"tdbgR\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="</table>";
    E(windowObj).innerHTML=html; 
}
woopenalert2=function(windowObj,w,h,errorinfo,errormess)
{
    wclose2(windowObj)
    //wopen2(windowObj,w,h);
    html="  <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td class=\"tdbgL\"></td>";
    html+="	<td class=\"tdbgC\">";
  
   
    html+="		<h3><span onclick=\"Element.hide(E('"+windowObj+"'));\"></span>��ʾ��</h3>";
    html+="		<form>";
    html+="		<div class=\"win_con\">";
    html+="			<p class=\"errorp\">"+errorinfo+"</p>";
    if(errormess!=null)
    {
          html+="<p class=\"huizip\">"+errormess+"</p>";
    }
    html+="			<p class=\"fabup\">";
    html+="<span><input type=button  style='cursor:pointer;' value='ȷ��' class='conBgbtn_1' onclick=\"Element.hide(E('"+windowObj+"'));\"></span>";
    html+="			</p>";
    html+="		</div>";
    html+="		</form>";
    html+="	</td>";
    html+="	<td class=\"tdbgR\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="</table>"; 
    //E(windowObj).innerHTML=html; 
    parent.document.getElementById(windowObj).innerHTML=html; 
    parent.document.getElementById(windowObj).style.display="";
   
}
woopenError=function(windowObj,w,h,errorinfo,errormess)
{
    wopen(windowObj,w,h);
    html="  <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td class=\"tdbgL\"></td>";
    html+="	<td class=\"tdbgC\">";
    html+="		<h3><span onclick=\"wclose('"+windowObj+"');\"></span>��ʾ��</h3>";
    html+="		<form>";
    html+="		<div class=\"win_con\">";
    html+="			<p class=\"errorp\">"+errorinfo+"</p>";
    if(errormess!=null)
    {
          html+="<p class=\"huizip\">"+errormess+"</p>";
    }
    html+="			<p class=\"fabup\">";
    html+="<span><input type=button  style='cursor:pointer;' value='ȷ��' class='conBgbtn_1' onclick=\"wclose('"+windowObj+"');\" ></span>";
    html+="			</p>";
    html+="		</div>";
    html+="		</form>";
    html+="	</td>";
    html+="	<td class=\"tdbgR\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="</table>";
    E(windowObj).innerHTML=html; 
}
woopenSurpAlert=function(windowObj,w,h,errorinfo,errormess)
{
    wopen(windowObj,w,h);
    html="  <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td class=\"tdbgL\"></td>";
    html+="	<td class=\"tdbgC\">";
    html+="		<h3><span onclick=\"wclose('"+windowObj+"');\"></span>�����ʾ��</h3>";
    html+="		<form>";
    html+="		<div class=\"win_con\">";
    html+="			<p class=\"clewp\">"+errorinfo+"</p>";
    if(errormess!=null)
    {
          html+="<p class=\"huizip\">"+errormess+"</p>";
    }
    html+="			<p class=\"fabup\">";
    html+="<span><input type=button  style='cursor:pointer;' value='ȷ��' class='conBgbtn_1' onclick=\"wclose('"+windowObj+"');\" ></span>";
    html+="			</p>";
    html+="		</div>";
    html+="		</form>";
    html+="	</td>";
    html+="	<td class=\"tdbgR\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="</table>";
    E(windowObj).innerHTML=html; 
}

//joyhero 2011.2.10 warningAlert
warningAlert=function(windowObj,w,h,title,info,mess,btnok)
{
    wopen(windowObj,w,h);
    html="  <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td class=\"tdbgL\"></td>";
    html+="	<td class=\"tdbgC\">";
    html+="		<h3><span onclick=\"wclose('"+windowObj+"');\"></span>"+title+"</h3>";
    html+="		<form>";
    html+="		<div class=\"win_con\">";
    html+="			<p class=\"clewp\">"+info+"</p>";
    if(mess!=null)
    {
          html+="<p class=\"huizip\">"+mess+"</p>";
    }
    html+="			<p class=\"fabup\">";
    html+="<span><input id='"+btnok+"' type=button style='cursor:pointer;' value='ȷ��' class='conBgbtn_1' onclick=\"wclose('"+windowObj+"');\" ></span>";
    html+="			</p>";
    html+="		</div>";
    html+="		</form>";
    html+="	</td>";
    html+="	<td class=\"tdbgR\"></td>";
    html+="</tr>";
    html+="<tr>";
    html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
    html+="</tr>";
    html+="</table>";
    E(windowObj).innerHTML=html; 
}


alertSuccess = function(message)
{
	confirmResult(true,'turn2Window',360,230,'��ʾ',message,"btnOK2");
    var btnOK2= E("btnOK2");
    if(btnOK2)
    {
        btnOK2.onclick=function()
        {
            wclose('turn2Window');
        }
    }
    window.setTimeout(function(){try{wclose('turn2Window');}catch(err){}},5000);
}

//ת��΢��
ForwardArticleAdd=function(windowObj,w,h,content,forwardcontent,el)
{

     
     //debugger;
     wopen(windowObj,w,h);
     var source=el.getAttribute("source");
     var lastAID=el.getAttribute("lastAID");
     var lastUID=el.getAttribute("lastUID");
     var LastUName=el.getAttribute("LastUName");
     var lastPhotoID=el.getAttribute("lastPhotoID");
     var lastQuotePhotoID=el.getAttribute("lastQuotePhotoID");
     var lastQuoteCode=el.getAttribute("lastQuoteCode");
	 var firstAID=el.getAttribute("firstAID");
     var firstUID=el.getAttribute("firstUID");
     var firstUName=el.getAttribute("firstUName");
     var firstPhotoID=el.getAttribute("firstPhotoID");
     var firstQuotePhotoID=el.getAttribute("firstQuotePhotoID");
     var firstQuoteCode=el.getAttribute("firstQuoteCode");
     var atType=el.getAttribute("atType");
     var curUserID = el.getAttribute("curUserID");
     var impliedID=0;
     if(el.getAttribute("impliedID")!=null)
     {
        impliedID=el.getAttribute("impliedID");
     }
     if(source!=6)
     {
         forwardcontent=content;
     }
     
     var hasphoto=false;
     
     var html=" <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	 html+=" <tr>";
	 html+=" 	<td colspan=\"3\" class=\"tdbgT\"></td>";
	 html+=" </tr>";
	 html+=" <tr>";
	 html+=" 	<td class=\"tdbgL\"></td>";
	 html+=" 	<td class=\"tdbgC\">";
	 html+=" 		<h3><span onclick=\"wclose('turn1Window');\"></span>ת�����ҵ�΢��</h3>";
	 html+=" 		<form>";
	 html+=" 		<div class=\"win_con2\">";
	 html+=" 		<div class=\"win_con2_1\">";
	 if(source==6)
	 {
	    html+="<p><a>"+firstUName+"</a>��"+forwardcontent+"</p>";
	    if(firstPhotoID!="0"||firstQuotePhotoID!="0")
	    {
	       hasphoto=true;
	    }
	    if(hasphoto)
	    {
	         html+="<p style=\"width:100%; height:22px; overflow:hidden; font-family:Arial;\">";
	         if(firstPhotoID!="0")
	         {
	            html+="<span class=\"win_con2_img1\">����ͼƬ</span>";
	         }
	         if(firstQuotePhotoID!="0")
	         {
	            html+="<span class=\"win_con2_img2\">$"+firstQuoteCode+"����</span>";
	         }
             html+="</p>";
	    }
	 }
	 else
	 {
	    html+="<p><a>"+LastUName+"</a>��"+content+"</p>";
	    if(lastPhotoID!="0"||lastQuotePhotoID!="0")
	    {
	       hasphoto=true;
	    }
	    if(hasphoto)
	    {
	         html+="<p style=\"width:100%; height:22px; overflow:hidden; font-family:Arial;\">";
	         if(lastPhotoID!="0")
	         {
	            html+="<span class=\"win_con2_img1\">����ͼƬ</span>";
	         }
	         if(lastQuotePhotoID!="0")
	         {
	            html+="<span class=\"win_con2_img2\">$"+lastQuoteCode+"����</span>";
	         }
             html+="</p>";
	    }
	 }
     html+=" 		</div>";
	 html+=" 			<div id=\"EmotionsDiv\"></div><div><a style=\"float:left;\" onclick=\"openEmotionsDiv('EmotionsDiv','forwardtextarea_"+lastAID+"','"+lastAID+"')\"><img width=\"29\" height=\"18\" src=\"/images/common/testbq.jpg\" style=\"padding-top:5px;\"></a><div class=\"win_con2_2\" id=\"tipInfoBox"+ lastAID + "\" style=\"width:130px;margin-top:5px;float:right;\">����������<font>168</font>����</div></div>";
	 var clientAgent = navigator.userAgent.toLowerCase();
	 if(clientAgent.indexOf('hermes/1.0')>=0)
	 {
	   html+=" 		<p><textarea class=\"conBgtex_1\" id=\"forwardtextarea_"+lastAID+"\" onfocus=\"hxclient.uiapp.enablekeyboard(true);\" onblur=\"hxclient.uiapp.enablekeyboard(false);\"></textarea></p>";
	 }
	 else
	 {
	   html+=" 		<p><textarea class=\"conBgtex_1\" id=\"forwardtextarea_"+lastAID+"\" onkeydown=\"FriendList.keyDown(event);\" onclick=\"FriendList.hidden()\" onblur=\"FriendList.hidden()\"></textarea></p>";
	 }
	 html+=" 			<p class=\"fabup\">";
	 html+=" 				<span><input type=\"button\" id=\"forwardbtn_"+lastAID+"\" value=\"ת��\" class=\"conBgbtn_2\" style=\"margin-top:15px;\" /></span>";
	 if(source==6&&lastUID!="0"&&firstUID!="0"&&lastUID!=firstUID)
	 {
	    if(curUserID != firstUID)
	    {
	        html+=" 				<input type=\"checkbox\" name=\"firstCommentFlag\" id=\"firstCommentFlag\"/>ͬʱ��Ϊ������"+firstUName+"�����۷���<br />";	        
	    }
	    html+=" 				<input type=\"checkbox\" name=\"lastCommentFlag\" id=\"lastCommentFlag\" />ͬʱ��Ϊ��ת����"+LastUName+"�����۷���";
	 }
	 else
	 {
	    html+=" 				<input type=\"checkbox\" name=\"firstCommentFlag\" id=\"firstCommentFlag\"/>ͬʱ��Ϊ������"+LastUName+"�����۷���<br />";
	 }
	 html+=" 			</p>";
	 html+=" 		</div>";
	 html+=" 		</form>";
	 html+=" 	</td>";
	 html+=" 	<td class=\"tdbgR\"></td>";
	 html+=" </tr>";
	 html+="<tr>";
	 html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	 html+="</tr>";
     html+="</table>";
     E(windowObj).innerHTML=html; 
     var mdforwardtextarea = E("forwardtextarea_" + lastAID); 
     window.setTimeout(function()
	 {
         if(source==6)
         {
           append('forwardtextarea_'+lastAID,content,LastUName);
         }
         else
         {
             var ua = navigator.userAgent.toLowerCase();
             var IE = /msie/.test(ua);
             if(IE)
             {
                 E('forwardtextarea_'+lastAID).focus();
                 var rng = E('forwardtextarea_'+lastAID).createTextRange(); 
                 rng.moveStart("character",0);
                 rng.collapse(true); 
                 rng.select(); 
             }
             else
             {   
                 E('forwardtextarea_'+lastAID).focus();
             }
         }
         forwardInputLimit(mdforwardtextarea,lastAID);
     },260);
     mdforwardtextarea.onkeyup = function()
     {
        forwardInputLimit(mdforwardtextarea,lastAID);
     }
     //��@�û�������
     var forwardReplyF=function(evt)
       {
           return isShowAtUser(evt,"forwardtextarea_" + lastAID  ,"PopForwardDivID_" + lastAID  , lastUID  ,8,10,53);
        };
        if(navigator.userAgent.indexOf("MSIE")>0)
        { 
            document.getElementById("forwardtextarea_" + lastAID ).attachEvent("onkeyup",forwardReplyF);
        }
        else
        {
            document.getElementById("forwardtextarea_" + lastAID ).addEventListener('keyup',forwardReplyF ,false);
        }

     
     
     var forwardbtn=E("forwardbtn_"+lastAID);
     forwardbtn.onclick = function() {
     if (!forwardInputLimit(mdforwardtextarea,lastAID)) 
     {
 ����    woopenalert('turn2Window',w,h,"�Ѿ�������������");
         return false;
     }
     else
     {
        var firstCommentFlag=0; 
        if (E("firstCommentFlag") && E("firstCommentFlag").checked) 
        {
           firstCommentFlag = 1;
        }
        var lastCommentFlag=0;
        if (E("lastCommentFlag") && E("lastCommentFlag").checked) 
        {
           lastCommentFlag = 1;
        }
        var maxlen=336;
        var contentFinal= mdforwardtextarea.value=leftB(mdforwardtextarea.value, 336);
        if(mdforwardtextarea.value==null||mdforwardtextarea.value=="")
        {
            mdforwardtextarea.value="ת��΢��";
            contentFinal="ת��΢��";
        }
        //debugger;
        E("forwardbtn_"+lastAID).disabled=true;
        contentFinal=contentFinal.replace(/\��/g,"&middot;");
        $.getIfModified(ApiFile,{ForwardArticle:1,lastaid:lastAID,lastuid:lastUID,lastuname:escape(LastUName),beginaid:firstAID,beginuid:firstUID,beginuname:escape(firstUName),contentFinal:escape(contentFinal),forwardFinal:0,firstCommentFlag:firstCommentFlag,lastCommentFlag:lastCommentFlag,Source:source,atType:atType,impliedID:impliedID},
        function(response)
        {
            //debugger;
             var flag=response.split('|')[0];
             var message=response.split('|')[1];             
             if(flag==-1)
             {
                wclose(windowObj);
                document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             }
             else if(flag==3)
             {  
                wclose(windowObj);
                if (message == 'ת���ɹ�')
                {
                  confirmResult(true,windowObj,w,h,"ת������","�����Ѿ�ת���ɹ�","btnSucT_"+lastAID,"(2����Զ��ر�)");
                  var btnSucT=E("btnSucT_"+lastAID);
                  btnSucT.onclick=function(){
                    wclose(windowObj);
                  }
                  setTimeout(function(){
                  wclose(windowObj);},2000);
                }
                else
                {
                  alertSuccess(message);
                }
                //��дDIV
                var BlogDiv=E("blogteam_1");
                if(BlogDiv!=null)
                {   
                    var tempMsg = flag + "|" + message + "|";
                    var ajaxHtml=response.replace(tempMsg,"");
                    var html=BlogDiv.innerHTML;
                    BlogDiv.innerHTML=ajaxHtml+html;
                }
                //��дת��
                if(lastAID!=firstAID)
                {
                   var lastforwardfont=E("forwardfont_"+lastAID);
                   if(lastforwardfont!=null)
                   {
                     var lastforwardInner=lastforwardfont.innerHTML;
                     lastforwardInner=lastforwardInner.replace("(","");
                     lastforwardInner=lastforwardInner.replace(")","");
                     var count=parseInt(lastforwardInner);
                     count=count+1;
                     lastforwardfont.innerHTML="("+count+")";
                     if(lastforwardfont.style.display=="none")
                     {
                         lastforwardfont.style.display="";
                     }
                   }
                   var firstforwardfont=E("forwardfont_"+firstAID);
                   if(firstforwardfont!=null)
                   {
                         var firstforwardInner=firstforwardfont.innerHTML;
                         firstforwardInner=firstforwardInner.replace("(","");
                         firstforwardInner=firstforwardInner.replace(")","");
                         var count=parseInt(firstforwardInner);
                         count=count+1;
                         firstforwardfont.innerHTML="("+count+")";
                         if(firstforwardfont.style.display=="none")
                         {
                             firstforwardfont.style.display="";
                         }
                         
                    }
                 }
                 else
                 {
                      var lastforwardfont=E("forwardfont_"+lastAID);
                      if(lastforwardfont!=null)
                      {
                         var lastforwardInner=lastforwardfont.innerHTML;
                         lastforwardInner=lastforwardInner.replace("(","");
                         lastforwardInner=lastforwardInner.replace(")","");
                         var count=parseInt(lastforwardInner);
                         count=count+1;
                         lastforwardfont.innerHTML="("+count+")";
                         if(lastforwardfont.style.display=="none")
                         {
                             lastforwardfont.style.display="";
                         }
                      }
                 }
                 //��д����
                 if(source==6)
                 {
                     if(firstCommentFlag==1)
                     {
                       var firstcommentFont=E("commentfont_"+firstAID);
                       if(firstcommentFont!=null)
                       {
                           var firstreplyInner=firstcommentFont.innerHTML;
                           firstreplyInner=firstreplyInner.replace("(","");
                           firstreplyInner=firstreplyInner.replace(")","");
                           var count=parseInt(firstreplyInner);
                           count=count+1;
                           firstcommentFont.innerHTML="("+count+")";
                           if(firstcommentFont.style.display=="none")
                           {
                               firstcommentFont.style.display="";
                           }
                       }
                     }
                     if(lastCommentFlag==1&&lastAID!=firstAID)
                     {
                        var lastcommentFont=E("commentfont_"+lastAID);
                        if(lastcommentFont!=null)
                        {
                             var lastreplyInner=lastcommentFont.innerHTML;
                             lastreplyInner=lastreplyInner.replace("(","");
                             lastreplyInner=lastreplyInner.replace(")","");
                        
                             var count=parseInt(lastreplyInner);
                             count=count+1;
                             lastcommentFont.innerHTML="("+count+")";
                             if(lastcommentFont.style.display=="none")
                             {
                                 lastcommentFont.style.display="";
                             }
                        }
                     }
                 }
                 else
                 {
                     if(firstCommentFlag==1)
                     {
                        var firstcommentFont=E("commentfont_"+lastAID);
                        if(firstcommentFont!=null)
                        {
                            var firstreplyInner=firstcommentFont.innerHTML;
                            firstreplyInner=firstreplyInner.replace("(","");
                            firstreplyInner=firstreplyInner.replace(")","");
                            var count=parseInt(firstreplyInner);
                            count=count+1;
                            firstcommentFont.innerHTML="("+count+")";
                            if(firstcommentFont.style.display=="none")
                            {
                                firstcommentFont.style.display="";
                            }
                        }
                     }
                 }
             }
             else
             {
                woopenalert('turn2Window',w,h,"ת��ʧ��",message);
                E("forwardbtn_"+lastAID).disabled=false;
             }
        }
        ); 
     }
   }
}
//ת��΢��chenjilin--2009-12-25
ForwardArticleAdd2=function(windowObj,w,h,content,forwardcontent,el)
{ 
     wopen2(windowObj,w,h);
     var source=el.getAttribute("source");
     var lastAID=el.getAttribute("lastAID");
     var lastUID=el.getAttribute("lastUID");
     var LastUName=el.getAttribute("LastUName");
     var lastPhotoID=el.getAttribute("lastPhotoID");
     var lastQuotePhotoID=el.getAttribute("lastQuotePhotoID");
     var lastQuoteCode=el.getAttribute("lastQuoteCode");
	 var firstAID=el.getAttribute("firstAID");
     var firstUID=el.getAttribute("firstUID");
     var firstUName=el.getAttribute("firstUName");
     var firstPhotoID=el.getAttribute("firstPhotoID");
     var firstQuotePhotoID=el.getAttribute("firstQuotePhotoID");
     var firstQuoteCode=el.getAttribute("firstQuoteCode");
     var atType=el.getAttribute("atType");
     var curUserID = el.getAttribute("curUserID");
     var impliedID=0;
     if(el.getAttribute("impliedID")!=null)
     {
        impliedID=el.getAttribute("impliedID");
     }
     
     if(source!=6)
     {
         forwardcontent=content;
     }
     var hasphoto=false;
     
     var html=" <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	 html+=" <tr>";
	 html+=" 	<td colspan=\"3\" class=\"tdbgT\"></td>";
	 html+=" </tr>";
	 html+=" <tr>";
	 html+=" 	<td class=\"tdbgL\"></td>";
	 html+=" 	<td class=\"tdbgC\">";
	 html+=" 		<h3><span onclick=\"wclose2('turn1Window');\"></span>ת�����ҵ�΢��</h3>";
	 html+=" 		<form>";
	 html+=" 		<div class=\"win_con2\">";
	 html+=" 		<div class=\"win_con2_1\">";
	 if(source==6)
	 {
	    html+="<p><a>"+firstUName+"</a>��"+forwardcontent+"</p>";
	    if(firstPhotoID!="0"||firstQuotePhotoID!="0")
	    {
	       hasphoto=true;
	    }
	    if(hasphoto)
	    {
	         html+="<p style=\"width:100%; height:22px; overflow:hidden; font-family:Arial;\">";
	         if(firstPhotoID!="0")
	         {
	            html+="<span class=\"win_con2_img1\">����ͼƬ</span>";
	         }
	         if(firstQuotePhotoID!="0")
	         {
	            html+="<span class=\"win_con2_img2\">$"+firstQuoteCode+"����</span>";
	         }
             html+="</p>";
	    }
	 }
	 else
	 {
	    html+="<p><a>"+LastUName+"</a>��"+content+"</p>";
	    if(lastPhotoID!="0"||lastQuotePhotoID!="0")
	    {
	       hasphoto=true;
	    }
	    if(hasphoto)
	    {
	         html+="<p style=\"width:100%; height:22px; overflow:hidden; font-family:Arial;\">";
	         if(lastPhotoID!="0")
	         {
	            html+="<span class=\"win_con2_img1\">����ͼƬ</span>";
	         }
	         if(lastQuotePhotoID!="0")
	         {
	            html+="<span class=\"win_con2_img2\">$"+lastQuoteCode+"����</span>";
	         }
             html+="</p>";
	    }
	 }
     html+=" 		</div>";
	 html+=" 			<div class=\"win_con2_2\" id=\"tipInfoBox"+ lastAID + "\">����������<font>168</font>����</div>";
	 html+=" 		<p><textarea class=\"conBgtex_1\" id=\"forwardtextarea_"+lastAID+"\" ></textarea></p>";
	 html+=" 			<p class=\"fabup\">";
	 html+=" 				<span><input type=\"button\" id=\"forwardbtn_"+lastAID+"\" value=\"ת��\" class=\"conBgbtn_2\" style=\"margin-top:15px;\" /></span>";
	 if(source==6&&lastUID!="0"&&firstUID!="0"&&lastUID!=firstUID)
	 {
	    if(curUserID != firstUID)
	    {
	        html+=" 				<input type=\"checkbox\" name=\"firstCommentFlag\" id=\"firstCommentFlag\"/>ͬʱ��Ϊ������"+firstUName+"�����۷���<br />";
	    }
	    html+=" 				<input type=\"checkbox\" name=\"lastCommentFlag\" id=\"lastCommentFlag\" />ͬʱ��Ϊ��ת����"+LastUName+"�����۷���";
	 }
	 else
	 {
	    html+=" 				<input type=\"checkbox\" name=\"firstCommentFlag\" id=\"firstCommentFlag\"/>ͬʱ��Ϊ������"+LastUName+"�����۷���<br />";
	 }
	 html+=" 			</p>";
	 html+=" 		</div>";
	 html+=" 		</form>";
	 html+=" 	</td>";
	 html+=" 	<td class=\"tdbgR\"></td>";
	 html+=" </tr>";
	 html+="<tr>";
	 html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	 html+="</tr>";
     html+="</table>";
     parent.document.getElementById(windowObj).innerHTML=html; 
      parent.document.getElementById(windowObj).style.display="";
     var mdforwardtextarea = parent.document.getElementById("forwardtextarea_" + lastAID); 
     window.setTimeout(function()
	 {
         if(source==6)
         {
           append('forwardtextarea_'+lastAID,content,LastUName);
         }
         else
         {
             var ua = navigator.userAgent.toLowerCase();
             var IE = /msie/.test(ua);
             if(IE)
             {
                 parent.document.getElementById('forwardtextarea_'+lastAID).focus();
                 var rng = parent.document.getElementById('forwardtextarea_'+lastAID).createTextRange(); 
                 rng.moveStart("character",0);
                 rng.collapse(true); 
                 rng.select(); 
             }
             else
             {   
                //parent.document.getElementById('forwardtextarea_'+lastAID).focus();
             }
         }
         forwardInputLimit2(mdforwardtextarea,lastAID);
     },260);
     mdforwardtextarea.onkeyup = function()
     {
        forwardInputLimit2(mdforwardtextarea,lastAID);
     }
     var forwardbtn=parent.document.getElementById("forwardbtn_"+lastAID);
     forwardbtn.onclick = function() {
     if (!forwardInputLimit2(mdforwardtextarea,lastAID)) 
     {
 ����    woopenalert2('turn1Window',w,h,"�Ѿ�������������");
         return false;
     }
     else
     {
        var firstCommentFlag=0; 
        if (parent.document.getElementById("firstCommentFlag") && parent.document.getElementById("firstCommentFlag").checked) 
        {
           firstCommentFlag = 1;
        }
        var lastCommentFlag=0;
        if (parent.document.getElementById("lastCommentFlag") && parent.document.getElementById("lastCommentFlag").checked) 
        {
           lastCommentFlag = 1;
        }
        var maxlen=280;
        var contentFinal= mdforwardtextarea.value =leftB(mdforwardtextarea.value, 280);
        if(mdforwardtextarea.value==null||mdforwardtextarea.value=="")
        {
            mdforwardtextarea.value="ת��΢��";
            contentFinal="ת��΢��";
        }
        //parent.document.getElementById("forwardbtn_"+lastAID).disabled=true;
        $.getIfModified(ApiFile,{ForwardArticle:1,lastaid:lastAID,lastuid:lastUID,lastuname:escape(LastUName),beginaid:firstAID,beginuid:firstUID,beginuname:escape(firstUName),contentFinal:escape(contentFinal),forwardFinal:0,firstCommentFlag:firstCommentFlag,lastCommentFlag:lastCommentFlag,Source:source,atType:atType,impliedID:impliedID},
        function(response)
        {    
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             if(flag==-1)
             {
                wclose2(windowObj);
                document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             }
             else if(flag==3)
             {  
               wclose2(windowObj);
                confirmResult2(true,windowObj,w,h,"ת������","�����Ѿ�ת���ɹ�","btnSucT_"+lastAID,"(2����Զ��ر�)");
                var btnSucT=parent.document.getElementById("btnSucT_"+lastAID);
                btnSucT.onclick=function(){
                    wclose2(windowObj);
                }
                setTimeout(function(){
                wclose2(windowObj);},2000);
                //��дDIV
                var BlogDiv=E("blogteam_1");
                if(BlogDiv!=null)
                {   
                    var ajaxHtml=response.replace("3|","");
                    var html=BlogDiv.innerHTML;
                    BlogDiv.innerHTML=ajaxHtml+html;
                }
                //��дת��
                if(lastAID!=firstAID)
                {
                   var lastforwardfont=E("forwardfont_"+lastAID);
                   if(lastforwardfont!=null)
                   {
                     var lastforwardInner=lastforwardfont.innerHTML;
                     lastforwardInner=lastforwardInner.replace("(","");
                     lastforwardInner=lastforwardInner.replace(")","");
                     var count=parseInt(lastforwardInner);
                     count=count+1;
                     lastforwardfont.innerHTML="("+count+")";
                     if(lastforwardfont.style.display=="none")
                     {
                         lastforwardfont.style.display="";
                     }
                   }
                   var firstforwardfont=E("forwardfont_"+firstAID);
                   if(firstforwardfont!=null)
                   {
                         var firstforwardInner=firstforwardfont.innerHTML;
                         firstforwardInner=firstforwardInner.replace("(","");
                         firstforwardInner=firstforwardInner.replace(")","");
                         var count=parseInt(firstforwardInner);
                         count=count+1;
                         firstforwardfont.innerHTML="("+count+")";
                         if(firstforwardfont.style.display=="none")
                         {
                             firstforwardfont.style.display="";
                         }
                         
                    }
                 }
                 else
                 {
                      var lastforwardfont=E("forwardfont_"+lastAID);
                      if(lastforwardfont!=null)
                      {
                         var lastforwardInner=lastforwardfont.innerHTML;
                         lastforwardInner=lastforwardInner.replace("(","");
                         lastforwardInner=lastforwardInner.replace(")","");
                         var count=parseInt(lastforwardInner);
                         count=count+1;
                         lastforwardfont.innerHTML="("+count+")";
                         if(lastforwardfont.style.display=="none")
                         {
                             lastforwardfont.style.display="";
                         }
                      }
                 }
                 //��д����
                 if(source==6)
                 {
                     if(firstCommentFlag==1)
                     {
                       var firstcommentFont=E("commentfont_"+firstAID);
                       if(firstcommentFont!=null)
                       {
                           var firstreplyInner=firstcommentFont.innerHTML;
                           firstreplyInner=firstreplyInner.replace("(","");
                           firstreplyInner=firstreplyInner.replace(")","");
                           var count=parseInt(firstreplyInner);
                           count=count+1;
                           firstcommentFont.innerHTML="("+count+")";
                           if(firstcommentFont.style.display=="none")
                           {
                               firstcommentFont.style.display="";
                           }
                       }
                     }
                     if(lastCommentFlag==1&&lastAID!=firstAID)
                     {
                        var lastcommentFont=E("commentfont_"+lastAID);
                        if(lastcommentFont!=null)
                        {
                             var lastreplyInner=lastcommentFont.innerHTML;
                             lastreplyInner=lastreplyInner.replace("(","");
                             lastreplyInner=lastreplyInner.replace(")","");
                        
                             var count=parseInt(lastreplyInner);
                             count=count+1;
                             lastcommentFont.innerHTML="("+count+")";
                             if(lastcommentFont.style.display=="none")
                             {
                                 lastcommentFont.style.display="";
                             }
                        }
                     }
                 }
                 else
                 { 
                     if(firstCommentFlag==1)
                     {
                        var firstcommentFont=E("commentfont_"+lastAID);
                        if(firstcommentFont!=null)
                        {
                            var firstreplyInner=firstcommentFont.innerHTML;
                            firstreplyInner=firstreplyInner.replace("(","");
                            firstreplyInner=firstreplyInner.replace(")","");
                            var count=parseInt(firstreplyInner);
                            count=count+1;
                            firstcommentFont.innerHTML="("+count+")";
                            if(firstcommentFont.style.display=="none")
                            {
                                firstcommentFont.style.display="";
                            }
                        }
                     }
                 }
             }
             else
             {
                woopenalert2('turn1Window',w,h,"ת��ʧ��",message);
                //E("forwardbtn_"+lastAID).disabled=false;
             }
        }
        ); 
     }
   }
}
forwardInputLimit2 = function(mdforwardtextarea,lastAID) 
{
   var tipStringOK = "����������<strong>${num}</strong>����";
   var tipStringErr = "�Ѿ�����<strong>${num}</strong>����";
   var maxlen = 336;
   var num = Math.ceil(byteLength(trim(mdforwardtextarea.value)) / 2);
   
   if (num > 168) {
        parent.document.getElementById("tipInfoBox" + lastAID).innerHTML = tipStringErr.replace(/\$\{num\}/, (maxlen / 2 - num) * ( - 1));
        parent.document.getElementById("tipInfoBox" + lastAID).style.color = "red"; 
        parent.document.getElementById("forwardbtn_"+lastAID).disabled=true;
        return false;
   } else{ 
        parent.document.getElementById("tipInfoBox" + lastAID).innerHTML = tipStringOK.replace(/\$\{num\}/, (maxlen / 2 - num));
        parent.document.getElementById("tipInfoBox" + lastAID).style.color ="";
        parent.document.getElementById("forwardbtn_"+lastAID).disabled=false; 
        return true;
   }
}
forwardInputLimit = function(mdforwardtextarea,lastAID) 
{
   var tipStringOK = "����������<strong>${num}</strong>����";
   var tipStringErr = "�Ѿ�����<strong>${num}</strong>����";
   var maxlen = 336;
   var num = Math.ceil(byteLength(trim(mdforwardtextarea.value)) / 2);
   if(num<=70)
   {
       if(E("tiptx"+lastAID)!=null)
       {
          E("tiptx"+lastAID).innerHTML="(1��)";
       }
   }
   else
   {
       if(E("tiptx"+lastAID)!=null)
       {
          E("tiptx"+lastAID).innerHTML="(2��)";
       }
   }
   if (num > 168) {
        E("tipInfoBox" + lastAID).innerHTML = tipStringErr.replace(/\$\{num\}/, (maxlen / 2 - num) * ( - 1));
        E("tipInfoBox" + lastAID).style.color = "red"; 
        E("forwardbtn_"+lastAID).disabled=true;
        return false;
   } else{ 
        E("tipInfoBox" + lastAID).innerHTML = tipStringOK.replace(/\$\{num\}/, (maxlen / 2 - num));
        E("tipInfoBox" + lastAID).style.color ="";
        E("forwardbtn_"+lastAID).disabled=false; 
        return true;
   }
}
LimitCmt=function(aid)
{
    //alert('df');
    var commenttxt=E("textcomment_"+aid);
    var commentBtn=E("commentbtn_"+aid);
    var num = Math.ceil(byteLength(trim(commenttxt.value)) / 2);
    if(num>168)
    {
       commentBtn.disabled=true;
       commentBtn.style.background = "url(http://t.hexun.com/images/common/pl_gray.gif)";
    }
    else
    {
       commentBtn.disabled=false;
       commentBtn.style.background = "transparent url(http://t.hexun.com/images/001/icon.gif) no-repeat scroll 0 -80px";
    }
}
LimitCmtTwo=function(cmtid)
{
   var commenttxt=E("commentTwo_"+cmtid);
   var commentBtn=E("commentBtnTwo_"+cmtid);
   var num = Math.ceil(byteLength(trim(commenttxt.value)) / 2);
   if(num>168)
   {
       commentBtn.value="";
       commentBtn.disabled=true;
       commentBtn.style.background = "url(http://t.hexun.com/images/common/hf_gray.gif)";
    }
    else
    {
       commentBtn.value="�ظ�";
       commentBtn.disabled=false;
       commentBtn.style.background = "transparent url(http://t.hexun.com/images/common/btn43_23.gif) no-repeat scroll 0 0";
    }
}
limitDetail=function(cmtid)
{
   var commenttxt=E("commentTwo_"+cmtid);
   var commentBtn=E("commentBtnTwo_"+cmtid);
   var num = Math.ceil(byteLength(trim(commenttxt.value)) / 2);
  
   if(num>168)
   {
       commentBtn.value="";
       commentBtn.disabled=true;
       commentBtn.style.background = "url(http://t.hexun.com/images/common/hf_gray.gif)";
    }
    else
    {
       commentBtn.value="�ظ�";
       commentBtn.disabled=false;
       commentBtn.style.background = "transparent url(http://t.hexun.com/images/common/btn43_23.gif) no-repeat scroll 0% 0%";
    }
}

append=function(el,content,lastuname)
{  
    content=content.replace(/&nbsp;/g," ");
    E(el).value=E(el).value+" //@"+lastuname+" ��"+content;
    var ua = navigator.userAgent.toLowerCase();
    var IE = /msie/.test(ua);
    if(IE)
    {
         var rng = E(el).createTextRange(); 
         rng.moveStart("character",0) ;
         rng.collapse(true); 
         rng.select(); 
    }
}


byteLength = function(str) {
    if (typeof str == "undefined") {
        return 0
    }
    var aMatch = str.match(/[^\x00-\x80]/g);
    return (str.length + (!aMatch ? 0 : aMatch.length))
}
trimHead = function(str) {
    return str.replace(/^(\u3000|\s|\t)*/gi, "")
}
trimTail = function(str) {
    return str.replace(/(\u3000|\s|\t)*$/gi, "")
}
trim = function(str) {
    return trimHead(trimTail(str))
};
leftB = function(str, len) {
    var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
    str = str.slice(0, s.slice(0, len).replace(/\*\*/g, " ").replace(/\*/g, "").length);
    if (byteLength(str) > len) {
        str = str.slice(0, str.length - 1)
    }
    return str
}
leftInfo = function(str, len) {
    var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
    
    str = str.slice(0, s.slice(0, len).replace(/\*\*/g, " ").replace(/\*/g, "").length);
   
    if (byteLength(str) > len) {
        str = str.slice(0, str.length - 1);
    }
    return str+"...";
}

//����΢��
pubWeiBo=function()
{

    
    //debugger;
    var content = escape(E("message").value.replace(/\��/g, "&middot;"));
    var fromUserID = E("fromUserID").value;
    var fromUserName = escape(E("fromUserName").value);
    var fromArticleContent = escape(E("fromArticleContent").value);
    var RssUrl = escape(E("RssUrl").value);
    var RssTitle = escape(E("RssTitle").value);
    var PhotoID = E("PhotoID").value;
    var QuoteStockCode = E("QuoteStockCode").value;
    var QuoteStockPhotoID = E("QuoteStockPhotoID").value;
    var isActiveUser=E("isActiveUser").value;
    var rTag = E("rTag").value;
    var videoHtml = E("videoHtml").value;
    var videoTitle = escape(E("videoTitle").value);
    var videoPic = E("videoPic").value;
    var voteId = E("voteId").value;
    var VoteInfo = escape(E("voteInfo").value);
    var impliedID= E("impliedID").value;
        
    $.getIfModified(ApiFile,{content:content,fromUserID:fromUserID,fromUserName:fromUserName,fromArticleContent:fromArticleContent,RssUrl:RssUrl,RssTitle:RssTitle,PhotoID:PhotoID,QuoteStockCode:QuoteStockCode,QuoteStockPhotoID:QuoteStockPhotoID,isActiveUser:isActiveUser,pubWeiBoFlag:1,videoHtml:videoHtml,videoTitle:videoTitle,videoPic:videoPic,voteId:voteId,VoteInfo:VoteInfo,impliedID:impliedID,random:Math.random()},
   function(response)
   {
      //debugger;
      if(response != null)
      {
          var flag=response.split('|')[0];
          var message=response.split('|')[1];
          var updateCon = response.split('|')[2].replace("<!/>","|");
          var updateDivName = response.split('|')[3];
         
          if(flag==0)
          {
  ��         alertPubError(message);
          }
          else if(flag==1)
          {
          
             alertPubError2(message);
             delUpPhoto();
             
          }
          else
          {
             E("message").value='';
             delUpPhoto();
             delUpStockPhoto();
             delUpVedio();
             delUpVote();
             var bn1 = E(updateDivName);
             
             if(!(updateDivName==undefined || updateDivName==null || updateDivName=="")){
                bn1.innerHTML = updateCon + bn1.innerHTML;
             }
                
                
             if(rTag != "")
             {
                var bnM = parent.document.getElementById("message");
                if (bnM != null)
                bnM.value = rTag+" ";
             }
             if(E("pubh2") != null)
               E("pubh2").innerHTML="����������<strong  id=\"wordcount\">168</strong>����";

             alertPub(message); 
                     
          }
          document.getElementById("labPubBtn").innerHTML='<input type=\"button\" id=\"pubbtn\" onclick=\"ChkMessageAjax()\" name=\"Submit\" value=\"\" class=\"btn1\" title=\"����\" />';
       }
     }      
    )

}
pubWeiBo2=function()//�޼������
{
    //debugger;
    var content = escape(E("message").value);
    var fromUserID = E("fromUserID").value;
    var fromUserName = escape(E("fromUserName").value);
    var fromArticleContent = escape(E("fromArticleContent").value);
    var RssUrl = escape(E("RssUrl").value);
    var RssTitle = escape(E("RssTitle").value);
    var PhotoID = E("PhotoID").value;
    var QuoteStockCode = E("QuoteStockCode").value;
    var QuoteStockPhotoID = E("QuoteStockPhotoID").value;
    var isActiveUser=E("isActiveUser").value
    var rTag = E("rTag").value
    
    
    $.getIfModified(ApiFile,{content:content,fromUserID:fromUserID,fromUserName:fromUserName,fromArticleContent:fromArticleContent,RssUrl:RssUrl,RssTitle:RssTitle,PhotoID:PhotoID,QuoteStockCode:QuoteStockCode,QuoteStockPhotoID:QuoteStockPhotoID,isActiveUser:isActiveUser,pubWeiBoFlag:2},
   function(response)
   {
      if(response != null)
      {
          var flag=response.split('|')[0];
          var message=response.split('|')[1];
          //var updateCon = response.split('|')[2].replace("<!/>","|");
          //var updateDivName = response.split('|')[3];
         
          if(flag==0)
          {
  ��         alertPubError(message);
          }
          else if(flag==1)
          {
             alertPubError2(message);
          }
          else
          {
             E("message").value='';
             delUpPhoto();
             delUpStockPhoto();
             alertPub(message);          
          }
          document.getElementById("labPubBtn").innerHTML='<input type=\"button\" id=\"pubbtn\" onclick=\"ChkMessageAjax()\" name=\"Submit\" value=\"\" class=\"btn1\" title=\"����\" />';
       }
     }      
    )
}

getVideoHtml = function() 
{
    var videoText = E("videoText").value;
    //alert(videoText);
    $.getIfModified(ApiFile,{videourl:videoText},
    function(response)
    {   
        if(response.split('|').length != 3)
        {
            alertPubError("��ƵURL��ַ�޷�ʹ�ã�����Ƶ��ֹ���ã�");
            delUpVedio();
            return;
        } 
        var title = response.split('|')[0];        
        var video = response.split('|')[1];
        var pic = response.split('|')[2];
        //alert(pic);
        document.getElementById("imgUpVedioDiv").src=pic;
        document.getElementById("video_mar_title").title=title;
        document.getElementById("videoTitle").value = title;
        document.getElementById("videoHtml").value = video;
        document.getElementById("videoPic").value = pic;
        var e = document.getElementById("message");
         if( e!=null)
         {           
            //AddOnPos(e," #��Ƶ# " + title);
            if(e.value.indexOf("#��Ƶ#") < 0)
            {
               e.value = " #��Ƶ# " + title + e.value;
            }
            else
            {
               e.value = e.value.replace("#��Ƶ#", "#��Ƶ# " + title);
            }            
         }
         try
         {
         var doc;
         if(navigator.userAgent.indexOf("MSIE")>0){//IE                
                doc = document.frames["upLoadPhoto_f"].document; 
          }else{//Firefox    
                doc = document.getElementById("upLoadPhoto_f").contentDocument; 
          } 
        doc.getElementById("attach").disabled = "disabled";
        doc.getElementById("attachSpan").style.color = "gray";        
        document.getElementById("vote_img_a").style.display = "none";
        document.getElementById("vote_img_span").style.display = "block";
        }catch(err){}
        document.getElementById("message").focus();
    });
}

getVoteIdAndInfo = function()
{
    var VoteName = escape(E("VoteName").value);
    var VoteNote = escape(E("VoteNote").value);
    var idx = E("idx").value;    
    var answer = "";    
    for (i = 1; i <= idx; i++)
    {
        answer = answer + "|" + escape(E("answer" + i).value);
    }
    var VoteType = E("VoteType").value;    
    var ExpireTime = E("ExpireTimeYear").value + "-" + E("ExpireTimeMonth").value + "-" + E("ExpireTimeDay").value + " " + E("ExpireTimeHour").value + ":00:00";    
    var UserID = E("voteUserId").value;
    var UserName = escape(E("voteUserName").value);
    var BlogName = escape(E("voteBlogName").value);
    //alert(answer);
    $.getIfModified(ApiFile,{VoteName:VoteName,VoteNote:VoteNote,idx:idx,answer:answer,VoteType:VoteType,ExpireTime:ExpireTime,UserID:UserID,UserName:UserName,BlogName:BlogName},
    function(response)
    {
         if(response.split('|').length != 3)
         {             
             delUpVote();
             alertPubError(response);
             return;
         }
         var voteId = response.split('|')[0];
         var voteInfo = response.split('|')[1];
         var result = response.split('|')[2];
         
         document.getElementById("voteId").value = voteId;
         document.getElementById("voteInfo").value = voteInfo;
         document.getElementById("imgUpVoteDiv").innerHTML = "����ͶƱ��" + E("VoteName").value;
         var e = document.getElementById("message");
         //alert(e.value.indexOf("#ͶƱ#"));
         if( e!=null && e.value.indexOf("#ͶƱ#") < 0)
         {           
            // AddOnPos(e," #ͶƱ#");
            e.value = " #ͶƱ# " + e.value;
         }
         //alertPub(result);
         
         try{
         document.getElementById("showVideo_mar_a").style.display = "none";
         document.getElementById("showVideo_mar_span").style.display = "block";
         
         var doc;
         if(navigator.userAgent.indexOf("MSIE")>0){//IE 
                doc = document.frames["upLoadPhoto_f"].document; 
          }else{//Firefox    
                doc = document.getElementById("upLoadPhoto_f").contentDocument; 
          } 
         
         doc.getElementById("attach").disabled = "disabled";
         doc.getElementById("attachSpan").style.color = "gray";
         }catch(err){}
    });
    document.getElementById("message").focus();    
}

checkUserName = function()
{
    var recommendUserName = escape(E("recommendUserName").value);    
    $.getIfModified(ApiFile,{RecommendUserNameCheck:recommendUserName},
    function(response)
    {    
         //alert(response); 
         if(response != "Exist")
         {         
              document.getElementById("noexist").style.display = "block";
         }
         else
         {
              document.getElementById("noexist").style.display = "none";
         }
    });    
}

addRecommend = function()
{
    if(document.getElementById("noexist").style.display != "none")
    {
         return;
    }
    var userid = E("userId").value;
    var userName = escape(E("userName").value); 
    var recommendUserName = escape(E("recommendUserName").value); 
    if(userName == recommendUserName)
    {
         alertPubError("�٣��㲻�����Ƽ��Լ���");
         return;
    }   
    if(E("recommendReason").value.length > 30)
    {
         alertPubError("�Ƽ�������2-30�����ڣ�");
         return;
    }
    if(E("recommendReason").value.length < 2)
    {
         alertPubError("�Ƽ�������2-30�����ڣ�");
         return;
    }
    var recommendReason = escape(E("recommendReason").value); 
    var limitNum = E("limitNum").value;
    var readOnly = document.getElementById('recommendUserName').readOnly;
    $.getIfModified(ApiFile,{UserID:userid, UserName:userName, RecommendUserName:recommendUserName, RecommendReason:recommendReason, LimitNum:limitNum, ReadOnly:readOnly},
    function(response)
    {        
         var result = response.split('|')[0];
         var mess = response.split('|')[1];
         if(result == "Done")
         {
             //alertPub(mess);
             //Pause(this, 50000);
             location.reload();             
         }
         else
         {
             alertPubError(mess);
         }         
    });
}

delRecommend = function()
{
    var userid = E("userId").value;
    var delRecommendUserID = E("delRecommendUserID").value;
    $.getIfModified(ApiFile,{UserID:userid, delRecommendUserID:delRecommendUserID},
    function(response)
    {
        var result = response.split('|')[0];
        var mess = response.split('|')[1];
        if(result == "Done")
        {
             location.reload();
        }
        else
        {
             alertPubError(mess);
        }
    });
}

saveRecommendOrder = function(curid)
{
    container = document.getElementById("container");
	var nodes = container.getElementsByTagName("li");
	var orderNo = 0;
	for(var i=0;i<nodes.length;i++){
		var li = nodes[i];
		if(li.id != "dragGhost"){
		    
			$.getIfModified(ApiFile,{UpdateRecommendOrder:1, UserID:curid, RecommendUserID:li.id.split('_')[0], TargetLocation:orderNo},
			function(response)
			{
			    var result = response.split('|')[0];
			    var mess = response.split('|')[1];
			    if(result == "Done")
                {
                     //location.reload();
                }
                else
                {
                     alertPubError(mess);
                     alert(1);
                     return;
                }                
			});
			orderNo++;
		}
	}
	setTimeout(function(){
            location.reload();},2000);
}
openEmotionsDiv=function(container,editor,lastaid)
{
    E("EmotionsDiv").style.display='block';
    DisplayEmotions(container,editor,lastaid);
}
AfterAddEmotion=function(editor,lastaid)
{
    forwardInputLimit(editor,lastaid);
    E("EmotionsDiv").style.display='none';
    editor.focus();
}
