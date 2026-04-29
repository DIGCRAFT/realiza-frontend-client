export interface ApiColorCategory {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiColor {
  id: string;
  name: string;
  displayName: string | null;
  hexCode: string | null;
  imageSrc: string | null;
  slatImageSrc: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  colorCategories: ApiColorCategory[];
  productLines: ApiProductLine[];
}

export interface ApiProductLine {
  id: string;
  name: string;
  displayName: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  colors: ApiColor[];
}

export interface ApiColorCategoryWithColors extends ApiColorCategory {
  colors: Omit<ApiColor, "colorCategories" | "productLines">[];
}

export interface CustomerAddress {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface CustomerContact {
  type: "phone" | "email" | "whatsapp";
  value: string;
}

export interface Customer {
  id: string;
  name: string;
  addresses: CustomerAddress[];
  customerContacts: CustomerContact[];
}

export interface CreateCustomerDto {
  name: string;
  addresses: CustomerAddress[];
  customerContacts: CustomerContact[];
}

export interface CreateQuoteDto {
  linha: string;
  cor: string;
}

export interface Quote {
  id: string;
  linha: string;
  cor: string;
  createdAt: string;
}
