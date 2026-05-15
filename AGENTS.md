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
- `pathPrefix: ""` (vacío — dominio personalizado, no subpath de GitHub Pages)
- Archivos pasados directo: `src/css`, `src/js`, `src/img`, `src/docs`

## Despliegue
- Dominio personalizado: `http://reed.onesvie.gob.do/`
- Workflow: `.github/workflows/build.yml`
- Build type: `workflow` (GitHub Actions)
- Despliegue automático en push a `main`
- URL alternativa: `https://lanxerz.github.io/onesvie-subdominio-reed/`

## Branches
| Branch | Uso |
|--------|-----|
| `main` | Producción (desplegado automáticamente) |
| `Dev` | Desarrollo activo |
| `test` | Pruebas |
| `test-origin` | PRs y revisiones |

## Reglas de Desarrollo
1. Mantener colores SDD; no introducir paletas diferentes
2. Lenguaje institucional: evitar textos comerciales
3. Accesibilidad obligatoria: aria-labels, semántica HTML, contraste
4. Mobile-first: Todo debe funcionar en dispositivos móviles
5. SEO: Mantener meta tags, títulos descriptivos, canonical URLs

## Troubleshooting
- **CSS no carga en localhost**: Eliminar carpeta `.cache` y `_site`, luego `npm run build`
- **404 en GitHub Pages**: Verificar que `pathPrefix` sea `""` y build type sea `workflow` (no `legacy`)

## Referencias
- Guías técnicas: `src/docs/guia-wordpress.md`, `src/docs/guia-hosting.md`
- Portal principal: https://onesvie.gob.do
