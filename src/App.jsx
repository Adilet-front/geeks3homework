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

  const [isOpenEdit, setOpenEdit] = useState(false);
  console.log(isOpenEdit);

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

  const editTask = () => {
    const task = newNewList.map((el) => el.id === isOpenEdit);
    if (el.id === isOpenEdit) {
      el.title = isTitle;
      el.summery = isSummary;
    }
    return el;
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
            title={isOpenEdit ? "Edit Task" : "Create Task"}
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
                  if (isOpenEdit) {
                    editTask();
                  }
                  addTask();
                  closeModal();
                }}
              >
                Create Tasks
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
                      <ActionIcon size="lg" color="blue">
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
