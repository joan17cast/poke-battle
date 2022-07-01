import { useAtom } from 'jotai'
import { Grid, Group } from '@mantine/core'
import vs from '../services/img/vs.png'

// * Components
import PokemonList from '../components/PokemonList'
import PokemonCardBattle from '../components/PokemonCardBattle'
import PokemonBattleButton from '../components/PokemonBattleButton'
import PokemonWinModal from '../components/pokemonWinModal'
import AppBar from '../components/AppBar'

// * Atoms
import { player1Atom } from '../jotai/player1Atom'
import { player2Atom } from '../jotai/player2Atom'

export default function BattleRing () {
  const [stPlayer1Atom] = useAtom(player1Atom)
  const [stPlayer2Atom] = useAtom(player2Atom)
  return (
    <AppBar>
      <div style={{ backgroundColor: 'rgb(255 234 234)' }}>
        <PokemonWinModal />
        <Grid justify="center" align="center" style={{ width: '100%' }}>
          <Grid.Col xs={12} sm={3} md={3} lg={2} xl={2}>
            <PokemonCardBattle
              pokemonInfo={stPlayer1Atom.pokemonInfo}
              pokemonSpecies={stPlayer1Atom.pokemonSpecies}
              lives={stPlayer1Atom.lives}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={3} md={3} lg={2} xl={2}>
            <Group position="center">
              <img src={vs} alt="Logo" style={{ width: 120 }} />
            </Group>
          </Grid.Col>
          <Grid.Col xs={12} sm={3} md={3} lg={2} xl={2}>
            <PokemonCardBattle
              pokemonInfo={stPlayer2Atom.pokemonInfo}
              pokemonSpecies={stPlayer2Atom.pokemonSpecies}
              lives={stPlayer2Atom.lives}
            />
          </Grid.Col>
        </Grid>
        <PokemonBattleButton />
        <PokemonList />
      </div>
    </AppBar>
  )
}
