import { Navigate, Route, Routes } from 'react-router-dom'
//import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import Navbar from './components/Navbar.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'

import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore.js'
import HomePage from "./pages/HomePage.jsx";
import ClassroomsPage from './pages/ShowClassrooms.jsx'

function App() {
  const {authUser,checkAuth,isCheckingAuth}= useAuthStore();
  const {theme} = useThemeStore();

  useEffect(()=>{
    checkAuth();
  },[]);

  console.log({authUser});

  // diaplaying Loader while authenticating the user
  if(isCheckingAuth && authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className = "size-10 animate-spin"/>
      </div>
    )
  }
  return (
    <div data-theme= {theme}>
      <Navbar/>

      <Routes>
        <Route path="/Homepage" element={<HomePage />} />
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path='/login' element={ !authUser ? <LoginPage/>  : < Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUpPage/> : < Navigate to="/" />} />
        {/* <Route path='/classrooms' element={authUser ? <ClassroomsPage/> : <Navigate to="/login" />} /> */}
        <Route path='/classrooms' element={ <ClassroomsPage/> } />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
