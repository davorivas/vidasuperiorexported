$(document).foundation();


// Promotional Modal

var video = document.getElementById("congress-video");

if(video){

	function playVid() {
    	video.play();
	}
	function pauseVid() {
	    video.pause();
	}
	function showMoreInfo() {
		$('#promotional-modal .flex-video').addClass('hide');	
		pauseVid();
		$('#show-after-video').removeClass('hide');	
	}

	// Listen for Modal Close
	$(document).on('closed.zf.reveal', '[data-reveal]', function () {
		pauseVid();
	});

	setTimeout(function(){
		
		var $modal = $('#promotional-modal');
		$modal.foundation('open');
		playVid();

		setTimeout(function(){
			showMoreInfo();
		}, 43000); //43000

	}, 20000);


}else{
	console.log('not home');
}


$(function() {
    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    $(form).submit(function(event) {
	    // Stop the browser from submitting the form.
	    event.preventDefault();

	    // var formData = $(form).serialize();

	    console.log('$(form)', $(form));
	    

		var name = $('#name').val();
		var email = $('#email').val();
		var country = $('#country').val();
		var number = $('#number').val();
		var message = $('#message').val();
		var security = $('#security').val();

		if(name == "" || email == "" || country == "" || security == ""){
			return false;
		}

		if(security != 3){
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');
			$(formMessages).addClass('callout');
			$(formMessages).text('Si no eres un robot, ingresa la respuesta de la pregunta de seguridad... la respuesta, es: 3');
			return false;
		}


		var formData = {
		    'name': name,
		    'email': email,
		    'country': country,
		    'number': number,
		    'message': message
		};

		console.log('formData', formData);

	    $.ajax({
		    type: 'POST',
		    url: $(form).attr('action'),
		    data: formData
		}).done(function(response) {
		    // Make sure that the formMessages div has the 'success' class.
		    $(formMessages).removeClass('error');
		    $(formMessages).addClass('success');
		    $(formMessages).addClass('callout');

		    // Set the message text.
		    $(formMessages).text(response);

		    // Clear the form.
		    $('#name').val('');
		    $('#email').val('');
		    $('#country').val('');
		    $('#number').val('');
		    $('#message').val('');
		    $('#security').val('');
		}).fail(function(data) {
		    // Make sure that the formMessages div has the 'error' class.
		    $(formMessages).removeClass('success');
		    $(formMessages).addClass('error');
		    $(formMessages).addClass('callout');

		    // Set the message text.
		    if (data.responseText !== '') {
		        $(formMessages).text(data.responseText);
		    } else {
		        $(formMessages).text('Oops! An error occured and your message could not be sent.');
		    }
		});
	});
});



$.getJSON('//www.geoplugin.net/json.gp?jsoncallback=?', function(data) {
	console.log(JSON.stringify(data, null, 2));
});




