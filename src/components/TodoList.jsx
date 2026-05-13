import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  Grid2 as Grid,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState, useEffect, useMemo } from "react";

import { TodosContext } from "../context/todosContext";
import Todo from "./Todo";
import MySnackBar from "./MySnackBar";

export default function TodoList() {
  const { todos, dispatch } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTododsType, setDisplayedTodosType] = useState("all");

  // التحكم بالـ Dialogs
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  // التودو اللي عم نشتغل عليه حالياً (حذف أو تعديل)
  const [currentTodo, setCurrentTodo] = useState({
    title: "",
    details: "",
    id: null,
  });
  const [openToast, setOpenToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleCloseToast = () => setOpenToast(false);

  useEffect(() => {
    dispatch({ type: "get" });
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    if (displayedTododsType === "completed")
      return todos.filter((t) => t.isCompleted);
    if (displayedTododsType === "non-completed")
      return todos.filter((t) => !t.isCompleted);
    return todos;
  }, [todos, displayedTododsType]);

  // --- دوال العمليات ---
  function handleAddClick() {
    dispatch({
      type: "added",
      payload: { id: uuidv4(), title: titleInput },
    });
    setTitleInput("");
    setToastMsg("Task Added Successfully");
    setOpenToast(true);
  }

  // فتح وإتمام الحذف
  const openDelete = (todo) => {
    setCurrentTodo(todo);
    setShowDeleteDialog(true);
  };
  const confirmDelete = () => {
    dispatch({ type: "deleted", payload: { id: currentTodo.id } });
    setShowDeleteDialog(false);
    setToastMsg("DELETE IS DONE");
    setOpenToast(true);
  };
  // فتح وإتمام التعديل
  const openUpdate = (todo) => {
    setCurrentTodo(todo);
    setShowUpdateDialog(true);
  };
  const confirmUpdate = () => {
    dispatch({ type: "updated", payload: currentTodo });
    setShowUpdateDialog(false);
    setToastMsg("UPDATE IS DONE");
    setOpenToast(true);
  };

  return (
    <>
      {/* 1. ديالوج الحذف */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Delete Task?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{currentTodo.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} sx={{ color: "#f44336" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* 2. ديالوج التعديل */}
      <Dialog
        open={showUpdateDialog}
        onClose={() => setShowUpdateDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#3f3766" }}>
          Edit Task
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={currentTodo.title}
            onChange={(e) =>
              setCurrentTodo({ ...currentTodo, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Details"
            fullWidth
            variant="standard"
            multiline
            rows={3}
            value={currentTodo.details}
            onChange={(e) =>
              setCurrentTodo({ ...currentTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowUpdateDialog(false)}>Cancel</Button>
          <Button
            onClick={confirmUpdate}
            variant="contained"
            sx={{ background: "#3f3766" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: "20px",
            mt: 5,
            p: 2,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#3f3766", textAlign: "center" }}
            >
              My Tasks
            </Typography>
            <Divider sx={{ my: 3 }} />

            <ToggleButtonGroup
              color="primary"
              value={displayedTododsType}
              exclusive
              onChange={(e, val) => val && setDisplayedTodosType(val)}
              sx={{ width: "100%", mb: 3 }}
            >
              <ToggleButton value="all" sx={{ flex: 1 }}>
                All
              </ToggleButton>
              <ToggleButton value="completed" sx={{ flex: 1 }}>
                Completed
              </ToggleButton>
              <ToggleButton value="non-completed" sx={{ flex: 1 }}>
                Pending
              </ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 8 }}>
                <TextField
                  fullWidth
                  label="New Task"
                  size="small"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && titleInput) {
                      handleAddClick();
                    }
                  }}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Button
                  disabled={!titleInput}
                  variant="contained"
                  fullWidth
                  sx={{ height: "100%", background: "#3f3766" }}
                  onClick={handleAddClick}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {filteredTodos.map((t) => (
              <Todo
                key={t.id}
                todo={t}
                showDelete={openDelete}
                showUpdate={openUpdate}
              />
            ))}
          </CardContent>
        </Card>
      </Container>

      <MySnackBar
        open={openToast}
        message={toastMsg}
        onClose={handleCloseToast}
      />
    </>
  );
}
