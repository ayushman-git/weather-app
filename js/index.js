window.addEventListener("load", () => {
  let long, lat;

  if (navigator.geolocation) {

  }
  else {
    document.getElementById("location-timezone").innerText = "Allow geolocation access."
  }
});