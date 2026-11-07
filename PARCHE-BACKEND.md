# Parche del backend (Apps Script) — vehículo, combustible y admin

> El zip no traía `apps-script/Code.gs`, así que esto está escrito sin ver tu código: los nombres de pestañas y funciones (`usuarios`, `jornadas`, `doPost`…) hay que ajustarlos a los reales. Si me pasás `Code.gs`, lo integro yo.

## Qué manda ahora la app
| Acción | Campos nuevos |
|---|---|
| `register` y `updateProfile` | `vehiculo_modelo`, `vehiculo_anio` (junto con `vehiculo`, que ya existía) |
| `addShift` | `litros_est`, `costo_est`, `consumo_l100` (además de `km` y `zonas`, que la app ya mandaba) |
| `login` | espera que `user` devuelva `vehiculo_modelo` y `vehiculo_anio` |
| `ping` | sin datos; solo sirve para "despertar" el backend |

## 1. Columnas (correr una vez, o agregarlo a `setup`)
```js
function ensureCols_(sh, names){
  const lc = sh.getLastColumn() || 1;
  const head = sh.getRange(1,1,1,lc).getValues()[0].map(String);
  names.forEach(n => { if (head.indexOf(n) < 0){ sh.getRange(1, head.length+1).setValue(n); head.push(n); } });
  return head;
}
function addCols(){
  const ss = SpreadsheetApp.getActive();
  ensureCols_(ss.getSheetByName('usuarios'), ['vehiculo_modelo','vehiculo_anio']);
  ensureCols_(ss.getSheetByName('jornadas'), ['km','zonas','litros_est','costo_est','consumo_l100']);
}
```

## 2. Guardar por nombre de columna
En `register`, `updateProfile` y `addShift`, al armar la fila (o al actualizarla), escribir los campos nuevos buscando la columna por encabezado, no por posición:
```js
function setByHeader_(sh, row, obj){            // row = número de fila ya existente
  const head = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
  Object.keys(obj).forEach(k => { const c = head.indexOf(k); if (c >= 0) sh.getRange(row, c+1).setValue(obj[k]); });
}
// ej. en addShift, después de appendRow:
// setByHeader_(sh, sh.getLastRow(), {km:b.km, zonas:b.zonas, litros_est:b.litros_est, costo_est:b.costo_est, consumo_l100:b.consumo_l100});
// ej. en register/updateProfile:
// setByHeader_(shU, fila, {vehiculo_modelo:b.vehiculo_modelo, vehiculo_anio:b.vehiculo_anio});
```
En `login`, incluir `vehiculo_modelo` y `vehiculo_anio` en el objeto `user` (si ya devolvés la fila completa sin filtrar, no hace falta tocar nada).

## 3. Admin (`op:'dashboard'`)
Cada elemento de `users` debe sumar estos campos (el panel ya los lee):
```js
// vm, vy: de la fila del usuario. km, lt, cs: suma de jornadas de los últimos 7 días de ese usuario.
{ ..., vm: fila.vehiculo_modelo, vy: fila.vehiculo_anio, km: sumKm, lt: sumLitros, cs: sumCosto }
```

## 4. Arranque más rápido (opcional pero recomendado)
La lentitud inicial suele ser el *cold start* de Apps Script (la primera llamada tarda varios segundos si nadie lo usó hace un rato).
```js
// En doPost, al principio:
if (b.action === 'ping') return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
// Trigger por tiempo (Activadores → Agregar → cada 5 minutos) sobre esta función:
function keepWarm(){ SpreadsheetApp.getActive().getName(); }
```

## 5. Verificación
1. Correr `addCols`. 2. Implementar **nueva versión**. 3. Desde la app: cargar vehículo + modelo + año en Perfil → Mi trabajo, hacer una jornada con "Guardar mi recorrido" y tocar "Terminé". 4. Revisar en la planilla que se llenaron `vehiculo_modelo`, `vehiculo_anio`, `km`, `litros_est`, `costo_est`. 5. Abrir `admin.html` y mirar el usuario.
