import React, { useState } from 'react'
// import './addNew.scss'
import './AddNew2.css'
import FormInput from '../../components/FormUINew/FromInput/FormInput'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Formik, Form, FieldArray, Field, useFormikContext, useFormik, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import FlexBetween from '../../components/flexBetween/FlexBetween';
import Header from '../../components/Header/Header';
import FormNewSelect from '../../components/FormUINew/FormNewSelect/FormNewSelect';
import { useGetBenefitsQuery, useGetDeductionsQuery, useGetDepartmentsQuery, useGetJobsQuery, useGetLevelsQuery, useGetLocationsQuery, useGetSectionsQuery } from '../../services/firebaseApi';
import FormSelect from '../../components/FormUI/FormSelect/FormSelect';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import FormRadioGroup from '../../components/FormUI/FormRadioGroup/FormRadioGroup';
import FormCheckBox from '../../components/FormUI/FormCheckBox/FormCheckBox';
// const validationSchema = yup.object({});

// const WithMaterialUI = () => {
//   const formik = useFormik({
//     initialValues: {
//       firstName:''
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     }
//   });
const validationSchema = Yup.object({});
let renderCount = 0
const AddEmp = () => {
    const [values, setValues] = useState({});
    const [file , setFile] = useState(null)
    const {data: departments} = useGetDepartmentsQuery()
    const {data: jobs } = useGetJobsQuery()
    const {data: levels } = useGetLevelsQuery()
    const {data: sections } = useGetSectionsQuery()
    const {data: locations } = useGetLocationsQuery()
    const {data: benefits } = useGetBenefitsQuery()
    const {data: deductions } = useGetDeductionsQuery()

    const handleChange = event => {
        setValues(prevValues => ({
          ...prevValues,
          // we use the name to tell Formik which key of `values` to update
          [event.target.name]: event.target.value
        }));
      }
      renderCount++
  return (
    <div style={{margin:"4rem 1.5rem"}}  >

        <FlexBetween sx={{paddingLeft:'15px', marginLeft:'15px'}}>
            <Header title="Add Employee"  
            // subtitle="add new employe details" // m="4rem 2.5rem"
            />
            <h2>Form render = {renderCount}</h2>
        </FlexBetween>
        <div className='data-container'>
            <Formik enableReinitialize={false}>
                <Form >
                <h4>Personal Information</h4>
            <div className='persolnal-info'>
            
                <div className='left' style={{backgroundColor:'yellow'}}>
                
                   
                    <img className='image'
                    src={values.image ? values.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} 
                        // src={
                        //     file
                        //     ? URL.createObjectURL(file)
                        //     : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        // }
                    alt="user"
                    />
                    <div className="formInput" style={{marginTop:'20px'}}>
                        <label htmlFor="file">
                            Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                            // disabled
                            // value={data.image ? data.image  : ''}
                        />
                    </div>
    
                </div>
                
                <div className='right'>
                    <div  >
                        <FormInput name='id' type='text'/>
                        <FormInput name='name' type='text'/>
                        <FormInput name='password' type='text'/>
                        <div className='input-line'  >
                            <FormInput  name='email' type='text' onChange={handleChange}  />
                            <FormInput  name='phone' type='text' onChange={handleChange} />
                        </div>
                        <div className='input-line'  >
                            <FormRadioGroup name="gender" legend='Gender' labelFirst="Male" labelSecond="Female"   />
                            <FormCheckBox name="active" legend="" color='secondary' label="Active" />
                        </div>
                    </div>
                </div>
                   
                
            </div>

            <div className='job-info'>
            <h4>Job Information</h4>
            <div className='select-line'  >
            <FormNewSelect  name='Department' label='Department' options={departments ? departments : ''} onChange={handleChange}  />
            <FormNewSelect name='jobsId' label='Job' options={jobs ? jobs : ''} /> 
            <FormNewSelect name='levelsId' label='Level' options={levels ? levels : ''} /> 
            <FormNewSelect name='sectionsId' label='Section' options={sections ? sections : ''} /> 
            <FormNewSelect name='locationsId' label='Location' options={locations ? locations : ''} />

            </div>
            </div>
            <div className='salary-info'></div>
            </Form>
            </Formik>
            </div>
                
            </div>
            // <FormNewSelect  name='Department' options={departments ? departments : ''} onChange={handleChange}  />
            // <FormNewSelect name='jobsId' label='Job' options={jobs ? jobs : ''} /> 
            // <FormNewSelect name='levelsId' label='Level' options={levels ? levels : ''} /> 
            // <FormNewSelect name='sectionsId' label='Section' options={sections ? sections : ''} /> 
            //     <FormNewSelect name='departmentsId' label='Department' options={departments ? departments : ''} />
            //     <FormNewSelect name='locationsId' label='Location' options={locations ? locations : ''} />

    )
}
// <FormTextField name="id" label="Employee Id" sx={{marginBottom:'15px'}} />
export default AddEmp
// <Formik enableReinitialize={false}>
//         <Form >
            
//             <div style={{marginTop: '100px'}} >AddEmp
//             <FormInput name='email' type='text' onChange={handleChange}/>
//             <FormInput name='user' type='text'/>
//             <FormInput name='password' type='text'/>
//             </div>
//         </Form>
//         </Formik>


// <img
// // src={values.image ? values.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} 
//     // src={
//     //     file
//     //     ? URL.createObjectURL(file)
//     //     : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//     // }
// alt="user"
// />