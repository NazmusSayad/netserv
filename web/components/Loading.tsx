import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import {} from '@mui/material'
import { RiRefreshLine } from 'react-icons/ri'
import css from './Loading.module.css'

type LoadingProps = {
  children?: string
}

export const Loading = ({ children }: LoadingProps) => {
  const [spinnerSize, setSpinnerSize] = useState('0')
  const containerRef = useRef<HTMLDivElement>()

  useLayoutEffect(() => {
    const minSize = Math.min(
      containerRef.current?.clientWidth || 0,
      containerRef.current?.clientHeight || 0
    )
    // setSpinnerSize(Math.max(0, (minSize / 100) * 35) + 'px')
  }, [])

  return (
    <div
      ref={containerRef as any}
      className={$tw(
        'w-full flex justify-center items-center flex-col',
        children ? 'h-[90%]' : 'h-full'
      )}
    >
      {children && <h1 className={'text-2xl mb-5'}>{children}</h1>}

      <div className={$tw(css.loader)} />

      {/* <div className={$tw(css.spinning)}>
        <RiRefreshLine style={{ width: spinnerSize, height: spinnerSize }} />
      </div> */}
    </div>
  )
}

export const LoadingSuspense = ({
  children,
  text,
}: Omit<LoadingProps, 'children'> & { text?: string } & {
  children: JSX.Element
}) => {
  return <Suspense fallback={<Loading children={text} />}>{children}</Suspense>
}
