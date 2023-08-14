import React, { useRef, useState } from 'react';
import { GithubAuthProvider, getAuth, signInWithPopup, signOut, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';


const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(resuslt => {
                const loggedInUser = resuslt.user;
                setUser(loggedInUser);
                // console.log(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }
    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(resuslt => {
                console.log(resuslt)
                setUser(null);
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser)
                console.log(loggedUser)

            })
            .catch(error => {
                console.log('error', error.message)
            })
    }


    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();
        setError('');
        setSuccess('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            setError('Please Use Minimum eight characters, at least one letter and one number')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                if (!loggedUser.emailVerified) {

                }
                setSuccess('user login successful');
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const resetPass = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide an email address');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(result => {
                alert('Please check your email');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            })
    }

    return (
        <div>
            {/* {
                !user &&
                <div><h2>Login</h2>
                    <button onClick={handleGoogleSignIn}>Google</button>
                    <button onClick={handleGithubSignIn} >GitHub</button>
                </div>
            } */}



            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name='email'
                                ref={emailRef}
                                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-300"
                                placeholder="you@example.com"
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
                                name='password'
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
                                Log In
                            </button>

                        </div>
                    </form>
                    <p className='text-red-600 mt-4'>{error}</p>

                    <p className='text-green-600 mt-4'>{success}</p>
                    <p>Forgot Password? <button onClick={resetPass} className='text-blue-500'>Reset Password</button></p>
                    <p>New to this Website? Please <Link to='/register' className='text-blue-500'>Register</Link></p>
                    {
                        !user &&
                        <div className='flex justify-evenly '>
                            <button className='border bg-green-300 rounded-md mt-5' onClick={handleGoogleSignIn}>Google</button>
                            <button className='border bg-green-300 rounded-md mt-5' onClick={handleGithubSignIn} >GitHub</button>
                        </div>
                    }
                    {user && <div>
                        <h3>Hello {user.displayName}</h3>
                        <p>Email: {user.email}</p>
                        <img src={user.photoURL} alt="" />
                        <button onClick={handleGoogleSignOut}>SignOut</button>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Login;