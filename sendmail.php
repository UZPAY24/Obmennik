<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

$mail->setFrom('novoselov71237@gmail.com', 'Обменник');
$mail->addAddress($_POST['userEmail']);
$mail->Subject = 'Обмен биткоин';

    $body = '<h1>Заявка №' .$_POST['id'] .'</h1>';
    $body .= '<p>Кошелек получателя: '.$_POST['walletUser'] .'</p>';
    $body .= '<p>Со счета: '.$_POST['fromAccount'] .'</p>';
    $body .= '<p>Сумма: '.$_POST['transferAmount'] .'</p>';
    $body .= '<p>Кошелек: '.$_POST['purse'] .'</p>';
    $body .= '<p>Выполните перевод на: '.$_POST['score'] .'</p>';

$mail->Body = $body;

if(!$mail->send()){
    $message = 'Ошибка';
}else{
    $message = 'Данные отправленны';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
    

