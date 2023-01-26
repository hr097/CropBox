import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function showFeedbacks() {
    const [Feedbacks,setFeedbacks] = React.useState([]);
    const RatingMSG = (num) =>
    {
        const msgRate = ["very dissatisfied 🤬","dissatisfied 🙁","neutral 😎","satisfied 😀","very satisfied 🤩"];
        return msgRate[num-1];
    }
    React.useEffect(() => {
        axios.get('/api/getfeedbacks',
            {
                headers:{
                    api_token:'cropBox1008kbngetfeedbackjsnnwtr9yco2vlfgzw9nu5261'
                }
                ,params: {
                    "numOfFeedBacks":10
                },
            }
        ).then((response) => {
        if(response.status === 200)
        {
            setFeedbacks(response.data);
        }
        })
        .catch((err) => {
            console.log(err)
        });
    },[]);
    const style = {
        outerWrapper:{
            margin:'25px auto',
            padding:'20px',
            borderRadius:'10px',
            background:'#F5F8FF'
        },
        innerWrapper:{
            display:'flex'
        },
        logo:{
            borderRadius:'50%',
            background:'#EB88A7',
            fontSize:{ xs: "15px", sm: "17px", md: "25px", lg: "25px" },
            fontWeight:'bold',
            color:'white',
            width:{ xs: "30px", sm: "30px", md: "50px", lg: "50px" },
            height:{ xs: "30px", sm: "30px", md: "50px", lg: "50px" },
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        logoWrapper:{
            paddingRight:{ xs: "10px", sm: "10px", md: "20px", lg: "20px" }
        },
        name:{
            fontSize:{ xs: "12px", sm: "14px", md: "16px", lg: "16px" },
            fontWeight:'900',
            display:'inline-block'
        },
        email:{
            fontSize:{ xs: "10px", sm: "12px", md: "13px", lg: "13px" },
            color:'#606060',
            display:{ xs: 'block', sm: 'block', md: 'inline-block', lg: 'inline-block' },
            paddingLeft:{ xs: "0px", sm: "0px", md: "5px", lg: "5px" },
            //fontStyle:'italic'

        },
        rating:{
            fontSize:{ xs: "10px", sm: "12px", md: "14px", lg: "14px" }
        },
        outerDescWrap:{
            paddingTop:'10px'
        },
        description:{
            fontSize:{ xs: "14px", sm: "14px", md: "16px", lg: "16px" },
            display:'block'
        },
        topLine:{
            fontFamily: "Open Sans",
            margin: "20px auto 15px",
            color:'#5B3F89',
            display:'block',
            fontWeight:900,
            textAlign:'center',
            textTransform:'uppercase'
        }
    }
    return (
        <>
        {
            
            Feedbacks.length > 0 && 
                    
            <>
            {

           Feedbacks.map((item)=>(
            <Box sx={style.outerWrapper}>
                    <Box sx={style.innerWrapper}>
                        <Box sx={style.logoWrapper}>   
                            <Box sx={style.logo}>{item.name[0].toUpperCase()}</Box>
                        </Box>
                        <Box sx={style.content}>
                            <Typography sx={style.name}>{item.name}  <Typography sx={style.email}>({item.email})</Typography></Typography>
                            <Typography sx={style.rating}>Reacted {RatingMSG(item.rating)}</Typography>
                            <Box sx={style.outerDescWrap}>
                                <Typography sx={style.description}>{item.description}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

           ))}
           
            </>
        }
        </>
        
    );
}