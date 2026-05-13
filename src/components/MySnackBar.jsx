import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackBar({ open, message, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // بيظهر من تحت يمين
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%", borderRadius: "10px", backgroundColor: "#3f3766" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
