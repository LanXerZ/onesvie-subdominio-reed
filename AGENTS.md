# Portal de Capacitación ONESVIE

## Descripción

Portal web institucional para el programa de formación y capacitación de la **Oficina Nacional de Evaluación Sísmica y Vulnerabilidad de Infraestructura y Edificaciones (ONESVIE)**, diseñado como subdominio de onesvie.gob.do (ej: `capacitacion.onesvie.gob.do`).

## Estándares de Diseño

- **Sistema de Diseño**: Sistema de Diseño Dominicano (SDD) - https://uxkit.digital.gob.do/
- **Colores oficiales**: `#0F539C` (primario), `#9FD0FD` (claro), `#66A1DE` (medio)
- **Tipografía**: Open Sans (Google Fonts)
- **Estética**: Sobria, institucional, minimalista (no comercial)

## Estructura del Proyecto

```
Subdominio-reed/
├── index.html                    - Página principal (hero, accesos rápidos, oferta, noticias)
├── css/
│   └── styles.css                - Estilos completos (SDD, responsive, accesibilidad)
├── js/
│   └── script.js                 - Menú móvil, validación formularios, scroll suave
├── img/
│   ├── LOGO_FAVICON01.jpg        - Logo institucional ONESVIE
│   └── favicon.ico               - (pendiente)
├── pages/
│   ├── sobre-iniciativa.html     - Justificación, marco legal, objetivos
│   ├── oferta-academica.html     - 6 programas de capacitación detallados
│   ├── inscripcion.html          - Proceso + formulario con validación
│   ├── noticias.html             - Noticias y avisos institucionales
│   └── contacto.html             - Datos, formulario, mapa
└── docs/
    ├── guia-wordpress.md         - Guía de migración a WordPress
    └── guia-hosting.md           - Guía de despliegue en hosting
```

## Tecnologías

- HTML5 semántico (sin frameworks)
- CSS3 nativo (variables CSS, grid, flexbox, mobile-first)
- JavaScript vanilla (sin dependencias)
- No se requieren herramientas de pago

## Marco Legal Referenciado

- **Decreto 715-01** (5 de julio de 2001) - Creación de ONESVIE
- **Ley 147-02** - Gestión de Riesgo
- **Ley 200-04** - Libre Acceso a la Información Pública
- **Resolución A-2023** - Norma para portales web del Estado (OGTIC)

## Datos Institucionales

- **Institución**: ONESVIE - Oficina Nacional de Evaluación Sísmica y Vulnerabilidad de Infraestructura y Edificaciones
- **Dirección**: Av. Ortega y Gasset con Pepillo Salcedo, Plaza de la Salud, Edif. Comisión Nacional de Emergencias, 1er. piso, #419, Ens. La Fe, Santo Domingo, República Dominicana
- **Teléfono**: (809) 685-9739
- **Correo**: capacitacion@onesvie.gob.do

## Reglas de Desarrollo

1. **No usar frameworks pesados** - HTML/CSS/JS puro
2. **Mantener colores SDD** - No introducir paletas diferentes
3. **Lenguaje institucional** - Evitar textos de marketing o comerciales
4. **Accesibilidad** - Siempre incluir aria-labels, semántica HTML, contraste adecuado
5. **Mobile-first** - Todo debe funcionar en dispositivos móviles
6. **SEO** - Mantener meta tags, títulos descriptivos, canonical URLs

## Programas de Capacitación

| Programa | Modalidad | Duración | Público |
|----------|-----------|----------|---------|
| Evaluación Visual Rápida (EVR) | Presencial | 40h | Ingenieros, arquitectos, técnicos |
| Evaluaciones Detalladas | Híbrido | 80h | Ingenieros estructurales |
| Gestión del Riesgo Sísmico | Virtual | 24h | Funcionarios públicos |
| Normativa Sismorresistente | Presencial | 32h | Profesionales construcción |
| Diseño de Reforzamiento | Híbrido | 60h | Ingenieros estructurales |
| Webinar Introductorio | Virtual | 4h | Estudiantes y público general |

## Enlaces de Referencia

- Portal principal: https://onesvie.gob.do
- Sistema de Diseño Dominicano: https://uxkit.digital.gob.do/
- Portal del Gobierno: https://www.gob.do
- Transparencia ONESVIE: https://onesvie.gob.do/transparencia/inicio

## Migración a WordPress

Consultar `docs/guia-wordpress.md` para:
- Tema recomendado: GeneratePress o Astra
- Custom Post Type para cursos
- Plugins: Contact Form 7, Wordfence, Yoast SEO, CPT UI, ACF

## Despliegue

Consultar `docs/guia-hosting.md` para:
- Configuración de subdominio en cPanel
- SSL/HTTPS obligatorio
- Integración con hosting gubernamental (OGTIC)
