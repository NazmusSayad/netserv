import Wrapper from './Wrapper'

export default function ContentGrid(props: Props) {
  return (
    <Wrapper>
      <div className={'text-center'}>
        <br />
        <p className={'text-xl'}>Coming soon...</p>
        <br />
        <br />
        <br />
        <p className={'text-4xl font-bold'}>Please use list view for now.</p>
      </div>
    </Wrapper>
  )
}

type Props = {}
