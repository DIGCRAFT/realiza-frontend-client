/**
 * Tipos oficiais para o projeto Realiza Esquadrias
 */

export interface Color {
  id: string;
  name: string;
  hexCode?: string; // Opcional se tiver imagem
  image?: string;   // Caminho da imagem (ex: /images/preto-fosco.jpg)
  category: 'solid' | 'wood';
}

export interface ProductLineConfig {
  id: string;
  displayName: string;
  description: string;
  hasBonus?: boolean;
}

// Interfaces auxiliares para o formulário de orçamento
export interface ColorSelection {
  line: string;
  color: Color;
  quantity?: number;
  notes?: string;
}

export interface BudgetRequest {
  name: string;
  email: string;
  phone: string;
  selections: ColorSelection[];
  message?: string;
}
