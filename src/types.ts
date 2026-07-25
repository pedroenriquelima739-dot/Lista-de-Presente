export interface GiftItem {
  id: string;
  name: string;
  category: 'SALA' | 'COZINHA' | 'QUARTO' | string;
  isReserved: boolean;
  reservedBy?: string;
  reservedMessage?: string;
  reservedAt?: string;
  suggestedPrice?: number;
  storeUrl?: string;
  isCustom?: boolean;
}

export type CategoryType = 'SALA' | 'COZINHA' | 'QUARTO' | string;

export interface WeddingInfo {
  coupleNames: string;
  headlineQuote: string;
  subQuote: string;
  weddingDate?: string;
  pixKey?: string;
  pixQrUrl?: string;
  pixName?: string;
  pixBank?: string;
  contactWhatsapp?: string;
}
