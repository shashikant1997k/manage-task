
import { v4 as uuidv4 } from 'uuid';

let userTask = localStorage.getItem('userTask');
export const initialState = {
    tasks: JSON.parse(userTask) ? JSON.parse(userTask) : []
};

const reducer = (state, action) => {
    switch(action.type){
        case "CREATE_TASK":
            return{
                ...state,
                tasks: [...state.tasks, {...action.taskDetails, id:uuidv4()}]
            };
        
        case "DELETE_TASK":
            const newTask = [...state.tasks];
            let index = state.tasks.findIndex((item) => item.id == action.id);
            if(index !== -1){
                newTask.splice(index, 1);
            }
            return {
                ...state,
                tasks: newTask
            }

        case "UPDATE_TASK":
            const allTask = [...state.tasks];
            let indx = state.tasks.findIndex((item) => item.id == action?.taskDetails?.id);
            if(indx !== -1){
                allTask[indx] = { ...action?.taskDetails }
            }
            return {
                ...state,
                tasks: allTask
            }
        
        default:
            return state;
    }
};

export default reducer;