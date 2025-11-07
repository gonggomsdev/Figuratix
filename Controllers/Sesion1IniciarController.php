<?php
header('Content-Type: application/json; charset=utf-8');
require_once('../Db/Con1Db.php');
require_once('../Models/Figura1FigurasModel.php');

try {
    $obj1 = new Datos();

    $usuario = $_POST['textoSesion1'] ?? '';
    $password = $_POST['textoSesion2'] ?? '';

    if (empty($usuario) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos']);
        exit;
    }
    $sql = "SELECT id_usuario, usuario, rol, contrasena FROM usuarios WHERE usuario = ?";
    $result = $obj1->getData1($sql, "s", $usuario);

    if (count($result) > 0 && password_verify($password, $result[0]['contrasena'])) {
        session_start();
        $_SESSION['usuario'] = $result[0]['usuario'];
        $_SESSION['id_usuario'] = $result[0]['id_usuario'];
        $_SESSION['rol'] = $result[0]['rol'];

        echo json_encode([
            'success' => true,
            'message' => 'Sesión iniciada',
            'rol' => $result[0]['rol']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos']);
    }

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error interno al iniciar sesión.',
        'debug' => $e->getMessage()
    ]);
}
?>
