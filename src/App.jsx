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
  Box,
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
              <Group position="apart">
                <Box>
                  <Text sx={{ marginTop: "10px" }}>You have on task</Text>
                  <Text>ggwh</Text>
                </Box>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <ActionIcon size="lg" color="red">
                    <IconTrash />
                  </ActionIcon>
                  <ActionIcon size="lg" color="blue">
                    <IconPencil />
                  </ActionIcon>
                </Box>
              </Group>
            </Card>
            <Button sx={{ width: "100%", marginTop: "12px" }}> New Task</Button>
          </Container>
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
