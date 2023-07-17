/* Factory pour créer et afficher le contenu de la lightbox */

// eslint-disable-next-line no-unused-vars
function lightboxFactory() {
  // Fonction interne pour créer et afficher le contenu de la lightbox
  function createLightbox(media, index) {
    const { image, video, title, photographerId } = media[index];
    const lightboxContent = document.querySelector(".lightbox-content");
    const lightboxElement = document.createElement("div");
    lightboxElement.classList.add("lightbox-element");

    const mediaPath = `assets/images/${photographerId}/`;
    const mediaUrl = `${mediaPath}${video || image}`;
    const isVideo = Boolean(video);

    // Création d'une image ou vidéo
    const mediaElement = isVideo
      ? document.createElement("video")
      : document.createElement("img");
    mediaElement.src = mediaUrl;
    mediaElement.alt = isVideo ? `Video` : `Photo`;
    mediaElement.setAttribute("tabindex", "0");
    mediaElement.classList.add("lightbox-trigger");
    if (isVideo) {
      mediaElement.controls = true;
    }

    const titleParagraphe = document.createElement("p");
    titleParagraphe.setAttribute("tabindex", "0");
    titleParagraphe.textContent = title;
    lightboxElement.appendChild(titleParagraphe);

    const closeBtn = document.createElement("span");
    closeBtn.setAttribute("tabindex", "0");
    closeBtn.classList.add("close");
    // eslint-disable-next-line no-undef
    closeBtn.onclick = closeLightbox;
    closeBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        // eslint-disable-next-line no-undef
        closeLightbox();
      }
    });
    const xIcon = document.createElement("i");
    xIcon.classList.add("fa-solid", "fa-xmark");
    closeBtn.appendChild(xIcon);

    // Création des éléments de navigation gauche et droite
    const leftBtn = document.createElement("span");
    leftBtn.setAttribute("tabindex", "0");
    leftBtn.classList.add("left");
    leftBtn.onclick = () => prevMedia(media, index);
    leftBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        prevMedia(media, index);
      }
    });
    const leftChevronIcon = document.createElement("i");
    leftChevronIcon.classList.add("fa-sharp", "fa-solid", "fa-chevron-left");
    leftBtn.appendChild(leftChevronIcon);

    const rightBtn = document.createElement("span");
    rightBtn.classList.add("right");
    rightBtn.setAttribute("tabindex", "0");
    rightBtn.onclick = () => nextMedia(media, index);
    rightBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        nextMedia(media, index);
      }
    });

    const rightChevronIcon = document.createElement("i");
    rightChevronIcon.classList.add("fa-solid", "fa-chevron-right");
    rightBtn.appendChild(rightChevronIcon);
    lightboxElement.appendChild(leftBtn);
    lightboxElement.appendChild(mediaElement);
    lightboxElement.appendChild(closeBtn);

    lightboxElement.appendChild(rightBtn);

    lightboxContent.innerHTML = "";
    lightboxContent.appendChild(lightboxElement);

    // Fonction pour passer au média suivant
    function nextMedia(media, index) {
      if (index < media.length - 1) {
        createLightbox(media, index + 1);
      }
    }

    // Fonction pour passer au média précédent
    function prevMedia(media, index) {
      if (index > 0) {
        createLightbox(media, index - 1);
      }
    }

    // Fonction pour gérer le focus dans la lightbox
    function handleLightboxFocus(e) {
      const focusableElements = lightboxElement.querySelectorAll(
        "p:not([disabled]),img:not([disabled]), span:not([disabled]) "
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    const focusableElements = lightboxElement.querySelectorAll(
      "p:not([disabled]),img:not([disabled]), span:not([disabled]) "
    );
    const firstElement = focusableElements[0];
    lightboxElement.addEventListener("keydown", handleLightboxFocus);
    firstElement.focus();

    return { lightboxContent };
  }

  return { createLightbox };
}
