import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, Grid, Typography } from '@mui/material';
import FormTextField from '../../components/FormUI/FormTextField/FormTextField';
import FormSelect from '../../components/FormUI/FormSelect/FormSelect';
import FormDate from '../../components/FormUI/FormDate/FormDate';
import FormCheckBox from '../../components/FormUI/FormCheckBox/FormCheckBox';
import FormButton from '../../components/FormUI/FormButton/FormButton';
import countries from '../../data/country.json'


const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  arrivealDate: '',
  departureDate: '',
  message: '',
  termsOfService: false
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  phone: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number')
    .required('Required'),
  addressLine1: Yup.string()
    .required('Required'),
  addressLine2: Yup.string(),
  city: Yup.string()
    .required('Required'),
  state: Yup.string()
    .required('Required'),
  country: Yup.string()
    .required('Required'),
  arrivealDate: Yup.date()
    .required('Required'),
  departureDate: Yup.date()
    .required('Required'),
  message: Yup.string(),
  termsOfService: Yup.boolean()
    .oneOf([true], 'The terms and conditions must be accepted.')
    .required('The terms and conditions must be accepted.'),
});

const AddEmployee = () => {

  return (
    <Grid container>
      <Grid item xs={12}>
       
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div >

            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                console.log(values);
              }}
            >
              <Form>

                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <Typography>
                      Your details
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <FormTextField
                      name="firstName"
                      label="First Name"
                    />
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

                  <Grid item xs={12}>
                    <FormSelect
                      name="country"
                      label="Country"
                      options={countries}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      Booking information
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <FormDate
                      name="arrivealDate"
                      label="Arrival Date"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormDate
                      name="departureDate"
                      label="Departure Date"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormTextField
                      name="message"
                      label="Message"
                      multiline={true}
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormCheckBox
                      name="termsOfService"
                      legend="Terms Of Service"
                      label="I agree"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormButton>
                      Submit Form
                    </FormButton>
                  </Grid>


                </Grid>

              </Form>
            </Formik>

          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default AddEmployee;