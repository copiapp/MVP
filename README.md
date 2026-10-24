# CoPi · MVP del piloto

App web instalable (PWA) para repartidores y conductores, un panel de administración y un backend en Google Sheets (Apps Script).

```
index.html            App (mobile-first, instalable)
config.js             Acá se pega la URL de Apps Script
manifest.webmanifest, sw.js, *.png   PWA, logos y mascota (todo suelto, sin carpetas)
admin.html, admin-config.js   Panel de administración
apps-script/          Backend: Code.gs + appsscript.json
```

## Qué incluye
- Registro con **código de invitación**, zona, Términos y Política de privacidad (borradores) y una casilla opcional para uso agregado y anónimo de datos.
- **Preguntas iniciales salteables:** si llevan la cuenta semanal, cuánto estiman ganar y su meta semanal (con una sugerencia del 10% más que la estimación). Se puede cambiar después desde Perfil.
- Inicio con ganancia neta semanal y progreso hacia la meta. Actividad por Día / Semana / Mes.
- **+ Micrófono** (texto con dictado) y **+ Carga manual** (formulario y lectura de imagen o PDF con IA).
- **Notificaciones** (avisos desde la planilla y recordatorios automáticos) y esqueleto del **Centro de ayuda** con formulario de consulta.
- Mapa: "Próximamente".

**Fuera del MVP:** planes de pago, conexión automática con las apps, mapa con recorrido, bot.

## Formas de ver el MVP
| Qué | Cómo |
|---|---|
| Demo sin backend | App con `?demo=1` al final del link, o `config.js` vacío |
| Piloto real | `config.js` con la URL de Apps Script |
| Panel | `admin.html` (pide la clave de administrador) |
| Planilla | Es la fuente de datos |

## Puesta en marcha
1. Planilla nueva → *Extensiones → Apps Script* → pegar `apps-script/Code.gs` y `appsscript.json`.
2. Ejecutar `setup` (**de nuevo si ya lo habías corrido**: actualiza las pestañas) y copiar la `ADMIN_KEY`.
3. En la pestaña `codigos`, columna A, cargar un código por participante.
4. Opcional: `ANTHROPIC_KEY` en Propiedades del script para leer comprobantes y texto con IA.
5. Implementar como aplicación web (ejecutar como *yo*, acceso *cualquier persona*), con **nueva versión** cada vez que cambie el código.
6. Pegar la URL `/exec` en `config.js` y `admin-config.js`. Subir todo a GitHub y activar Pages.

## Avisos
En la pestaña `avisos` de la planilla escribí: `id` (opcional), `fecha`, `titulo`, `texto` y `para` (`todos` o el id de un usuario). Aparecen en la campanita de la app.

## Seguridad
- No subas `ADMIN_KEY` ni `ANTHROPIC_KEY` al repositorio.
- Compartí la planilla solo con el equipo.
- Los textos legales son borradores: revisarlos con un profesional antes del piloto.

## Identidad de marca
Colores `#233351` (azul) y `#12b271` (verde). Tipografías: Poppins (principal) y Montserrat (secundaria).

Archivos de marca (carpeta `brand/`, generados a partir de los originales):
- `logo-sobre-blanco.png` · logo con letras sobre fondo blanco
- `logo-sobre-azul.png` · logo con letras sobre fondo azul
- `icono.png` / `icono-app.png` · la flecha sola
- `logo-transparente-claro.png` y `logo-transparente-blanco.png` · versiones con fondo transparente

El ícono de pestaña (`favicon.ico`, `icons/icon-48.png`, `icons/icon-96.png`) usa la flecha. La app muestra el logo claro u oscuro según el modo del teléfono.

## Links
- App: `https://USUARIO.github.io/REPO/`
- Panel de administración: `https://USUARIO.github.io/REPO/admin.html`
