import React from 'react'
import { Outlet } from 'react-router-dom'
import Background from '../styledComponents/Background'

function Layout() {

  return (
    <Background>
       <main className="flex flex-col justify-center items-center min-h-screen px-4 py-2">
            <Outlet />
     </main>
    </Background>
  )
}

export default Layout