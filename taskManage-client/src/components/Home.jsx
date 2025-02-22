import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import logo from '../assets/logo2.png';
import { TfiWrite } from "react-icons/tfi";

const Home = () => {
    const { signInWithGoogle, user, logOut } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle()
            const { email, displayName, uid } = result.user;
            const userData = { email, name: displayName, id: uid }
            const { data } = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/users/${email}`, userData)
            if (data.insertedId) {
                toast.success('Sign-In successfull');
                navigate('dashboard')
            } else {
                toast.error('something went wrong! please again later')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="hero bg-gradient-to-b lg:bg-gradient-to-r from-cyan-200 to-blue-200 min-h-screen flex flex-col w-full">
            <div className="flex flex-row justify-between items-center mx-auto w-10/12 pt-8 bg-transparent">
                <div className="">
                    <Link to="/" className="flex items-center text-xl">
                        <div>
                            <img
                                src={logo}
                                alt=""
                                width={36}
                            />
                        </div>
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text font-bold text-2xl text-transparent">
                            TaskOracle
                        </span>

                    </Link>
                </div>
                {
                    user ? (<div onClick={logOut} className="flex flex-row gap-1 items-center bg-white rounded-full px-5 py-3 hover:bg-gradient-to-l hover:from-cyan-100 duration-1000 transition-colors">
                        <span><LiaSignOutAltSolid className="text-cyan-600 text-lg" /></span>
                        <button className="font-bold text-cyan-600 text-sm">Sign-Out</button>
                    </div>) : (
                        <div onClick={handleGoogleSignIn} className="flex flex-row gap-1 items-center bg-white rounded-full px-5 py-3 hover:bg-gradient-to-l hover:from-cyan-100 duration-1000 transition-colors">
                            <span>
                                <FaGoogle className="text-cyan-600 text-lg" />
                            </span>
                            <button className="font-bold text-cyan-600 text-sm">Sign-In</button>
                        </div>
                    )
                }
            </div >


            <div className="hero-content mt-16 text-center">
                <div className="w-full text-center">
                    <div className="flex justify-center py-5">
                        <img
                            src={logo}
                            alt=""
                            className="animate-bounce w-36"
                        />
                    </div>
                    <h1 className="text-4xl  font-bold flex items-center gap-2">
                        <span className=""><TfiWrite className="text-cyan-400 text-3xl" /></span> TASK-ORACLE: Your Task Buddy
                    </h1>
                    <p className="py-6">
                        Lets organize your daily task and keep track of your tasks ✍<br />
                        Beacuse <em>Your Task Is My Command</em> 🥰
                    </p>

                    <button onClick={() => navigate('dashboard')} className="font-bold text-cyan-600 text-lg bg-white rounded-full px-5 py-3 hover:bg-gradient-to-r hover:from-cyan-100 duration-1000 transition-colors w-44 text-center">Get Started?</button>

                </div>
            </div>
        </div >
    );
};

export default Home;