window.onload = async function () {
 
  const apiKey = "bb014aa492b04924b51b329a21588718"; // Replace with your actual key

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;

      const map = L.map("map").setView([lat, lng], 12);

      const street = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
        }
      );

      const dark = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
        }
      );

      const light = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
        }
      );

      const satellite = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles &copy; Esri",
        }
      );

      street.addTo(map);

      const baseMaps = {
        "Street View": street,
        "Dark Theme": dark,
        "Light Theme": light,
        Satellite: satellite,
      };

      L.control.layers(baseMaps).addTo(map);

      // Optional: Add marker
      L.marker([lat, lng]).addTo(map)
      .bindPopup("<h5>exact location will get uh after booking</h2>")
      .openPopup();
    } else {
      console.error("No results found for the address.");
    }
  } catch (err) {
    console.error("Geocoding error:", err);
  }
};
