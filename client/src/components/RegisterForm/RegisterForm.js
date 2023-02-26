
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import './RegisterForm.css'

import { BASE_URL } from '../../const/config.js'

export const RegisterForm = () => {
    const registerFormSchema = yup.object().shape({
        firstName: yup.string().required("Your first name is required"),
        lastName: yup.string().required("Your last name is required"),
        email: yup.string().email("Please enter a valid email").required("Your email is required"),
        password: yup.string().min(4).max(20).required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords don't match"),
    })


    const { register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(registerFormSchema)});

    const onSubmit = async (data) => {
        const { firstName, lastName, email, password } = data;
        const body = JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password});
        console.log(body);

        try {
            let response = await fetch(BASE_URL + '/api/users/addUser', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: body
            });

            let responseJSON = await response.json();
            console.log(responseJSON)

            // redirect to login page

        } catch(error) {
            alert(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='string' placeholder='First name' {...register("firstName")} />
            <p className='error'>{errors.firstName?.message}</p>

            <input type='string' placeholder='Last name' {...register("lastName")} />
            <p className='error'>{errors.lastName?.message}</p>
            
            <input type='string' placeholder='Email' {...register("email")} />
            <p className='error'>{errors.email?.message}</p>
            
            <input type='password' placeholder='Password' {...register("password")} />
            <p className='error'>{errors.password?.message}</p>
            
            <input type='password' placeholder='Confirm password' {...register("confirmPassword")} />
            <p className='error'>{errors.confirmPassword?.message}</p>

            <input type='submit' value='Register'/>
        </form>
    );

}