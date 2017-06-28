//切换
$(function(){
	//头部的切换
	$('.main-tabs-heads li').click(function(){
		var lis=$('.main-tabs-heads>li');
		lis.removeClass('active');
		var index=$(this).index(lis);
		$(this).addClass('active');
		
		$('.main-tabs-panels>li').removeClass('active');
		$('.main-tabs-panels>li').eq(index).addClass('active');
	});
	
	$('body').on('click', '.user-list li', function(){
		$('user-list>li').removeClass('select');
		$(this).addClass('select');
	});
	//好友列表展开切换
	$('body').on('click', '.user-group-item>span', function(){
		$(this).parent().toggleClass('active');
	});
	
	$('.main-tabs-heads li:first').trigger('click');
});