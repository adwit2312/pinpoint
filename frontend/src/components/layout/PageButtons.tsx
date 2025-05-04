import React from 'react'
import { styles } from '../../constants/styles'

const PageButtons = () => {
  return (
   <header className="flex justify-between items-center w-full p-3 bg-gray-100 shadow-md rounded-lg mt-3 mb-6">
  {/* Back Button */}
  <button
    onClick={() => window.history.back()}
    className="px-4 py-2 text-sm font-semibold  bg-red-500 rounded-full hover:bg-red-600"
  >
    ← Back
  </button>

  {/* Title */}
  <h1 className={`font-black lg:text-[30px] sm:text-[20px] xs:text-[10px] text-[20px]  text-white`}>
              <span className="text-red-500">Pin</span>
              <span className="text-[brown]">Point</span>
            </h1>

  {/* Link to Additional Features */}
  <a
    href="/add-features"
    className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
  >
    Additional Features
  </a>
</header>

  )
}

export default PageButtons