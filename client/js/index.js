// client\js\index.js
import { getPhotoFromAPI } from "./services.js";
console.log("Script loaded");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentPage = 1; // Tracks the current page of images

// Function to fetch and display images
const fetchAndDisplayImages = async (word = "", page = 1, perPage = 10) => {
  try {
    const data = await getPhotoFromAPI(word, page, perPage);
    displayImages(data.hits);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  // document of buttons
  const searchButton = document.querySelector("#searchButton");
  const searchInput = document.querySelector("#searchInput");
  const loadMoreButton = document.querySelector("#loadButton");
  const favoritesButton = document.querySelector("#favoritesButton");

  // document of modal
  const modal = document.querySelector("#imageModal");
  const closeModalButton = document.querySelector(".home-close-btn");

  // Fetch and display the first 10 images on page load
  await fetchAndDisplayImages();

  // Events Buttons home
  // Fetch images based on user search input when the search button is clicked
  searchButton.addEventListener("click", async () => {
    clearExistingImages();
    const searchTerm = searchInput.value.trim();
    currentPage = 1; // Reset to the first page

    await fetchAndDisplayImages(searchTerm, currentPage);

    // Show the "Load More Images" button and Hide the "Back" button
    loadMoreButton.style.display = "block";
    backButton.style.display = "none";
  });

  // Load more images when the "Load More Images" button is clicked
  loadMoreButton.addEventListener("click", async () => {
    const searchTerm = searchInput.value.trim();
    currentPage += 1; // Increment the page count to load the next set of images
    await fetchAndDisplayImages(searchTerm, currentPage);
  });

  // Show the favorites images when the "Show Favorites" button is clicked
  favoritesButton.addEventListener("click", () => {
    clearExistingImages();
    displayImages(favorites);

    // Show the "Back" button and Hide the "Load More Images" button
    loadMoreButton.style.display = "none";
    backButton.style.display = "block";
  });

  // Show the previous set of images when the "Back" button is clicked
  backButton.addEventListener("click", async () => {
    clearExistingImages();
    const searchTerm = searchInput.value.trim();
    await fetchAndDisplayImages(searchTerm, 1, currentPage * 10);

    // Show the "Load More Images" button and Hide the "Back" button
    loadMoreButton.style.display = "block";
    backButton.style.display = "none";
  });

  // Events Close modal (button or outside)
  // Close modal when close button is clicked
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside of modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Clear existing images
const clearExistingImages = () => {
  const imageContainer = document.querySelector("#photoContainer");
  imageContainer.innerHTML = "";
};

// display Images in <main>
const displayImages = (photos) => {
  const imageContainer = document.querySelector("#photoContainer");

  photos.forEach((photo) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("home-image-container");

    const img = document.createElement("img");
    img.src = photo.previewURL; // URL of the image
    img.alt = photo.tags;
    img.classList.add("home-image");
    img.addEventListener("click", () => openModal(photo)); // open modal

    // favorite icon
    const star = document.createElement("span");
    star.classList.add("home-favorite-icon");
    star.innerHTML = favorites.some((fav) => fav.id === photo.id) ? "★" : "☆";
    star.classList.toggle(
      "favorited",
      favorites.some((fav) => fav.id === photo.id)
    );
    star.addEventListener("click", () => toggleFavorite(photo, star));

    // Overlay for likes and views
    const overlay = document.createElement("div");
    overlay.classList.add("home-image-overlay");
    overlay.innerHTML = `❤️ ${photo.likes}  👁️ ${photo.views}`;

    imgContainer.appendChild(img);
    imgContainer.appendChild(star);
    imgContainer.appendChild(overlay); // Append overlay to container
    imageContainer.appendChild(imgContainer);
  });
};

const toggleFavorite = (photo, starElement) => {
  const index = favorites.findIndex((fav) => fav.id === photo.id);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(photo);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  starElement.innerHTML = index > -1 ? "☆" : "★";
  starElement.classList.toggle("favorited", index === -1);
};

// Function to open the modal with image details
const openModal = (imageData) => {
  const modal = document.querySelector("#imageModal");
  const modalImage = document.querySelector("#modalImage");
  const modalTags = document.querySelector("#modalTags");
  const modalUser = document.querySelector("#modalUser");
  const modalViews = document.querySelector("#modalViews");
  const modalDownloads = document.querySelector("#modalDownloads");
  const modalLikes = document.querySelector("#modalLikes");
  const modalLink = document.querySelector("#modalLink");

  // Set the modal image source and details
  modalImage.src = imageData.largeImageURL;
  modalTags.textContent = imageData.tags;
  modalUser.textContent = imageData.user;
  modalViews.textContent = imageData.views;
  modalDownloads.textContent = imageData.downloads;
  modalLikes.textContent = imageData.likes;
  modalLink.href = imageData.pageURL;

  // Show the modal
  modal.style.display = "block";
};
