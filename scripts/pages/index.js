async function getPhotographers() {
  const response = await fetch("../data/photographers.json");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données.");
  }
  const photographersJson = await response.json();
  console.log(photographersJson);
  return photographersJson;
}

async function displayData(photographers) {
  console.log(photographers);
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    console.log(photographer);
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  try {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
  } catch (error) {
    console.error(error);
  }
}

init();
