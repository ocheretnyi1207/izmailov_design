<?php
// Файлы phpmailer
require '/lib/phpmailer/PHPMailer.php';
require '/lib/phpmailer/SMTP.php';
require '/lib/phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
// $text = $_POST['text'];
// $file = $_FILES['myfile'];

// Формирование самого письма
$title = "Заявка с сайта";
$body = "
<h2>Кто-то интересуется твоими услугами</h2>
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
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.timeweb.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'order@izmailov-design.ru'; // Логин на почте
    $mail->Password   = 'u5csHYDn4#@oTL&'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('order@izmailov-design.ru', 'Admin'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('anton@ocheretnyi.ru');
    // $mail->addAddress('ocheretnyi.spb@gmail.com'); // Ещё один, если нужен

//     // Прикрипление файлов к письму
// if (!empty($file['name'][0])) {
//     for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
//         $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
//         $filename = $file['name'][$ct];
//         if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
//             $mail->addAttachment($uploadfile, $filename);
//             $rfile[] = "Файл $filename прикреплён";
//         } else {
//             $rfile[] = "Не удалось прикрепить файл $filename";
//         }
//     }
// }
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
