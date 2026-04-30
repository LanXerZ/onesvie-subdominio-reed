# Guía de Migración a WordPress

## Portal de Capacitación ONESVIE

Esta guía detalla el proceso para migrar el diseño estático del portal de capacitación a WordPress, garantizando compatibilidad con los estándares del Sistema de Diseño Dominicano (SDD) y facilitando la gestión de contenido por personal no técnico.

---

## 1. Configuración Inicial

### 1.1 Tema Recomendado

**GeneratePress (gratuito)** o **Astra (gratuito)** son los temas más adecuados por las siguientes razones:

- **Ligeros**: Ambos pesan menos de 50 KB.
- **Compatibles con SDD**: Permiten personalización completa de colores, tipografía y estructura sin sobreescribir estilos.
- **SEO-friendly**: Estructura HTML semántica optimizada.
- **Accesibilidad**: Cumplen con WCAG 2.1 AA.

**Recomendación**: GeneratePress por su minimalismo y fidelidad a la estructura gubernamental.

### 1.2 Instalación del Tema

1. Acceder a `wp-admin` > **Apariencia** > **Temas** > **Añadir nuevo**.
2. Buscar **GeneratePress** o **Astra**.
3. Instalar y activar.

### 1.3 Constructor de Páginas (Opcional)

Si se requiere un constructor visual:

- **Elementor (gratuito)**: Suficiente para la estructura básica.
- **Recomendación**: Usar el editor de bloques de WordPress (Gutenberg) para mayor rendimiento y menor dependencia de plugins.

---

## 2. Configuración de Apariencia

### 2.1 Colores (Personalizador)

Ir a **Apariencia** > **Personalizar** > **Colores**:

| Elemento | Valor Hex |
|----------|-----------|
| Color primario | `#0F539C` |
| Color de fondo | `#FFFFFF` |
| Color de texto | `#333333` |
| Color de enlace | `#0F539C` |
| Color de enlace hover | `#0a3d73` |

### 2.2 Tipografía

Ir a **Apariencia** > **Personalizar** > **Tipografía**:

- **Fuente del cuerpo**: Open Sans, tamaño 16px.
- **Fuente de encabezados**: Open Sans, peso 700.

### 2.3 Cabecera

Ir a **Apariencia** > **Personalizar** > **Cabecera**:

- **Disposición**: Logo a la izquierda, menú a la derecha.
- **Altura de cabecera**: 80px.
- **Menú pegajoso**: Activado (sticky header).

---

## 3. Creación de Páginas

Cada sección del portal estático se convierte en una página de WordPress:

### 3.1 Páginas a Crear

| Página | Slug | Contenido |
|--------|------|-----------|
| Inicio | `/` | Banner hero, accesos rápidos, descripción, oferta destacada, proceso de inscripción, noticias recientes |
| Sobre la Iniciativa | `/sobre-la-iniciativa/` | Justificación, marco legal, objetivos estratégicos, relación con ONESVIE |
| Oferta Académica | `/oferta-academica/` | Listado completo de cursos (ver sección CPT) |
| Inscripción | `/inscripcion/` | Proceso de inscripción + formulario |
| Noticias | `/noticias/` | Listado de publicaciones (usar el sistema de entradas de WP) |
| Contacto | `/contacto/` | Datos de contacto, formulario, mapa |
| Términos de Uso | `/terminos-de-uso/` | Texto legal institucional |
| Política de Privacidad | `/politica-de-privacidad/` | Texto de privacidad conforme a la normativa |

### 3.2 Menú de Navegación

Ir a **Apariencia** > **Menús**:

1. Crear menú principal con las páginas anteriores.
2. Asignar como **Menú principal**.
3. Configurar la barra superior (barra-gobierno) usando un widget HTML personalizado o el hook `before_header` de GeneratePress.

---

## 4. Custom Post Type para Cursos

### 4.1 Registro del CPT "Programas"

Usar el plugin **Custom Post Type UI** (gratuito) o agregar el código al `functions.php` del tema hijo:

```php
// Registrar CPT para programas de capacitación
function onesvie_registrar_programas() {
    register_post_type('programa', array(
        'labels' => array(
            'name' => 'Programas de Capacitación',
            'singular_name' => 'Programa',
            'add_new' => 'Añadir Programa',
            'add_new_item' => 'Añadir Nuevo Programa',
            'edit_item' => 'Editar Programa',
            'new_item' => 'Nuevo Programa',
            'view_item' => 'Ver Programa',
            'search_items' => 'Buscar Programas',
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-welcome-learn-more',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'rewrite' => array('slug' => 'programas'),
    ));
}
add_action('init', 'onesvie_registrar_programas');
```

### 4.2 Campos Personalizados (ACF)

Instalar **Advanced Custom Fields (ACF - gratuito)** y crear campos para cada curso:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `modalidad` | Select (Presencial, Virtual, Híbrido) | Tipo de modalidad del curso |
| `duracion` | Texto | Duración en horas académicas |
| `publico_objetivo` | Texto | Público al que va dirigido |
| `certificacion` | Texto | Tipo de certificado emitido |
| `fecha_inicio` | Fecha | Fecha de inicio del programa |
| `fecha_limite` | Fecha | Fecha límite de inscripción |

### 4.3 Plantilla para Listado de Cursos

Crear `archive-programa.php` en el tema hijo para mostrar los cursos con el mismo estilo que el HTML estático.

---

## 5. Plugins Recomendados

### 5.1 Formularios

- **Contact Form 7** o **WPForms Lite** (gratuitos): Para los formularios de inscripción y contacto.
- Integrar con correo institucional `capacitacion@onesvie.gob.do`.

### 5.2 Seguridad

- **Wordfence Security**: Firewall y escaneo de malware.
- **Limit Login Attempts Reloaded**: Protección contra fuerza bruta.
- **Disable XML-RPC**: Deshabilitar XML-RPC para mayor seguridad.

### 5.3 Rendimiento

- **WP Super Cache** o **LiteSpeed Cache**: Caché de páginas.
- **Smush**: Optimización de imágenes.
- **Autoptimize**: Minificación de CSS y JS.

### 5.4 SEO

- **Yoast SEO** o **Rank Math** (gratuitos): Configuración de meta tags, sitemap XML y datos estructurados.

### 5.5 Accesibilidad

- **One Click Accessibility**: Mejora la accesibilidad del sitio.

### 5.6 Mantenimiento

- **UpdraftPlus**: Copias de seguridad automáticas.
- **Health Check & Troubleshooting**: Diagnóstico del sitio.

---

## 6. Estructura del Tema Hijo

```
wp-content/themes/
└── generatepress-child/
    ├── style.css              (estilos personalizados del SDD)
    ├── functions.php          (CPT, ACF, configuraciones)
    ├── header.php             (cabecera con barra gubernamental)
    ├── footer.php             (footer institucional)
    ├── front-page.php         (plantilla de inicio)
    ├── archive-programa.php   (listado de cursos)
    ├── single-programa.php    (detalle de curso)
    └── img/                   (logo, favicon, imágenes)
```

---

## 7. Barra Gubernamental Superior

Agregar en el `header.php` del tema hijo, antes del header principal:

```php
<div class="barra-gobierno" role="banner">
    <div class="container">
        <span>Portal oficial del Gobierno de la República Dominicana</span>
        <a href="https://www.gob.do" target="_blank" rel="noopener noreferrer">www.gob.do</a>
    </div>
</div>
```

Los estilos se agregan en el `style.css` del tema hijo copiando las clases `.barra-gobierno` del archivo `styles.css` del proyecto estático.

---

## 8. Migración de Contenido

### 8.1 Proceso

1. **Crear las páginas** listadas en la sección 3.
2. **Copiar el contenido HTML** de cada archivo `.html` al editor de WordPress.
3. **Usar bloques de Gutenberg** para estructurar: columnas, tarjetas, tablas.
4. **Importar cursos** al CPT de Programas (manual o vía CSV).
5. **Configurar la página de inicio** como estática: **Ajustes** > **Lectura** > **Una página estática**.

### 8.2 Contenido Estático vs. Dinámico

| Contenido | Método |
|-----------|--------|
| Banner hero | Bloque de cobertura o sección personalizada |
| Cursos | CPT "Programas" con campos ACF |
| Noticias | Entradas de WordPress (categoría: Noticias) |
| Formularios | Contact Form 7 / WPForms |
| Datos de contacto | Widgets o campos personalizados en Ajustes |

---

## 9. Checklist de Verificación Post-Migración

- [ ] Barra gubernamental visible en todas las páginas.
- [ ] Logo ONESVIE cargando correctamente.
- [ ] Menú de navegación funcional y responsive.
- [ ] Colores SDD aplicados correctamente.
- [ ] Tipografía Open Sans activa.
- [ ] Formularios enviando correctamente al correo institucional.
- [ ] CPT de programas mostrando cursos.
- [ ] Páginas de noticias funcionando.
- [ ] Footer con datos institucionales correctos.
- [ ] Enlace a onesvie.gob.do funcionando.
- [ ] Barra de transparencia visible.
- [ ] Certificado SSL activo (HTTPS).
- [ ] Velocidad de carga verificada (< 3 segundos).
- [ ] Compatibilidad móvil verificada.

---

## 10. Mantenimiento Continuo

| Tarea | Frecuencia |
|-------|------------|
| Actualizar WordPress, tema y plugins | Mensual |
| Copia de seguridad | Semanal |
| Revisar formularios de inscripción | Diario |
| Publicar noticias/convocatorias | Según necesidad |
| Actualizar oferta académica | Cada período |
| Revisar accesibilidad | Trimestral |
| Revisar seguridad (Wordfence) | Semanal |

---

## Notas Finales

- Todo el diseño está basado en los estándares del **Sistema de Diseño Dominicano (SDD)**.
- No se requieren plugins de pago para la funcionalidad básica.
- El uso de CPT para cursos permite que personal no técnico agregue nuevos programas fácilmente.
- Las entradas de WordPress para noticias reemplazan la sección estática con un sistema dinámico.
