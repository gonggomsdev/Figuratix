(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("figuraForm");
        const buscarInput = document.getElementById("buscarFigura");
        const resultados = document.getElementById("autocomplete-results");

        const insertarBtn = document.getElementById("insertarBtn");
        const guardarBtn = document.getElementById("guardarBtn");
        const eliminarBtn = document.getElementById("eliminarBtn");

        const mensajeCont = document.createElement("div");
        mensajeCont.className = "mensaje";
        form.appendChild(mensajeCont);

        // ==================== AUTOCOMPLETE ====================
        if (buscarInput && resultados) {
            buscarInput.addEventListener("input", async () => {
                const term = buscarInput.value.trim();
                resultados.innerHTML = "";
                if (!term) return;

                try {
                    const res = await fetch(`Controllers/Admin1Controller.php?action=autocomplete&term=${encodeURIComponent(term)}`);
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const data = await res.json();
                    if (!Array.isArray(data)) return;

                    data.forEach(f => {
                        const div = document.createElement("div");
                        div.textContent = `${f.id_figura} - ${f.nombre}`;
                        div.style.cursor = "pointer";
                        div.addEventListener("click", () => {
                            form.id_figura.value = f.id_figura;
                            form.nombre.value = f.nombre;
                            form.cantidad.value = f.cantidad_stock ?? "";
                            form.precio.value = f.precio ?? "";
                            form.disponibilidad.value = f.disponibilidad ?? "inventario";
                            form.descripcion.value = f.descripcion ?? "";
                            resultados.innerHTML = "";
                        });
                        resultados.appendChild(div);
                    });
                } catch (err) {
                    console.error("Error autocomplete:", err);
                    resultados.innerHTML = `<div style="color:red;">Error al buscar figuras.</div>`;
                }
            });
        }

        // ==================== INSERTAR ====================
        if (insertarBtn && form) {
            insertarBtn.addEventListener("click", async () => {
                mensajeCont.textContent = "Insertando figura...";
                try {
                    const formData = new FormData(form);
                    formData.append("action", "insertar"); // siempre insert

                    const res = await fetch("Controllers/Admin1Controller.php", { method: "POST", body: formData });
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const data = await res.json();

                    mensajeCont.textContent = data.message || (data.success ? "Figura insertada" : "Error al insertar");
                    if (data.success) form.reset();

                } catch (err) {
                    console.error("Error insertar:", err);
                    mensajeCont.textContent = "Error al insertar figura.";
                }
            });
        }

        // ==================== MODIFICAR ====================
        if (guardarBtn && form) {
            form.addEventListener("submit", async ev => {
                ev.preventDefault();
                if (!form.id_figura.value) {
                    mensajeCont.textContent = "Selecciona una figura para modificar.";
                    return;
                }
                mensajeCont.textContent = "Modificando figura...";
                try {
                    const formData = new FormData(form);
                    formData.append("action", "modificar");

                    const res = await fetch("Controllers/Admin1Controller.php", { method: "POST", body: formData });
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const data = await res.json();

                    mensajeCont.textContent = data.message || (data.success ? "Figura modificada" : "Error al modificar");
                    if (data.success) form.reset();

                } catch (err) {
                    console.error("Error modificar:", err);
                    mensajeCont.textContent = "Error al modificar figura.";
                }
            });
        }

        // ==================== ELIMINAR ====================
        if (eliminarBtn && form) {
            eliminarBtn.addEventListener("click", async () => {
                const id = form.id_figura.value;
                if (!id) {
                    mensajeCont.textContent = "Seleccione una figura primero.";
                    return;
                }
                if (!confirm("¿Seguro que quieres eliminar esta figura?")) return;

                mensajeCont.textContent = "Eliminando...";
                try {
                    const formData = new FormData();
                    formData.append("id_figura", id);
                    formData.append("action", "eliminar");

                    const res = await fetch("Controllers/Admin1Controller.php", { method: "POST", body: formData });
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const data = await res.json();

                    mensajeCont.textContent = data.message || (data.success ? "Figura eliminada" : "Error al eliminar");
                    if (data.success) form.reset();

                } catch (err) {
                    console.error("Error eliminar:", err);
                    mensajeCont.textContent = "Error al eliminar figura.";
                }
            });
        }

    });
})();
