let sortCriteria;

/* Fonction qui gère l'ouverture de la lightbox ainsi que l'affichage des differents élément de celle-ci */
// eslint-disable-next-line no-unused-vars
async function displayLightbox() {
  const mediaElements = document.querySelectorAll(".lightbox-trigger");
  const selectElement = document.getElementById("sort-select-ul");

  // Itération sur chaque élément de mediaElements avec un gestionnaire d'événements onclick et au keydown et appel de la fonction openLightbox()
  mediaElements.forEach((element) => {
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        console.log("find");

        openLightbox(event);
      }
    });

    element.onclick = (event) => openLightbox(event);
    console.log(element);
  });

  //Gestionnaire d'événements onclick à selectElement pour récupérer la valeur du critère de tri sélectionné
  selectElement.onclick = (event) => {
    sortCriteria = event.target.getAttribute("data-value");
  };

  //Gestionnaire d'événements keydown à selectElement pour récupérer la valeur du critère de tri sélectionné avec la touche Enter
  selectElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sortCriteria = event.target.getAttribute("data-value");
      console.log(sortCriteria);
    }
  });

  // Fonction d'affichage de la lightbox
  async function openLightbox(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const photographeId = urlParams.get("id");
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "block";
    const main = document.getElementById("main");
    main.classList.add("blur");
    const header = document.querySelector("header");
    header.classList.add("blur");

    try {
      const response = await fetch("../data/photographers.json");
      const data = await response.json();
      const media = data.media.filter(
        (media) => media.photographerId == photographeId
      );
      console.log(media);

      if (media) {
        // Recupere l'index de l'élément sur lequel le clic a été effectué puis trie les médias en fonction du critère de tri (s'il est défini)
        const mediaIndex = Array.from(mediaElements).indexOf(event.target);
        let sortedMedia = media;
        if (sortCriteria) {
          sortedMedia = sortMedia(sortCriteria, media);
        }
        // eslint-disable-next-line no-undef
        const lightboxInstance = lightboxFactory();
        lightboxInstance.createLightbox(sortedMedia, mediaIndex);
      } else {
        console.error("Médias du photographe non trouvés");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

  // Fonction qui tri le tableau des medias en fonction des likes, des dates et des titres
  function sortMedia(sortCriteria, mediaArray) {
    switch (sortCriteria) {
      case "popularity":
        mediaArray.sort((a, b) => b.likes - a.likes);
        break;
      case "date":
        mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "title":
        mediaArray.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        console.error("Critère de tri invalide:", sortCriteria);
        return false;
    }
    return mediaArray;
  }
}

/* Fonction qui gère la fermeture de la lightbox */
// eslint-disable-next-line no-unused-vars
async function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  const main = document.getElementById("main");
  main.classList.remove("blur");
  const header = document.querySelector("header");
  header.classList.remove("blur");
}
