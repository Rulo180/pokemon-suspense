import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col grow justify-center items-center py-6">
      <div className="pb-4">
        <figure>
          <img
            src="/images/luxio-not-found.png"
            alt="Luxio"
            width={300}
          />
        </figure>
      </div>
      <div className="px-6 py-4 rounded bg-slate-100 text-center space-y-1">
        <div className="pb-4">
          <h2 className="text-xl text-primary font-bold">Oops..Page not found</h2>
        </div>
        <p className="text-gray-500 pb-5">Sorry, the page you are looking for could not be found</p>
        <Link to="/" className='btn btn-primary'>Go back to home</Link>
      </div>
    </div>
  )
}

export default NotFoundPage