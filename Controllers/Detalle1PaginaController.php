<?php
header('Content-Type: application/json; charset=utf-8');
require_once('../Db/Con1Db.php');
require_once('../Models/Figura1FigurasModel.php');

$id = $_POST['id'] ?? $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => true, 'message' => 'ID no especificado']);
    exit;
}

try {
    $obj = new Datos();
    $sql = "SELECT id_figura,nombre, precio, disponibilidad, descripcion,foto,foto_detalle,foto_detalle2,foto_detalle3
            FROM figuras WHERE id_figura = ?";
    $data = $obj->getData1($sql, "i", intval($id));

    // Si existe, devolver la primera fila; si no, un objeto vacío
    echo json_encode($data[0] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Error interno en la carga del detalle.'
    ], JSON_UNESCAPED_UNICODE);
}
