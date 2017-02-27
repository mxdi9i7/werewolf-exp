$(document).ready(function(){       
	$('#publish-form :input').val('');
	$('#A').text('狼人杀');
	$('#B').text('三国杀');
	$('#C').text('麻将');
	$('#D').text('其他');
	$('.A').text('狼人杀');
	$('.B').text('三国杀');
	$('.C').text('麻将');
	$('.D').text('其他');
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

	//display rsvp Event list logic
	var rsvpList = $('#rsvpList').val().split(',').filter(function(item, i, rsvpList) {
		return i == rsvpList.indexOf(item);
	});
	var newRSVPList = [];
	for (i = 0; i <= rsvpList.length; i ++) {
		if (rsvpList[i] !== 'undefined' && rsvpList[i] !== undefined) {
			newRSVPList.push(rsvpList[i])
		}
	}

	
	
	for (i = 0; i < newRSVPList.length; i ++) {
		$('#rsvpEventList').append(
			"<a href='/event" + newRSVPList[i] + "' class='collection-item'>" + newRSVPList[i] +"</a>"
		)
	}




})
