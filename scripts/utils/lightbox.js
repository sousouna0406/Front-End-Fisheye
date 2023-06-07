// eslint-disable-next-line no-unused-vars
async function displayLightbox() {
  let sortCriteria;
  const mediaElements = document.querySelectorAll(".lightbox-trigger");
  const selectElement = document.getElementById("sort-select-ul");
  mediaElements.forEach((element) => {
    console.log(element);
    element.addEventListener("click", openLightbox);
    element.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        console.log("hi");
      }
    });
  });

  selectElement.addEventListener("click", (event) => {
    sortCriteria = event.target.getAttribute("data-value");
    console.log(sortCriteria);
  });

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

      if (media) {
        const mediaIndex = Array.from(mediaElements).indexOf(event.target);
        let sortedMedia = media;
        if (sortCriteria) {
          sortedMedia = sortMedia(sortCriteria, media);
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
}

// eslint-disable-next-line no-unused-vars
async function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  const main = document.getElementById("main");
  main.classList.remove("blur");
  const header = document.querySelector("header");
  header.classList.remove("blur");
}

function sortMedia(sortCriteria, mediaArray) {
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
/*addEventListener("keydown", (event) => {
  if (lightbox.style.display && lightbox.style.display !== "none") {
    if (event.code === "ArrowLeft") {
      return prevMedia(media, index);
    }
    if (event.code === "ArrowRight") {
      return nextMedia(media, index);
    }
    // if (event.code === "Escape") {
    //   return closeMediaModal();
    // }
  }
  if (lightbox.style.display && lightbox.style.display !== "none") {
    if (event.code === "Escape") {
      lightbox.style.display = "none";
    }
  }
});*/