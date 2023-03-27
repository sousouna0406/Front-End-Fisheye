async function displayLightbox() {
  const mediaElements = document.querySelectorAll(".lightbox-trigger");

  mediaElements.forEach((element) => {
    element.addEventListener("click", openLightbox);
  });

  async function openLightbox(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const photographeId = urlParams.get("id");
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "block";

    try {
      const response = await fetch("../data/photographers.json");
      const data = await response.json();
      const media = data.media.filter(
        (media) => media.photographerId == photographeId
      );

      if (media) {
        const mediaIndex = Array.from(mediaElements).indexOf(event.target);
        console.log(mediaIndex);

        lightboxFactory(media, mediaIndex);
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
}
