/******************
@author:zhxy
@date:2013-02-01
@����:ͨ��js
******************/
try
{
	$(document).ready(function() {
		$('.h-hover-t').each(function() {
            $(this).hover(function() {
				showBox=$(this).siblings('.h-hover-c')
				showBox.show();
				showBoxR=showBox.width()+showBox.offset().left;
				headerR=$('.header').width()+$('.header').offset().left
				if(showBoxR>headerR){
					showBox.css('right','0');
				}
            })
		    $('.h-hover-box').mouseleave(function() {
                $('.h-hover-c').hide();
            });
        });
		$('.follow-app-name').mouseenter(function() {
				$(this).next('.follow-app-del').css('display','inline');
		});
		$('.follow-app-list').mouseleave(function() {
				$(this).children('.follow-app-del').css('display','none');
		});
	});
}
catch(error)
{
	//console.log(error);
}
function fnLoginOut() {
  $.ajax({
    url: '/Job1001Error.php?action=PersonExit',
    success: function() {
      window.location.reload();
    }
  });
}
/********************
@author:zhhao
@date:2013-05-07
@��������:��ʦ����̨
********************/
//ѡ��л�
function setTab(name,cursel,n,classname){
    if(typeof(classname)=="undefined"){
        classname="hover";
    }
    for(i=1;i<=n;i++){
        var topnews=document.getElementById(name+i);
        var con=document.getElementById("con_"+name+"_"+i);
        topnews.className=i==cursel?classname:"";
        con.style.display=i==cursel?"block":"none";
    }
}

/**
��ת�����۵�form
**/

$(".todianping").click(function(){
	if(doLogin)
	{
		$(".toPingjiaForm").click();
	}
});
/*�����������ʾ*/
$('#h-s-txt-ph').job1001inputValueTips();


