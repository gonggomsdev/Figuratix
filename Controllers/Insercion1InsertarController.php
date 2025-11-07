<?php

if (function_exists('ob_start') && ob_get_level() === 0) { ob_start(); }
ini_set('display_errors', '0');   // no mostrar errores en la salida
ini_set('log_errors', '1');       // pero sí loguearlos
header('Content-Type: application/json; charset=utf-8');

require_once('../Db/Con1Db.php');
require_once('../Models/Insercion1InsertarModel.php'); // ojo: nombre del archivo

try {
    $mar = isset($_POST['mar_coc']) ? trim($_POST['mar_coc']) : '';
    $mod = isset($_POST['mod_coc']) ? trim($_POST['mod_coc']) : '';
    $aut = isset($_POST['aut_coc']) ? trim($_POST['aut_coc']) : '';

    if ($mar === '' || $mod === '' || $aut === '') {
        throw new Exception('Todos los campos son obligatorios.');
    }

    $obj1 = new Datos();
    $sql1 = "INSERT INTO coches (mar_coc, mod_coc, aut_coc) VALUES (?, ?, ?)";
    $resul = $obj1->InsertarData1($sql1, "sss", $mar, $mod, $aut);

    if (function_exists('ob_get_length') && ob_get_length() > 0) { ob_clean(); }
    echo json_encode([
        'success' => true,
        'message' => 'Coche añadido correctamente',
        'id' => $resul
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al insertar el coche.',
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
?>