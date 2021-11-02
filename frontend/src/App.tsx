import { useState } from 'react'
import "tailwindcss/tailwind.css"

function App() {
  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <a href="/login.html">
          <button className="bg-yellow-500 rounded-lg px-8 py-6 text-white font-extrabold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Click Me!</button>
        </a>
        <a href="/login.html">
          {/* This code below is temporary and only for setting up an issue/error ingestion service called Sentry */}
          {/* @ts-ignore */}
          <button className="bg-red-500 rounded-lg px-8 py-6 text-white font-extrabold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={methodDoesNotExist}>Sentry DANGER Button!</button> 
        </a>
      </div>
    </div>
  )
}

export default App
