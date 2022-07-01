import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { Modal, Stack, Title, Button, Group, Image } from '@mantine/core'
import pokeNotFound from '../services/img/pokeNotFound.png'
// * Components

// * Atoms
import { modalWinAtom } from '../jotai/modalWinAtom'

// * Utils
import { colorSwitch } from '../services/utils/colorSwitch'

// TODO hacer empate
export default function PokemonWinModal () {
  const [stModalWinAtom, setModalWinAtom] = useAtom(modalWinAtom)
  useEffect(() => {}, [stModalWinAtom])
  return (
    <Modal opened={stModalWinAtom.open} onClose={() => setModalWinAtom({ ...stModalWinAtom, open: false })}>
      {stModalWinAtom.playerWiner === 0
        ? (
        <Group position="center">
          <Title order={2}>{'Empate!'}</Title>
        </Group>
          )
        : (
        <Stack
          align="center"
          style={{
            borderRadius: 10,
            margin: 10,
            borderColor: colorSwitch(stModalWinAtom.pokeColor),
            borderWidth: 1,
            borderStyle: 'solid',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,1) 20%,  ' + colorSwitch(stModalWinAtom.pokeColor) + ' 100%)'
          }}
        >
          <Title order={2}>{stModalWinAtom.pokemonName}</Title>

          <Image
            src={stModalWinAtom.imageURL}
            style={{ width: 75, height: 75 }}
            placeholder={<img src={pokeNotFound} style={{ width: 75, height: 75, paddingTop: 50 }} alt="not found" />}
            withPlaceholder
            alt={stModalWinAtom.pokemonName}
          />
          <Title order={1}>{'Es el Ganador!'}</Title>
        </Stack>
          )}
      <Group position="center">
        <Button color="green" onClick={() => setModalWinAtom({ ...stModalWinAtom, open: false })}>
          Continuar
        </Button>
      </Group>
    </Modal>
  )
}
