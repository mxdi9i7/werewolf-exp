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


})
