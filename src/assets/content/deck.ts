// Assets
import carlosCarta from "../images/carlos-carta.png";
import casteloCarta from "../images/castelo-carta.png";
import jorgeCarta from "../images/jorge-carta.png";
import lucasCarta from "../images/lucas-carta.png";
import nobileCarta from "../images/nobile-carta.png";
import pabloCarta from "../images/pablo-carta.png";
import sergioCarta from "../images/sergio-carta.png";
import silvanaCarta from "../images/silvana-carta.png";
import trojahnCarta from "../images/trojahn-carta.png";


// Types
import type { Card } from "_types/arena";

type Deck = {
  firstPlayer: Card[];
  secondPlayer: Card[];
};

export const deckContent: Deck = {
  firstPlayer: [
    {
      id: "a-carlos",
      teacher: "Carlão",
      nickname: "SpringBoot da Silva",
      image: carlosCarta,
      attributes: {
        aura: 99,
        recordeSupino: 99,
        estilo: 99,
        dificuldadeProva: 23,
        fatorMedo: 12,
      },
    },
    {
      id: "a-silvana",
      teacher: "Silvana",
      nickname: "Mestre dos Algoritmos",
      image: silvanaCarta,
      attributes: {
        aura: 76,
        recordeSupino: 34,
        estilo: 87,
        dificuldadeProva: 70,
        fatorMedo: 87,
      },
    },
    {
      id: "a-sergio",
      teacher: "Sérgio",
      nickname: "O Cientista",
      image: sergioCarta,
      attributes: {
        aura: 77,
        recordeSupino: 73,
        estilo: 84,
        dificuldadeProva: 71,
        fatorMedo: 33,
      },
    },
    {
      id: "a-trojahn",
      teacher: "Tiago",
      nickname: "O especialista da Web",
      image: trojahnCarta,
      attributes: {
        aura: 83,
        recordeSupino: 78,
        estilo: 83,
        dificuldadeProva: 91,
        fatorMedo: 72,
      },
    },
  ],
  secondPlayer: [
    {
      id: "b-jorge",
      teacher: "Jorge",
      nickname: "O Anfitrião das Estruturas de Dados",
      image: jorgeCarta,
      attributes: {
        aura: 79,
        recordeSupino: 62,
        estilo: 100,
        dificuldadeProva: 98,
        fatorMedo: 10,
      },
    },
    {
      id: "b-pablo",
      teacher: "Pablo",
      nickname: "O Bem-Humorado",
      image: pabloCarta,
      attributes: {
        aura: 79,
        recordeSupino: 80,
        estilo: 72,
        dificuldadeProva: 57,
        fatorMedo: 12,
      },
    },
    {
      id: "b-lucas",
      teacher: "Lucas",
      nickname: "O Chad",
      image: lucasCarta,
      attributes: {
        aura: 100,
        recordeSupino: 93,
        estilo: 78,
        dificuldadeProva: 98,
        fatorMedo: 99,
      },
    },
    {
      id: "b-castelo",
      teacher: "Castelo Branco",
      nickname: "O Sr. Redes",
      image: casteloCarta,
      attributes: {
        aura: 73,
        recordeSupino: 84,
        estilo: 72,
        dificuldadeProva: 80,
        fatorMedo: 76,
      },
    },
  ],
};

export default deckContent;
