// utils/fetchData.ts
export async function fetchCategoriesAndBrands() {
    try {
     
  
      const categories = await fetch('http://196.188.249.25:5000/user/categories', { cache: "no-store" }).json();
  
      // Check if the status is true and data is not empty
      if (categories.status) {
        return {
          categories: categories.data,
          brands: [],
        };
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        categories: [],
        brands: [],
      };
    }
}

// utils/fetchProducts.ts
export async function fetchProducts(searchParams: { [key: string]: string | string[] }) {
  // Convert searchParams to query string
  const query = Object.entries(searchParams)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&');
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join('&');

  try {
    const response = await fetch(`http://196.188.249.25:5000/user/products?${query}`,{ cache: "no-store" });
    const result = await response.json();

    if (result.status) {
      return result.data;
    } else {
      throw new Error(result.message || 'Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function fetchProductDetail(id: string) {
  const res = await fetch(`http://196.188.249.25:5000/user/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add other headers if necessary
    },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product details');
    
  }

  const data = await res.json();
  return data.data; // Adjust this based on your API response structure
}
