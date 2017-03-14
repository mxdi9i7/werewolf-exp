$(document).ready(function(){       
	$(".button-collapse").sideNav();
	$('#publish-form :input').val('');
	$('.parallax').parallax();
	$('#A').text('狼人杀');
	$('#B').text('三国杀');
	$('#C').text('麻将');
	$('#D').text('其他');
	$('.A').text('狼人杀');
	$('.B').text('三国杀');
	$('.C').text('麻将');
	$('.D').text('其他');
	$('#male').html('<span> </span><span>小哥哥</span><span> </span><i id="maleIcon" class="fa fa-mars maleIcon" aria-hidden="true"></i>');
	$('#female').html('<span> </span><span>小姐姐</span><span> </span><i id="femaleIcon" class="fa fa-venus femaleIcon" aria-hidden="true"></i>');
	$('#trans').text('第三方阵营');
	$('.carousel.carousel-slider').carousel({fullWidth: true});
	$('.slider').slider();
	$('select').material_select();
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15 // Creates a dropdown of 15 years to control year
	});
	$('#hidden-input').hide();
	if ($('#hidden-input').val() == 'true') {
		console.log('logged in');
		$('#login_btn').hide();
	}
	if ($('#hidden-input').val() == 'false') {
		console.log('not logged in');
		$('#logout_btn').hide();
		$('#nickname_tag').hide();
	}

	//participants list logic
	$('#hidden-name-array').hide();
	$('#event-host-name').hide();
	$('.hidden-join-input').hide();
	$('#hidden-id-array').hide();
	$('.notOwned').hide();

	var x = $('#hidden-name-array').text().split(',') //returns array
	var currentFill = x.length;

	var y = $('#hidden-id-array').text().split(',') //returns user ids

	$('#current-fill').text(currentFill);

	for (i = 0; i < x.length; i++) {
		$("#participant-list-ul").append(
			"<li class='collection-item'>" + "<a href='user" + y[i] + "'>" + x[i] + "</a>" + "</li>"
			);
	}
	$('.joined').addClass('disabled').text('已报名');

	//user page authentication logic
	if ($('.ownership').val() == 'notOwned') {
		$('li.sensitive').find('a.light-blue-text').addClass('grey-text');
		$('li.sensitive').addClass('disabled');
	}

	//determine if screen is smaller the select would be added a default browser style
	if ($(window).width() < 1350) {
		$('input.select-dropdown').hide();
		$('.select-wrapper span.caret').hide();
		$('select.initialized').addClass('browser-default');
	}
		
	





})
