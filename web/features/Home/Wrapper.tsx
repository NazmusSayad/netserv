import React from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={'max-w-[min(50rem,90%)] mx-auto py-1'}>{children}</div>
}

export default Wrapper
