$(document).ready(function(){
	$('#A').text('狼人杀');
	$('#B').text('三国杀');
	$('#C').text('麻将');
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
	var x = $('#hidden-name-array').text().split(',') //returns array
	var currentFill = x.length;

	var y = $('#hidden-id-array').text().split(',') //returns user ids

	console.log(currentFill);
	$('#current-fill').text(currentFill);

	for (i = 0; i < x.length; i++) {
		$("#participant-list-ul").append(
			"<li class='collection-item'>" + "<a href='user" + y[i] + "'>" + x[i] + "</a>" + "</li>"
			);
	}
	$('.joined').addClass('disabled').text('已报名');

	//delete event logic
	// $('.exitBtn').click(() => {
	// 	$('.exitBtn').parentsUntil('.row').hide();
	// })






})
