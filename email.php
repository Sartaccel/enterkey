<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';



if(isset($_POST['submit_form'])){
    
    $firstname = htmlentities($_POST['first_name']);
    $lastname = htmlentities($_POST['last_name']);
    $email = htmlentities($_POST['email']);
    $message = htmlentities($_POST['message']);
    $mobile = htmlentities($_POST['mobile']);


    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'aspinm23@gmail.com';
    $mail->Password = 'hjth xbzq mirw xsfd';
    $mail->Port = 465;
    $mail->SMTPSecure = 'ssl';
    $mail->isHTML(true);
    $mail->setFrom($email, $firstname);
    $mail->addAddress('aspinm23@gmail.com');
    // $mail->Subject = ("$email ($subject)");
    $mail->Subject = "Contact Form Submission from $email";

   $mail->Body = "First Name: $firstname<br>";
    $mail->Body .= "Last Name: $lastname<br>";
    $mail->Body .= "Email: $email<br>";
    $mail->Body .= "Mobile Number: $mobile<br>";
    $mail->Body .= "Message: $message";

    $mail->send();
    header("Location: ./contact-us.html?=email_sent!");
}
?>