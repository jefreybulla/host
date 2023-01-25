import React, { useEffect, useState } from "react"

export default function RecipeHome(){

  const [uiState, setUiState] = useState('loading')
  const [recipeComponent, setRecipeComponent] = useState(() => (<>placeholder component</>))

  function ImportedComponent(){
    return recipeComponent
  }

  useEffect(() => {
    // import non-critical federation modules
    import("pages/Recipes").then((myModule) => {
      console.log('Recipes import completed')
      setUiState('ready')
      setRecipeComponent( myModule.default)
      })
      .catch((err) => {
        console.log('Recipes module unavailable')
        console.log(err.message)
        setUiState('unavailable')
      })
  }, [])

  function renderRecipes(){
    if(uiState === 'ready'){
      return <ImportedComponent />
    }
    else if(uiState === 'loading'){
      return (
        <div className="text-center">loading...</div>
      )
    }
    else {
      return (
        <div className="text-center">So sorry! This page is unavailable...</div>
      )
    }
  }

  return(
    <>{renderRecipes()}</>
  )
}