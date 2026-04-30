/**
 * Script del Portal de Capacitación ONESVIE
 * Funcionalidades: menú móvil, validación de formularios, scroll suave
 */

document.addEventListener('DOMContentLoaded', function() {

  // ============================
  // Menú móvil
  // ============================
  const btnMenu = document.getElementById('btnMenuMovil');
  const navPrincipal = document.getElementById('navPrincipal');

  if (btnMenu && navPrincipal) {
    btnMenu.addEventListener('click', function() {
      const estaActivo = navPrincipal.classList.toggle('activo');
      btnMenu.setAttribute('aria-expanded', estaActivo);
      btnMenu.innerHTML = estaActivo ? '&#10005;' : '&#9776;';
    });

    // Cerrar menú al hacer clic en un enlace
    const enlacesNav = navPrincipal.querySelectorAll('a');
    enlacesNav.forEach(function(enlace) {
      enlace.addEventListener('click', function() {
        navPrincipal.classList.remove('activo');
        btnMenu.setAttribute('aria-expanded', 'false');
        btnMenu.innerHTML = '&#9776;';
      });
    });

    // Cerrar menú al redimensionar la ventana
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navPrincipal.classList.remove('activo');
        btnMenu.setAttribute('aria-expanded', 'false');
        btnMenu.innerHTML = '&#9776;';
      }
    });
  }

  // ============================
  // Formulario de inscripción
  // ============================
  const formInscripcion = document.getElementById('formInscripcion');

  if (formInscripcion) {
    formInscripcion.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const cedula = document.getElementById('cedula').value.trim();
      const email = document.getElementById('email').value.trim();
      const programa = document.getElementById('programa').value;
      const profesion = document.getElementById('profesion').value.trim();

      if (!nombre || !cedula || !email || !programa || !profesion) {
        mostrarAlerta('Por favor, complete todos los campos obligatorios.', 'error');
        return;
      }

      if (!validarCedula(cedula)) {
        mostrarAlerta('El formato de la cédula no es válido. Use el formato: 000-0000000-0', 'error');
        return;
      }

      if (!validarEmail(email)) {
        mostrarAlerta('El correo electrónico ingresado no es válido.', 'error');
        return;
      }

      mostrarAlerta('Su preinscripción ha sido recibida exitosamente. Recibirá una confirmación en su correo electrónico en un plazo de 10 días hábiles.', 'exito');
      formInscripcion.reset();
    });
  }

  // ============================
  // Formulario de contacto
  // ============================
  const formContacto = document.getElementById('formContacto');

  if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre-contacto').value.trim();
      const email = document.getElementById('email-contacto').value.trim();
      const asunto = document.getElementById('asunto').value.trim();
      const mensaje = document.getElementById('mensaje-contacto').value.trim();

      if (!nombre || !email || !asunto || !mensaje) {
        mostrarAlerta('Por favor, complete todos los campos.', 'error');
        return;
      }

      if (!validarEmail(email)) {
        mostrarAlerta('El correo electrónico ingresado no es válido.', 'error');
        return;
      }

      mostrarAlerta('Su mensaje ha sido enviado. Nuestro equipo le responderá a la brevedad posible.', 'exito');
      formContacto.reset();
    });
  }

  // ============================
  // Scroll suave para enlaces internos
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(function(ancla) {
    ancla.addEventListener('click', function(e) {
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        e.preventDefault();
        destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================
  // Funciones auxiliares
  // ============================

  function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validarCedula(cedula) {
    var regex = /^\d{3}-\d{7}-\d{1}$/;
    return regex.test(cedula);
  }

  function mostrarAlerta(mensaje, tipo) {
    var alertaExistente = document.querySelector('.alerta-dinamica');
    if (alertaExistente) {
      alertaExistente.remove();
    }

    var alerta = document.createElement('div');
    alerta.className = 'alerta-dinamica alerta-' + tipo;
    alerta.setAttribute('role', 'alert');
    alerta.textContent = mensaje;

    var estilosBase = {
      padding: '16px 20px',
      borderRadius: '4px',
      marginBottom: '20px',
      fontSize: '0.95rem',
      lineHeight: '1.5',
      fontWeight: '600'
    };

    if (tipo === 'exito') {
      estilosBase.backgroundColor = '#D4EDDA';
      estilosBase.color = '#155724';
      estilosBase.border = '1px solid #C3E6CB';
    } else {
      estilosBase.backgroundColor = '#F8D7DA';
      estilosBase.color = '#721C24';
      estilosBase.border = '1px solid #F5C6CB';
    }

    Object.assign(alerta.style, estilosBase);

    var form = document.getElementById('formInscripcion') || document.getElementById('formContacto');
    if (form) {
      form.parentNode.insertBefore(alerta, form);
    }

    setTimeout(function() {
      alerta.remove();
    }, 8000);
  }

});
