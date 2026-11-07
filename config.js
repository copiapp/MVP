// URL de Apps Script (termina en /exec). Si queda vacía, la app corre en modo demo.
window.COPI_CONFIG = {
  API: 'https://script.google.com/macros/s/AKfycbzwvtHndBzC57mBMJkLPhnSbQWVn0ShG1zNwSF6kU7XaNvtvCxeeBcETXeyzD4lENqfiw/exec',
  // Clave gratuita de mapas de CARTO (https://carto.com/basemaps/apikey). Si queda vacía, el mapa usa OpenStreetMap estándar.
  // Precio de referencia del litro de nafta súper en el AMBA (en pesos). Se usa para estimar el gasto de combustible. Actualizar cuando cambie mucho (ref. fines de oct/nov 2026: ~2.050 a 2.200).
  FUEL_PRICE: 2100,
  CARTO_KEY: ''
};
