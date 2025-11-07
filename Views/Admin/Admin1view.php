<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if(!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    header("Location: login.php");
    exit;
}
?>

<div class="contenedor0">
    <div class="contenedor1">

        <!-- Contenedor búsqueda -->
        <div class="contenedor3">
            <input type="text" id="buscarFigura" placeholder="Buscar por nombre o ID">
            <div id="autocomplete-results"></div>
        </div>

        <!-- Contenedor formulario -->
        <div class="contenedor4">
            <form id="figuraForm" enctype="multipart/form-data">
                <input type="hidden" name="id_figura" id="id_figura">

                <input type="text" name="nombre" placeholder="Nombre" required>
                <input type="number" name="cantidad" placeholder="Cantidad" required>
                <input type="number" step="0.01" name="precio" placeholder="Precio" required>
                <select name="disponibilidad">
                    <option value="inventario">Inventario</option>
                    <option value="preorder">Preorder</option>
                    <option value="fuera">Fuera</option>
                </select>
                <textarea name="descripcion" placeholder="Descripción"></textarea>

                <!-- Inputs para fotos -->
                <label>Foto principal:</label>
                <input type="file" name="foto" accept="image/*">
                <label>Foto detalle 1:</label>
                <input type="file" name="foto_detalle" accept="image/*">
                <label>Foto detalle 2:</label>
                <input type="file" name="foto_detalle2" accept="image/*">
                <label>Foto detalle 3:</label>
                <input type="file" name="foto_detalle3" accept="image/*">

                <div style="display:flex; gap:10px; margin-top:10px;">
                    <button type="button" id="insertarBtn">Insertar</button>
                    <button type="submit" id="guardarBtn">Guardar</button>
                    <button type="button" id="eliminarBtn">Eliminar</button>
                </div>
            </form>
        </div>

    </div>
</div>
