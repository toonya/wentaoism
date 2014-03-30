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

	    $this.parent().find('.filename').text('('+filename+')');
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

	$('.add-row, .add-col').on('click', function(e){
		e.preventDefault();
		var add_handle = $(this).hasClass('add-row')? 'row' : 'col';

		switch(add_handle){

			case 'row' :
				console.log('row');
				var $template = $('#price-list tbody tr').last().clone();
				$template.find('input').val('').attr('placeholder','点击输入');
				$('#price-list tbody').append($template);
			break;

			case 'col' :
				console.log('col');
				var $template_tbody = $('#price-list tbody tr td').last().clone();
				var $template_head  = $('#price-list thead tr:last th').last().clone();
				$template_tbody.find('input').val('').attr('placeholder','点击输入');
				$template_head.find('input').val('').attr('placeholder','点击输入');
				$('#price-list tbody tr').append($template_tbody);
				$('#price-list thead tr:last').append($template_head);

			break;

			default:
				alert('发生错误，请联系管理员');
		}

	})

	$('#price-list input').on('keypress',function (evt) {
		//Deterime where our character code is coming from within the event
		var charCode = evt.charCode || evt.keyCode;
		if (charCode  == 13) { //Enter key's keycode
			$(this).blur();
		}
	});

})(jQuery)