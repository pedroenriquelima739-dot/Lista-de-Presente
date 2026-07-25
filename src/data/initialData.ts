import { GiftItem, WeddingInfo } from '../types';

export const INITIAL_WEDDING_INFO: WeddingInfo = {
  coupleNames: 'THAYNÁ & JOELTON',
  headlineQuote: 'Nosso "felizes para sempre" começa aqui.',
  subQuote: 'Guarde esta data e celebre com a gente!',
  weddingDate: '15/11/2026',
  pixKey: 'thayna.joelton.casamento@gmail.com',
  pixName: 'Thayná & Joelton',
  pixBank: 'Banco do Brasil',
  contactWhatsapp: '5511999999999',
};

export const INITIAL_GIFTS: GiftItem[] = [
  // SALA
  { id: 'sala-1', name: 'Cortina', category: 'SALA', isReserved: false },
  { id: 'sala-2', name: 'Abajur', category: 'SALA', isReserved: false },
  { id: 'sala-3', name: 'Tapete', category: 'SALA', isReserved: false },
  { id: 'sala-4', name: 'Relógio', category: 'SALA', isReserved: false },
  { id: 'sala-5', name: 'Quadro de parede', category: 'SALA', isReserved: false },

  // COZINHA
  { id: 'cozinha-1', name: 'Batedeira', category: 'COZINHA', isReserved: false },
  { id: 'cozinha-2', name: 'Torradeira', category: 'COZINHA', isReserved: false },
  { id: 'cozinha-3', name: 'Micro-ondas', category: 'COZINHA', isReserved: false },
  { id: 'cozinha-4', name: 'Aparelho de jantar', category: 'COZINHA', isReserved: false },
  { id: 'cozinha-5', name: 'Jarras de vidro', category: 'COZINHA', isReserved: false },
  { id: 'cozinha-6', name: 'Liquidificador', category: 'COZINHA', isReserved: false },
  { id: 'cozinha-7', name: 'Frigideira', category: 'COZINHA', isReserved: false },
  { id: 'cozinha-8', name: 'Lixeira Inox', category: 'COZINHA', isReserved: false },
  { id: 'cozinha-9', name: 'Jogo de taça', category: 'COZINHA', isReserved: false },

  // QUARTO
  { id: 'quarto-1', name: 'Jogo de cama', category: 'QUARTO', isReserved: false },
  { id: 'quarto-2', name: 'Edredom', category: 'QUARTO', isReserved: false },
  { id: 'quarto-3', name: 'Travesseiro', category: 'QUARTO', isReserved: false },
  { id: 'quarto-4', name: 'Ventilador', category: 'QUARTO', isReserved: false },
  { id: 'quarto-5', name: 'Espelho pequeno', category: 'QUARTO', isReserved: false },
];
