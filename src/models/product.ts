export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category: Category;
    subCategory: SubCategory,
    subSubCategory: SubSubCategory,
    brand: Brand
}


interface SubSubCategory {
  id?: string;
  name: string;
}

interface SubCategory {
  id?: string;
  name: string;
  subSubCategories?: SubSubCategory[];
}

interface Category {
  id?: string;
  name: string;
  description?: string;
  subCategories?: SubCategory[];
}

interface Brand {
  id?: string,
  name: string
}