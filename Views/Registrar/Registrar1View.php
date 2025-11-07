<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (isset($_SESSION['usuario'])) {
    header('Location: index.php');
    exit;
}
?>
<div class="online">
    <p>Registrarse</p>
</div>

<div id="contenedor0" class="contenedor0">
    <div id="contenedor1" class="contenedor1">
        <form id="formRegistro" class="bloque1" method="POST">
            <img src="Assets/img/LOGO.png" alt="Logo">

            <input type="text" id="nuevoUsuario" name="usuario" required class="campo1" placeholder="Nombre de usuario">

            <input type="email" id="nuevoEmail" name="email" required class="campo1" placeholder="Correo electrónico">

            <input type="password" id="nuevaContrasena" name="contrasena" required class="campo1" placeholder="Contraseña">

            <input type="submit" value="Registrarse" class="boton1">

            <p id="registrar">
                <a href="sesion.php" class="link-registrar">¿Ya tienes cuenta? Inicia sesión aquí</a>
            </p>
        </form>
    </div>
    <div id="contenedor2" class="contenedor2"></div>
</div>
