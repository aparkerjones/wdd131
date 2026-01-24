// place.js — computes wind chill for weather section

// Static weather values for this assignment (Imperial units)
const temperatureF = 41; // °F — match the HTML display
const windSpeedMph = 8;  // mph — match the HTML display

// Keep the HTML values synced with the JS static values
const tempSpan = document.getElementById('temperature');
const windSpan = document.getElementById('wind');
if (tempSpan) tempSpan.textContent = String(temperatureF);
if (windSpan) windSpan.textContent = String(windSpeedMph);

/**
 * calculateWindChill returns wind chill in °F given temp in °F and wind in mph.
 * Formula (US National Weather Service):
 * WC = 35.74 + 0.6215T - 35.75V^0.16 + 0.4275T V^0.16
 * Valid when T <= 50°F and V > 3 mph.
 */
function calculateWindChill(tF, vMph){
  return Math.round(35.74 + 0.6215*tF - 35.75*Math.pow(vMph, 0.16) + 0.4275*tF*Math.pow(vMph, 0.16));
}

(function updateWindChill(){
  const out = document.getElementById('windchill');
  if (!out) return;
  if (temperatureF <= 50 && windSpeedMph > 3){
    const wc = calculateWindChill(temperatureF, windSpeedMph);
    out.textContent = `${wc} °F`;
  } else {
    out.textContent = 'N/A';
  }
})();
