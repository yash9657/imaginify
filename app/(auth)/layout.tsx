import React from 'react'

// Layout has the shared UI e.g. navbar, header, sidebar, footer
const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className='auth'>{children}</main>
  )
}

export default Layout