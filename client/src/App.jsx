import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/echolounge',
      element: <LocationEvents slug="echolounge" />
    },
    {
      path: '/houseofblues',
      element: <LocationEvents slug="houseofblues" />
    },
    {
      path: '/pavilion',
      element: <LocationEvents slug="pavilion" />
    },
    {
      path: '/americanairlines',
      element: <LocationEvents slug="americanairlines" />
    },
    {
      path: '/events',
      element: <Events />
    },
    { path: '*', element: <p>Page not found. <Link to='/'>Back to plaza</Link></p> }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App