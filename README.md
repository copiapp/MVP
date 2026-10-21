# CoPi · MVP del piloto

App web instalable (PWA) para repartidores y conductores, más un panel de administración y un backend en Google Sheets (Apps Script).

```
index.html            App (mobile-first, instalable)
config.js             Acá se pega la URL de Apps Script
manifest.webmanifest, sw.js, icons/   PWA
img/                  Mascota CoPi (PNG)
admin/                Panel de administración (index.html + config.js)
apps-script/          Backend: Code.gs + appsscript.json
```

## Qué incluye el MVP
- Registro con **código de invitación** y consentimiento; login con teléfono + código (sin contraseñas).
- Inicio con ganancia neta semanal, meta y gráfico (datos reales de cada usuario).
- Actividad por semana, día y mes (hasta 3 meses).
- **+ Micrófono:** campo de texto con dictado. Si el navegador lo soporta aparece el botón "Dictar"; si no, se usa el micrófono del teclado. Se interpreta con IA (si está configurada) o con reglas locales.
- **+ Carga manual:** formulario Ingreso/Gasto con categorías, categorías nuevas y **subida de imagen o PDF con lectura (OCR con IA)**. Siempre se revisa antes de guardar.
- **Premium = lista de espera.** No se cobra. El botón registra el interés.
- Mapa y recomendaciones: pantalla "Próximamente".
- Sin conexión, los movimientos se guardan en el teléfono y se envían al volver la señal.

**Fuera del MVP:** Palenca, mapa con recorrido, horas automáticas por GPS, cobros.

## Formas de ver el MVP
| Qué | Cómo |
|---|---|
| **Demo sin backend** (presentaciones) | Abrir la app con `?demo=1` al final del link, o dejar `config.js` vacío. Datos de ejemplo, con el interruptor Gratis/Premium en desktop. |
| **Piloto real** | `config.js` con la URL de Apps Script. Cada persona entra con su código. |
| **Panel de administración** | `/admin/` del mismo sitio. Pide la clave de administrador al abrir. Con `admin/config.js` vacío muestra datos de ejemplo. |
| **La planilla** | La hoja de Google es la fuente de datos: se puede mirar directamente. |

## Puesta en marcha
1. **Planilla + script.** Creá una planilla, abrí *Extensiones → Apps Script*, pegá `apps-script/Code.gs` y el contenido de `appsscript.json` (Configuración del proyecto → "Mostrar appsscript.json").
2. Ejecutá `setup` y copiá la `ADMIN_KEY` del registro. En la pestaña `codigos` (columna A) cargá un código por participante (`PILOTO-001`, ...).
3. **Lectura con IA (opcional):** en *Propiedades del script* agregá `ANTHROPIC_KEY`. Sin esa clave, la lectura de comprobantes no funciona y el texto se interpreta con reglas locales. Revisá precios antes: tiene costo por uso.
4. **Implementar → Nueva implementación → Aplicación web** (ejecutar como *yo*, acceso *cualquier persona*). Copiá la URL `/exec`.
5. Pegá la URL en `config.js` y en `admin/config.js`.
6. **GitHub Pages:** subí todo el repo, *Settings → Pages → Deploy from branch → main / root*. La app queda en `https://USUARIO.github.io/REPO/` y el panel en `/admin/`.
7. Probá primero con 2–3 personas en sus celulares: *Compartir → Agregar a pantalla de inicio*.

Cada cambio en `Code.gs` requiere una **nueva versión** de la implementación.

## Seguridad
- **Nunca subas** la `ADMIN_KEY` ni `ANTHROPIC_KEY` al repo. Viven solo en las propiedades del script.
- La URL `/exec` en `config.js` es visible, pero sin un código válido no se puede leer ni escribir nada de usuarios.
- Compartí la planilla solo con el equipo: tiene teléfonos e ingresos.
- Las imágenes no se guardan: solo los campos leídos.
- Mientras el script usa un bloqueo para ordenar escrituras, una lectura con IA (varios segundos) puede demorar otras cargas. Con 15–20 personas es aceptable.

## Limitaciones a tener en cuenta
- El dictado propio del navegador es poco confiable en iPhone: por eso el campo funciona también con el micrófono del teclado.
- La meta semanal es fija ($180.000) y no se configura todavía.
- No fue probado en celulares reales: hacerlo antes de abrir el piloto.
