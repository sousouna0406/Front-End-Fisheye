function modalFactory(data) {
  const { name } = data;
  console.log(name);

  const contactElement = document.querySelector(".contact");
  contactElement.innerHTML = `<h2>Contactez-moi <br> ${name}</h2>`;

  return {
    contactElement,
  };
}
