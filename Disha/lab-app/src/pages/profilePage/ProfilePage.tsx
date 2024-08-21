import { useState } from 'react';
import "../../features/profile/components/updateUserForm/UpdateUserForm.css";
import { User } from '../../models/User';
import { resetUser, updateUser } from '../../redux/slices/AuthenticationSlices';
import React from "react";
import Section from "../../components/Section";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './ProfilePage.css';
import { AppDispatch, RootState } from '../../redux/reduxStorage';
import { fetchUser } from '../../redux/slices/AuthenticationSlices';
import { CircularProgress } from '@mui/material';
import { ProfileLoanRecord } from '../../features/profile/components/ProfileLoanRecord/ProfileLoanRecord';
import { ProfileLoanRecordReturn } from '../../features/profile/components/ProfileLoanRecord/ProfileLoanRecordReturn';
import { LoanRecord } from '../../models/LoanRecord';
import axios from 'axios';


const ProfilePage: React.FC = () => {
    const [show, setShow] = useState("Loaned");
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const userState = useSelector((state: RootState) => state.authentication);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser);
    const profileUser = useSelector((state: RootState) => state.authentication.profileUser);
    const { userId } = useParams();
    const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>();
    const [records, setRecords] = useState<LoanRecord[]>([]);
    const fetchRecordsForUser = async () => {
        if (user) {
            try {
                let res = await axios.post(`http://localhost:8000/loan/query`, {
                    property: "patron",
                    value: user._id
                });
                let r = res.data.records;
                setRecords(r);
            } catch (error) {

            }
        }
    }
    useEffect(() => {
        fetchRecordsForUser();
    }, [user]);

    const loanedRecords = records.filter(record => record.status === "LOANED");
    const updateUserState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayUpdate(true);
        if (e.target.value && e.target.name && user) {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            });
        }
    }
    const submitUpdatedUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (user) dispatch(updateUser(user));
        setDisplayUpdate(false);
    }
    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.removeItem("userId");
        dispatch(resetUser("loggedInUser"));
        dispatch(resetUser("profileUser"));
        navigate("/");
    }
    useEffect(() => {
        if (userState.profileUser) {
            setUser(JSON.parse(JSON.stringify(userState.profileUser)));
        }

    }, [userState.profileUser?._id])
    useEffect(() => {
        if (userId) {
            if (loggedInUser?._id === userId || loggedInUser?.type === 'EMPLOYEE') {
                dispatch(fetchUser({
                    userId,
                    property: 'profileUser'
                }));
            } else {
                navigate("/");
            }

        }
    }, [userId])

    const toggleShow = () => {
        setShow((prevShow) => prevShow === 'Loaned' ? 'Returned' : 'Loaned');
    };

    return (
        <Section className="bg-gray-100  ">
            <div className="w-full text-white bg-main-color">
                <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                    <div className="p-4 mt-8 flex flex-row items-center justify-between">
                        <button
                            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline "
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg fill="currentColor" stroke="black" viewBox="0 0 20 20" className="w-6 h-6 bg-gray-400 p-1 rounded h-4 w-4">
                                {!menuOpen ? (
                                    <path
                                        fillRule="evenodd"
                                        stroke="currentColor"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />

                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        stroke="currentColor"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    <nav className={`flex-col flex-grow pb-4 md:pb-0 ${menuOpen ? 'flex' : 'hidden'} md:flex md:justify-end md:flex-row`}>
                       {userState.loggedInUser?._id===userState.profileUser?._id?  <div className="relative ">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm  rounded font-semibold text-left bg-blue-800 md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:bg-blue-800 focus:outline-none focus:shadow-outline"
                            >
                                <span>{user?.firstName}</span>
                                <img
                                    className="inline h-6 rounded-full"
                                    src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=Buddy"
                                    alt="avatar" />
                                <svg fill="currentColor" viewBox="0 0 20 20" className={`inline w-4 h-4 transition-transform duration-200 transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
                                    <div className="py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm">

                                       <button onClick={logout} className="block w-full px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                                            Logout
                                        </button> 

                                    </div>
                                </div>
                            )}
                        </div>:<></>}
                    </nav>
                </div>
            </div>
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user?.firstName}</h1>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                
Please return the loaned equipment on time so other students can easily use it.
                            </p>
                            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm mt-8">
                                <li className="flex items-center py-3">
                                    <span>List</span>
                                    <span className="ml-auto"><button className="bg-green-500 py-1 px-2 rounded text-white text-sm" onClick={toggleShow}>{show === "Loaned" ? "Returned" : "Loaned"}</button></span>
                                </li>

                            </ul>
                        </div>
                        <div className="my-4"></div>
                    </div>
                    <div className="w-full   h-128">
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-4 font-semibold">First Name</div>
                                        <div className="px-4 py-2"> <input className={` ml-0 update-user-input  bg-opacity-80 text-gray-700 py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${userState.loggedInUser?._id !== userState.profileUser?._id ? 'opacity-50 cursor-not-allowed' : ''
                                            }`} name="firstName" value={user?.firstName} onChange={updateUserState} disabled={userState.loggedInUser?._id !== userState.profileUser?._id} /></div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-4 font-semibold">Last Name</div>
                                        <div className="px-4 py-2"><input className={` mb-2 update-user-input  bg-opacity-80 text-gray-700 py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${userState.loggedInUser?._id !== userState.profileUser?._id ? 'opacity-50 cursor-not-allowed' : ''
                                            }`} name="LastName" value={user?.lastName} onChange={updateUserState} disabled={userState.loggedInUser?._id !== userState.profileUser?._id} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-4 font-semibold">Email</div>
                                        <div className="px-4 py-2">
                                            <a className="text-blue-800" > <input className={`update-user-email update-user-input  bg-opacity-80 text-gray-700 py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${userState.loggedInUser?._id !== userState.profileUser?._id ? 'opacity-50 cursor-not-allowed' : ''
                                                }`} name="email" value={user?.email} onChange={updateUserState} disabled={userState.loggedInUser?._id !== userState.profileUser?._id} /></a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-4 font-semibold">Current pending items</div>
                                        <div className="px-8 py-4">{loanedRecords.length}</div>
                                    </div>
                                </div>
                            </div>
                            {displayUpdate ? <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4" onClick={submitUpdatedUser}> update </button> : <></>}
                        </div>
                        <div className="my-4"></div>
                        {show === "Loaned" ? <> {profileUser ?
                            <ProfileLoanRecord /> : <CircularProgress className='message' />}</> : <>{profileUser ?

                                <ProfileLoanRecordReturn />

                                : <CircularProgress className='message' />}</>}
                    </div>
                </div>
            </div>
        </Section>

    );
};

export default ProfilePage;
