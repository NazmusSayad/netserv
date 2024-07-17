const Wrapper = ({
  className,
  children,
  ...props
}: {
  className?: string
  children: any
  [i: string]: any
}) => {
  return (
    <div {...props} className={$cn('wrapper', className)}>
      {children}
    </div>
  )
}

export default Wrapper
