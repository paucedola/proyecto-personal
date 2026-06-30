document.addEventListener ("DOMcontenLoaded", () => {
  console.log("Primedic Salud");
const titulo = document.querySelector("h1");
const secction = document.querySelectorAll("section");
 const links = document.querySelectorAll(".card-link");

  links.forEach(link => {
    link.addEventListener("click", () => {
      console.log("Navegando a:", link.href);
    });
  });
});
  
  
