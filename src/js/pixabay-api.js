import axios from 'axios';

const API_KEY = '50330405-e061f8fa8a72024873dc0b5e5';
const BASE_URL = 'https://pixabay.com/api/';
const PAGE_SIZE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PAGE_SIZE,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
