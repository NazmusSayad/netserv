import { Suspense } from 'react'
import css from './Loading.module.css'

type LoadingProps = {
  children?: string
}

export const Loading = ({ children }: LoadingProps) => {
  return (
    <div
      className={$tw(
        'w-full flex justify-center items-center flex-col',
        children ? 'h-[90%]' : 'h-full'
      )}
    >
      <div className={'size-60 relative'}>
        <div
          className={$tw(
            css.loader,
            '!absolute !top-[calc(50%-0.5em)] !left-[calc(50%-0.5em)]'
          )}
        />
      </div>

      {children && <h1 className={'text-2xl mt-5'}>{children}</h1>}
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
