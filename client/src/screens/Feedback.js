import * as React from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Navbar from "../components/Navbar";

function Feedback(props) {
    return (
        <Box>
        <Navbar />
        <CssBaseline />
        <Box component="main">
            <Toolbar />
            <Typography>feedback</Typography>
        </Box>
        </Box>
    );
}

export default Feedback;
