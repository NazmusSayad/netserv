import {
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import css from './CSS.module.css'
import { actions, useStore } from '@/store'
import { CiGrid41 } from 'react-icons/ci'
import { RiRefreshLine } from 'react-icons/ri'
import { HiOutlineBars4 } from 'react-icons/hi2'
import { VscNewFile, VscNewFolder } from 'react-icons/vsc'

const Header = () => {
  const refreshButtonAnimation = useStore(
    (state) => state.homeui.status.refreshButtonAnimation
  )

  return (
    <div className="flex justify-between items-center">
      <div>
        <RightSideButtons />
      </div>

      <div className="flex items-center">
        <ShowTypeChip />

        <div className="ml-4 mr-2 border-l border-white h-6 opacity-25" />

        <IconButton
          size="large"
          disabled={refreshButtonAnimation}
          onClick={() =>
            actions.homeui.setState({ refreshButtonAnimation: true })
          }
          className={$tw(
            '!text-2xl !p-1',
            refreshButtonAnimation && css.refreshButtonAnimation
          )}
        >
          <RiRefreshLine />
        </IconButton>
      </div>
    </div>
  )
}

const RightSideButtons = () => {
  return (
    <div className="flex items-center">
      <Button size="small" color="inherit" startIcon={<VscNewFolder />}>
        New Folder
      </Button>
      <Button size="small" color="inherit" startIcon={<VscNewFile />}>
        New File
      </Button>
    </div>
  )
}

const ShowTypeChip = () => {
  const showType = useStore((state) => state.homeui.config.showType)

  return (
    <ToggleButtonGroup>
      <ToggleButton
        value="grid"
        selected={showType === 'grid'}
        disabled={showType === 'grid'}
        onClick={() => actions.homeui.setConfig({ showType: 'grid' })}
        className="!p-1 !text-2xl"
      >
        <CiGrid41 />
      </ToggleButton>

      <ToggleButton
        value="list"
        selected={showType === 'list'}
        disabled={showType === 'list'}
        onClick={() => actions.homeui.setConfig({ showType: 'list' })}
        className="!p-1 !text-2xl"
      >
        <HiOutlineBars4 />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default Header
