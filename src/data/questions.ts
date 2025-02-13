import { Option } from "../entities/questions";

export const questions: {
  id: number;
  question: string;
  options: Option[];
  answer: string;
}[] = [
  {
    id: 1,
    question: "Qual a primeira marchinha de carnaval?",
    options: [
      { text: "Sassaricando", audio: "/audios/sassaricando.mp3" },
      { text: "Mamãe eu quero", audio: "/audios/mamae_eu_quero.mp3" },
      { text: "Allah-lá-ô", audio: "/audios/allah_la_o.mp3" },
      { text: "Ô abre alas", audio: "/audios/o_abre_alas.mp3" },
    ],
    answer: "Ô abre alas",
  },
  {
    id: 2,
    question: "Quem foi o (a) compositor (a) da primeira marchinha?",
    options: [
      { text: "Lamartine Babo" },
      { text: "Chiquinha Gonzaga" },
      { text: "Ary Barroso" },
      { text: "Braguinha" },
    ],
    answer: "Chiquinha Gonzaga",
  },
  {
    id: 3,
    question: "Em que ano foi composta a primeira marchinha?",
    options: [
      { text: "1910" },
      { text: "1900" },
      { text: "1899" },
      { text: "1916" },
    ],
    answer: "1899",
  },
  {
    id: 4,
    question: "Qual a menor máscara do mundo?",
    options: [
      { text: "Lágrima", image: "/images/lagrima.svg" },
      { text: "Nariz de palhaço", image: "/images/nariz.svg" },
      { text: "Luvas", image: "/images/luvas.svg" },
      { text: "Peruca", image: "/images/peruca.svg" },
    ],
    answer: "Nariz de palhaço",
  },
  {
    id: 5,
    question: "O que significa o corso no carnaval?",
    options: [
      { text: "Uma fantasia" },
      { text: "Um tipo de dança" },
      { text: "Grupo de fantasiados" },
      {
        text: "Desfiles de carros ornamentados com foliões",
      },
    ],
    answer: "Desfiles de carros ornamentados com foliões fantasiados",
  },
  {
    id: 6,
    question: "Como surgiu o confete?",
    options: [
      { text: "Em uma fábrica de papel", image: "/images/papel.svg" },
      {
        text: "Em Roma em forma de confeitos",
        image: "/images/confeitos.svg",
      },
      {
        text: "Nos carnavais de rua do Brasil",
        image: "/images/guarda-chuva.svg",
      },
      { text: "Na Grécia em 1832", image: "/images/grecia.svg" },
    ],
    answer: "Em Roma em forma de confeitos",
  },
  {
    id: 7,
    question: "Como começaram a jogar serpentina?",
    options: [
      { text: "Pelas ruas" },
      { text: "Nos clubes nos antigos bailes" },
      { text: "Nas janelas dos prédios" },
      { text: "Nos corsos" },
    ],
    answer: "Nas janelas dos prédios",
  },
  {
    id: 8,
    question: "Qual marchinha foi gravada por Moacyr Franco?",
    options: [
      { text: "Saca-rolha", audio: "/audios/saca_rolha.mp3" },
      { text: "Cidade maravilhosa", audio: "/audios/cidade_maravilhosa.mp3" },
      {
        text: "Me dá um dinheiro aí",
        audio: "/audios/me_da_um_dinheiro_ai.mp3",
      },
      { text: "Turma do funil", audio: "/audios/turma_do_funil.mp3" },
    ],
    answer: "Me dá um dinheiro aí",
  },
  {
    id: 9,
    question: "Quem foi o compositor da marchinha 'A jardineira'?",
    options: [
      { text: "Lamartine Babo" },
      { text: "Humberto Porto" },
      { text: "Ary Barroso" },
      { text: "Braguinha" },
    ],
    answer: "Humberto Porto",
  },
  {
    id: 10,
    question: "Quem gravou a marchinha 'Bandeira branca'?",
    options: [
      { text: "Marlene" },
      { text: "Dalva de Oliveira" },
      { text: "Emilinha Borba" },
      { text: "Isaurinha Garcia" },
    ],
    answer: "Dalva de Oliveira",
  },
];
