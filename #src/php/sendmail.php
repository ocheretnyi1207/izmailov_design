<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'lib/PHPMailer/src/Exception.php';
  require 'lib/PHPMailer/src/PHPMailer.php';
  require 'lib/PHPMailer/src/SMTP.php';

  $body = '</p><strong>Имя</strong> '.$_POST['name'].'</p>';
  $body = '</p><strong>Телефон</strong> '.$_POST['phone'].'</p>';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'lib/PHPMailer/language/directory/');
  $mail->isHTML(true);

  $mail->setFrom('order@izmailov-design.ru');
  $mail->addAddress('anton@ocheretnyi.ru');

  $mail->Subject = 'Данные для обратной связи';
  $mail->Body = $body;

  if ($mail->send()) {
    $message = "Данные отправлены";
  } else {
    $message = "Ошибка";
  }

  $response =['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>
