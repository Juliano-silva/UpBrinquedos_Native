export interface Toy {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  category: string;
  maxPeople: number;
  image: any;
  dimensions?: string;
  color?: string;
}

export const INFLATABLE_TOYS: Toy[] = [
  {
    id: "1",
    name: "Castelo Inflável Grande",
    description: "Castelo inflável colorido com piscina integrada",
    pricePerDay: 150,
    category: "Castelo",
    maxPeople: 8,
    dimensions: "4m x 3m x 2.5m",
    color: "Colorido",
    image: require("./icon.png"), // Placeholder - substituir com imagem real
  },
  {
    id: "2",
    name: "Piscina Inflável Premium",
    description: "Piscina inflável grande com paredes resistentes",
    pricePerDay: 80,
    category: "Piscina",
    maxPeople: 6,
    dimensions: "2.5m x 2m x 0.8m",
    color: "Azul",
    image: require("./icon.png"),
  },
  {
    id: "3",
    name: "Escorregador Inflável",
    description: "Escorregador grande com área de respingo",
    pricePerDay: 120,
    category: "Escorregador",
    maxPeople: 10,
    dimensions: "3.5m x 2m x 2.5m",
    color: "Colorido",
    image: require("./icon.png"),
  },
  {
    id: "4",
    name: "Piscina de Bolinhas",
    description: "Piscina com 1000 bolinhas coloridas incluídas",
    pricePerDay: 100,
    category: "Piscina",
    maxPeople: 8,
    dimensions: "2m x 2m x 1m",
    color: "Multicolorida",
    image: require("./icon.png"),
  },
  {
    id: "5",
    name: "Trampolim Inflável",
    description: "Trampolim com rede de proteção",
    pricePerDay: 130,
    category: "Trampolim",
    maxPeople: 6,
    dimensions: "2.5m x 2.5m x 1.5m",
    color: "Azul e Amarelo",
    image: require("./icon.png"),
  },
  {
    id: "6",
    name: "Casa do Pinguim",
    description: "Casinha inflável em formato de pinguim",
    pricePerDay: 90,
    category: "Casa",
    maxPeople: 4,
    dimensions: "1.8m x 1.5m x 1.8m",
    color: "Preto e Branco",
    image: require("./icon.png"),
  },
  {
    id: "7",
    name: "Combo Jogo de Tiro",
    description: "Castelo com jogo de tiro integrado",
    pricePerDay: 160,
    category: "Castelo",
    maxPeople: 10,
    dimensions: "4m x 3.5m x 3m",
    color: "Vermelho e Amarelo",
    image: require("./icon.png"),
  },
  {
    id: "8",
    name: "Escada Inflável",
    description: "Escada de corda com plataformas",
    pricePerDay: 70,
    category: "Acessório",
    maxPeople: 8,
    dimensions: "3m x 1.5m x 2m",
    color: "Laranja",
    image: require("./icon.png"),
  },
];
