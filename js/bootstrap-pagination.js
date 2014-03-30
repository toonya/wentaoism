/**
 * Project: Bootstrap Pagination Navigator
 * Author: Gareth / toonya studio
 *
 * Dependencies: Bootstrap's Pagination plugin, jQuery
 *
 * A simple plugin to navigator bootstrap mutil-page pagination
 *
 * License: MIT
 */

(function($){

	"use strict";


	$.fn.pagination = function(options) {
		aa();
		return this.each(function(){
			var data = $(this).data();
			var options = $.extend({}, options, data);
			console.log(options);
		})
	}

	var aa = function(){
		console.log('122');
	}

	$.fn.pagination.constructor = aa;

	$('.pagination[data-ride="pagination"]').pagination();

})(jQuery)