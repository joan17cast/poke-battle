import { useEffect, useState } from 'react'
import { useFetch } from '../services/hooks/useFetch'
import { Checkbox, Grid, Title, Group, Badge, Stack, Loader, Transition, Image } from '@mantine/core'
import { useAtom } from 'jotai'
import { MdCatchingPokemon } from 'react-icons/md'
import { BsFillShieldFill } from 'react-icons/bs'
import { RiSwordFill } from 'react-icons/ri'
import pokeNotFound from '../services/img/pokeNotFound.png'
// * Atoms
import { player1Atom } from '../jotai/player1Atom'
import { player2Atom } from '../jotai/player2Atom'

// * Utils
import { colorSwitch } from '../services/utils/colorSwitch'
export default function PokemonCardListItem (props) {
  const [stPlayer1Atom, setPlayer1Atom] = useAtom(player1Atom)
  const [stPlayer2Atom, setPlayer2Atom] = useAtom(player2Atom)
  const [pokemonInfo, setPokemonInfo] = useState()
  const [pokemonSpecies, setPokemonSpecies] = useState()
  const { loading, error, useFetchGet } = useFetch()

  useEffect(() => {
    getPokemonInfo()
  }, [props.name])

  async function getPokemonSpecies (url) {
    const response = await useFetchGet(url)
    setPokemonSpecies(response)
  }

  async function getPokemonInfo () {
    const response = await useFetchGet(props.url)
    setPokemonInfo(response)
    getPokemonSpecies(response.species.url)
    console.log(error)
  }

  return (
    <div>
        {loading && <div
          style={{
            borderRadius: 10,
            margin: 10,
            borderColor: 'Gray',
            borderWidth: 1,
            borderStyle: 'solid',
            padding: 25
          }}
        >
          <Group position="center">
            <Loader color="red" variant="bars" />
          </Group>
        </div>}
      <Transition mounted={!loading} transition="pop" duration={1500} timingFunction="ease">
        {(styles) => (
          <Grid
            style={{
              ...styles,
              borderRadius: 10,
              margin: 10,
              borderColor: colorSwitch(pokemonSpecies?.color?.name),
              borderWidth: 1,
              borderStyle: 'solid',
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,1) 20%,  ' +
                colorSwitch(pokemonSpecies?.color?.name) +
                ' 100%)'
            }}
            justify="center"
            align="center"
          >
            <Grid.Col xs={4} sm={3} md={3} lg={3} xl={2}>
              <Checkbox
                icon={MdCatchingPokemon}
                radius="xl"
                size="xl"
                color="red"
                disabled={props.index === stPlayer2Atom.pokemonIndexSelected}
                checked={props.index === stPlayer1Atom.pokemonIndexSelected}
                onChange={(_event) =>
                  setPlayer1Atom({
                    ...stPlayer1Atom,
                    pokemonIndexSelected: props.index,
                    pokemonInfo,
                    pokemonSpecies,
                    attack: pokemonInfo?.stats[1].base_stat,
                    lives: pokemonInfo?.stats[2].base_stat
                  })
                }
              />
            </Grid.Col>
            <Grid.Col xs={4} sm={6} md={6} lg={6} xl={8}>
              <Group position="center">
                <Stack align="center">
                  <Title order={5}>{props.name.toUpperCase()}</Title>
                  <Group position="center">
                    <Badge leftSection={<RiSwordFill />} color="red" size="lg" radius="sm">
                      {pokemonInfo?.stats[1].base_stat}
                    </Badge>
                    <Badge leftSection={<BsFillShieldFill />} color="green" size="lg" radius="sm">
                      {pokemonInfo?.stats[2].base_stat}
                    </Badge>
                  </Group>
                </Stack>
                <Image
                  src={pokemonInfo?.sprites?.front_default}
                  style={{ width: 75, height: 75 }}
                  placeholder={<img src={pokeNotFound} style={{ width: 75, height: 75, paddingTop: 50 }} alt="not found" />}
                  withPlaceholder
                  alt={props.name}/>
              </Group>
            </Grid.Col>
            <Grid.Col xs={4} sm={3} md={3} lg={3} xl={2}>
              <Group position="right">
                <Checkbox
                  icon={MdCatchingPokemon}
                  radius="xl"
                  size="xl"
                  disabled={props.index === stPlayer1Atom.pokemonIndexSelected}
                  checked={props.index === stPlayer2Atom.pokemonIndexSelected}
                  onChange={(_event) =>
                    setPlayer2Atom({
                      ...stPlayer2Atom,
                      pokemonIndexSelected: props.index,
                      pokemonInfo,
                      pokemonSpecies,
                      attack: pokemonInfo?.stats[1].base_stat,
                      lives: pokemonInfo?.stats[2].base_stat
                    })
                  }
                />
              </Group>
            </Grid.Col>
          </Grid>
        )}
      </Transition>
    </div>
  )
}
