<footer class="pie1">
    <a href="#">Contacto</a>
    <a href="#">Privacidad</a>
    <a href="#">Figuratix</a>
</footer>
<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (isset($_SESSION['rol']) && $_SESSION['rol'] === 'admin'): ?>
    <a href="admin_panel.php" class="boton-admin-flotante">Panel Admin</a>
<?php endif; ?>