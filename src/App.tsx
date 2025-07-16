import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//pages
import Error404 from './pages/Error404';
//auth
import Login from './pages/auth/Login';
//import Register from './pages/auth/Register';
//import ForgetPassword from './pages/auth/ForgetPassword';
//register
import RegisterStudent from './pages/auth/register/RegisterStudent';
import RegisterUser from './pages/auth/register/RegisterUser';
//admin
import ProtectRoute from './pages/admin/protectedRoute/ProtectRoute';
//Notificaciones
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="login" element={<Login />} />
        <Route path="registerStudent" element={<RegisterStudent />} />
        <Route path="registerUser" element={<RegisterUser />} />
        {/* Rutas protegidas */}
        <Route element={<ProtectRoute />} >
        </Route>
      <Route path="*" element={<Error404 />} />
      </Routes>
      <Toaster />      
    </BrowserRouter>
  )
}

export default App
