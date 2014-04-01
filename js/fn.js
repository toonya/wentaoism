(function($){

	"use strict";

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

	/**
	 *
	 * set the datepicker config
	 *
	 * */
	 var _DateTimePicker = function(){
	 	var today = new Date();
	 		today = today.setDate(today.getDate()-1);

	 	/* init time picker */
		$('.time[data-type="time"]').datetimepicker({
			pickDate: false
		})

		/* init date picker */
		$('.time[data-type="date"]').not('[data-no-min]').datetimepicker({
			pickTime: false,
			useCurrent: false,
			minDate: today
		})

		$('[data-no-min]').datetimepicker({
			pickTime: false,
			useCurrent: false
		})

		/* input trigger */
		$('.time').on('click', 'input' , function(){
			$(this).next('span').click();
		})

		var getGroupTime = function(group) {
			if(!group)
				return;

			var groupDate = $('[data-group="' + group + '"][data-type="date"] input').val();
			var groupTime = $('[data-group="' + group + '"][data-type="time"] input').val();
			return new Date(groupDate + ' ' + groupTime);
		}

		$('.time').on('dp.change', function(e){
			var _final = getGroupTime('final'),
				_draft = getGroupTime('draft'),
				duration = _final - _draft;
			if( _final && _draft && duration/1000/60/60/24 < 1){

				$('.time-error').removeClass('hide');
				console.log(duration/1000/60/60/24);
			}
			if( _final && _draft && duration/1000/60/60/24 >= 1){

				$('.time-error').addClass('hide');
				console.log(duration/1000/60/60/24);
			}
			if($(this).data('group')=='draft')
				show_time();
		})


		 var show_time = function(){
			 var time = getGroupTime('draft');
			 var text = time.getUTCMonth()+1 +"月"+time.getDate()+'日 '+time.getHours()+'时'+time.getMinutes()+'分 ';

			 console.log(time.getMonth());
			 $('.show-draft-time').text(text);
		 }

		 $('.time').trigger('dp.change');
		 show_time();

	 }

	 _DateTimePicker();


    /* end datepicker */

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

	$('[data-bind="word-per-page"]').on('numInput',function(){
		/* word per page */
		var wpp = $('[data-words]:checked').data('words');
		var pages = $(this).val();
		var words = wpp * pages;

		$(this).closest('.form-group').find('.word-count').text(words);
	});

	$('[data-words]').on('change',function(){
		$('[data-bind="word-per-page"]').trigger('numInput');
	});

	$('[data-bind="word-per-page"]').trigger('numInput');


	$('[data-ride="new-item"]').on('click', function(){
		var data = $(this).data();
		var template = '<span class="btn btn-default btn-file">'+
							'追加材料 <input id="" type="file"><span class="filename">(点击上传)</span>'+
						'</span>';
		$(template).insertBefore($(this));
	})

	var GMTRefresh = function(target) {
		var time = new Date(),
			localGMT = time.getTimezoneOffset()/60,
			GMTIndex;
		localGMT<0 ? GMTIndex = - localGMT : GMTIndex = 25 - localGMT;

		target.children().eq(GMTIndex).prop('selected','selected');
	}

	$('.gmt-select').each(function(){
		new GMTRefresh($(this));
	}).on('change',function(){
		show_gmt();
	})

	var show_gmt = function(){
		 var gmt = $('.gmt-select').val();

		 $('.show-draft-gmt').text(gmt);
	}

	show_gmt();


})(jQuery)