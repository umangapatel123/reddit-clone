import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Premium() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [plan, setPlan] = useState('Monthly')
    const [contact, setContact] = useState('')
    const [data, setData] = useState([])

    const authStatus = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData)



    const PaymentHandler = async (e) => {

        if(!authStatus){
            alert("Please Login First")
            return
        }
        else
        {
            setName(userData.name)
            setEmail(userData.email)
            setContact(userData.contactNumber)
        }


        const API_URL = 'https://redditapi.onrender.com/subscription'

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,plan,contact}),
        });

        const responseData = await response.json();
        setData(responseData);

        var options = {
            "key": "rzp_test_OR8EFbTS6dG5B9", 
            "amount": responseData.amount, 
            "currency": "INR",
            "name": "Reddit",
            "description": "Test Transaction",
            "image": "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png",
            "order_id": responseData.id, 
            "handler":async function (response){
                const body = {
                    ...response,
                };

                const API_URL_Verify = 'https://redditapi.onrender.com/subscription/verify'

                const response_verify = await fetch(API_URL_Verify, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                const data_verify = await response_verify.json();
                console.log(data_verify)
                if(data_verify.msg)
                {
                    if(data_verify.msg === "success"){
                        alert("Payment Successful")
                    }
                    else{
                        alert("Payment Failed")
                    }
                }
                else{
                    alert("Payment Failed")
                }
            },
            "prefill": {
                "name": name,
                "email": email,
                "contact": contact
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        e.preventDefault();
    }



    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
                <div className="flex justify-center items-center">
                    <span className="text-gray-700 font-semibold text-2xl">Reddit Premium</span>
                </div>
                <p className="mt-4 text-gray-600">Subscribe to Reddit Premium for an ad-free experience, 700 coins per month, and access to premium features.</p>
                
                <div className="mt-6">
                    <label className="block text-gray-600">Plan</label>
                    <select onChange={(e) => setPlan(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500">
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <div className="mt-6">
                    <button onClick={PaymentHandler} className="py-2 px-4 text-center bg-indigo-600 rounded-md text-white text-sm hover:bg-indigo-500">Subscribe Now</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Premium