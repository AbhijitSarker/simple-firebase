import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';

const Register = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const auth = getAuth(app);

    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value);
    // };

    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('')

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            setError('Please Use Minimum eight characters, at least one letter and one number')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Signed in 
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset();
                setSuccess('User has been created successfully')
                emailVarification(result.user);
                updateUserData(result.user, name)
            })
            .catch((error) => {
                setError(error.message)

            });
    };

    const emailVarification = (user) => {
        sendEmailVerification(user)
            .then((result) => {
                console.log(result)
                alert('Pleaser verified email address')
            })
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('Updated')
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Please Regiser!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-300"
                            placeholder="John Doe"
                            // value={email}
                            // onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-300"
                            placeholder="johndoe@example.com"
                            // value={email}
                            // onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-300"
                            placeholder="********"
                            // value={password}
                            // onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className='text-red-600 mt-4'>{error}</p>
                <p className='text-green-600 mt-4'>{success}</p>
                <p>Already have an account? Please <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};
export default Register;