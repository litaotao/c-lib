$(document).ready(function(){
	   var w=$(".xz-main-right").height();
	   $(".xz-main-left").height(w);
	   
/*���н�ʶԱ�*/
$(".add-c").click(function(event){
	     event.preventDefault();
	    $(".new-no-record").css("z-index","2");
	    $(".xz-input-box").show().animate({top:0},300);
	});	   
   });


$(document).ready(function(){
	   var w=$(".xz-main-right").height();
	   $(".xz-main-left").height(w);
	   
/*���н�ʶԱ�*/
$(".add-c").click(function(event){
	     event.preventDefault();
	    $(".new-no-record").css("z-index","2");
	    $(".xz-input-box").show().animate({top:0},300);
	});	   
   });

/*нָѧ��ѡ��*/
$(document).ready(function(){
   $(".edu input").click(function(){
	       $(".edu-list").slideDown();
	   });
	$(".edu-list li").hover(function(){
		  $(this).css({background:"#ccc"});  
	  },function(){
	      $(this).css({background:"#fff"});
	  })
	  .click(function(){
		  $(".edu-list").slideUp();		
		  $(".edu input").val($(this).text());  
		  });
});
