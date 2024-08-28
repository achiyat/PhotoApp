// client\js\index.js

console.log("Script loaded");

// Importing the getPhotoFromAPI function from services.js
import { getPhotoFromAPI } from "./services.js";

// Using Axios from CDN
const axios = window.axios;

document.addEventListener("DOMContentLoaded", async () => {
  const searchButton = document.querySelector("#searchButton");
  const searchInput = document.querySelector("#searchInput");
  const loadMoreButton = document.querySelector("#loadButton");

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
});

// Clear existing images
const clearExistingImages = () => {
  const imageContainer = document.querySelector("#photoContainer");
  imageContainer.innerHTML = "";
};

const displayImages = (data) => {
  const imageContainer = document.querySelector("#photoContainer");

  data.hits.forEach((hit) => {
    const img = document.createElement("img");
    img.src = hit.previewURL; // URL of the image
    img.alt = hit.tags;
    img.classList.add("home-image");
    imageContainer.appendChild(img);
  });
};
