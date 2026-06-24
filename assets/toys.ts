export interface Toy {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  category: string;
  categoryIcon: string;
  maxPeople: number;
  image: any;
  dimensions?: string;
  color?: string;
  featured?: boolean;
}

export const INFLATABLE_TOYS: Toy[] = [
  {
    id: "1",
    name: "Castelo Inflável Grande",
    description: "Castelo inflável colorido com escorregador integrado, ideal para festas e eventos infantis",
    pricePerDay: 150,
    category: "Castelo",
    categoryIcon: "🏰",
    maxPeople: 8,
    dimensions: "4m x 3m x 2.5m",
    color: "Colorido",
    featured: true,
    image: require("./toys/castelo_inflavel.png"),
  },
  {
    id: "2",
    name: "Piscina Inflável Premium",
    description: "Piscina inflável grande com paredes reforçadas, perfeita para refrescar a garotada",
    pricePerDay: 80,
    category: "Piscina",
    categoryIcon: "🏊",
    maxPeople: 6,
    dimensions: "2.5m x 2m x 0.8m",
    color: "Azul",
    image: require("./toys/piscina_inflavel.png"),
  },
  {
    id: "3",
    name: "Escorregador Inflável",
    description: "Escorregador gigante com área de respingo e piscina ao final, diversão garantida",
    pricePerDay: 120,
    category: "Escorregador",
    categoryIcon: "🎢",
    maxPeople: 10,
    dimensions: "3.5m x 2m x 2.5m",
    color: "Colorido",
    featured: true,
    image: require("./toys/escorregador_inflavel.png"),
  },
  {
    id: "4",
    name: "Piscina de Bolinhas",
    description: "Piscina com mais de 1000 bolinhas coloridas incluídas, estimula a coordenação motora",
    pricePerDay: 100,
    category: "Piscina",
    categoryIcon: "🔵",
    maxPeople: 8,
    dimensions: "2m x 2m x 1m",
    color: "Multicolorida",
    image: require("./toys/piscina_bolinhas.png"),
  },
  {
    id: "5",
    name: "Trampolim Inflável",
    description: "Trampolim com rede de proteção total, saltos seguros e muito divertidos",
    pricePerDay: 130,
    category: "Trampolim",
    categoryIcon: "⬆️",
    maxPeople: 6,
    dimensions: "2.5m x 2.5m x 1.5m",
    color: "Azul e Amarelo",
    image: require("./toys/trampolim_inflavel.png"),
  },
  {
    id: "6",
    name: "Casa do Pinguim",
    description: "Casinha inflável fofa em formato de pinguim, encanta crianças de todas as idades",
    pricePerDay: 90,
    category: "Casa",
    categoryIcon: "🐧",
    maxPeople: 4,
    dimensions: "1.8m x 1.5m x 1.8m",
    color: "Preto e Branco",
    image: require("./toys/casa_pinguim.png"),
  },
  {
    id: "7",
    name: "Combo Jogo de Tiro",
    description: "Castelo inflável com jogo de tiro integrado, competição saudável e muita animação",
    pricePerDay: 160,
    category: "Castelo",
    categoryIcon: "🎯",
    maxPeople: 10,
    dimensions: "4m x 3.5m x 3m",
    color: "Vermelho e Amarelo",
    featured: true,
    image: require("./toys/combo_jogo_tiro.png"),
  },
  {
    id: "8",
    name: "Escada Inflável",
    description: "Escada de obstáculos com plataformas infláveis, desafio e adrenalina para os pequenos",
    pricePerDay: 70,
    category: "Acessório",
    categoryIcon: "🪜",
    maxPeople: 8,
    dimensions: "3m x 1.5m x 2m",
    color: "Laranja",
    image: require("./toys/escada_inflavel.png"),
  },
  
];
