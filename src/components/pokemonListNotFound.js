import { Title, Stack, Paper } from '@mantine/core'

// * Image
import lupa from '../services/img/lupa.jpg'

export default function PokemonListNotFound () {
  return (
    <Stack align="center">
      <Paper shadow="xs" p="md" withBorder>
        <Title> ¡Ups! ¡Parece que el detective pickachu ha encontrado un error!</Title>
        <img src={lupa} alt="Not Found" width="25%" />
      </Paper>
    </Stack>
  )
}
