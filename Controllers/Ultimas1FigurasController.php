<?php
header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', '0');
ini_set('log_errors', '1');

require_once('../Db/Con1Db.php');
require_once('../Models/Figura1FigurasModel.php');

try {
    $obj1 = new Datos();

    $sql1 = "
    SELECT id_figura,nombre, cantidad_stock, precio, disponibilidad, descripcion, foto, fecha
    FROM figuras
    ORDER BY fecha DESC
";

    $data1 = $obj1->getData1($sql1);

    echo json_encode($data1, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Error interno en la búsqueda.',
        'debug' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
?>
