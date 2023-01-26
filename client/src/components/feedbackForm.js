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
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import ShowFeedbacks from "./showFeedbacks";


//for showing alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//created custom theam for icons
const theme = createTheme({
  palette: {
    darkRed: {
      main: "#D91111"
    },
    lightRed: {
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
})

//rating function
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled
  }
}));

//custom icons for rating
const customIcons = {
  1: {
    icon: (
      <ThemeProvider theme={theme}>
        <SentimentVeryDissatisfiedIcon
          color="darkRed"
          sx={{ transform: { xs:"scale(1.2)",sm:"scale(1.2)",md:"scale(1.5)",lg:"scale(3)"} }}
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
          sx={{ transform: { xs:"scale(1.2)",sm:"scale(1.2)",md:"scale(1.5)",lg:"scale(3)"} }}
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
        sx={{ transform: { xs:"scale(1.2)",sm:"scale(1.2)",md:"scale(1.5)",lg:"scale(3)"} }} />
      </ThemeProvider>
    ),
    label: "Neutral"
  },
  4: {
    icon: (
      <ThemeProvider theme={theme}>
        <SentimentSatisfiedAltIcon
          color="lightGreen"
          sx={{ transform: { xs:"scale(1.2)",sm:"scale(1.2)",md:"scale(1.5)",lg:"scale(3)"} }}
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
          sx={{ transform: { xs:"scale(1.2)",sm:"scale(1.2)",md:"scale(1.5)",lg:"scale(3)"} }}
        />
      </ThemeProvider>
    ),
    label: "Very Satisfied"
  }
};

//icon container for ratings
function IconContainer(props) {
    const { value, ...other } = props;
    return (
        <Box {...other} sx={{ width: {xs:"30px",sm:"30px",md:"50px",lg:"70px"}}}>
        {customIcons[value].icon}
        </Box>
    );
}

//icons container propsTypes
IconContainer.propTypes = {
  value: PropTypes.number.isRequired
};

//FeedbackForm function
export default function FeedbackForm() {
  //handlerClose for alert close
const handleClose = (event, reason) => {
  if (reason === "clickaway") {
      return;
  }
  setopenAlert(false);
};
//handleOpen for alert open
const handleOpen = (msg,type) => {
  setmsgAlert(msg);
  setopenAlert(true);
  settypeAlert(type);
};
const [Msg, setMsg] = React.useState("");
const [Email,setEmail] = React.useState("");
const [Name,setName] = React.useState("");
const [ratingFeed,setRating] = React.useState(4);
const [openAlert, setopenAlert] = React.useState(false);
const [msgAlert, setmsgAlert] = React.useState("");
const [typeAlert, settypeAlert] = React.useState("success");
const [errEmail,seterrEmail] = React.useState("");
const [errName,seterrName] = React.useState("");
const [errMsg,seterrMsg] = React.useState("");
const [showFeeds,setshowFeeds] = React.useState({show:false});

const handlerError=(element,value)=>
{
    if(element === "Email")
    {
        if(value === "")
        {
          seterrEmail(true);
        }
        else
        {
          seterrEmail(false);
        }
        setEmail(value);
    }
    else if(element === "Name")
    {
        if(value === "")
        {
          seterrName(true);
        }
        else
        {
          seterrName(false);
        }
        setName(value);
    }
    else if(element === "Msg")
    {
        if(value === "")
        {
          seterrMsg(true);
        }
        else
        {
          seterrMsg(false);
        }
        setMsg(value);
    }
}
//reset the form
const resetForm = () =>{
  setMsg("");
  setName("");
  setEmail("");
}
//submit feedback handler
const handlerSubmitFeed = () =>{
  if(errMsg===false && errName === false && errEmail=== false)
  {
    axios.post('/api/submitfeedback',
    {'name':Name,'email':Email,'rating':ratingFeed,'description':Msg},
    {headers:{
      'api_token':'cropBox1008kbno9submitfeedbackk5rjsnnr9yco2vlfgzw9nu5261',
      'Content-Type':'application/json'
    }})
    .then((response) => {
      if(response.status === 200)
      {
        handleOpen(response.data,"success");
        setshowFeeds({...showFeeds,show:true});
        resetForm();
      }
      else
      { 
        handleOpen(response.data,"error");
      }
    })
    .catch((err) => {
      handleOpen(err,"error")
    });
  }
  else
  {
    handleOpen("Please enter valid input","error");
    resetForm();
  }

  }

//return the length of the string
function getCount(str) {
    return str.split(" ").filter(function(num) {
    return num !== "";
    }).length;
}

//style for the component
const style = {
    outerWrapper: {
        width: "100%",
        padding: {xs:"15px",sm:"15px",md:"30px",lg:"30px"}
    },
    Textfeild: {
        width: "100%",
        marginBottom:"25px",
        borderColor: "red !important"
    }
};




return (
    <>
        <Box sx={style.outerWrapper}>
        <TextField
            id="outlined-search"
            label="Email Address"
            type="email"
            sx={style.Textfeild}
            onChange={(event) => handlerError('Email',event.target.value)}
            value={Email}
            helperText={errEmail ? "Please enter valid Email Address" : ""}
            error={errEmail}
        />
        <TextField
            id="outlined-search"
            label="Name"  
            type="text"
            sx={{width: "100%",borderColor: "red !important"}}
            onChange={(event) => handlerError('Name',event.target.value)}
            value={Name}
            helperText={errName ? "Please enter your name" : ""}
            error={errName}
        />
        <StyledRating
            name="highlight-selected-only"
            defaultValue={ratingFeed}
            value={ratingFeed}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            onChange={(event) => {
            if (event.target.value === null) {
              setRating(5);
            } else {
              setRating(event.target.value);
            }
          }}
            highlightSelectedOnly
            sx={{ padding: {xs:"20px 10px",sm:"20px 10px",md:"25px 10px",lg:"50px 10px"} }}
        />
        <Textarea
            placeholder="Type in here…"
            value={Msg}
            onChange={(event) => handlerError('Msg',event.target.value)}
            minRows={2}
            maxRows={4}
            highlightSelectedOnly
            helperText={errMsg ? "Please enter feedback message" : ""}
            error={errMsg}
            endDecorator={
                <Typography level="body3" sx={{ ml: "auto" }}>
                {getCount(Msg)} / 50
                </Typography>
            }
            sx={{ width: '100%',borderColor:'grey !important' }}
            />
            <Box sx={{width:'100%',textAlign:'center'}}>
              <Button onClick={handlerSubmitFeed}variant="contained" sx={{padding:'10px 38px',margin:"25px auto",backgroundColor:"#5B3F89",fontWeight:"900",'&:hover': {backgroundColor: '#8462bc'}}}>SUBMIT</Button>
            </Box>
        </Box>
        <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeAlert} sx={{ width: "100%" }}>
            {msgAlert}
        </Alert>
        </Snackbar>
        <ShowFeedbacks show={showFeeds}/>
        </>
    );
}
