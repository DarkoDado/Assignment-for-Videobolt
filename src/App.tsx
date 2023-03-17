import './App.scss'
import React from 'react'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFound } from './components/NotFound/NotFound'
import { Support } from './components/support/Support'
import { Game } from './components/Game/Game'

function App (): JSX.Element {
  return (
    <div className='container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/game1' element={<Game />} />
        </Routes>
        <Footer to='' />
        <Support />
      </BrowserRouter>
    </div>
  )
}

export default App
