import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import '../CSS/ModalView.css'
import { useStateValue } from '../StateProvider';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        [theme.breakpoints.up('xs') && theme.breakpoints.down('sm')]:{
            width: 335,
            left: `50%`,
            top: `40%`,
            transform: `translate(-50%, -50%)`,
            padding: theme.spacing(2, 2, 3),
        },
        [theme.breakpoints.up('sm')]:{
            width: 600,
            left: `50%`,
            top: `50%`,
            transform: `translate(-50%, -50%)`,
            padding: theme.spacing(2, 4, 3),
        },
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
      },
      
  }));


function ModalView({status, ModalClose, editData}) {
    const classes = useStyles();
    const [{ tasks }, dispatch] = useStateValue();
    const [data, setData] = useState({
        title: '',
        description: '',
        status: ''
    });

    useEffect(() => {
        setData({
            ...editData
        })
    },[editData])

    const inputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        
        document.querySelector(".errmsg").style.opacity = '0';
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
    };

    const submitForm = (event) => {
        event.preventDefault();
        if(!data.title){
            document.querySelector(".error_title").style.opacity = '1';
            return false;
        } else if(!data.description){
            document.querySelector(".error_desc").style.opacity = '1';
            return false;
        } else if(!data.status){
            document.querySelector(".error_status").style.opacity = '1';
            return false;
        }

        if(Object.values(editData).length > 0){
            dispatch({
                type: 'UPDATE_TASK',
                taskDetails: data
            })
        } else {
            dispatch({
                type: 'CREATE_TASK',
                taskDetails: data
            })
        }

        setData({
            title: '',
            description: '',
            status: ''
        })
        
        ModalClose();
    }

    return (
        <div>
            <Modal
                open={status}
                onClose={ModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <div className="login__container">
                        <div className="modal__header">
                            <h3>{ (Object.values(editData).length > 0) ? 'Update Task' : 'Add Task' }</h3>
                            <IconButton onClick={() => ModalClose()}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        
                        <form action="">
                            <h6>Title</h6>
                            <input type="text" placeholder="Title" name="title" value={data?.title} onChange={inputChange} />
                            <p className="errmsg error_title">Please Enter valid title</p>

                            <h6>Description</h6>
                            <textarea placeholder="Description" name="description" value={data?.description} onChange={inputChange} ></textarea>
                            <p className="errmsg error_desc">Please Enter valid description</p>

                            <h6>Status</h6>
                            <select value={data?.status} onChange={inputChange} name="status">
                                <option value="">Select Status</option>
                                <option value="0">Active</option>
                                <option value="1">Completed</option>
                            </select>
                            <p className="errmsg error_status">Please choose status</p>

                            <div className="submitBtn_div">
                                <Button type="submit" className="submit__button" onClick={submitForm} variant="contained" color="primary">{ (Object.values(editData).length > 0) ? 'Update' : 'Add' }</Button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ModalView
