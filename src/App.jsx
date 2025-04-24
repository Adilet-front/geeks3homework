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
import {
  IconSun,
  IconTrash,
  IconMoonStars,
  IconPencil,
} from "@tabler/icons-react";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedList = JSON.parse(localStorage.getItem("list") || "[]");

    this.state = {
      isTheme: savedTheme,
      isModel: false,
      isOpeneidt: false,
      isTitle: "",
      isSummary: "",
      isList: savedList,
      editId: null,
    };
  }

  changeTheme = () => {
    const newTheme = this.state.isTheme === "light" ? "dark" : "light";
    this.setState({ isTheme: newTheme });
    localStorage.setItem("theme", newTheme);
  };

  openModal = () => {
    this.setState({ isModel: true });
  };

  closeModal = () => {
    this.setState({
      isModel: false,
      isTitle: "",
      isSummary: "",
      isOpeneidt: false,
      editId: null,
    });
  };

  addTask = () => {
    const { isTitle, isSummary, isList } = this.state;
    if (isTitle === "" && isSummary === "") {
      alert("Empty");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000) + 1,
      title: isTitle,
      summary: isSummary,
    };

    const newList = [...isList, item];
    this.setState({ isList: newList });
    localStorage.setItem("list", JSON.stringify(newList));
    this.closeModal();
  };

  editTask = () => {
    const { isList, isTitle, isSummary, editId } = this.state;
    const updatedList = isList.map((el) => {
      if (el.id === editId) {
        return { ...el, title: isTitle, summary: isSummary };
      }
      return el;
    });

    this.setState({ isList: updatedList });
    localStorage.setItem("list", JSON.stringify(updatedList));
    this.closeModal();
  };

  deleteTask = (id) => {
    const newList = this.state.isList.filter((el) => el.id !== id);
    this.setState({ isList: newList });
    localStorage.setItem("list", JSON.stringify(newList));
  };

  handleEdit = (task) => {
    this.setState({
      isOpeneidt: true,
      isTitle: task.title,
      isSummary: task.summary,
      isModel: true,
      editId: task.id,
    });
  };

  render() {
    const { isTheme, isModel, isOpeneidt, isTitle, isSummary, isList } =
      this.state;

    return (
      <MantineProvider
        theme={{ colorScheme: isTheme, defaultRadius: "md" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className="App">
          <Modal
            opened={isModel}
            onClose={this.closeModal}
            centered
            withCloseButton={false}
            size="md"
            title={isOpeneidt ? "Edit task" : "New Task"}
          >
            <TextInput
              value={isTitle}
              onChange={(e) => this.setState({ isTitle: e.target.value })}
              mt="md"
              placeholder="Task Title"
              label="Title"
            />
            <TextInput
              value={isSummary}
              onChange={(e) => this.setState({ isSummary: e.target.value })}
              mt="md"
              placeholder="Task Summary"
              label="Summary"
            />
            <Group mt="md" position="apart">
              <Button onClick={this.closeModal} variant="submit">
                Cancel
              </Button>
              <Button onClick={isOpeneidt ? this.editTask : this.addTask}>
                {isOpeneidt ? "Edit Task" : "Create Task"}
              </Button>
            </Group>
          </Modal>

          <Container size={550} my={40} sx={{ background: "inherit" }}>
            <Group position="apart">
              <Title>My tasks</Title>
              <ActionIcon size="lg" color="blue" onClick={this.changeTheme}>
                {isTheme === "light" ? <IconMoonStars /> : <IconSun />}
              </ActionIcon>
            </Group>

            {isList.length > 0 ? (
              isList.map((el) => (
                <Card key={el.id} withBorder mt="sm">
                  <Group position="apart">
                    <Box>
                      <Text weight={500}>{el.title}</Text>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <ActionIcon
                        size="lg"
                        color="red"
                        variant="transparent"
                        onClick={() => this.deleteTask(el.id)}
                      >
                        <IconTrash />
                      </ActionIcon>
                      <ActionIcon
                        size="lg"
                        color="blue"
                        onClick={() => this.handleEdit(el)}
                      >
                        <IconPencil />
                      </ActionIcon>
                    </Box>
                  </Group>
                  <Text>{el.summary}</Text>
                </Card>
              ))
            ) : (
              <Text sx={{ marginTop: "10px" }}>You have no tasks</Text>
            )}

            <Button
              onClick={this.openModal}
              sx={{ width: "100%", marginTop: "12px" }}
            >
              New Task
            </Button>
          </Container>
        </div>
      </MantineProvider>
    );
  }
}

export default App;
