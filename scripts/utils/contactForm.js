async function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  const main = document.getElementById("main");
  main.classList.remove("blur");
}

async function displayModal() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographeId = urlParams.get("id");
  console.log(photographeId);
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  const main = document.getElementById("main");
  main.classList.add("blur");

  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    console.log("Data reçu:", data);
    const photographer = data.photographers.find(
      (photographer) => photographer.id == photographeId
    );
    if (photographer) {
      console.log("Photographer Name: ", photographer.name);
      modalFactory(photographer);
    } else {
      console.error("Photographer not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const form = modal.querySelector("form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("e-mail").value;
    const message = document.getElementById("textarea").value;
    console.log({
      firstName,
      lastName,
      email,
      message,
    });
  });
}
