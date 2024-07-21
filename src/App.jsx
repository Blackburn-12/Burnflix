import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Aboutme, Detailpage, Home, Popularmovies } from './components'

const App = () => {

  return (
    <>
    <div className="bg-Dark">
    <Routes >
      <Route index element={ <Home/>}/>
      <Route path='/PopularMovies' element={ <Popularmovies/>}/>
      <Route path='/movies/:id' element={ <Detailpage/>}/>
      <Route path='/aboutme' element={ <Aboutme/>}/>
    </Routes>
    </div>
   
    </>
  )
}

export default App