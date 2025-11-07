<?php
header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', '0');
ini_set('log_errors', '1');

require_once('../Db/Con1Db.php');
require_once('../Models/Figura1FigurasModel.php');

try {
    // 🔹 Leer el texto buscado (puede venir por POST o GET)
    $texto = '';
    if (isset($_POST['texto'])) {
        $texto = trim($_POST['texto']);
    } elseif (isset($_GET['texto'])) {
        $texto = trim($_GET['texto']);
    }

    $obj1 = new Datos();
    if ($texto === '') {
        $sql = "SELECT id_figura, nombre, precio, disponibilidad, descripcion, foto
                FROM figuras
                ORDER BY fecha DESC";
        $data = $obj1->getData1($sql);
    } else {
        $like = '%' . $texto . '%';

        $sql = "
            SELECT id_figura, nombre, precio, disponibilidad, descripcion, foto
            FROM figuras
            WHERE 
                nombre LIKE ? 
                OR descripcion LIKE ?
                OR disponibilidad LIKE ?
            ORDER BY fecha DESC
        ";

        $data = $obj1->getData1($sql, "sss", $like, $like, $like);
    }

    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Error interno en la búsqueda.',
        //'debug' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
?>
