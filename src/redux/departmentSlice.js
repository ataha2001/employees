import { createSlice } from '@reduxjs/toolkit'

const initialState=[
    {
        "id": 1,
        "name": "Finance",
        "notes": "This notes for this department",
        "active": true
      },
      {
        "id": 3,
        "name": "Markting",
        "notes": "This notes for this department",
        "active": false
      }
]

export const departmentSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        addDepartment : (state, action) =>{
            const department ={
                name: action.payload,
            }
            state.push(department);
        },
        getAllDepartments: (state, action) =>{
            state.departments = action.payload;
        }
    }
})



// this for selector
export const selectAllDepartment = ( state )=> state.departments

// this is for dispatch
export const { addDepartment, getAllDepartments } = departmentSlice.actions;

// this is for configureStore
export default departmentSlice.reducer;