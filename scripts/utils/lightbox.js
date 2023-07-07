let sortCriteria;

// eslint-disable-next-line no-unused-vars
async function displayLightbox() {
  console.log("displayLightbox");
  const mediaElements = document.querySelectorAll(".lightbox-trigger");
  const selectElement = document.getElementById("sort-select-ul");

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

  selectElement.onclick = (event) => {
    sortCriteria = event.target.getAttribute("data-value");
    console.log(sortCriteria);
  };

  async function openLightbox(event) {
    console.log("openLightbox");
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
        const mediaIndex = Array.from(mediaElements).indexOf(event.target);
        console.log(mediaIndex);
        let sortedMedia = media;
        console.log(sortedMedia);
        console.log(sortCriteria);
        if (sortCriteria) {
          sortedMedia = sortMedia(sortCriteria, media);
          console.log(sortedMedia);
        }
        // eslint-disable-next-line no-undef
        lightboxFactory(sortedMedia, mediaIndex);
      } else {
        console.error("Photographer medias not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fonction de tri des médias
  function sortMedia(sortCriteria, mediaArray) {
    console.log("sortMedia");
    console.log("Comparaison avant tri :", mediaArray);
    console.log("sortCriteria:", sortCriteria);

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
        console.error("Invalid sort criteria:", sortCriteria);
        return false;
    }
    console.log("Comparaison après tri :", mediaArray);
    return mediaArray;
  }
}

// eslint-disable-next-line no-unused-vars
async function closeLightbox() {
  console.log("closeLightbox");
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  const main = document.getElementById("main");
  main.classList.remove("blur");
  const header = document.querySelector("header");
  header.classList.remove("blur");
}
