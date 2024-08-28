// client/js/services.js
console.log("services.js loaded");

export const getPhotoFromAPI = async (word = "", perPage = 10) => {
  try {
    const endpoint = "http://localhost:3000/pixabay/images";
    let response = await axios.get(endpoint, {
      params: { search: word, perPage: perPage },
    });
    console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo data:", error);
  }
};
