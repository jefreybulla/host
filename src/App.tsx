import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./index.scss"

// import critical federation modules! 
// website will not load if this modules are not available
import Header from "layout/Header"
import Footer from "layout/Footer"

function App() {
  const [isRecipeAvailable, setIsRecipeAvailable] = useState(false)
  const [recipeComponent, setRecipeComponent] = useState(() => (<>placeholder component</>))

  function ImportedComponent(){
    return recipeComponent
  }

  useEffect(() => {
    // import non-critical federation modules
    import("pages/Recipes").then((myModule) => {
      console.log('Recipes import completed')
      setIsRecipeAvailable(true)
      setRecipeComponent( myModule.default)
      })
      .catch((err) => {
        console.log('Recipes module unavailable')
        console.log(err.message)
      })
  }, [])

  function renderRecipes(){
    if(isRecipeAvailable){
      return <Route path='/' element={<ImportedComponent />}/>
    }
    else{
      return <Route path='/' element={<>loading...</>}/>
    }
  }

  return(
    <div className='flex flex-col min-h-screen'>
    <Header />
    <BrowserRouter>
      <Routes>
        {renderRecipes()}
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById("app"))