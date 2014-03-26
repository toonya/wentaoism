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
	$('.form_date').datetimepicker({
        language:  'fr',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });

    $('.btn-file :file').on('change.customFilePicker', function(e) {
	    var $this = $(this);
	    var filename = $this.val().replace(/.*(\/|\\)/, '');

	    $this.closest('.form-group').find('.filename').text(filename);
	    console.log(filename);
    })

	$('[data-ride="toggle-select"]').on('change.toggleSelectionForm', function(e) {
		var num = $(this).find('option:selected').index();
		var target = $('#' + $(this).data('toggle')).children('select');
		target.each(function(i,e){
			if(num!=i)
				$(e).addClass('hide');
			else
				$(e).removeClass('hide');
		})
	})

	$('.list-panle-nav a').on('shown.bs.tab', function(e){
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
	});



	$('#open-review').one('click.runAniamtion', function(e){
		$('.review').addClass('show');
	})
	$('#open-review').on('click.openReveiwPage', function(e){
		e.preventDefault();
		$(this).closest('.list-panle-content').addClass('open-review');
	})
	$('#close-review').on('click.closeReveiwPage', function(e){
		e.preventDefault();
		$(this).closest('.list-panle-content').removeClass('open-review');
	})

	$('.checkall').on('change.toggleAll', function(e){
		var $target = $($(this).data('target'));
		$target.find('[type="checkbox"]').prop('checked',this.checked);
	})

})(jQuery)