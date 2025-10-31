// utils/apiUtils.ts
import { buildApiUrl } from './apiBase';

async function fetchData(
  url: string,
  options: RequestInit = { cache: "no-store" }
) {
  try {
    const res = await fetch(`${buildApiUrl(url)}`, options);
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
async function fetchPaginatedData(
  url: string,
  options: RequestInit = { cache: "no-store" }
) {
  try {
    const res = await fetch(`${buildApiUrl(url)}`, options);
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
}

// utils/fetchData.ts
export async function fetchCategoriesAndBrands() {
  try {
    const [categories, brands] = await Promise.all([
      fetchData("/user/categories"),
      fetchData("/admin/brands"),
    ]);
    return { categories, brands };
  } catch (error) {
    return { categories: [], brands: [] };
  }
}


// utils/fetchProducts.ts
export async function fetchProducts(searchParams: {
  [key: string]: string | string[];
}) {
  const query = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, v));
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
  return fetchData(
    `/user/products/search?keyword=${encodeURIComponent(searchString)}`
  );
}

export async function fetchCards() {
  return fetchData("/user/cards");
}
export async function fetchProfile(id: string) {
  return fetchData(`/user/me/${id}`);
}
export async function fetchBlogs(params: {
  page?: number;
  limit?: number;
  type?: string;
  search?: string;
}) {
  const query = new URLSearchParams();

  // Add the pagination params if they exist
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.search) query.append("search", params.search.toString());
  if (params.type && params.type !== "all") query.append("type", params.type); // Only send type if not 'all'

  // Pass the query string to fetchPaginatedData
  return fetchPaginatedData(`/user/blogs?${query.toString()}`);
}

export async function fetchBlog(id: string) {
  return fetchData(`/user/blogs/${id}`);
}

export async function fetchTips() {
  return fetchData("/user/tips");
}

export async function fetchVideos() {
  return fetchData("/user/videos");
}
export async function setDiscounts() {
  return fetchData("/user/discounts");
}

export async function fetchDiscounts() {
  return fetchData("/user/discounts");
}
