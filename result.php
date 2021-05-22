<?php
$res = $_POST['final'];
$fileName = $_GET['file'];
$file = fopen($fileName, "w");
fwrite($file, '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>');
fwrite($file, $res);
fwrite($file, '<script src="jquery-3.4.1.js"></script>
<script src="https://kit.fontawesome.com/a24ff9630f.js" crossorigin="anonymous"></script>
<body>
</html>');
fclose($file);
?>