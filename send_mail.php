<?php



//end user details to owner
$name = $_POST['name'];
$name = trim($name);

$email = $_POST['email'];
$email = trim($email);
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

$subject = $_POST['subject'];
$subject = trim($subject);

$phone = $_POST['phone'];
$phone = trim($phone);

$to = "careers@careercatalys.com";


$subject = "Client Intake Form";

$headers = "From: " . $email;


$msg = "
Name: $name
Email: $email
Target industry or Job Title: $subject
Phone optional: $phone

";

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => ' Please write email in correct format...']);
} elseif (mail($to, $subject, $msg, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Form has been submitted successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => ' email cant be sent.']);
}
