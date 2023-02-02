<?php
// Файлы phpmailer
require "phpmailer/PHPMailer.php";
require "phpmailer/SMTP.php";
require "phpmailer/Exception.php";

// Переменные, которые отправляет пользователь
$name = $_POST["name"];
$phone = $_POST["phone"];

// Формирование самого письма
$title = "Заявка с сайта IZMAILOV-DESIGN.RU";
$body = "
<h2>Заполнена форма оформления заказа</h2>
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phone<br><br>
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    // $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS["status"][] = $str;};

    // Настройки вашей почты
    $mail->Host       = "smtp.timeweb.ru"; // SMTP сервера вашей почты
    $mail->Username   = "order@izmailov-design.ru"; // Логин на почте
    $mail->Password   = "u5csHYDn4#@oTL&"; // Пароль на почте
    $mail->SMTPSecure = "ssl";
    $mail->Port       = 465;
    $mail->setFrom("order@izmailov-design.ru", "admin"); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress("pavelstroimdom@yandex.ru");

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";}
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "status" => $status]);
