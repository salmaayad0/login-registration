import React from "react";
import { Outlet } from "react-router-dom";
import Background from "../styledComponents/Background";

function Layout() {
  return (
    <Background>
      <main className="flex flex-col justify-center items-center min-h-screen">
        <Outlet />
        <div className="starField fixed top-0 left-0 w-full h-full z-1">
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
        </div>
      </main>
    </Background>
  );
}

export default Layout;
