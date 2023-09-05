import { Container, Grid, Paper, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react'
import { useTheme } from '@emotion/react'
import FormTextField from '../../components/FormUI/FormTextField/FormTextField';
import FormSelect from '../../components/FormUI/FormSelect/FormSelect';
import { useGetDepartmentsQuery } from '../../services/firebaseApi';
import styled from '@emotion/styled';

let renderCount = 0

const NewEmployee = () => {
  const theme = useTheme()
    
    const {data: departments, isSuccess } = useGetDepartmentsQuery()
    const INIT_FORM_STATE = {
      name:'',
      lastName:'',
      email:'',
      phone:'',
      addressLine1:'',
      addressLine2:'',
      city: '',
      state:'',
      country: ''
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

    renderCount++
  return (
    <div style={{marginTop:'70px'}}>
    <h2>Form render = {renderCount}</h2>
    { isSuccess ? (
        <Grid container>
          <Grid item xs={12}>
            <Container maxWidth="md">
                <div>
                  <Formik
                      initialValues={{
                      ...INIT_FORM_STATE
                      }}
                      // validationSchema={FORM_VALIDATION}
                      // onSubmit={values => {
                      // console.log(values);
                      // }}
                  >
                      <Form>

                      <Grid container spacing={2}>

                            <Grid item xs={12}>
                              <Typography>
                                  Personal details
                              </Typography>
                            </Grid>
                            <Item>
                            
                              <Grid item xs={12}>
                                <Grid item xs={9}>
                                  <Grid item xs={12}>
                                    <FormTextField
                                        name="name"
                                        label="Name"
                                    />
                                  </Grid>
                                  <Grid item xs={5}>
                                    <FormTextField
                                        name="email"
                                        label="Email"
                                    />
                                  </Grid>
                                  <Grid item xs={5}>
                                    <FormTextField
                                        name="phone"
                                        label="Phone"
                                    />
                                  </Grid>

                                </Grid>
                                <Grid item xs={3}>
                                  <Typography>test left</Typography>
                                </Grid>

                              </Grid>
                              
                              <Grid item xs={6}>
                              <FormTextField
                                  name="lastName"
                                  label="Last Name"
                              />
                              </Grid>

                              <Grid item xs={12}>
                              <FormTextField
                                  name="email"
                                  label="Email"
                              />
                              </Grid>

                              <Grid item xs={12}>
                              <FormTextField
                                  name="phone"
                                  label="Phone"
                              />
                              </Grid>
                            </Item>
                          <Grid item xs={12}>
                          <Typography>
                              Address
                          </Typography>
                          </Grid>

                          <Grid item xs={12}>
                          <FormTextField
                              name="addressLine1"
                              label="Address Line 1"
                          />
                          </Grid>

                          <Grid item xs={12}>
                          <FormTextField
                              name="addressLine2"
                              label="Address Line 2"
                          />
                          </Grid>
                      
                          <Grid item xs={6}>
                          <FormTextField
                              name="city"
                              label="City"
                          />
                          </Grid>
                          
                          <Grid item xs={6}>
                          <FormTextField
                              name="state"
                              label="State"
                          />
                          </Grid>
                          
                          <Grid item xs={6}>
                          
                          </Grid>

                          <Grid item xs={12}>
                          <Typography>
                          Booking
                          </Typography>
                      </Grid>

                      </Grid>

                      </Form>
                  </Formik>
                </div>
            </Container>
            </Grid>
        </Grid>
        ) 
: '' }
    </div>

  )
}

export default NewEmployee