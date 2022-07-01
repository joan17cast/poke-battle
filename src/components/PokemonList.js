import { useEffect, useState } from 'react'
import { LoadingOverlay, Grid, Paper, Button, Title, Group } from '@mantine/core'
import { useAtom } from 'jotai'
import { useFetch } from '../services/hooks/useFetch'
import PokemonCardListItem from './PokemonCardListItem'
import PokemonListNotFound from './pokemonListNotFound'
import { AiOutlineReload } from 'react-icons/ai'

// * Atoms
import { player1Atom } from '../jotai/player1Atom'
import { player2Atom } from '../jotai/player2Atom'

export default function PokemonList () {
  const [stPlayer1Atom, setPlayer1Atom] = useAtom(player1Atom)
  const [stPlayer2Atom, setPlayer2Atom] = useAtom(player2Atom)
  const { loading, error, useFetchGet } = useFetch()
  const [pokemonTopTen, setPokemonTopTen] = useState()
  const [allPokemonList, setAllPokemonList] = useState()

  useEffect(() => {
    getPokemonList()
  }, [])

  function getRandomPokemon (list) {
    return list[Math.floor(Math.random() * list.length)]
  }

  function getTenPokemon (pokemonList) {
    let outputPokemonList = Array(10).fill({})
    outputPokemonList = outputPokemonList.map(() => {
      return getRandomPokemon(pokemonList)
    })
    setPokemonTopTen(outputPokemonList)
    setPlayer1Atom({ ...stPlayer1Atom, pokemonIndexSelected: undefined, pokemonInfo: undefined })
    setPlayer2Atom({ ...stPlayer2Atom, pokemonIndexSelected: undefined, pokemonInfo: undefined })
  }

  async function getPokemonList () {
    const response = await useFetchGet('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    setAllPokemonList(response.results)
    getTenPokemon(response.results)
  }

  function render () {
    if (loading) {
      return (
        <LoadingOverlay visible={loading} radius="md" loaderProps={{ size: 'lg', color: 'red', variant: 'bars' }} />
      )
    } else {
      if (error) {
        return <PokemonListNotFound />
      } else {
        return (
          <Grid justify="center" align="center" style={{ width: '100%' }}>
            <Grid.Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <Paper radius="lg" shadow="xs" p="md" withBorder>
                <Grid justify="space-between" align="flex-start">
                  <Grid.Col span={4}>
                    <Title order={4}>Player 1</Title>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Group position="center">
                      <Button color="yellow" onClick={getTenPokemon.bind(this, allPokemonList)}>
                        <AiOutlineReload size={20} />
                      </Button>
                    </Group>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Group position="right">
                      <Title order={4}>Player 2</Title>
                    </Group>
                  </Grid.Col>
                </Grid>
                {pokemonTopTen?.map((item, index) => (
                  <PokemonCardListItem key={index.toString()} name={item.name} url={item.url} index={index} />
                ))}
              </Paper>
            </Grid.Col>
          </Grid>
        )
      }
    }
  }

  return <div>{render()}</div>
}
