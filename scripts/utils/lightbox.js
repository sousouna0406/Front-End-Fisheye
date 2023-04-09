async function displayLightbox() {
  const mediaElements = document.querySelectorAll(".lightbox-trigger");
  const selectElement = document.getElementById("sort-select");
  mediaElements.forEach((element) => {
    element.addEventListener("click", openLightbox);
  });

  let sortCriteria = selectElement.value;
  selectElement.addEventListener("change", (event) => {
    sortCriteria = event.target.value;
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
        lightboxFactory(sortMedia(sortCriteria, media), mediaIndex);
      } else {
        console.error("Photographer medias not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    mediaElements.forEach((element) => {
      element.removeEventListener("click", openLightbox);
    });
  }
}

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
      mediaArray.sort((a, b) => new Date(a.date) - new Date(b.date));
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
