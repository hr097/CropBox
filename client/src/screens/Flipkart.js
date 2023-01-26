import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Dropzone from "../components/Dropzone";
import Footer from "../components/Footer";
import ShowFeedbacks from "../components/showFeedbacks";

function Flipkart(props) {
    const style = {
        outerBox: {
            display: { sm: "block", md: "block", lg: "flex" },
            justifyContent: "space-between",
            width: "100%"
        },
        innerSideBox: {
            width: { sm: "100%", md: "100%", lg: "20%" },
            height: { xs: "10px", sm: "100%", md: "100%", lg: "100%" }
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
            fontSize: { xs: "20px", sm: "20px", md: "35px", lg: "40px" },
            margin: "15px auto",
            color:'#2a2a2a',
            textTransform:'uppercase',
            textAlign:'center'
        },
        tagLine:{
            fontFamily: "Open Sans",
            display: "block",
            margin: "15px auto 20px",
            textAlign:'center',
            color:'#8e8e8e'
        },
        topLine:{
            fontFamily: "Open Sans",
            margin: "35px auto 15px",
            color:'#5B3F89',
            display:'block',
            fontWeight:900,
            textAlign:'center',
            textTransform:'uppercase'
        }
    };
return (
        <Box>
        <Navbar />
        <Box sx={style.outerBox}>
            <Box sx={style.innerSideBox} />
            <Box sx={style.innerMiddleBox}>
            <Typography variant="span" sx={style.topLine}>
                Drop / Crop / Download
            </Typography>
            <Typography variant="h3" sx={style.title}>
                Crop Flipkart Shippments Label
            </Typography>
            <Typography variant="span" sx={style.tagLine}>
                The Easiest way to mange Flipkart order shippments. Crop shipping
                labels with us.
            </Typography>
            <Dropzone type="Flipkart" />
            <Typography sx={style.topLine}>
                        FEEDBACKS
            </Typography>
            <ShowFeedbacks/>
            </Box>
            <Box sx={style.innerSideBox} />
        </Box>
        <Footer />
        </Box>
    );
}

export default Flipkart;
