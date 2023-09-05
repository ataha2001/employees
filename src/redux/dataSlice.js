import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  
  name: 'empData',
  
  initialState: { id:0,
    empName:'',
    email:'',
    phone:'',
    gender:'',
    bdate:'',
    address:'',
    file: null,

    departmentsId:'',
    sectionsId:'',
    levelsId:'',
    jobsId:'',
    locationsId:'',
    insuranceNo:'',
    active:false,

    bsalary:'',
    // benefitId:'',
    // benefitAmount:'',
    benefits:[],
    deductions:[],

},
reducers: {
    setData: (state, action) => {
      // Update the data state with the payload
      state.id = action.payload.id;
      state.empName = action.payload.empName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.bdate = action.payload.bdate;
      state.address = action.payload.address;
      state.file = action.payload.file;
      state.departmentsId = action.payload.departmentsId;
      state.sectionsId = action.payload.sectionsId;
      state.levelsId = action.payload.levelsId;
      state.jobsId = action.payload.jobsId;
      state.locationsId = action.payload.locationsId;
      state.insuranceNo = action.payload.insuranceNo;
      state.active = action.payload.active;
      state.bsalary = action.payload.bsalary;
      state.benefits = action.payload.benefits;
      state.deductions = action.payload.deductions;
    },
  },
});

export const { setData } = dataSlice.actions; // Export the action creator

export default dataSlice.reducer; // Export the reducer