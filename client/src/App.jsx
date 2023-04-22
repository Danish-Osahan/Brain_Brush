import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";
import { FormField } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <header className="flex justify-between items-center w-full bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] shadow-2xl">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] rounded-md px-4 py-2 text-white ">Create</Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
      </Routes>
      </main>
    </BrowserRouter>
  );

  
};

export default App;
