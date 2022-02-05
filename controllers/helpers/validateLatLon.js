function validateLatLon(latOrlng) {
  return isFinite(latOrlng) && Math.abs(latOrlng) <= 90;
}
module.exports = validateLatLon;
