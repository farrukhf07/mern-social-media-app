import React from 'react'

function Footer({isFixed}) {
  return (
    <>
        <footer className={`bg-dark text-white text-center py-3 ${isFixed ? "fixed-bottom" : ""}`}>
          <p className="mb-0">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </footer>
    </>
  )
}

export default Footer