<?php
if (function_exists('ob_start') && ob_get_level() === 0) { ob_start(); }
ini_set('display_errors', '0');
ini_set('log_errors', '1');
header('Content-Type: application/json; charset=utf-8');

require_once('../Db/Con1Db.php');
require_once('../Models/Figura1FigurasModel.php');

try {
    $datos = new Datos();
    $action = $_GET['action'] ?? $_POST['action'] ?? '';
    $uploadDir = '../Assets/img/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

    function subirArchivo($inputName, $uploadDir) {
        if (isset($_FILES[$inputName]) && $_FILES[$inputName]['error'] === UPLOAD_ERR_OK) {
            $originalName = basename($_FILES[$inputName]['name']);
            $destino = $uploadDir . $originalName;
            $counter = 1;
            while(file_exists($destino)) {
                $ext = pathinfo($originalName, PATHINFO_EXTENSION);
                $base = pathinfo($originalName, PATHINFO_FILENAME);
                $originalName = $base . "_$counter." . $ext;
                $destino = $uploadDir . $originalName;
                $counter++;
            }
            move_uploaded_file($_FILES[$inputName]['tmp_name'], $destino);
            return $originalName;
        }
        return null;
    }

    switch($action) {

        case 'autocomplete':
            $term = $_GET['term'] ?? '';
            $sql = "SELECT id_figura, nombre, cantidad_stock, precio, disponibilidad, descripcion
                    FROM figuras 
                    WHERE nombre LIKE ? OR id_figura LIKE ? 
                    LIMIT 10";
            $results = $datos->getData1($sql, "ss", "%$term%", "%$term%");
            echo json_encode($results, JSON_UNESCAPED_UNICODE);
            break;

        case 'insertar':
        case 'modificar':
            $id = $_POST['id_figura'] ?? 0;
            $nombre = $_POST['nombre'] ?? '';
            $cantidad = $_POST['cantidad'] ?? 0;
            $precio = $_POST['precio'] ?? 0.0;
            $disponibilidad = $_POST['disponibilidad'] ?? 'inventario';
            $descripcion = $_POST['descripcion'] ?? '';

            // Subir fotos exactamente como las subas
            $foto = subirArchivo('foto', $uploadDir);
            $foto_detalle  = subirArchivo('foto_detalle', $uploadDir);
            $foto_detalle2 = subirArchivo('foto_detalle2', $uploadDir);
            $foto_detalle3 = subirArchivo('foto_detalle3', $uploadDir);

            if ($action === 'insertar') {
                $sql = "INSERT INTO figuras (nombre, cantidad_stock, precio, disponibilidad, descripcion, foto, foto_detalle, foto_detalle2, foto_detalle3, fecha)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())";
                $success = $datos->executeQuery($sql, "sidssssss", $nombre, $cantidad, $precio, $disponibilidad, $descripcion, $foto, $foto_detalle, $foto_detalle2, $foto_detalle3);
                echo json_encode(['success'=>$success, 'message'=>$success?'Figura insertada correctamente':'Error al insertar']);
            } else {
                $sql = "UPDATE figuras SET nombre=?, cantidad_stock=?, precio=?, disponibilidad=?, descripcion=?";
                $params = [$nombre, $cantidad, $precio, $disponibilidad, $descripcion];
                $types = "sidss";

                if ($foto) {
                    $sql .= ", foto=?, foto_detalle=?, foto_detalle2=?, foto_detalle3=?";
                    array_push($params, $foto, $foto_detalle, $foto_detalle2, $foto_detalle3);
                    $types .= "ssss";
                }

                $sql .= " WHERE id_figura=?";
                $types .= "i";
                $params[] = $id;

                $success = $datos->executeQuery($sql, $types, ...$params);
                echo json_encode(['success'=>$success, 'message'=>$success?'Figura modificada correctamente':'Error al modificar']);
            }
            break;

        case 'eliminar':
            $id = $_POST['id_figura'] ?? 0;
            $sql = "DELETE FROM figuras WHERE id_figura=?";
            $success = $datos->executeQuery($sql, "i", $id);
            echo json_encode(['success'=>$success, 'message'=>$success?'Figura eliminada':'Error al eliminar']);
            break;

        default:
            echo json_encode(['success'=>false,'message'=>'Acción no reconocida']);
    }

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success'=>false,'message'=>'Error interno','debug'=>$e->getMessage()]);
}
?>
