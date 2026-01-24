// Sample temperature and wind speed values
const tempF = 41;
const windMph = 8;

const tempSpan = document.getElementById('temperature');
const windSpan = document.getElementById('wind');

if (tempSpan) tempSpan.textContent = tempF;
if (windSpan) windSpan.textContent = windMph;

// Calculate wind chill using NWS formula
function calculateWindChill(tF, vMph) {
  return Math.round(35.74 + 0.6215 * tF - 35.75 * Math.pow(vMph, 0.16) + 0.4275 * tF * Math.pow(vMph, 0.16));
}

// Show wind chill only if conditions allow
(function() {
  const out = document.getElementById('windchill');
  if (!out) return;
  
  if (tempF <= 50 && windMph > 3) {
    out.textContent = calculateWindChill(tempF, windMph) + ' °F';
  } else {
    out.textContent = 'N/A';
  }
})();
