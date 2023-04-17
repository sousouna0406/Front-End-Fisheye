function lightboxFactory(media, index) {
  const { image, video, title, photographerId } = media[index];
  const lightboxContent = document.querySelector(".lightbox-content");
  const lightboxElement = document.createElement("div");
  lightboxElement.classList.add("lightbox-element");

  const mediaPath = `assets/images/${photographerId}/`;
  const mediaUrl = `${mediaPath}${video || image}`;
  const isVideo = Boolean(video);

  const mediaElement = isVideo
    ? document.createElement("video")
    : document.createElement("img");
  mediaElement.src = mediaUrl;
  mediaElement.alt = isVideo ? `Video` : `Photo`;
  mediaElement.classList.add("lightbox-trigger");
  if (isVideo) {
    mediaElement.controls = true;
  }

  const titleParagraphe = document.createElement("p");
  titleParagraphe.textContent = title;
  lightboxElement.appendChild(titleParagraphe);

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.onclick = closeLightbox;
  const xIcon = document.createElement("i");
  xIcon.classList.add("fa-solid", "fa-xmark");
  closeBtn.appendChild(xIcon);

  const leftBtn = document.createElement("span");
  leftBtn.classList.add("left");
  leftBtn.onclick = () => prevMedia(media, index);
  const leftChevronIcon = document.createElement("i");
  leftChevronIcon.classList.add("fa-sharp", "fa-solid", "fa-chevron-left");
  leftBtn.appendChild(leftChevronIcon);

  const rightBtn = document.createElement("span");
  rightBtn.classList.add("right");
  rightBtn.onclick = () => nextMedia(media, index);
  const rightChevronIcon = document.createElement("i");
  rightChevronIcon.classList.add("fa-solid", "fa-chevron-right");
  rightBtn.appendChild(rightChevronIcon);
  lightboxElement.appendChild(leftBtn);
  lightboxElement.appendChild(mediaElement);
  lightboxElement.appendChild(closeBtn);

  lightboxElement.appendChild(rightBtn);

  lightboxContent.innerHTML = "";
  lightboxContent.appendChild(lightboxElement);

  function nextMedia(media, index) {
    if (index < media.length - 1) {
      lightboxFactory(media, index + 1);
    }
  }

  function prevMedia(media, index) {
    if (index > 0) {
      lightboxFactory(media, index - 1);
    }
  }

  return { lightboxContent };
}
