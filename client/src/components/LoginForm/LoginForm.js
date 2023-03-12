
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import { useNavigate } from 'react-router-dom';

import '../RegisterForm/RegisterForm.css'

import { BASE_URL } from '../../const/config.js'


export const LoginForm = () => {
    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(UserContext);

    const navigate = useNavigate();

    const loginFormSchema = yup.object().shape({
        email: yup.string().email("Please enter a valid email").required("Your email is required"),
        password: yup.string().min(4).max(20).required("Password is required")
    })

    const { register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(loginFormSchema)});

    const onSubmit = async (data) => {
        const { email, password } = data;
        const body = JSON.stringify({ email: email, password: password});
        console.log(body);

        try {
            let response = await fetch(BASE_URL + '/api/users/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: body
            });

            let responseJSON = await response.json();
            console.log(responseJSON)

            // redirect to home page with user signed in
            setIsAuthenticated(true);
            navigate("/");
            


        } catch(error) {
            alert(error);
        }
    }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type='string' placeholder='Email' {...register("email")} />
        <p className='error'>{errors.email?.message}</p>
        
        <input type='password' placeholder='Password' {...register("password")} />
        <p className='error'>{errors.password?.message}</p>
        
        <input type='submit' value='Login'/>
    </form>
);
}
