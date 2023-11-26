import axios from 'axios';

const APY_KEY = '19870120-8ec79e7454f8912b12bef551c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const params = new URLSearchParams({
  key: APY_KEY,
  orientation: 'horizontal',
  safesearch: true,
  image_type: 'photo',
  per_page: 40,
});

export async function fetchImgs(search, page) {
  const response = await axios.get(`?q=${search}&${params}&page=${page}`);

  if (response.status !== 200) {
    throw new Error('Some Error');
  }

  return response.data;
}
