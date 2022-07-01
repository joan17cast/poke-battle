import { AppShell, Header, Group } from '@mantine/core'
import logo from '../services/img/download.png'
export default function AppBar (props) {
  return (
    <AppShell
      padding="xs"
      style={{ padding: 0 }}
      header={
        <Header height={60} p="xs">
          <Group position="center">
            <img src={logo} alt="logo" style={{ width: 120, objectFit: 'contain' }}/>
          </Group>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  )
}
