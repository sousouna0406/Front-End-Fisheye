/* Factory pour afficher le nom du photographe. */

// eslint-disable-next-line no-unused-vars
function modalFactory(data) {
  const { name } = data;

  const contactElement = document.querySelector(".contact");
  contactElement.innerHTML = `<h2>Contactez-moi <br> ${name}</h2>`;

  return {
    contactElement,
  };
}
