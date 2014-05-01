(function($){

	"use strict";

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

		$('.time').on('dp.change', $.proxy(this.refresh,this));

		$('.gmt-select').on('change',$.proxy(this.refresh,this));
		$('.gmt-select').on('change',$.proxy(this.show_time,this));

		//for select
/*
		$(':radio[data-group="draft"]').on('change', $.proxy(this.refresh, this));
		$(':radio[data-group="draft"]').on('change', $.proxy(this.show_time, this));
*/


		$('[data-group="draft"]').on('change', $.proxy(this.refresh, this));
		$('[data-group="draft"]').on('change', $.proxy(this.show_time, this));

		$('.time').trigger('dp.change');

		this.show_time();

	 }

	 _DateTimePicker.prototype = {
		 getGroupTime : function(group) {
			if(!group)
				return;
			if($('[data-group="' + group + '"]').attr('type')=='radio'){
				var $draft = $('[data-group="' + group + '"]:checked');
				var unit = $draft.data('unit');
				var hours = $draft.val();
				if(unit == 'd')
						hours = hours * 24;

				var time = new Date();
				time.setHours(time.getHours()+hours);
			 	time.setHours(time.getHours());

				return time;
			}

			var groupDate = $('[data-group="' + group + '"][data-type="date"] input').val();
			var groupTime = $('[data-group="' + group + '"][data-type="time"] input').val();
			var time = new Date(groupDate + ' ' + groupTime);
			if($('[data-group="draft"]').attr('type')=='radio')
				time.setHours(time.getHours());
			return time;
		},

		show_time : function(){

			 var time = this.getGroupTime('draft');
			 var text = time.getUTCMonth()+1 +"月"+time.getDate()+'日 '+time.getHours()+'时'+time.getMinutes()+'分 ';

			 //console.log(time.getMonth());
			 $('.show-draft-time').text(text);
		},

		refresh : function(e){
			var _final = this.getGroupTime('final'),
				_draft = this.getGroupTime('draft'),
				duration = _final - _draft;

			if( _final && _draft && duration/1000/60/60/24 < 1){

				//$('.time-error').removeClass('hide');
				//console.log(duration/1000/60/60/24)
			}
			if( _final && _draft && duration/1000/60/60/24 >= 1){

				//$('.time-error').addClass('hide');
				//console.log(duration/1000/60/60/24);
			}

			if($(this).data('group')=='draft')
				this.show_time();
		},

		getGMT : function() {
			var GMTIndex =  $('.gmt-select option:selected').index();
			GMTIndex >12 ? GMTIndex = 25 - GMTIndex : GMTIndex = - GMTIndex;

			return GMTIndex;
		},

		getLocalGMT : function() {
			var time = new Date(),
				localGMT = time.getTimezoneOffset()/60;

			return localGMT;
		},

		getGMTHours: function(){
			var hours = this.getLocalGMT() - this.getGMT();

			return hours;
		}
	 }

	 new _DateTimePicker();

})(jQuery)