import React from 'react'
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import RecipeHome from "./RecipeHome"

import "./index.scss"

// import critical federation modules! 
// website will not load if this modules are not available
import Header from "layout/Header"
import Footer from "layout/Footer"

function App() {

  function Home(){
    return(
      <div className='text-center'>
        <a href='/recipe-home'>Recipes Home</a>
      </div>
    )
  }

  return(
    <div className='flex flex-col min-h-screen'>
    <Header />
    <BrowserRouter>
      <Routes>
      <Route path='/' element={< Home />}/>
        <Route path='/recipe-home/*' element={< RecipeHome />}/>
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById("app"))