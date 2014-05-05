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

    $('.btn-file :file').on('change.customFilePicker', function(e) {
	    var $this = $(this);
	    var filename = $this.val().replace(/.*(\/|\\)/, '');

	    $this.closest('.btn-file').find('.filename').text('('+filename+')');

	    console.log(filename);
    })

    $('.btn-file').on('click', '.btn', function(e){
	    $(this).closest('.btn-file').find('input').trigger('click');
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

	/* ! for new file fn */
	$('[data-ride="new-item"]').on('click', function(){
		var $template = $('.changeable-item.file .hide').clone();
		$template.removeClass('hide');

		$('.changeable-item.file').append($template);
	})

	/* exonerate */
	$('.exonerate :checkbox').on('change', function(){
		if( this.checked )
			$(this).closest('form').find('[type="submit"]').removeAttr('disabled');
		else
			$(this).closest('form').find('[type="submit"]').attr('disabled','disabled');
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

	$('.review [data-trigger]').on('change',function(){
		console.log($(this).data('trigger'));
		$('.comment .form-group').not($(this)).addClass('hide');
		$($(this).data('trigger')).removeClass('hide');
	})

	$('.writer a').popover({
		trigger: 'hover',
		placement: 'auto',
		html: true,
		content: function(){return $(this).next('.writer-info').html();}
	})
	$('.order-popover a').popover({
		trigger: 'hover',
		placement: 'auto',
		html: true,
		content: function(){return $(this).next('.writer-info').html();}
	})



    /* end datepicker */

    /* search help */

    $('.search-help .btn').on('click',function(){
	    var keywords = $('.search-help input[type="text"]').val();
	    new help_search(keywords);
    });

    $('.search-help input[type="text"]').on('keypress',function (evt) {
		//Deterime where our character code is coming from within the event
		var charCode = evt.charCode || evt.keyCode;
		if (charCode  == 13) { //Enter key's keycode
			$(this).blur();
			$('.search-help .btn').trigger('click');
		}
	});

	var help_search = function(keywords){
		this.init(keywords);
	}
	help_search.prototype = {
		init : function(keywords) {
			this.keywords = keywords;
			this.$items = $('.tab-content .tab-pane');
			this.$target = [];

			this.search_item();
			this.render();
			console.log(this.$target);
		},

		search_item : function(){
			this.$items.each($.proxy(function(i,e){
				if($(e).text().search(this.keywords) != -1){  // 搜索文本
					var text = $(e).find('ol.breadcrumb li.active').text(),
						id   = $(e).attr('id'),
						item = $('<div><a data-toggle="tab" href="#'+id+'">'+text+'</a></div>');
					this.$target.push(item);
				}
			},this))
		},

		render : function(){
			$('#search-help .panel-body').html('');
			$.each(this.$target, function(){
				$('#search-help .panel-body').append(this);
			})
		}
	}

    /* search help */

    /* ! desktop login toggle */
    $('.toggle-desktop-login').on('click', function(e){
	    e.preventDefault();
	    $('.desktop.login').toggleClass('hide');
    })

    // form validation
    $('form [data-required] :input')
	.each(function(i,e){
		$(this).not('[required]').on('beginValid', function(){
			$(this).attr('required','required');
		});
		$(this).on('stopValid', function(){
			$(this).removeAttr('required');
		});
	})
	.closest('form')
	.on('submit', function(e){
		e.preventDefault();
		var $group  =  $(this).find('[data-required]');
		$group.each(function(i,e){
			$(this).find(':input').trigger('beginValid');

		if( $(this).find(':invalid').size() == 0 )
			$(this).trigger('submit');

		})

	})
	.on('reset',function(){
		$(this).find(':input').each(function(i,e){
			$(this).trigger('stopValid');
		})
	})
	.on('click', '.btn-close', function(e){
		e.preventDefault();

		$(this).closest('form').addClass('hide');
	});

	// article type : other
	$('[data-input-toggle] :radio').on('change', function(){
		if($(this).data('trigger')) {
			$(this).closest('[data-input-toggle]').find('.trigger-area').find('input').not( $($(this).data('trigger')) ).addClass('hide').val('');
			$($(this).data('trigger')).removeClass('hide').val('');
		}
		else {
			$(this).closest('[data-input-toggle]').find('.trigger-area').find('input').addClass('hide').val('');
		}
	})

	// open message.

	$('.collapse').on('show.bs.collapse', function () {
		$(this).closest('.panel').addClass('active')
	}).on('hide.bs.collapse', function () {
		$(this).closest('.panel').removeClass('active')
	})

	// order-file new file
	$('#upload-file .add-file').click(function(e){
		e.preventDefault();

		var $container = $(this).closest('form').find('.changeable-items'),
			$template  = $container.find('.item').last().clone();

		// process template
		$template.find('input').each(function(i,e){
			var name = $(e).data('name') + '[' + ($(e).data('index')+1) + ']';
			$(this).attr('name', name).val('');
		})

		$container.append($template);
	})

})(jQuery)