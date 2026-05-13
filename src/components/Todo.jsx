import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { TodosContext } from "../context/todosContext";
import "../App.css";

export default function Todo({ todo, showDelete, showUpdate }) {
  const { dispatch } = useContext(TodosContext);
  function handleCheckClick() {
    dispatch({ type: "toggledCompleted", payload: { id: todo.id } });
  }
  return (
    <Card
      className="todoCard"
      sx={{
        minWidth: 345,
        borderRadius: "15px",
        background: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
        marginTop: "15px",
        borderLeft: "5px solid #3f3766",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 4 }} sx={{ display: "flex", gap: "10px" }}>
            <IconButton
              onClick={() => showUpdate(todo)}
              sx={{ color: "#4caf50", border: "1px solid #e0e0e0" }}
            >
              <span>✎</span>
            </IconButton>

            <IconButton
              onClick={handleCheckClick}
              sx={{
                color: "#2196f3",
                border: `1px solid ${todo.isCompleted ? "#3f3766" : "#e0e0e0"}`,
              }}
            >
              <span>✓</span>
            </IconButton>

            <IconButton
              onClick={() => showDelete(todo)}
              sx={{ color: "#f44336", border: "1px solid #e0e0e0" }}
            >
              <span>🗑</span>
            </IconButton>
          </Grid>

          <Grid size={{ xs: 8 }}>
            <Typography
              variant="h6"
              sx={{
                textAlign: "left",
                color: "#333",
                fontWeight: "bold",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "left", color: "#777" }}
            >
              {todo.details}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
