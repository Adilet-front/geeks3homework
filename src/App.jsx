import {
  Button,
  ActionIcon,
  Card,
  Container,
  Group,
  MantineProvider,
  Modal,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconSun,
  IconTrash,
  IconMoonStars,
  IconPencil,
} from "@tabler/icons-react";
import { useState } from "react";

function App() {
  const [isTheme, setTheme] = useState("light");

  const changeTheme = () => {
    setTheme((stateTheme) => (stateTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <MantineProvider
        theme={{ colorScheme: isTheme, defaultRadius: "md" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className="App">
          <Container size={550} my={40} sx={{ background: "inherit" }}>
            <Group position="apart">
              <Title>My tasks</Title>
              <ActionIcon size="ig" color="blue" onClick={changeTheme}>
                {isTheme === "light" ? <IconMoonStars /> : <IconSun />}
              </ActionIcon>
            </Group>
            <Card>
              <Text sx={{ marginTop: "px" }}>You have on task</Text>
              <ActionIcon size="ig" ml={400} mt={-20}>
                <IconPencil />
                <IconTrash />
              </ActionIcon>
              <Text>knvljsfjlblj</Text>
            </Card>
            <Button sx={{ width: "100%", marginTop: "12px" }}> New Task</Button>
          </Container>
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
