import { atom } from 'jotai'

export const player1Atom = atom({
  wins: 0,
  pokemonIndexSelected: undefined,
  lives: 0,
  attack: 0,
  pokemonInfo: undefined,
  pokemonSpecies: undefined
})
