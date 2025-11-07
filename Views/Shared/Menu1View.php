<div class="menu1">
    <div class="menu-logo">
        <a href="index.php">
            <img src="Assets/img/LOGO.png" alt="Logo">
        </a>
    </div>

    <div class="menu-centro">
        <a href="index.php" class="menu-home">
            <img src="Assets/img/casa.png" alt="Inicio">
        </a>

        <form class="menu-busqueda" id="menu-busqueda" action="consulta.php" method="get">
            <img src="Assets/img/lupa.png" alt="Buscar" class="icono-busqueda">
            <input type="text" name="q" id="busquedaMenu" placeholder="Buscar figuras...">
            <div id="resultadosBusqueda" class="resultados-busqueda"></div>
        </form>
    </div>
    <div class="menu-derecha">
        <img id="icono-carrito" src="Assets/img/carrito.png" alt="Carrito" class="icono-carrito">
        <?php session_start(); ?>
        <?php if (isset($_SESSION['usuario'])): ?>
            <div class="usuario-logueado">
                <span class="nombre-usuario"><?php echo htmlspecialchars($_SESSION['usuario']); ?></span>
                <a href="Controllers/Sesion1LogoutController.php" class="btn-sesion">Cerrar Sesión</a>
            </div>
        <?php else: ?>
            <a href="sesion.php" class="btn-sesion">Iniciar Sesión</a>
        <?php endif; ?>
    </div>
</div>
<div id="carrito-panel" class="carrito-panel">
    <div class="carrito-header">
        <h2>Tu Carrito</h2>
        <button id="cerrar-carrito" class="cerrar-carrito">✕</button>
    </div>
    <div id="carrito-items" class="carrito-items">
        <p class="carrito-vacio">Tu carrito está vacío.</p>
    </div>
    <div class="carrito-footer">
        <p>Total: <span id="carrito-total">0€</span></p>
        <button class="btn-finalizar">Finalizar compra</button>
    </div>
</div>
