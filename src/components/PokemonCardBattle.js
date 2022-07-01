import { useEffect, useState } from 'react'
import { Group, Stack, Title, Badge, Transition, Image } from '@mantine/core'
import { BsFillShieldFill } from 'react-icons/bs'
import { RiSwordFill } from 'react-icons/ri'
import { AiFillHeart } from 'react-icons/ai'
import pokeNotFound from '../services/img/pokeNotFound.png'

// * Utils
import { colorSwitch } from '../services/utils/colorSwitch'

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function PokemonCardListItem (props) {
  const [transition, setTransition] = useState(true)
  useEffect(() => {
    transitionLapse()
  }, [props.pokemonInfo])

  async function transitionLapse () {
    await setTransition(false)
    await sleep(200)
    await setTransition(true)
  }

  return (
    <Transition mounted={transition} transition="scale" duration={400} timingFunction="ease">
      {(styles) => (
        <Stack
          align="center"
          style={{
            ...styles,
            borderRadius: 10,
            margin: 10,
            borderColor: colorSwitch(props.pokemonSpecies?.color?.name),
            borderWidth: 1,
            borderStyle: 'solid',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,1) 20%,  ' +
              colorSwitch(props.pokemonSpecies?.color?.name) +
              ' 100%)'
          }}
        >
          <Title order={5}>{props.pokemonInfo?.name.toUpperCase()}</Title>
          <Image
            src={props.pokemonInfo?.sprites?.front_default}
            style={{ width: 75, height: 75 }}
            placeholder={<img src={pokeNotFound} style={{ width: 100, height: 100, paddingTop: 50 }} alt="not found" />}
            withPlaceholder
            alt={props.pokemonInfo?.name}
          />
          <Stack align="center">
            <Group position="center" style={{ padding: 10 }}>
              <Badge leftSection={<RiSwordFill />} color="red" size="lg" radius="sm">
                {props.pokemonInfo?.stats[1].base_stat}
              </Badge>
              <Badge leftSection={<BsFillShieldFill />} color="green" size="lg" radius="sm">
                {props.pokemonInfo?.stats[2].base_stat}
              </Badge>
              <Badge leftSection={<AiFillHeart />} color="pink" size="lg" radius="sm">
                {props.lives}
              </Badge>
            </Group>
          </Stack>
        </Stack>
      )}
    </Transition>
  )
}
