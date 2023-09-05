import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import { CssBaseline } from "@mui/material";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employees from "./pages/Employees/Employees";
import AddEmployee from "./pages/Employees/AddEmployee";
import Payroll from "./pages/Payroll/Payroll";
import Level from "./pages/Level/Level";
import Departments from "./pages/Departments/Departments";
import Locations from "./pages/Locations/Locations";
import Sections from "./pages/Sections/Sections";
import Jobs from "./pages/Jobs/Jobs";
import Benefits from "./pages/Benefits/Benefits";
import Deductions from "./pages/Deductions/Deductions";
import OneEmployee from "./pages/Employees/OneEmployee";
import NewEmployee from "./pages/Employees/NewEmployee";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import End from "./pages/End/End";
import UpdateEmployee from "./pages/Employees/UpdateEmployee";
import ViewEmployee from "./pages/Employees/ViewEmployee";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Users from "./pages/Users/Users";
import AddUser from "./pages/Users/AddUser";
import { userInputs } from "./pages/Users/formSource";
import { auth } from "./configs/firebase.config";
import { setNewUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import RegisterResult from "./pages/RegisterResult/RegisterResult";
import ViewUser from "./pages/Users/ViewUser";
import AddEmp from "./pages/Employees/AddEmp";
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  auth.onAuthStateChanged((user)=>{
    console.log( 'userStatus', user)
    if (user){
            // setNewUser(user.auth.currentUser)
            // const email = user.auth.currentUser.email
            // const name = user.auth.currentUser.name
            // const active = user.auth.currentUser.active
            // dispatch(setNewUser({email,name,active}));
    }
  })
  // const navigate = useNavigate()
  // const data = useSelector((state) => state.userData);
  
  // if(!data.userEmail) {
  //   // navigate('/employees')
  //   navigate(-1)
  //   console.log('Error')
  //   // return <Employees />
  // }
  
  return (
    // <Layout />
    <div className="App">
    <BrowserRouter>
      <CssBaseline />
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Navigate to='/dashboard' replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/updateemployee/:id" element={<UpdateEmployee />} />
            <Route path="/viewemployee/:id" element={<ViewEmployee />} />
            <Route path="/oneemployee" element={<OneEmployee />} />
            <Route path="/newemployee" element={<NewEmployee />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/level" element={<Level />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/deductions" element={<Deductions />} />
            <Route path="/users" element={<Users />} />
            <Route
                path="/adduser"
                element={<AddUser inputs={userInputs} title="Add" />}
              />
              <Route
                path="/updateuser/:id"
                element={<AddUser inputs={userInputs} title="Update" />}
              />
              <Route
                path="/viewuser/:id"
                element={<ViewUser inputs={userInputs} title="View User" />}
              />
            
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/registerresult" element={<RegisterResult />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/end" element={<End />} />
        </Routes>
        </BrowserRouter>
        </div>
        // <Route path="*" element={<NoMatch />} />
  );
}

export default App;

// #191F45 main conetnt
// #21295c side bar




// Next Steps 
/* 
  1- Add Firebase to your project 
    - use firestore 
    - add login with (phone , email , google )
  2- identify your forms business 
  3- use Formik and yup 
  4- add project linting 
  5- add prettiefier config to your project 
  6- use version control systems (github , gitlab , gitbucket)
*/

// const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
// Minimum eight characters, at least one letter and one number