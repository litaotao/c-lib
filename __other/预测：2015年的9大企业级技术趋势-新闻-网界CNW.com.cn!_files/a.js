
//�ȵ������л�
$(function(){
	$(".right3 h2 ul li").each(function(index){//�ҵ�live�µ�ÿ��li
	$(this).mouseover(function(){//���������ʱ��
	$(".paihang").addClass("none");//����
	$(".paihang:eq("+index+")").removeClass("none")//ʹli��paihang���Ӧ��
	$(".right3 h2 ul li").removeClass("hover");//ȥ���߿�����ʾ��
	$(this).addClass("hover")//�����ء�
	})
	})
	
	
	
})

//����ҳ�л�
$(function(){
	$(".ContTabTitle ul li a").each(function(index){//�ҵ�live�µ�ÿ��li
	$(this).mouseover(function(){//���������ʱ��
	$(".ContTabCont").addClass("none");//����
	$(".ContTabCont:eq("+index+")").removeClass("none")//ʹli��paihang���Ӧ��
	$(".ContTabTitle ul li a").removeClass("ContTabTitleOne");//ȥ���߿�����ʾ��
	$(this).addClass("ContTabTitleOne")//�����ء�
	})
	})
	
	
	$(".qiehuan2Title ul li a").each(function(index){//�ҵ�live�µ�ÿ��li
	$(this).mouseover(function(){//���������ʱ��
	$(".qiehuan2Cont").addClass("none");//����
	$(".qiehuan2Cont:eq("+index+")").removeClass("none")//ʹli��paihang���Ӧ��
	$(".qiehuan2Title ul li a").removeClass("QiehuannumOne");//ȥ���߿�����ʾ��
	$(this).addClass("QiehuannumOne")//�����ء�
	})
	})
	
	
	
	/*���ظ���

		
	$(".main3-leftList .jiazai1").click(
			function(){
				$(".main3-leftList .jiazaiCont1").removeClass("none")
				$(".main3-leftList .jiazai1").css("display","none");//����
				
				}
	)
	$(".main3-leftList .jiazai2").click(
			function(){
				$(".main3-leftList .jiazaiCont2").removeClass("none")
				$(".main3-leftList .jiazai2").css("display","none");//����
				
				}
	)
	*/
	/*��ҵӦ�ü��ظ���
	
	$(".ContBox .jiazai3").click(
			function(){
				$(".ContBox2").removeClass("none")
				$(".ContBox .jiazai3").css("display","none");//����
				
				}
	)
	$(".ContBox .jiazai4").click(
			function(){
				$(".ContBox3").removeClass("none")
				$(".ContBox .jiazai4").css("display","none");//����
				
				}
	)
	*/
	/*���ż��ظ���
	$(".ContBox .jiazai5").click(
			function(){
				$(".ContBox4").removeClass("none")
				$(".ContBox .jiazai5").css("display","none");//����
				
				}
	)
	$(".ContBox .jiazai6").click(
			function(){
				$(".ContBox5").removeClass("none")
				$(".ContBox .jiazai6").css("display","none");//����
				
				}
	)
		*/
		
		
		
/*��ҳģ�ⷭҳ
$(".IndexTuijian0 .TuijianFanye span").each(function(index){//�ҵ�live�µ�ÿ��li
	$(this).click(function(){//���������ʱ��
	$(".IndexCont").addClass("none");//����
	$(".IndexCont:eq("+index+")").removeClass("none")//ʹli��paihang���Ӧ��
	$(".IndexTuijian0 .TuijianFanye span").removeClass("FanyeOn");//ȥ���߿�����ʾ��
	$(this).addClass("FanyeOn")//�����ء�
	$(".IndexTuijian2 .TuijianFanye span").removeClass("FanyeOn");//ȥ���߿�����ʾ��
	$(".IndexTuijian2 .TuijianFanye span:eq("+index+")").addClass("FanyeOn")//�����ء�
	})
	})
	
$(".IndexTuijian2 .TuijianFanye span").each(function(index){//�ҵ�live�µ�ÿ��li
	$(this).click(function(){//���������ʱ��
	$(".IndexCont").addClass("none");//����
	$(".IndexCont:eq("+index+")").removeClass("none")//ʹli��paihang���Ӧ��
	$(".IndexTuijian .TuijianFanye span").removeClass("FanyeOn");//ȥ���߿�����ʾ��
	$(this).addClass("FanyeOn")//�����ء�
	$(".IndexTuijian0 .TuijianFanye span").removeClass("FanyeOn");//ȥ���߿�����ʾ��
	$(".IndexTuijian0 .TuijianFanye span:eq("+index+")").addClass("FanyeOn")//�����ء�
	})
	})
	
	
	*/
})

function search()
{
	document.form1.action = "http://search.cnw.com.cn/searchview.aspx";
	document.form1.submit();
	return false;
}



