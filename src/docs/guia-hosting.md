# Guía de Implementación en Hosting

## Portal de Capacitación ONESVIE

Esta guía detalla los pasos para implementar el portal tanto en su versión estática (HTML/CSS/JS) como en WordPress, en un servidor de hosting.

---

## 1. Implementación Estática (HTML/CSS/JS)

### 1.1 Requisitos del Servidor

- **Tipo**: Cualquier servidor web (Apache, Nginx, IIS).
- **SSL**: Certificado SSL obligatorio (HTTPS).
- **Almacenamiento**: Mínimo 1 GB (el portal estático pesa menos de 5 MB).
- **Ancho de banda**: Según tráfico estimado (5 GB/mes suficiente para inicio).

### 1.2 Configuración del Subdominio

#### Opción A: Panel cPanel

1. Acceder a **cPanel** del dominio `onesvie.gob.do`.
2. Ir a **Subdominios**.
3. Crear subdominio: `capacitacion`.
4. Directorio raíz: `public_html/capacitacion`.
5. El subdominio estará disponible en `https://capacitacion.onesvie.gob.do`.

#### Opción B: Configuración DNS Manual

1. Agregar registro DNS tipo **A** o **CNAME**:
   - **Nombre**: `capacitacion.onesvie.gob.do`
   - **Valor**: IP del servidor o alias del dominio principal.
2. Configurar el virtual host en Apache/Nginx para apuntar al directorio del portal.

### 1.3 Subida de Archivos

#### Vía FTP/SFTP (FileZilla recomendado)

1. Conectar al servidor con las credenciales FTP.
2. Navegar al directorio raíz del subdominio (`public_html/capacitacion`).
3. Subir todos los archivos del proyecto:

```
capacitacion/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── img/
│   ├── logo-onesvie.png
│   └── favicon.ico
├── pages/
│   ├── sobre-iniciativa.html
│   ├── oferta-academica.html
│   ├── inscripcion.html
│   ├── noticias.html
│   └── contacto.html
└── docs/
    ├── guia-wordpress.md
    └── guia-hosting.md
```

#### Vía cPanel File Manager

1. Acceder a **Administrador de Archivos** en cPanel.
2. Navegar al directorio del subdominio.
3. Usar la función **Cargar** para subir un archivo ZIP con todo el proyecto.
4. Extraer el archivo ZIP en el servidor.

### 1.4 Configuración de SSL

1. En cPanel, ir a **SSL/TLS Status**.
2. Verificar que el subdominio `capacitacion.onesvie.gob.do` tenga un certificado activo.
3. Si no tiene, ejecutar **AutoSSL** o solicitar un certificado Let's Encrypt.
4. Forzar HTTPS mediante `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 1.5 Verificación

1. Acceder a `https://capacitacion.onesvie.gob.do`.
2. Verificar que todas las páginas carguen correctamente.
3. Verificar que los enlaces entre páginas funcionen.
4. Verificar la versión móvil (responsive).
5. Verificar que HTTPS esté activo (candado verde).

---

## 2. Implementación WordPress

### 2.1 Requisitos del Servidor

- **PHP**: Versión 8.0 o superior.
- **MySQL/MariaDB**: Versión 5.7+ o 10.3+.
- **Almacenamiento**: Mínimo 5 GB.
- **Memoria PHP**: Mínimo 256 MB.
- **SSL**: Obligatorio.

### 2.2 Instalación de WordPress

#### Vía cPanel (Softaculous)

1. Acceder a **cPanel** > **Softaculous Apps Installer**.
2. Seleccionar **WordPress**.
3. Configurar:
   - **Dominio**: `capacitacion.onesvie.gob.do`.
   - **Directorio de instalación**: Dejar vacío (instalar en raíz).
   - **Título del sitio**: Portal de Capacitación - ONESVIE.
   - **Usuario administrador**: Crear usuario seguro.
   - **Contraseña**: Generar contraseña fuerte.
   - **Correo**: `capacitacion@onesvie.gob.do`.
4. Hacer clic en **Instalar**.

#### Instalación Manual

1. Descargar WordPress desde `wordpress.org`.
2. Subir archivos al directorio del subdominio vía FTP.
3. Crear base de datos en cPanel > **MySQL Databases**.
4. Acceder a `https://capacitacion.onesvie.gob.do` y seguir el asistente de instalación.

### 2.3 Configuración Post-Instalación

1. **Idioma**: Configurar español como idioma por defecto.
2. **Enlaces permanentes**: **Ajustes** > **Enlaces permanentes** > **Nombre de la entrada** (`/%postname%/`).
3. **Zona horaria**: **Ajustes** > **Generales** > **America/Santo_Domingo**.
4. **Visibilidad en buscadores**: Desmarcar "Disuadir a los motores de búsqueda" (una vez el sitio esté listo).

### 2.4 Instalación del Tema y Plugins

1. Instalar **GeneratePress** o **Astra** (ver guía WordPress).
2. Instalar plugins recomendados:
   - Contact Form 7 / WPForms Lite
   - Wordfence Security
   - WP Super Cache / LiteSpeed Cache
   - Yoast SEO / Rank Math
   - Custom Post Type UI
   - Advanced Custom Fields (ACF)
   - UpdraftPlus

### 2.5 Migración del Contenido

Seguir los pasos detallados en `docs/guia-wordpress.md`.

---

## 3. Configuración de Correo Electrónico

### 3.1 Crear Cuentas de Correo

En cPanel > **Cuentas de Correo Electrónico**:

| Cuenta | Propósito |
|--------|-----------|
| `capacitacion@onesvie.gob.do` | Formularios de inscripción |
| `info@onesvie.gob.do` | Consultas generales |

### 3.2 Configurar Formularios

- **Versión estática**: Los formularios requieren integración con un servicio externo (Google Forms, Formspree, PHP backend).
- **Versión WordPress**: Usar Contact Form 7 o WPForms configurados para enviar a `capacitacion@onesvie.gob.do`.

### 3.3 Integración con Google Forms (Alternativa para versión estática)

1. Crear formulario en Google Forms.
2. Obtener el código de inserción (iframe).
3. Reemplazar el formulario HTML en `pages/inscripcion.html` con el iframe de Google Forms.
4. Las respuestas se almacenan automáticamente en Google Sheets.

---

## 4. Optimización de Rendimiento

### 4.1 Compresión Gzip

Agregar al `.htaccess`:

```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>
```

### 4.2 Caché del Navegador

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
</IfModule>
```

### 4.3 Optimización de Imágenes

- Convertir imágenes a formato **WebP** cuando sea posible.
- Comprimir PNG/JPG antes de subir (TinyPNG, Squoosh).
- El logo debe estar optimizado (recomendado: PNG < 100 KB).

---

## 5. Seguridad

### 5.1 Medidas Básicas

- Certificado SSL activo (HTTPS obligatorio).
- Contraseñas fuertes para todos los accesos.
- Actualizaciones regulares (sistema, plugins, tema).
- Copias de seguridad periódicas.

### 5.2 Versión WordPress Adicional

- Cambiar la URL de acceso a `wp-admin` (plugin WPS Hide Login).
- Limitar intentos de inicio de sesión.
- Deshabilitar la edición de archivos desde el panel.
- Agregar al `wp-config.php`:

```php
define('DISALLOW_FILE_EDIT', true);
define('WP_AUTO_UPDATE_CORE', 'minor');
```

### 5.3 Archivo .htaccess de Seguridad

```apache
# Proteger wp-config.php
<Files wp-config.php>
    order allow,deny
    deny from all
</Files>

# Deshabilitar listado de directorios
Options -Indexes

# Proteger archivo .htaccess
<Files .htaccess>
    order allow,deny
    deny from all
</Files>
```

---

## 6. DNS y Dominio

### 6.1 Configuración DNS para Subdominio

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | `capacitacion` | IP del servidor | 3600 |
| CAA | `capacitacion` | `0 issue "letsencrypt.org"` | 3600 |

### 6.2 Verificación de Propagación

- Usar `whatsmydns.net` para verificar la propagación DNS.
- La propagación puede tardar entre 1 y 24 horas.

---

## 7. Monitoreo y Analítica

### 7.1 Google Analytics

1. Crear cuenta en Google Analytics.
2. Obtener el ID de seguimiento (G-XXXXXXXXXX).
3. Agregar el script de seguimiento en el `<head>` de todas las páginas.

### 7.2 Google Search Console

1. Registrar el subdominio en Search Console.
2. Verificar la propiedad (vía archivo HTML o DNS).
3. Enviar el sitemap XML.

### 7.3 Monitoreo de Uptime

- Usar **UptimeRobot** (gratuito) para monitorear disponibilidad.
- Configurar alertas por correo en caso de caída del servicio.

---

## 8. Checklist de Lanzamiento

- [ ] Subdominio configurado y propagado.
- [ ] Certificado SSL activo.
- [ ] Archivos subidos al servidor.
- [ ] Todas las páginas cargando correctamente.
- [ ] Formularios funcionando.
- [ ] Correos de notificación configurados.
- [ ] Responsive verificado en móvil y tablet.
- [ ] Velocidad de carga verificada (PageSpeed Insights).
- [ ] Google Analytics instalado.
- [ ] Google Search Console configurado.
- [ ] Copia de seguridad configurada.
- [ ] Seguridad revisada (firewall, SSL, contraseñas).
- [ ] Enlace a onesvie.gob.do verificado.
- [ ] Barra gubernamental visible.
- [ ] Footer con datos institucionales correctos.

---

## 9. Proveedores de Hosting Recomendados (para Gobierno Dominicano)

Dado que se trata de un subdominio gubernamental `.gob.do`, el hosting debe ser gestionado por la **OGTIC** (Oficina Gubernamental de Tecnologías de la Información y Comunicaciones) o el proveedor autorizado por el Estado dominicano.

Contactar:
- **OGTIC**: (809) 286-1009
- **Correo**: info@ogtic.gob.do
- **Dirección**: Av. 27 de Febrero #419 casi esquina Núñez de Cáceres, Santo Domingo, R.D.

---

## Notas Finales

- Esta guía es compatible con los estándares del Sistema de Diseño Dominicano.
- No se requieren servicios de pago adicionales.
- El portal estático puede implementarse en cualquier servidor web básico.
- WordPress requiere un servidor con soporte PHP/MySQL.
- Toda la configuración de seguridad debe ser coordinada con el equipo de TI de la institución.
