// utils/apiUtils.ts
// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'http://196.188.249.25:5000';

async function fetchData(url: string, options: RequestInit = { cache: "no-store" }) {
  try {
    const res = await fetch(`${BASE_URL}${url}`, options);
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
}

// utils/fetchData.ts
export async function fetchCategoriesAndBrands() {
  const [categories, brands] = await Promise.all([
    fetchData('/user/categories'),
    fetchData('/admin/brands')
  ]);

  return categories && brands
    ? { categories, brands }
    : { categories: [], brands: [] };
}

// utils/fetchProducts.ts
export async function fetchProducts(searchParams: { [key: string]: string | string[] }) {
  const query = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => query.append(key, v));
    } else {
      query.append(key, value);
    }
  });

  return fetchData(`/user/products?${query.toString()}`);
}

export async function fetchProductDetail(id: string) {
  return fetchData(`/user/products/${id}`);
}

export async function search(searchString: string) {
  return fetchData(`/user/products/search?keyword=${encodeURIComponent(searchString)}`);
}

export async function fetchCards() {
  return fetchData('/user/cards');
}

export async function fetchTips() {
  return fetchData('/user/tips');
}

export async function fetchVideos() {
  return fetchData('/user/videos');
}

export async function fetchDiscounts() {
  return fetchData('/user/discounts');
}
