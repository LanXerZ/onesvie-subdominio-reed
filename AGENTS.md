# AGENTS.md - Portal de Capacitación ONESVIE

## Proyecto
Portal web institucional de ONESVIE como subdominio de onesvie.gob.do. Generado con Eleventy (11ty).

## Estándares de Diseño
- Sistema de Diseño Dominicano (SDD): https://uxkit.digital.gob.do/
- Colores: Primario `#0F539C`, claro `#9FD0FD`, medio `#66A1DE`
- Tipografía: Open Sans (Google Fonts)
- Estética: Sobria, institucional, minimalista

## Stack Tecnológico
- Eleventy (11ty) con Nunjucks (.njk)
- HTML5 semántico, CSS3 nativo (mobile-first), JavaScript vanilla
- Sin frameworks pesados ni dependencias de producción

## Comandos
- `npm start`: Servidor de desarrollo con live reload
- `npm run build`: Genera HTML estático en `_site/`

## Configuración Eleventy
- Input: `src/`, Output: `_site/`
- `pathPrefix: "/onesvie-subdominio-reed/"` para GitHub Pages
- Archivos pasados directo: `src/css`, `src/js`, `src/img`, `src/docs`

## Despliegue en GitHub Pages
- Workflow: `.github/workflows/build.yml`
- Build type: `workflow` (usa GitHub Actions, no branch legacy)
- Despliegue automático en push a `main`
- URL: https://lanxerz.github.io/onesvie-subdominio-reed/

## Reglas de Desarrollo
1. Mantener colores SDD; no introducir paletas diferentes
2. Lenguaje institucional: evitar textos comerciales
3. Accesibilidad obligatoria: aria-labels, semántica HTML, contraste
4. Mobile-first: Todo debe funcionar en dispositivos móviles
5. SEO: Mantener meta tags, títulos descriptivos, canonical URLs

## Referencias
- Guías técnicas: `src/docs/guia-wordpress.md`, `src/docs/guia-hosting.md`
- Portal principal: https://onesvie.gob.do
