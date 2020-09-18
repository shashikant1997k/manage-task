import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import '../CSS/TableView.css';
import { useStateValue } from '../StateProvider';
import ModalView from './ModalView';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
  }));

function TableView({ModalOpen}) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    let [{ tasks }, dispatch] = useStateValue();

    localStorage.setItem("userTask", JSON.stringify(tasks))

    const [editData, setEditData] = useState({});
    const [getTask, setGetTask] = useState({
        activeTask: 0,
        completedTask: 0,
        allTask: 0
    })

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditData({});
    };

    const deleteTask = (id) => {
        dispatch({
            type: "DELETE_TASK",
            id: id
        })
    }

    const editTask = (item) => {
        setOpen(true);
        setEditData(item)
    }

    const getAllTask = () => {
        setGetTask({
            activeTask: 0,
            completedTask: 0,
            allTask: 1
        });
    }

    const getActiveTask = () => {
        setGetTask({
            activeTask: 1,
            completedTask: 0,
            allTask: 0
        });
    }

    const getCompletedTask = (e) => {
        setGetTask({
            activeTask: 0,
            completedTask: 1,
            allTask: 0
        });
    }

    if(getTask.activeTask === 1){
        tasks = tasks?.filter(e => parseInt(e.status) === 0);
    } else if(getTask.completedTask === 1){
        tasks = tasks?.filter(e => parseInt(e.status) === 1);
    } else if(getTask.allTask === 1){
        tasks = tasks;
    }

    return (
        <div className="TableView">
            <ModalView editData={editData} ModalClose={handleClose} status={open} />
            <div className="table__header">
                <Button
                    onClick={handleOpen}
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                >Add Task</Button>
                <Button className="table__headerBtn" onClick={getAllTask} variant="outlined" color="primary">All Task</Button>
                <Button className="table__headerBtn" onClick={getActiveTask} variant="outlined" color="primary">Active Task</Button>
                <Button className="table__headerBtn" onClick={getCompletedTask} variant="outlined" color="primary">Completed Task</Button>
            </div>

            <div className="table__content">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks?.length ? tasks?.map((item, index) => (
                                <tr key={index}>
                                    <td>{ index + 1 }</td>
                                    <td> { item?.title } </td>
                                    <td> { item?.description } </td>
                                    <td> { parseInt(item?.status) ? <p>Completed</p> : <p>Active</p> } </td>
                                    <td>

                                        {/* <Fab size="small" onClick={() => deleteTask(item.id)} color="secondary" aria-label="delete" className={classes.margin}>
                                            <DeleteIcon />
                                        </Fab>
                                        <Fab size="small" onClick={() => editTask(item)} color="primary" aria-label="edit" className={classes.margin}>
                                            <EditIcon />
                                        </Fab> */}

                                        <IconButton onClick={() => deleteTask(item.id)} aria-label="delete">
                                            <DeleteIcon className="delete_btn" />
                                        </IconButton>
                                        <IconButton onClick={() => editTask(item)} aria-label="edit">
                                            <EditIcon className="edit_btn" />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))
                            : <tr><td colSpan="5" style={{textAlign: "center"}}><h5>No data found</h5></td></tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
        
    )
}

export default TableView
