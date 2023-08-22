import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// weather if the user logged in or not
// Outlet represent any child component from Requireauth

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const loction = useLocation();
  
  return (
    auth?.roles?.find( role => allowedRoles?.includes(role))
     ? <Outlet />  
     : auth?.email  
        ? <Navigate to={'/unauthorized'} state={{ from: loction }} replace /> 
        : <Navigate to={'/login'} state={{ from: loction }} replace /> 
        
  )
}

export default RequireAuth;
