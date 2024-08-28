// client\js\index.js

console.log("Script loaded");

// Importing the getPhotoFromAPI function from services.js
import { getPhotoFromAPI } from "./services.js";

// Using Axios from CDN
const axios = window.axios;

document.addEventListener("DOMContentLoaded", async () => {
  const searchButton = document.querySelector("#searchButton");
  const searchInput = document.querySelector("#searchInput");

  // Function to fetch and display images
  const fetchAndDisplayImages = async (searchTerm, perPage) => {
    try {
      const data = await getPhotoFromAPI(searchTerm, perPage);
      displayImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Fetch images based on user search input when the search button is clicked
  searchButton.addEventListener("click", async () => {
    const searchTerm = searchInput.value.trim();
    await fetchAndDisplayImages(searchTerm);
  });
});

const displayImages = (data) => {
  const imageContainer = document.querySelector("#photoContainer");
  imageContainer.innerHTML = ""; // Clear existing images

  data.hits.forEach((hit) => {
    const img = document.createElement("img");
    img.src = hit.previewURL; // URL of the image
    img.alt = hit.tags;
    img.classList.add("home-image");
    imageContainer.appendChild(img);
  });
};
