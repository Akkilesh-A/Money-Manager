import { ModeToggle, ThemeProvider } from "./components"
import { Button, H1 } from "./components/ui"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ModeToggle />
      <H1>Hello World</H1>
      <H1>lOL</H1>
      <Button>Click Me!</Button>
    </ThemeProvider>
  )
}

export default App
