// utils/fetchData.ts
export async function fetchCategoriesAndBrands() {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        fetch('http://ec2-3-91-23-59.compute-1.amazonaws.com:5000/user/categories', { cache: "no-store" }),
        fetch('http://ec2-3-91-23-59.compute-1.amazonaws.com:5000/admin/brands', { cache: "no-store" })
      ]);
  
      const categories = await categoriesRes.json();
      const brands = await brandsRes.json();
  
      // Check if the status is true and data is not empty
      if (categories.status && brands.status) {
        return {
          categories: categories.data,
          brands: brands.data,
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