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
  const [isTheme, setTheme] = useLocalStorage({
    key: "theme",
    defaultValue: "light",
  });

  const [isOpeneidt, setOpenedit] = useState(false);
  console.log(isOpeneidt);

  const [isModel, setModel] = useState(false);

  const [isTitle, setTitle] = useState("");
  const [isSummary, setSummary] = useState("");

  const [isList, setList] = useLocalStorage({
    key: "list",
    defaultValue: [],
  });

  const changeTheme = () => {
    setTheme((stateTheme) => (stateTheme === "light" ? "dark" : "light"));
  };

  const openModal = () => {
    setModel(true);
  };

  const closeModal = () => {
    setModel(false);
    setTitle("");
    setSummary("");
    setOpenedit(false);
  };

  const editTask = () => {
    const newNewlist = newList.map((el) => {
      if (el.id === isOpeneidt) {
        el.title = isTitle;
        el.summary = isSummary;
      }
      return el;
    });
    setList(newNewlist);
  };
  let newList = isList;

  const addTask = () => {
    if (isTitle === "" && isSummary === "") {
      alert("empty");
      return;
    }
    const randomId = Math.floor(Math.random() * 1000) + 1;

    const item = {
      id: randomId,
      title: isTitle,
      summary: isSummary,
    };

    newList.push(item);
    setList(newList);
  };

  const deleteTask = (id) => {
    const newNewList = newList.filter((el) => el.id !== id);
    setList(newNewList);
  };

  return (
    <>
      <MantineProvider
        theme={{ colorScheme: isTheme, defaultRadius: "md" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className="App">
          <Modal
            opened={isModel}
            onClose={closeModal}
            centered
            withCloseButton={false}
            size="md"
            title={isOpeneidt ? "Edit task" : "New Task"}
          >
            <TextInput
              value={isTitle}
              onChange={(e) => setTitle(e.target.value)}
              mt="md"
              placeholder="TaskTitle"
              label="Title"
            />
            <TextInput
              value={isSummary}
              onChange={(e) => setSummary(e.target.value)}
              mt="md"
              placeholder="Task Summary"
              label="Summary"
            />
            <Group mt="md" position="apart">
              <Button onClick={closeModal} variant="submit">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (isOpeneidt) {
                    editTask();
                  } else {
                    addTask();
                  }
                  closeModal();
                }}
              >
                {isOpeneidt ? "Edit Task" : "Creat Task"}
              </Button>
            </Group>
          </Modal>
          <Container size={550} my={40} sx={{ background: "inherit" }}>
            <Group position="apart">
              <Title>My tasks</Title>
              <ActionIcon size="ig" color="blue" onClick={changeTheme}>
                {isTheme === "light" ? <IconMoonStars /> : <IconSun />}
              </ActionIcon>
            </Group>
            {isList.length > 0 ? (
              isList.map((el) => (
                <Card key={el.id} withBorder mt="sm">
                  <Group position="apart">
                    <Box>
                      <Text weight="bold">{el.title}</Text>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <ActionIcon
                        size="lg"
                        color="red"
                        variant="transparent"
                        onClick={() => deleteTask(el.id)}
                      >
                        <IconTrash />
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => {
                          setOpenedit(el.id);
                          setTitle(el.title);
                          setSummary(el.summary);
                          openModal();
                        }}
                        size="lg"
                        color="blue"
                      >
                        <IconPencil />
                      </ActionIcon>
                    </Box>
                  </Group>
                  <Text>{el.summary}</Text>
                </Card>
              ))
            ) : (
              <Text sx={{ marginTop: "10px" }}>You have on task</Text>
            )}

            <Button
              onClick={openModal}
              sx={{ width: "100%", marginTop: "12px" }}
            >
              {" "}
              New Task
            </Button>
          </Container>
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
