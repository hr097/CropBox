import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function CustomAlert(props) {
const [open, setOpen] = React.useState(true);

const handleClose = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setOpen(false);
};

return (
    <>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.type} sx={{ width: "100%" }}>
                {props.message}
            </Alert>
        </Snackbar>
    </>);
}

export default CustomAlert;