(function($){
	 
	//��ȡ���cookie
	function getCookie(objName){//��ȡָ�����Ƶ�cookie��ֵ
		var arrStr = document.cookie.split("; ");
		for(var i = 0;i < arrStr.length;i ++){
			var temp = arrStr[i].split("=");
			if(temp[0] == objName) return unescape(temp[1]);
		}
		return '';
	};
	var v='';//��ȡ��ǰҳ���url��Ϣ
	var cookieflag='';//�ͻ���Ψһ��ʶ
	try{
		
		cookieflag=getCookie('cookieflag');
		//�˲ź���ҵ
		cu=getCookie('c_job1001UserId');
		u=getCookie('job1001EnterId');
		
		
		
		//��վ����
		title=document.title;
		
		host=window.location.host;
		
	}catch(e){}
	
	
	function Feedback(options){
		this.options=options;
	};
	
	
	Feedback.prototype={
		init:function(){
			return this;
		},
		setVurl:function(url){
			this.options.vurl=url;
		},
		getUrl:function(){
			//alert(this.options.vurl);
			//�������û��Ҫ�ύ���������ĵ�ַ
			if(this.options.vurl=='')  v=window.location;
			else v=this.options.vurl;
			
			if(typeof this.options.udata['uid']!='undefined'&&this.options.udata['uid']!='') cu=this.options.udata['uid'];
			if(typeof this.options.udata['enterid']!='undefined'&&this.options.udata['enterid']!='') u=this.options.udata['enterid'];
			
			
			var url=this.options.url;
			var data='?';
			//'&skeytype='+this.options.keytype+
			data+='&key='+this.options.key/*+'&skeytype='+this.options.keytype*/+'&tradeid='+this.options.tradeid+'&template='+this.options.template+'&target='+this.options.target+'&cookieflag='+cookieflag+'&cu='+cu+'&u='+u+'&t='+encodeURIComponent(title)+'&v='+escape(v)+'&backurl='+escape(this.options.backurl)+'&host='+escape(host);
			
			for(var k in this.options.udata)
				data+='&'+k+'='+this.options.udata[k];
			
			if($(this.options.parent).get(0).tagName=='A') data+='&target=blank';
				
			return url+data;
		},
		
		show:function(){
			
			var feedback=this.init();
			
			if($('.job1001-feedback-inner').height()==null){
					
					var itemarr=feedback.options.showitem.split(',');
				
					//'<a hidefocus="" class="item phone" onclick="return false;" href="#" id="s_phone_icon"></a>'+
					var htmlarr={
						feedback:'<a  target="_blank" title="�������" class="job1001-feedback-item job1001-feedback-advice" href="javascript:void(0)"></a>',
						top:'<a  title="�ص�����" class="job1001-feedback-item job1001-feedback-back job1001-feedback-unshown" onclick="return false;" href="javascript:void(0)"></a>'
					};
					var html='';
					for(i=0;i<itemarr.length;i++){
						html+=htmlarr[itemarr[i]];
					}
					$('<div  class="job1001-feedback" id="s_menu">'+
					   '<div class="job1001-feedback-inner">'+
							''+html+
							//'<div class="s-pk-addpnl">'+
							//'<div class="pk-addlayer"></div>'+
							//'</div>'+
					   '</div>'+
					'</div>').appendTo($(document.body));
					
					
					if(feedback.options.parent!=document.body&&feedback.options.parent.height()!=null){
						var p=feedback.options.parent.offset();
						$('#s_menu').css('left',(p.left+feedback.options.parent.width()+10)+'px');
					}
					
					//���ö���λ��
					function setBottionPostion(){
						var l=0;
						if(!window.XMLHttpRequest) {l=$(document).scrollTop();}
							
						if(feedback.options.position.top=='center')
							$('#s_menu').css('top',($(window).height() - $('#s_menu').height())/2 + l);	
						else if(feedback.options.position.top=='bottom')
							$('#s_menu').css('top',$(window).height() - $('#s_menu').height()-10 + l);
						else
							$('#s_menu').css('top',feedback.options.position.top+'px');
			
					}
					setBottionPostion();
					
					
					//���ûص�����
					$(window).scroll(function(){
											  
						if($(window).scrollTop() <10) {
							$('.job1001-feedback-back').addClass('unshown');
						}else {
							$('.job1001-feedback-back').removeClass('unshown');
						}
						if (!window.XMLHttpRequest) {
							setBottionPostion();
						}
					});
					
					$('.job1001-feedback-back').click(function(){
						$('body,html').animate({ scrollTop: 0 }, 100);
						return false;
					});
					
					//�������û��Ҫ�ύ���������ĵ�ַ
					var url=this.getUrl();
					$('.job1001-feedback-advice').attr('href',url);
			
				
					
					//�жϵ�ǰ��������ʲô��ʽ��
					if(this.options.target=='content'){
						
						$('.job1001-feedback-advice').attr('href','javascript:void(0);');
						
						
						
						$('.job1001-feedback-advice').click(function(){
							
							$.weeboxs.open('<div><iframe id="feedback_iframe" name="feedback_iframe" width="'+feedback.options.width+'" height="'+feedback.options.height+'" src="'+feedback.getUrl()+'" frameborder="0"  scrolling="auto"></iframe></div>',{width:feedback.options.width+30,height:feedback.options.height+30,title:feedback.options.title});
							
							
							return false;
						});
					}
					
			}
		}
		
		
	};
	
	
	//����
	
	var feedback;
	$.fn.feedback = function(options) {
      
	   //�жϵ�ǰ��parent�Ƿ����
	  if($(options.parent).height()==null)  options.parent=document.body;
	  
	  options = $.extend({}, $.fn.feedback.defaults, options);
	  
	  feedback=new Feedback(options);	
	  
	  if($(options.parent).get(0).tagName!='A'){
	  
		  $('<link rel="stylesheet" type="text/css" href="'+options.css+'"/>').appendTo($('head'));
		  window.setTimeout(function(){
			feedback.show();
		  },1000);
			
	  }else{
		  if($(options.parent).attr('type')=='dialog'){
			
			$(options.parent).click(function(){
				$.weeboxs.open('<div><iframe id="feedback_iframe" width="'+feedback.options.width+'" height="'+feedback.options.height+'" src="'+feedback.getUrl()+'" frameborder="0"  scrolling="auto"></iframe></div>',{width:feedback.options.width+30,height:feedback.options.height+30,title:feedback.options.title});				
			});
		  }else{
		  	$(options.parent).attr('href',feedback.getUrl());  
		  }
	  }
	  
	};
	
	$.fn.feedback.getUrl=function(){
		return feedback.getUrl();
	}
	$.fn.feedback.setVurl=function (url){
		feedback.setVurl(url);
	}
	
	$.fn.feedback.defaults = {
        key: 'job1001',//�����Ĺؼ��֣���ͬ����Ŀ��ʾ��һ��
		target:'content',//�򿪷������ڵ���ʽ����blank��content
		template:'default',//���õ�ģ��
		css:'http://img3.job1001.com/aboutus/helpnew/faceback.css',//�����css·��
		//css:'http://192.168.60.200/workfile/xieqh/img_css/aboutus/helpnew/faceback.css',//�����css·��
		url:'http://kefu.job1001.com/index.php',//����ҳ��ĵ�ַ
		//url:'http://192.168.60.200/workfile/xieqh/aboutus/feedback/index.php',//����ҳ��ĵ�ַ
        showitem:'top,feedback',//��ʾ����Ŀ
		width:550,//��ȣ�ֻ��ʹ����target=content������
		height:400,//�߶ȣ�ֻ��ʹ����target=content������
		title:'����/����',//���⣬ֻ��ʹ����target=content������
		//layout:'right',//
		position:{left:'right',top:'bottom'},//��ŵ����� right bottom ������,
		show:true,
		keytype:'',
		tradeid:'',
		backurl:'',
		udata:{},
		vurl:'',
		parent:document.body
		
    };
	
})(jQuery);if(typeof feedback_config=='undefined') feedback_config={};$(document).feedback(feedback_config);