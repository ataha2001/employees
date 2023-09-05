import * as Yup from 'yup'

export const INIT_USER_STATE = {
    id:0,
    name:'',
    email:'',
    phone:'',
    image: null,
    active: true
}
export const USER_FORM_VALIDATION = Yup.object().shape({
    // name: Yup.string().required('Required'),
    // email: Yup.string().email('invalid email').required('Required'),
    // phone: Yup.number().integer().typeError('please inter a valid phone number').required('Required'),
    // address:  Yup.string().required('Required'),
    // image: Yup.mixed().required('Required..!'),
    // bdate: Yup.date().max(new Date()).required('Required'),
    // gender: Yup.string().required('Required'),
    
})