import React from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ maxWidth: '50rem' }}>{children}</div>
}

export default Wrapper
