import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Dropzone from "../components/Dropzone";

function Flipkart(props) {
    const style = {
        outerBox: {
            display: { sm: "block", md: "block", lg: "flex" },
            justifyContent: "space-between",
            width: "100%"
        },
        innerSideBox: {
            width: { sm: "100%", md: "100%", lg: "20%" },
            height: { xs: "10px", sm: "100px", md: "100px", lg: "100%" }
        },
        innerMiddleBox: {
            width: { sm: "100%", md: "100%", lg: "60%" },
            padding: {
                xs: "5px 15px",
                sm: "5px 15px",
                md: "5px 15px",
                lg: "10px"
            }
        },
        title: {
            fontFamily: "Open Sans",
            fontWeight: 'bold',
            fontSize: { xs: "20px", sm: "20px", md: "35px", lg: "45px" },
            margin: "15px auto",
            textAlign: "center",
            color:'#2a2a2a'
        },
        tagLine:{
            fontFamily: "Open Sans",
            textAlign: "center",
            display: "block",
            margin: "15px auto 20px"
        }
    };
    return (
        <Box>
            <Navbar />
            <Box sx={style.outerBox}>
                <Box sx={style.innerSideBox} />
                <Box sx={style.innerMiddleBox}>
                <Typography variant="h3" sx={style.title}>
                    Crop Flipkart Shippment Labels
                </Typography>
                <Typography variant="span"  sx={style.tagLine}>
                    The Easiest way to mange Flipkart order shippments. Crop shipping labels with us.
                </Typography>
                <Dropzone type="Flipkart" />
                </Box>
                <Box sx={style.innerSideBox} />
            </Box>
        </Box>
    );
}

export default Flipkart;
