import { IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material'
import css from './CSS.module.css'
import { CiGrid41 } from 'react-icons/ci'
import { RiRefreshLine } from 'react-icons/ri'
import { HiOutlineBars4 } from 'react-icons/hi2'
import HeaderActionMenu from './HeaderActionMenu'
import useIsAnyItemSelected from './useIsAnyItemSelected'
import { useLocation, useNavigate } from 'react-router-dom'
import HeaderActionSelected from './HeaderActionSelected'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const selected = useIsAnyItemSelected()
  const refreshButtonAnimation = $useStore(
    (state) => state.homeui.status.refreshButtonAnimation
  )

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center">
          {selected ? <HeaderActionSelected /> : <HeaderActionMenu />}
        </div>
      </div>

      <div className="flex items-center">
        <ShowTypeChip />

        <div className="ml-4 mr-2 border-l border-white h-6 opacity-25" />

        <IconButton
          size="large"
          disabled={refreshButtonAnimation}
          onClick={() =>
            navigate(location.pathname, { replace: true, state: 'refresh' })
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

const ShowTypeChip = () => {
  const showType = $useStore((state) => state.homeui.config.showType)

  return (
    <ToggleButtonGroup>
      <ToggleButton
        value="grid"
        selected={showType === 'grid'}
        disabled={showType === 'grid'}
        onClick={() => $actions.homeui.setConfig({ showType: 'grid' })}
        className="!p-1 !text-2xl"
      >
        <CiGrid41 />
      </ToggleButton>

      <ToggleButton
        value="list"
        selected={showType === 'list'}
        disabled={showType === 'list'}
        onClick={() => $actions.homeui.setConfig({ showType: 'list' })}
        className="!p-1 !text-2xl"
      >
        <HiOutlineBars4 />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default Header
