// client\js\index.js
import { getPhotoFromAPI } from "./services.js";
console.log("Script loaded");

// Using Axios from CDN
// const axios = window.axios;

document.addEventListener("DOMContentLoaded", async () => {
  // document of buttons
  const searchButton = document.querySelector("#searchButton");
  const searchInput = document.querySelector("#searchInput");
  const loadMoreButton = document.querySelector("#loadButton");

  // document of modal
  const modal = document.querySelector("#imageModal");
  const closeModalButton = document.querySelector(".home-close-btn");

  let currentPage = 1; // Tracks the current page of images
  let searchTerm = searchInput.value.trim();

  // Function to fetch and display images
  const fetchAndDisplayImages = async (word = "", page = 1) => {
    try {
      const data = await getPhotoFromAPI(word, page);
      displayImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Fetch and display the first 10 images on page load
  await fetchAndDisplayImages();

  // Events Buttons home
  // Fetch images based on user search input when the search button is clicked
  searchButton.addEventListener("click", async () => {
    clearExistingImages();
    currentPage = 1; // Reset to the first page
    await fetchAndDisplayImages(searchTerm, currentPage);
  });

  // Load more images when the "Load More Images" button is clicked
  loadMoreButton.addEventListener("click", async () => {
    currentPage += 1; // Increment the page count to load the next set of images
    await fetchAndDisplayImages(searchTerm, currentPage);
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

const displayImages = (data) => {
  const imageContainer = document.querySelector("#photoContainer");

  data.hits.forEach((photo) => {
    const img = document.createElement("img");
    img.src = photo.previewURL; // URL of the image
    img.alt = photo.tags;
    img.classList.add("home-image");
    img.addEventListener("click", () => openModal(photo)); // open modal
    imageContainer.appendChild(img);
  });
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
