interface SubSubCategory {
    id: string;
    name: string;
}
  
interface SubCategory {
    id: string;
    name: string;
    subSubCategories: SubSubCategory[];
}
  
export interface Category {
    id: string;
    name: string;
    description: string;
    subCategories: SubCategory[];
}
  