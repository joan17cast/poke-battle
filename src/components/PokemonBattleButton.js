import { Button, Group } from '@mantine/core'
import { useAtom } from 'jotai'

// * Atoms
import { player1Atom } from '../jotai/player1Atom'
import { player2Atom } from '../jotai/player2Atom'
import { modalWinAtom } from '../jotai/modalWinAtom'

export default function PokemonBattleButton () {
  const [stPlayer1Atom, setPlayer1Atom] = useAtom(player1Atom)
  const [stPlayer2Atom, setPlayer2Atom] = useAtom(player2Atom)
  const [stModalWinAtom, setModalWinAtom] = useAtom(modalWinAtom)

  async function onClickFight () {
    let player1Lives = stPlayer1Atom.lives
    let player2Lives = stPlayer2Atom.lives
    while (player1Lives > 0 && player2Lives > 0) {
      player1Lives = stPlayer2Atom.attack - player1Lives * Math.floor(Math.random() * 2)
      player2Lives = stPlayer1Atom.attack - player2Lives * Math.floor(Math.random() * 2)
      console.log('p1', player1Lives, 'p2', player2Lives)
      setPlayer1Atom({ ...stPlayer1Atom, lives: player1Lives })
      setPlayer2Atom({ ...stPlayer2Atom, lives: player2Lives })
    }
    if (player2Lives >= 0) {
      setModalWinAtom({
        ...stModalWinAtom,
        open: true,
        playerWiner: 1,
        imageURL: stPlayer1Atom.pokemonInfo.sprites.front_default,
        pokemonName: stPlayer1Atom.pokemonInfo.name,
        pokeColor: stPlayer1Atom.pokemonSpecies.color.name
      })
      setPlayer1Atom({ ...stPlayer1Atom, wins: stPlayer1Atom + 1 })
      console.log(stPlayer1Atom)
    } else if (player1Lives >= 0) {
      console.log(stPlayer2Atom)
      setModalWinAtom({
        ...stModalWinAtom,
        open: true,
        playerWiner: 2,
        imageURL: stPlayer2Atom.pokemonInfo.sprites.front_default,
        pokemonName: stPlayer2Atom.pokemonInfo.name,
        pokeColor: stPlayer2Atom.pokemonSpecies.color.name
      })
      setPlayer2Atom({ ...stPlayer2Atom, wins: stPlayer2Atom + 1 })
    } else {
      setModalWinAtom({ ...stModalWinAtom, open: true, playerWiner: 0 })
      console.log('empate', player1Lives, player2Lives)
    }
  }

  return (
    <Group position="center" style={{ margin: 10 }}>
      <Button color="red" disabled={stPlayer1Atom.pokemonIndexSelected === undefined || stPlayer2Atom.pokemonIndexSelected === undefined} onClick={onClickFight} >
        Luchar!
      </Button>
    </Group>
  )
}
