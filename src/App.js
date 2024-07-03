import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage.jsx';
import { routes } from './Routes';
import DefaultComponent from './Components/DefaultComponent/DefaultComponent.jsx';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils.js';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './Service/UserService'
import { initiaUser } from './Redux/Slides/UserSlide.js';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from './Components/LoadingComponent/LoadingComponent.jsx';

function App() {
  const user = useSelector((state) => state.user)
  const [isLoading, setIsloading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsloading(true)
    const {storageData, decodedToken} =  handleDecoded()
    
    if (decodedToken?.id) {
      handleGetDetailUser(decodedToken?.id, storageData)
    }
    setIsloading(false)
  },[]);

  const handleDecoded = () => {
    let storageData =  localStorage.getItem('access_token')
    let decodedToken = {}
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData);
      decodedToken = jwtDecode(storageData)
    }
    return {decodedToken,storageData}
  }

  UserService.axiosJwt.interceptors.request.use(async (config) => {

    const currentTime = new Date()

    const {decodedToken} =  handleDecoded()

    if (decodedToken?.exp && decodedToken?.exp  < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['Authorization'] = `Bearer ${data?.access_token}`
    }

    return config;
  }, (error) => {

    return Promise.reject(error);
  });

  const handleGetDetailUser = async (id, access_token) => {
    try {
      const res = await UserService.getDetailUser(id, access_token)
      dispatch(initiaUser({...res?.data, access_token: access_token}))
      // console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <LoadingComponent isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user?.isAdmin
              if (!isCheckAuth) {
                return null;
              }
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
          
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </LoadingComponent>
    </div>
  );
}

export default App; 