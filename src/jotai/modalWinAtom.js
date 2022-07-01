import { atom } from 'jotai'

export const modalWinAtom = atom({
  playerWiner: 0,
  pokemonName: 0,
  open: false,
  imageURL: '',
  pokeColor: 'red'
})
