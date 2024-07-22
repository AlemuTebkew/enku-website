export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category?: Category;
    subCategory?: SubCategory,
    subSubCategory?: SubSubCategory,
    brand?: Brand,
    productionDate?: string,
    expiryDate?: string,
    variations?: Variation[],
    images?: string[];
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

interface Option {
  id: string;
  name: string;
}

interface OptionValue {
  id: string;
  value: string;
  option: Option;
}

interface Variation {
  id: string;
  sku: string;
  price: number | null;
  quantity: number;
  optionValues: OptionValue[];
}