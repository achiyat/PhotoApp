// client/js/services.js
console.log("services.js loaded");

export const getPhotoFromAPI = async (_word = "", _page = 1, _perPage = 10) => {
  try {
    const endpoint = "http://localhost:3000/pixabay/images";
    console.log(_word, _page, _perPage);
    let response = await axios.get(endpoint, {
      params: { search: _word, page: _page, perPage: _perPage },
    });
    console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo data:", error);
  }
};
