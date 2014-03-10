jQuery(function($) {
    $('.current-menu-item').addClass('active');

    // ----------------------------------------
    // ! let it become a plugin later, so can add 150*150 etc. function.
    // ----------------------------------------


    $('.auto-add-bg').each(function(i,e) {
        var bgSrc = jQuery(e).data('bg-src');

        if(bgSrc) {
            jQuery(e).css({background:'url('+bgSrc+') center top'});
        }
    });

    // ----------------------------------------
    // ! banner nav hover
    // ----------------------------------------

    $('.carousel-nav li').hover(
        function(){
            jQuery(this).addClass('hover');
        },
        function(){
            jQuery(this).removeClass('hover');
        }
    ).click(function(e){
        if(jQuery(this).hasClass('active'))
            return;
        else jQuery(this).addClass('active').siblings().removeClass('active');
    });

    // ----------------------------------------
    // ! banner nav animation effect
    // ----------------------------------------
    if(jQuery('#banner').data('nav-animation')){
        $('.carousel-nav li').each(function(i,e) {
            var origin_content = jQuery(e).text();
            var new_content = jQuery('<div>');
            var slide_top = $('<div>').addClass('silde-bar-top').html(origin_content);
            var slide_bottom = $('<div>').addClass('silde-bar-bottom').html(origin_content);
            slide_top.append(slide_bottom);
            // Process the content
            new_content.addClass('slide-bar-wrap').html(slide_top);
            jQuery(e).html(new_content);
        });
    }
    else {

        jQuery('#banner').addClass('nav-ie');

        // ----------------------------------------
        // ! if is ie, calculate the width.
        // ----------------------------------------

        var size = $('.carousel-nav li').size();

        var li_width = parseInt(100/size);
        var last_li_width = 100 - li_width * ( size - 1 );
        $('.carousel-nav li').each(function(i,e){

            if( ( i + 1 ) != size )
                jQuery(e).css({'display':'block'}).css({'width':li_width+'%'});
            else
                jQuery(e).css({'display':'block'}).css({'width':last_li_width+'%'});
        });
    }

    // ----------------------------------------
    // ! popover
    // ----------------------------------------
    jQuery('[href*="tc="]').each(function(index,ele) {
        var _this = jQuery(ele);
        var title = _this.attr('href');
        var remove = /tc=/;
        title = title.replace(remove,'');
        var content = _this.attr('title');

        _this.attr({
            'data-container':"body",
            'data-toggle':"popover",
            'data-placement':'top',
            'data-content':content,
            'data-original-title':title,
            'title':""
        })
        .popover()
        .on('click.preventDefault',function(e){e.preventDefault()})
        .hover(function(){
            jQuery(this).popover('show');
        },function(){
            jQuery(this).popover('hide');
        });
    });

    // ----------------------------------------
    // ! preventDefault
    // ----------------------------------------
    jQuery('a[href=""]').click(function(e) {
        e.preventDefault();
    })

    // ----------------------------------------
    // ! affix
    // ----------------------------------------
    $('nav.nav-wrapper').affix({
        offset: {
            top: 81
        }
    });

    if($('#wpadminbar').size()){
        $('nav.nav-wrapper').addClass('admin-logined');
    }

    // ----------------------------------------
    // ! tel num valid
    // ----------------------------------------
    jQuery('.wpcf7-submit').attr('type','hidden').before('<button class="btn btn-default custom-submit">发送</button>');

    jQuery('.custom-submit').click(function(e){
	    e.preventDefault();

	    var $tel = jQuery(this).closest('.wpcf7').find('[type="tel"]');
        var _validation = $tel.val().match(/^1[3|4|5|8][0-9]\d{8}$/);
        var _alert = '请输入11位手机号';
        var _valid = $tel.siblings('.wpcf7-not-valid-tip');
        _valid.hide();

        if(!_validation) {
            if(_valid.size()){
                _valid.text(_alert).show();
            }
            else
                $tel.after('<span class="wpcf7-not-valid-tip">'+_alert+'</span>');
        }
        else{
            jQuery('.wpcf7-form').submit();
        }
    })

    jQuery('[type="tel"]').focusin(function(e){
	    jQuery(this).siblings('.wpcf7-not-valid-tip').remove();
    })
})