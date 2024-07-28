import { useMemo } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaDownload } from 'react-icons/fa6'
import { ImNewTab } from 'react-icons/im'
import { getFsUrl } from '@/api/react'
import { useLocation } from 'react-router-dom'
import { downloadUsingDOM } from '@/utils/dom'

export default function ContentContextMenu() {
  const locationReact = useLocation()
  const contextMenu = $useStore((state) => state.homeui.status.rowContextMenu)
  const handleClose = () => {
    $store.homeui.setState({ rowContextMenu: null })
  }

  const menuItems = useMemo(() => {
    return [
      {
        label: 'Open in new Tab',
        icon: <ImNewTab />,
        disabled: contextMenu?.item.type !== 'dir',
        onClick() {
          window.open(location.href + '/' + contextMenu?.item.name!)
        },
      },
      {
        label: 'Download',
        icon: <FaDownload />,
        disabled: contextMenu?.item.type !== 'file',
        onClick() {
          downloadUsingDOM(
            getFsUrl(locationReact.pathname, contextMenu?.item.name!)
          )
        },
      },
    ]
  }, [contextMenu?.item, locationReact.pathname])

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? {
              top: contextMenu.mouseY,
              left: contextMenu.mouseX,
            }
          : undefined
      }
    >
      {menuItems.map(
        (item) =>
          item && (
            <MenuItem
              key={item.label}
              disabled={item.disabled}
              onClick={() => {
                handleClose()
                item.onClick()
              }}
            >
              <div className="flex items-center gap-2">
                <div className={'mt-[-0.075rem]'}>{item.icon}</div>
                <div>{item.label}</div>
              </div>
            </MenuItem>
          )
      )}
    </Menu>
  )
}
