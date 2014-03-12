(function($){
	$('.nav-mobile-trigger').on('click.toggleMobileNav', function(e){
		e.preventDefault();

		$('body>.page').toggleClass('mobile-nav');
		$('.nav-cover').toggleClass('hide');
		$('nav.mobile').toggleClass('hide');
	})

	$('.nav-cover').on('click.toggleMobileNavTrigger', function(){
		$('.nav-mobile-trigger').click();
	})

	$('.login-mobile-trigger').on('click.toggleMobileLogin', function(e){
		e.preventDefault();

		$('body>.page').toggleClass('mobile-login');
		$('.login-cover').toggleClass('hide');
		$('.login.mobile').toggleClass('hide');
	})

	$('.login-cover').on('click.toggleMobileLoginTrigger', function(){
		$('.login-mobile-trigger').click();
	})
})(jQuery)