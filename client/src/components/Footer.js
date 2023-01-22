import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function Footer() {
    const style = {
        outerBox: {
            display: { sm: "block", md: "block", lg: "flex" },
            justifyContent: "space-between",
            width: "100%",
            padding:{ xs:"20px 25px",sm: "20px 25px", md: "30px 50px", lg: "30px 150px" },
            marginTop:'50px',
            background:'#f6f6f6'
        },
        innerSideBox_1: {
            width: { sm: "100%", md: "50%", lg: "60%" },
            padding:{ xs:"10px",sm: "10px", md: "10px", lg: "20px" }
        },
        innerSideBox_2: {
            width: { sm: "100%", md: "50%", lg: "20%" },
            padding:{ xs:"10px",sm: "10px", md: "10px", lg: "20px" }
        },
        tagFooter: {
            fontFamily: "Open Sans",
            textAlign: "center",
            display: "block",
            padding:"15px",
            width:"100%",
            background:"#5B3F89"
        },
        title:{
            fontFamily: "Open Sans",
            fontSize:"25px",
            fontWeight:"bold",
            paddingBottom:"15px"
        },
        content:{
            fontFamily: "Open Sans",
            width:{ xs:"100%",sm: "100%", md: "70%", lg: "70%" },
            paddingBottom:'5px'
        },
        footerMenu:{
            color: "grey",
            textDecoration:'none',
            '&:hover': {
                color: "#5B3F89",
            }
        }
    };
    const navItems = ["Flipkart", "Meesho", "Feedback"];
    return (
        <>
            <Box sx={style.outerBox}>
                <Box sx={style.innerSideBox_1}>
                    <Box>
                        <Typography sx={style.title}>
                            CROPBOX
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={style.content}>
                        Minimize your shipping label hassle and hike your online bussiness with cropbox.
                        </Typography>
                        <Typography sx={style.content}>
                            <p><b>help.cropbox@gmail.com</b></p>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={style.innerSideBox_2}>
                    <Box><Typography sx={style.title}>MENU </Typography></Box>
                    <Box>
                        <Stack spacing={1}>
                        {navItems.map((item) => (
                            <Link to={"/" + item.toLowerCase()} sx={{color: "#000",textDecoration:'none !important'}}>
                                <Button key={item} sx={style.footerMenu}>
                                {item}
                                </Button>
                            </Link>
                            ))}
                        </Stack>
                    </Box>
                </Box>
                <Box sx={style.innerSideBox_2}>
                    <Box><Typography sx={style.title}>BLOGS </Typography></Box>
                    <Box>
                        <Stack spacing={1}>
                            <Typography>Coming soon. </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Box sx={style.tagFooter}>
                <Typography sx={{color:'white'}}>© 2023 Copyright: Cropbox.tech</Typography>
            </Box>
        </>
    );
}
export default Footer;
