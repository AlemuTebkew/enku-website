// utils/apiUtils.ts
import { buildApiUrl } from './apiBase';

async function fetchData(
  url: string,
  options: RequestInit = { cache: "no-store" }
) {
  try {
    const fullUrl = buildApiUrl(url);
    console.log('[fetchData] Making request to:', fullUrl);
    const res = await fetch(fullUrl, options);
    console.log('[fetchData] Response status:', res.status, res.statusText);
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await res.json();
    console.log('[fetchData] Response data:', data);
    console.log('[fetchData] Returning data.data:', data.data);
    return data.data;
  } catch (error) {
    console.error(`[fetchData] Error fetching data from ${url}:`, error);
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
  [key: string]: string | string[] | undefined;
}) {
  const query = new URLSearchParams();

  // Prioritize categoryId - it's the most reliable identifier
  // Only include valid, non-empty parameters
  Object.entries(searchParams).forEach(([key, value]) => {
    // Skip undefined, null, or empty values
    if (!value) return;
    
    // Skip the 'category' parameter if we have categoryId (backend might prefer categoryId)
    // But still include it if categoryId is not present
    if (key === 'category' && searchParams.categoryId) {
      return; // Skip category name if we have categoryId
    }
    
    // Handle arrays
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v && typeof v === 'string' && v.trim()) {
          // Clean up malformed values (remove trailing && or =)
          const cleanValue = v.trim().replace(/[&=]+$/, '').replace(/\&\&/g, '&');
          if (cleanValue) {
            query.append(key, cleanValue);
          }
        }
      });
    } else if (typeof value === 'string' && value.trim()) {
      // Clean up the value - remove extra &&, trailing =, and whitespace
      const cleanValue = value.trim().replace(/[&=]+$/, '').replace(/\&\&/g, '&');
      if (cleanValue) {
        query.append(key, cleanValue);
      }
    }
  });

  const url = `/user/products?${query.toString()}`;
  console.log('[fetchProducts] Fetching products from:', url);
  console.log('[fetchProducts] Query params:', Object.fromEntries(query));
  const result = await fetchData(url);
  console.log('[fetchProducts] Products fetched:', result);
  console.log('[fetchProducts] Products count:', result?.length);
  return result || [];
}

export async function fetchProductDetail(id: string) {
  return fetchData(`/user/products/${id}`);
}

export async function fetchBestSellingProducts(limit: number = 10) {
  // Fetch products - you may want to add a specific endpoint for best selling
  // For now, we'll fetch all products and the backend/you can filter
  const result = await fetchData(`/user/products?limit=${limit}&sort=popular`);
  return result || [];
}

export async function fetchMostViewedProducts(limit: number = 10) {
  // Fetch most viewed products
  const result = await fetchData(`/user/products?limit=${limit}&sort=views`);
  return result || [];
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
