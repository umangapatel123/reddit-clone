import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../../store/authSlice.js'
import authService from '../../appwrite/auth.js'
import {useForm } from 'react-hook-form'



function Signup() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error,setError] = useState(null)
    const {register,handleSubmit} = useForm()


    const onSubmit = async (data) => {
        console.log(data)
        setError("")
        try{
            const res = await authService.createAccount(data.email,data.password,data.name)
            if(res){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                }
                navigate('/')
            }
        }
        catch(e){
            setError(e.message)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input {...register('name')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input {...register('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input {...register('password')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" required />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign Up
                </button>
            </div>
        </form>
        </div>
    )
}

export default Signup