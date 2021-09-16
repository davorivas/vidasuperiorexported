<?php

    // Only process POST requests

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);

        $country = strip_tags(trim($_POST["country"]));
        $country = str_replace(array("\r","\n"),array(" "," "),$country);

        $number = strip_tags(trim($_POST["number"]));
        $number = str_replace(array("\r","\n"),array(" "," "),$number);

        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! Ocurri&oacute; un problema con tu mensaje. Por favor completa el formulario nuevamente y vuelve a enviarlo.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "admin@vidasuperior.org, info@vidasuperior.org";

        // Set the email subject.
        $subject = "Nuevo Contacto de  $name";

        // Build the email content.
        $email_content = "Nombre: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Pais: $country\n\n";
        $email_content .= "Telefono: $number\n\n";
        $email_content .= "Mensaje:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Gracias! Tu mensaje ha sido enviado";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Algo sali&oacute; mal y no pudimos enviar tu mensaje.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Hubo un problema con tu env&iacute;o. Intenta Nuevamente";
    }

?>