async function getPhotographers() {
    const response = await fetch("../data/photographers.json");
    if (!response.ok) {
        console.log("pas de reponse")
    }
    const photographersJson = await response.json();
    console.log(photographersJson)
    console.log(photographersJson.photographers)
    console.log(photographersJson.media)

     return photographersJson
}


async function displayData(photographers) {

    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    try {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    } catch (error) {
        console.error(error);
    }
};

init();
