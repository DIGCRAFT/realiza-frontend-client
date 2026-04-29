import axios from "axios";
import {
  ApiColor,
  ApiProductLine,
  ApiColorCategoryWithColors,
  CreateCustomerDto,
  Customer,
  CreateQuoteDto,
  Quote,
} from "@/types/api";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://realiza-aluminio-backend-latest.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProductLines = async (): Promise<ApiProductLine[]> => {
  const response = await api.get<ApiProductLine[]>("/products-lines");
  return response.data;
};

export const getColors = async (): Promise<ApiColor[]> => {
  const response = await api.get<ApiColor[]>("/colors");
  return response.data;
};

export const getColorCategories = async (): Promise<
  ApiColorCategoryWithColors[]
> => {
  const response =
    await api.get<ApiColorCategoryWithColors[]>("/colors-categories");
  return response.data;
};

export const createCustomer = async (
  customer: CreateCustomerDto,
): Promise<Customer> => {
  const response = await api.post<Customer>("/customers", customer);
  return response.data;
};

export const createQuote = async (quote: CreateQuoteDto): Promise<Quote> => {
  const response = await api.post<Quote>("/quotes", quote);
  return response.data;
};

export default api;
