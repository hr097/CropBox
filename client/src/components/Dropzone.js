
import * as React from "react";
import  { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import { ImageConfig } from '../config/ImageConfig'; 
import uploadImg from '../assets/images/upload.png';
import { Button } from "@mui/material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';

import "../assets/style/Dropzone.css";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const FileInput = props => {
    const wrapperRef = useRef(null);
    const [inputFile, setinputFile] = useState([]);
    const [outputFile, setoutputFile] = useState("");
    const [buttonType,setbuttonType] = useState("Upload");
    const [openAlert, setopenAlert] = useState(false);
    const [msgAlert, setmsgAlert] = useState("");
    const [typeAlert, settypeAlert] = useState("success");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setopenAlert(false);
    };

    const handleOpen = (msg,type) => {
        setmsgAlert(msg);
        setopenAlert(true);
        settypeAlert(type);
    };

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [newFile];
            setinputFile(updatedList);
            setbuttonType("Upload");
            //console.log(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...inputFile];
        updatedList.splice(inputFile.indexOf(file), 1);
        setinputFile(updatedList);
        setbuttonType("Upload");
       // console.log(updatedList);
    }

    //upload pdf to server
    const upload = () => {
        if(inputFile.length > 0)
        {
            let formData = new FormData();
            formData.append("userid",50253);
            formData.append("filename", inputFile[0]);
            let path = "";
            if(props.type==="Flipkart")
            {
                path = "https://cropbox.onrender.com/upload-for-flipkart";
            }
            else
            {
                path = "https://cropbox.onrender.com/upload-for-meesho"
            }
            axios.post(path,formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
            })
            .then((response) => {
                if(response.status === 200)
                {
                    handleOpen("File has been uploaded","success")
                    setoutputFile(response.data.filename);
                    setbuttonType("Download");
                }
                else
                {
                    handleOpen(response.statusText,"error")
                }

            })
            .catch((err) => {
                handleOpen(err,"error")
                
            });
        }
    }

    //delete file from the server
    const deletefile = () =>{
        let path =  "https://cropbox.onrender.com/delete";
        axios.post(path,{'filename':outputFile})
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    //download pdf from server
    const download = () =>
    {
        let path =  "https://cropbox.onrender.com/get-pdf";
        axios.post(path,{'filename':outputFile},{
            responseType: 'blob'
        })
        .then((response) => {
            if(response.status === 200)
            {
                deletefile();
                handleOpen("File has been downloaded successfully","success")
                let linkSource = window.URL.createObjectURL(new Blob([response.data],{type: "application/pdf"}));
                let downloadLink = document.createElement('a');
                downloadLink.href = linkSource;
                downloadLink.download = outputFile;
                downloadLink.click();
                setbuttonType("Upload");
            }
            else
            {
                handleOpen(response.statusText,"error");
            }
        })
        .catch((err) => {
            handleOpen(err,"error");
        });
    }

    return (
        <div style={{width: '100%'}}>
            <div ref={wrapperRef} className="drop-file-input" onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop pdf or Browse</p>
                </div>
                <input type="file" value=""  accept=".pdf" onChange={onFileDrop}/>
            </div>
            {
                inputFile.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to {buttonType.toLowerCase()}
                        </p>
                        {
                            inputFile.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}><ClearIcon  fontSize="small"/></span>
                                </div>
                            ))
                        }
                        <Button variant="contained" onClick={buttonType==="Upload"?upload:download} sx={{display:'block',padding:'10px 38px',margin:"25px auto auto auto",backgroundColor:"#5B3F89",fontWeight:"900",'&:hover': {backgroundColor: '#8462bc'}}}>{buttonType}</Button>
                    </div>
                    
                ) : null
            }
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={typeAlert} sx={{ width: "100%" }}>
                {msgAlert}
            </Alert>
            </Snackbar>
        </div>
    );
}

FileInput.propTypes = {
    onFileChange: PropTypes.func
}
export default FileInput;