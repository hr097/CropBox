import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    darkRed: {
      // Purple and white play nicely together.
      main: "#D91111"
    },
    lightRed: {
      // Purple and white play nicely together.
      main: "#FF5555"
    },
    orange: {
      main: "#F76300"
    },
    lightGreen: {
      main: "#30C730"
    },
    darkGreen: {
      main: "#337636"
    }
  }
});
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled
  }
}));

const customIcons = {
  1: {
    icon: (
      <ThemeProvider theme={theme}>
        <SentimentVeryDissatisfiedIcon
          color="darkRed"
          sx={{ transform: { xs:"scale(1)",sm:"scale(1)",md:"scale(1.5)",lg:"scale(3)"} }}
        />
      </ThemeProvider>
    ),
    label: "Very Dissatisfied"
  },
  2: {
    icon: (
      <ThemeProvider theme={theme}>
        <SentimentDissatisfiedIcon
          color="lightRed"
          sx={{ transform: { xs:"scale(1)",sm:"scale(1)",md:"scale(1.5)",lg:"scale(3)"} }}
        />
      </ThemeProvider>
    ),
    label: "Dissatisfied"
  },
  3: {
    icon: (
      <ThemeProvider theme={theme}>
        <SentimentSatisfiedIcon 
        color="orange" 
        sx={{ transform: { xs:"scale(1)",sm:"scale(1)",md:"scale(1.5)",lg:"scale(3)"} }} />
      </ThemeProvider>
    ),
    label: "Neutral"
  },
  4: {
    icon: (
      <ThemeProvider theme={theme}>
        <SentimentSatisfiedAltIcon
          color="lightGreen"
          sx={{ transform: { xs:"scale(1)",sm:"scale(1)",md:"scale(1.5)",lg:"scale(3)"} }}
        />
      </ThemeProvider>
    ),
    label: "Satisfied"
  },
  5: {
    icon: (
      <ThemeProvider theme={theme}>
        <SentimentVerySatisfiedIcon
          color="darkGreen"
          sx={{ transform: { xs:"scale(1)",sm:"scale(1)",md:"scale(1.5)",lg:"scale(3)"} }}
        />
      </ThemeProvider>
    ),
    label: "Very Satisfied"
  }
};

function IconContainer(props) {
    const { value, ...other } = props;
    return (
        <Box {...other} sx={{ width: {xs:"auto",sm:"auto",md:"50px",lg:"70px"}}}>
        {customIcons[value].icon}
        </Box>
    );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired
};

export default function FeedbackForm() {
function getCount(str) {
    return str.split(" ").filter(function(num) {
    return num !== "";
    }).length;
}
const style = {
    outerWrapper: {
        width: "100%",
        padding: {xs:"15px",sm:"15px",md:"30px",lg:"30px"}
    },
    Textfeild: {
        width: "100%",  
        borderColor: "red !important"
    }
};
const [text, setText] = React.useState("");
return (
    <>
        <Box sx={style.outerWrapper}>
        <TextField
            id="outlined-search"
            label="Email Address"
            type="email"
            sx={style.Textfeild}
        />
        <StyledRating
            name="highlight-selected-only"
            defaultValue={2}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            highlightSelectedOnly
            sx={{ padding: {xs:"20px 10px",sm:"20px 10px",md:"25px 10px",lg:"50px 10px"} }}
        />
        <Textarea
            placeholder="Type in here…"
            value={text}
            onChange={(event) => setText(event.target.value)}
            minRows={2}
            maxRows={4}
            endDecorator={
                <Typography level="body3" sx={{ ml: "auto" }}>
                {getCount(text)} / 50
                </Typography>
            }
            sx={{ width: '100%',borderColor:'grey !important' }}
            />
            <Box sx={{width:'100%',textAlign:'center'}}>
              <Button variant="contained" sx={{padding:'10px 38px',margin:"25px auto",backgroundColor:"#5B3F89",fontWeight:"900",'&:hover': {backgroundColor: '#8462bc'}}}>SUBMIT</Button>
            </Box>
        </Box>
        </>
    );
}
