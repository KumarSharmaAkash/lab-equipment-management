import { useEffect } from 'react';
import HomePage from './pages/HomePage/Homepage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/reduxStorage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutPage from './pages/Layout/LayoutPage';
import { fetchUser } from './redux/slices/AuthenticationSlices';
import ProfilePage from './pages/profilePage/ProfilePage';
import CatalogPage from './pages/CatalogPage/CataLogPage';
import ResourcePage from './pages/ResourcePage/ResourcePage';
import {LabCardPage} from './pages/LabCardPage/LabCardPage';
import "./index.css";
import { UploadComponentForm } from './pages/uploadPage/Upload';
import LoanedRecordsList from './pages/list/List';
import { CatalogSearch } from './features/catalog';

function App() {
    const LoggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser);
    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        let userId= localStorage.getItem('userId');
        if(userId && !LoggedInUser){
          dispatch(fetchUser({
            userId,
            property:'loggedInUser'
          }))  
        }
    }, [LoggedInUser]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LayoutPage />}>
                    <Route index element={<HomePage />} />
                    <Route path='catalog' element={<CatalogPage/>} />
                    <Route path='/upload' element={<UploadComponentForm/>}/>
                    <Route path='/labcard' element={<LabCardPage/>} />
                    <Route path='/list' element={<LoanedRecordsList/>} />
                    <Route path='/search' element={<CatalogSearch/>}/>
                    <Route path='resource/:barcode' element={<ResourcePage/>} /> 
                    <Route path='profile/:userId' element={<ProfilePage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
