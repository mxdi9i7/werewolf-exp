$(document).ready(function(){       
	$(".button-collapse").sideNav();
	$('#publish-form :input').val('');
	$('.parallax').parallax();
	$('.tooltipped').tooltip({delay: 50});
	$('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 800, // Transition in duration
      outDuration: 600, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      //   alert("Ready");
      //   console.log(modal, trigger);
      // },
      // complete: function() { alert('Closed'); } // Callback for Modal close
    }
  );
	$('#createGame').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 200, // Transition in duration
      outDuration: 300, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      //   alert("Ready");
      //   console.log(modal, trigger);
      // },
      // complete: function() { alert('Closed'); } // Callback for Modal close
    }
  );
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

	$('.is_own').show();
	$('.is_not_own').hide();
	//change gender text to chinese
		$('.male').html('<span>小哥哥</span><span> </span><i id="maleIcon" class="fa fa-mars maleIcon" aria-hidden="true"></i>');
		$('.female').html('<span>小姐姐</span><span> </span><i id="femaleIcon" class="fa fa-venus femaleIcon" aria-hidden="true"></i>');
		$('.trans').text('第三方阵营');

	//game change data authorizing

	if ($('#is_host').val() == 'is_not_authorized') {
		$('.trigger-record').hide()
		$('.trigger-gamer').hide()
	}
	
})
	





