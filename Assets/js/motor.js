// Archivo principal: gestión de figuras, búsqueda, login y carrito
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        // --- Elementos del DOM ---
        const formBusqueda = document.getElementById("menu-busqueda");
        const inputBusqueda = document.getElementById("busquedaMenu");
        const contenedor2 = document.getElementById("contenedor2");
        const resultadosDiv = document.getElementById("resultadosBusqueda");

        const contenedorF = document.getElementById("contenedorF");
        const contenedorUltimasFiguras = document.getElementById("contenedorUltimasFiguras");
        const contenedorPreorders = document.getElementById("contenedorPreorders");

        // --- LOGIN ---
        const form = document.getElementById("formSesion1");
        const usuario = document.getElementById("usuario");
        const contrasena = document.getElementById("contrasena");

        // --- BUSQUEDA ---
        const contenedorBusqueda = document.getElementById("contenedorResultadosBusqueda");
        const iconoBusqueda = document.querySelector(".icono-busqueda");

        // --- Envío rápido desde el icono ---
        if (iconoBusqueda && formBusqueda) {
            iconoBusqueda.addEventListener("click", (e) => {
                e.preventDefault();
                formBusqueda.requestSubmit();
            });
        }

        // --- Buscador en el menú ---
        if (inputBusqueda && resultadosDiv) {
            inputBusqueda.addEventListener("input", async () => {
                const texto = inputBusqueda.value.trim();

                if (texto.length < 2) {
                    resultadosDiv.innerHTML = "";
                    resultadosDiv.style.display = "none";
                    return;
                }

                try {
                    const body = new URLSearchParams();
                    body.set("texto", texto);

                    const resp = await fetch("Controllers/Figuras1BuscarController.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: body.toString(),
                        cache: "no-store",
                    });

                    if (!resp.ok) throw new Error("HTTP " + resp.status);
                    const figuras = await resp.json();

                    mostrarResultados(figuras);
                } catch (err) {
                    console.error(err);
                    resultadosDiv.innerHTML = "<p>Error en la búsqueda.</p>";
                    resultadosDiv.style.display = "block";
                }
            });
        }

        // --- Muestra los resultados en el menú ---
        function mostrarResultados(figuras) {
            if (!figuras || figuras.length === 0) {
                resultadosDiv.innerHTML = "<p class='no-resultados'>No se encontraron resultados.</p>";
                resultadosDiv.style.display = "block";
                return;
            }

            resultadosDiv.innerHTML = figuras
                .map(
                    (fig) => `
          <div class="resultado-item" onclick="window.location.href='detalle.php?id=${fig.id_figura}'">
            <img src="Assets/img/${fig.foto || "no-image.png"}" alt="${fig.nombre}">
            <div class="info">
              <p class="nombre">${fig.nombre}</p>
              <p class="precio">${fig.precio} €</p>
              <p class="disponibilidad">${fig.disponibilidad.toUpperCase()}</p>
            </div>
          </div>`
                )
                .join("");

            resultadosDiv.style.display = "block";
        }

        // --- Inicio de sesión ---
        if (form && usuario && contrasena) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const body = new URLSearchParams();
                body.set("textoSesion1", usuario.value.trim());
                body.set("textoSesion2", contrasena.value.trim());

                try {
                    const resp = await fetch("Controllers/Sesion1IniciarController.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: body.toString(),
                    });

                    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

                    const json = await resp.json();

                    if (json.success) {
                        window.location.href = "index.php";
                    } else {
                        alert(json.message);
                    }
                } catch (err) {
                    console.error(err);
                    alert("Error al iniciar sesión.");
                }
            });
        }

        // --- Carga de figuras ---
        async function cargarFigurasGenericas(url, contenedor, mensajeCarga = "Cargando figuras...", params = {}) {
            if (!contenedor) return;

            contenedor.innerHTML = mensajeCarga;

            try {
                let fetchOptions = { method: "GET", cache: "no-store" };
                let finalUrl = url;

                if (params && Object.keys(params).length > 0) {
                    const body = new URLSearchParams(params);
                    fetchOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
                        body: body.toString(),
                        cache: "no-store",
                    };
                }

                const resp = await fetch(finalUrl, fetchOptions);
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const json = await resp.json();

                renderFiguras(contenedor, json);
            } catch (err) {
                contenedor.innerHTML = "Error al cargar figuras.";
                console.error(err);
            }
        }

        // --- Renderizado de figuras ---
        function renderFiguras(cont, figuras) {
            cont.innerHTML = "";

            if (!figuras || figuras.length === 0) {
                cont.innerHTML = "<p>No hay figuras registradas.</p>";
                return;
            }

            const grid = document.createElement("div");
            grid.className = "figuras-grid";

            for (const fig of figuras) {
                const card = document.createElement("div");
                card.className = "figura-card mano";
                card.innerHTML = `
          <img src="Assets/img/${fig.foto || "no-image.png"}" alt="${fig.nombre}">
          <h3>${fig.nombre}</h3>
          <p class="precio">${fig.precio} €</p>
          <p class="disponibilidad">${fig.disponibilidad}</p>
        `;
                card.addEventListener("click", () => {
                    window.location.href = `detalle.php?id=${fig.id_figura}`;
                });
                grid.appendChild(card);
            }

            cont.appendChild(grid);
        }

        // --- Cargar detalle de figura ---
        async function cargarDetalle(id) {
            const cont = document.getElementById("contenedorDetalle");
            cont.innerHTML = "Cargando detalle...";

            try {
                const resp = await fetch("Controllers/Detalle1PaginaController.php?id=" + id);
                const fig = await resp.json();

                if (!fig || fig.error) {
                    cont.innerHTML = "No se encontró la figura.";
                    return;
                }

                cont.innerHTML = `
          <div class="detalle-figura">
            <div class="detalle-grid">
              <div class="detalle-info">
                <a href="index.php" class="btn-volver2"><img src="Assets/img/flecha.png" class="flecha"></a>
                <h1>${fig.nombre}</h1>
                <p class="precio">${fig.precio} €</p>
                <p class="disponibilidad">${fig.disponibilidad}</p>
                <p class="descripcion">${fig.descripcion || ""}</p>
                <p class="btn-add-carrito" data-id="${fig.id_figura}">Añadir al carrito</p>
              </div>
              <div class="detalle-imagenes">
                <div class="detalle-carousel-container">
                  <button class="detalle-prev">&#10094;</button>
                  <div class="detalle-carousel-images">
                    <img src="Assets/img/${fig.foto_detalle || "no-image.png"}" alt="${fig.nombre}">
                    <img src="Assets/img/${fig.foto_detalle2 || "no-image.png"}" alt="${fig.nombre}">
                    <img src="Assets/img/${fig.foto_detalle3 || "no-image.png"}" alt="${fig.nombre}">
                  </div>
                  <button class="detalle-next">&#10095;</button>
                </div>
              </div>
            </div>
          </div>`;
                window.figuraActual = fig;
                initDetalleCarousel();
            } catch (err) {
                cont.innerHTML = "Error al cargar el detalle.";
                console.error(err);
            }
        }

        // --- Carga inicial de secciones ---
        if (contenedorF) {
            cargarFigurasGenericas("Controllers/Figura1FigurasController.php", contenedorF, "Cargando figuras...");
        }
        if (contenedorUltimasFiguras) {
            cargarFigurasGenericas("Controllers/Ultimas1FigurasController.php", contenedorUltimasFiguras, "Cargando últimas figuras...");
        }
        if (contenedorPreorders) {
            cargarFigurasGenericas("Controllers/Preorder1FigurasController.php", contenedorPreorders, "Cargando preorders...");
        }

        // --- Cargar detalle si hay ID ---
        if (document.getElementById("contenedorDetalle")) {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (id) cargarDetalle(id);
        }

        // --- Carrusel principal ---
        const prev = document.querySelector(".prev");
        const next = document.querySelector(".next");
        const imagesContainer = document.querySelector(".carousel-images");
        const images = document.querySelectorAll(".carousel-images img");

        let index = 0;
        let isAnimating = false;

        if (prev && next && imagesContainer && images.length > 0) {
            prev.addEventListener("click", () => {
                index = (index - 1 + images.length) % images.length;
                showImage(index);
            });

            next.addEventListener("click", () => {
                index = (index + 1) % images.length;
                showImage(index);
            });

            setInterval(() => {
                index = (index + 1) % images.length;
                showImage(index);
            }, 5000);
        }

        function showImage(i) {
            if (!imagesContainer || images.length === 0 || isAnimating) return;
            isAnimating = true;
            const width = images[0].clientWidth;
            imagesContainer.style.transform = `translateX(${-width * i}px)`;
            setTimeout(() => (isAnimating = false), 500);
        }

        // --- Carrusel del detalle ---
        function initDetalleCarousel() {
            const carouselContainer = document.querySelector(".detalle-carousel-container");
            if (!carouselContainer) return;

            const imagesContainer = carouselContainer.querySelector(".detalle-carousel-images");
            const images = imagesContainer.querySelectorAll("img");
            const prev = carouselContainer.querySelector(".detalle-prev");
            const next = carouselContainer.querySelector(".detalle-next");
            let index = 0;

            const showImage = (i) => {
                imagesContainer.style.transform = `translateX(${-i * 100}%)`;
            };

            prev.addEventListener("click", () => {
                index = (index - 1 + images.length) % images.length;
                showImage(index);
            });

            next.addEventListener("click", () => {
                index = (index + 1) % images.length;
                showImage(index);
            });
        }

        // --- Página de resultados de búsqueda ---
        if (contenedorBusqueda) {
            const params = new URLSearchParams(window.location.search);
            const q = params.get("q")?.trim() || "";
            const textoBusqueda = document.getElementById("textoBusqueda");
            if (textoBusqueda) textoBusqueda.textContent = q;

            if (!q) {
                contenedorBusqueda.innerHTML = "<p style='text-align:center;'>No se especificó una búsqueda.</p>";
                return;
            }

            contenedorBusqueda.innerHTML = "<p style='text-align:center;'>Cargando resultados...</p>";

            (async () => {
                try {
                    const resp = await fetch(`Controllers/Figuras1BuscarController.php?texto=${encodeURIComponent(q)}`);
                    if (!resp.ok) throw new Error("HTTP " + resp.status);
                    const figuras = await resp.json();

                    if (!Array.isArray(figuras) || figuras.length === 0) {
                        contenedorBusqueda.innerHTML = `
              <div class="mensaje-aventura">
                <p>✨ Esa figura debe estar en otra aventura... 🧭<br>¡Sigue explorando el mundo de Figuratix!</p>
                <a href="index.php" class="btn-volver">Volver al catálogo</a>
              </div>`;
                        return;
                    }

                    const grid = document.createElement("div");
                    grid.className = "figuras-grid";

                    figuras.forEach((fig) => {
                        const card = document.createElement("div");
                        card.className = "figura-card mano";
                        card.innerHTML = `
              <img src="Assets/img/${fig.foto || "no-image.png"}" alt="${fig.nombre}">
              <h3>${fig.nombre}</h3>
              <p class="precio">${fig.precio} €</p>
              <p class="disponibilidad">${fig.disponibilidad.toUpperCase()}</p>
            `;
                        card.addEventListener("click", () => {
                            window.location.href = "detalle.php?id=" + fig.id_figura;
                        });
                        grid.appendChild(card);
                    });

                    contenedorBusqueda.innerHTML = "";
                    contenedorBusqueda.appendChild(grid);
                } catch (err) {
                    contenedorBusqueda.innerHTML = "<p style='text-align:center;'>Error al cargar los resultados.</p>";
                    console.error(err);
                }
            })();
        }

        // --- Efecto de reducción del menú al hacer scroll ---
        window.addEventListener("scroll", () => {
            const menu = document.querySelector(".menu1");
            if (window.scrollY > 50) {
                menu.classList.add("shrink");
            } else {
                menu.classList.remove("shrink");
            }
        });

        // --- Carrito de compras ---
        const iconoCarrito = document.getElementById("icono-carrito");
        const carritoPanel = document.getElementById("carrito-panel");
        const cerrarCarrito = document.getElementById("cerrar-carrito");
        const carritoItems = document.getElementById("carrito-items");
        const carritoTotal = document.getElementById("carrito-total");

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Abrir carrito
        iconoCarrito.addEventListener("click", () => {
            carritoPanel.classList.add("abierto");
            actualizarCarrito();
        });

        // Cerrar carrito
        cerrarCarrito.addEventListener("click", () => {
            carritoPanel.classList.remove("abierto");
        });

        // Añadir productos al carrito
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-add-carrito")) {
                const btn = e.target;
                const id = btn.dataset.id;

                let fig = window.figuras?.find((f) => f.id_figura == id);
                if (!fig && window.figuraActual?.id_figura == id) fig = window.figuraActual;

                if (!fig) {
                    console.warn("Figura no encontrada en memoria para id:", id);
                    return;
                }

                const nombre = fig.nombre || "Desconocido";
                const precio = parseFloat(fig.precio) || 0;
                const imagen = "Assets/img/" + (fig.foto || "no-image.png");

                const existente = carrito.find((item) => item.id === id);
                if (existente) {
                    existente.cantidad++;
                } else {
                    carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();

                btn.textContent = "✔ Añadido";
                setTimeout(() => (btn.textContent = "Añadir al carrito"), 1000);
            }
        });

        // Actualizar contenido del carrito
        function actualizarCarrito() {
            carritoItems.innerHTML = "";

            if (carrito.length === 0) {
                carritoItems.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío.</p>`;
                carritoTotal.textContent = "0€";
                return;
            }

            let total = 0;
            carrito.forEach((item) => {
                total += item.precio * item.cantidad;

                const div = document.createElement("div");
                div.classList.add("carrito-item");
                div.innerHTML = `
          <img src="${item.imagen}" alt="${item.nombre}">
          <div class="carrito-info">
            <p class="nombre">${item.nombre}</p>
            <p class="precio">${item.precio} €</p>
          </div>
          <div class="carrito-controles">
            <button class="btn-cantidad menos">−</button>
            <span class="cantidad">${item.cantidad}</span>
            <button class="btn-cantidad mas">+</button>
          </div>
          <button class="eliminar-item">🗑️</button>
        `;
                carritoItems.appendChild(div);

                div.querySelector(".eliminar-item").addEventListener("click", () => {
                    carrito = carrito.filter((i) => i.id !== item.id);
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    actualizarCarrito();
                });

                div.querySelector(".mas").addEventListener("click", () => {
                    item.cantidad++;
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    actualizarCarrito();
                });

                div.querySelector(".menos").addEventListener("click", () => {
                    if (item.cantidad > 1) {
                        item.cantidad--;
                    } else {
                        carrito = carrito.filter((i) => i.id !== item.id);
                    }
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    actualizarCarrito();
                });
            });

            carritoTotal.textContent = total.toFixed(2) + "€";
        }

        actualizarCarrito();

        // --- Registro de nuevo usuario ---
        const registroForm = document.getElementById("formRegistro");
        if (!registroForm) return;

        registroForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inputUsuario = document.getElementById("nuevoUsuario").value.trim();
            const inputEmail = document.getElementById("nuevoEmail").value.trim();
            const inputContrasena = document.getElementById("nuevaContrasena").value.trim();

            if (!inputUsuario || !inputEmail || !inputContrasena) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            const body = new URLSearchParams();
            body.append("usuario", inputUsuario);
            body.append("email", inputEmail);
            body.append("contrasena", inputContrasena);

            try {
                const resp = await fetch("Controllers/Sesion1RegistrarController.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: body.toString(),
                });

                const data = await resp.json();

                if (data.success) {
                    alert("✅ Registro completado. Ahora puedes iniciar sesión.");
                    window.location.href = "sesion.php";
                } else {
                    alert("⚠️ " + (data.message || "Error al registrar usuario."));
                }
            } catch (err) {
                console.error(err);
                alert("❌ Error al conectar con el servidor.");
            }
        });
    });
})();
