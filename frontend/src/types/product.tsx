export interface NutritionValue {
  energy: number;
  fat: number;
  protein: number;
  carbohydrates: number;
  sugar: number;
}

export interface Product {
  mrp: number;
  _id: string;
  name: string;
  category: string;
  price: number;
  weight: string;
  ingredients: string[];
  recipe: string;
  nutritionValue: NutritionValue;
  fileName: string;
  originalName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: number;
  weight: string;
  ingredients: string[];
  recipe: string;
  nutritionValue: NutritionValue;
  fileName?: string;
  originalName?: string;
} 