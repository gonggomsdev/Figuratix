<?php
header('Content-Type: application/json; charset=utf-8');
require_once('../Db/Con1Db.php');

try {
    $usuario = trim($_POST['usuario'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $contrasena = trim($_POST['contrasena'] ?? '');

    if (!$usuario || !$email || !$contrasena) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
        exit;
    }

    $conn = Conex1::con1();

    // Comprobar si usuario o email ya existen
    $stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE usuario = ? OR email = ?");
    $stmt->bind_param("ss", $usuario, $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'El usuario o correo ya existe.']);
        exit;
    }
    $stmt->close();

    // Hashear contraseña
    $hash = password_hash($contrasena, PASSWORD_BCRYPT);
    $fecha = date('Y-m-d H:i:s');

    $stmt = $conn->prepare("INSERT INTO usuarios (usuario, contrasena, rol, email, fecha_registro) VALUES (?, ?, 'cliente', ?, ?)");
    $stmt->bind_param("ssss", $usuario, $hash, $email, $fecha);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se pudo registrar el usuario.']);
    }

    $stmt->close();
    $conn->close();

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error interno del servidor', 'debug' => $e->getMessage()]);
}
?>