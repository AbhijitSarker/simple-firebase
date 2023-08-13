import React, { useState } from 'react';
import { GithubAuthProvider, getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import app from '../../firebase/firebase.init';


const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    // console.log(auth);
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
    return (
        <div>
            {
                !user &&
                <div><h2>Login</h2>
                    <button onClick={handleGoogleSignIn}>Google</button>
                    <button onClick={handleGithubSignIn} >GitHub</button>
                </div>
            }

            {user && <div>
                <h3>Hello {user.displayName}</h3>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
                <button onClick={handleGoogleSignOut}>SignOut</button>
            </div>}
        </div>
    );
};

export default Login;