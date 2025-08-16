import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//Layout
import LayoutAdmin from './layouts/LayoutAdmin';
//pages
import Error404 from './pages/Error404';
//auth
import Login from './pages/auth/Login';
//Pages admin
import Home from './pages/admin/Home';
//usuarios
import Profile from './pages/admin/usuarios/ProfileAdmin';
import ListUser from './pages/admin/usuarios/ListUser';
//import ForgetPassword from './pages/auth/ForgetPassword';
//register
import RegisterUser from './pages/auth/register/RegisterUser';
import RegisterInstitutions from './pages/auth/register/RegisterInstitutions';
//admin
//import ProtectRoute from './pages/admin/protectedRoute/ProtectRoute';
//Notificaciones
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="login" element={<Login />} />        
        <Route path="registerUser" element={<RegisterUser />} />
        {/* Rutas protegidas */}
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<Home />} />
          {/* Usuarios */}
          <Route path="registerUser" element={<RegisterUser />} />
          <Route path="usuario" element={<Profile />} />
          <Route path="usuarios" element={<ListUser />} />
          {/* Institutions */}
          <Route path="registerInstitutions" element={<RegisterInstitutions />} />
        </Route>
        {/* <Route element={<ProtectRoute />} >
        </Route> */}
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Toaster />      
    </BrowserRouter>
  )
}

export default App
