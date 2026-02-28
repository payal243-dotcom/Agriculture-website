const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const navItems = document.querySelectorAll("#nav-links a");
navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active"); 
  });
});


const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});
const form = document.querySelector(".contact-form");
const topAlert = document.getElementById("topAlert");
form.addEventListener("submit", function(e){
  e.preventDefault(); 
  topAlert.classList.add("show");
  setTimeout(() => {
    topAlert.classList.remove("show");
  }, 4000); 
  form.reset(); 
});
function initMap() {
  const location = { lat: 24.8607, lng: 67.0011 }; 
  const map = new google.maps.Map(document.getElementById("map-container"), {
    zoom: 15,
    center: location,
    styles: [ 
      { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
      { "featureType": "transit", "stylers": [{ "visibility": "off" }] }
    ]
  });
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Our Office",
  });
}