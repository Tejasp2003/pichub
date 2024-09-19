import axios from "axios";



const apiUrl = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_API_KEY}`;

const formatUrl = (param) => {
  //{q, page, category, order}
  let url = apiUrl + "&per_page=25&safesearch=true&editor_choice=true"; // this is useed when we have no param or no preference from the user. This will simply return the first 25 images from the api.

  if (!param) return url;

  let paramKeys = Object.keys(param);
  paramKeys.map((key) => {
    let value = key == "q" ? encodeURIComponent(param[key]) : param[key]; //understand this with an example: if the key is q, then we will encode the value of the key, otherwise we will just use the value as it is. let say your url is "https://pixabay.com/api/?key=45129367-a3ab32ab278cd966774a3e10e&per_page=25&safesearch=true&editor_choice=true&q=cat&category=animals&order=popular". In this url, the value of the key q is cat. So, we will encode this value. The value of the key category is animals. So, we will not encode this value.
    url += `&${key}=${value}`;
  });
  
  return url;
};

export const apiCall = async (param) => {
  try {
    const response = await axios.get(formatUrl(param));
    const { data } = response;
    return { success: true, data };
  } catch (error) {
    console.log("Something Went Wrong: ", error.message);
    return { success: false, error: error.message };
  }
};
