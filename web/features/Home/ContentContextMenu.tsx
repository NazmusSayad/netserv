import { useMemo } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaDownload } from 'react-icons/fa6'

export default function ContentContextMenu() {
  const contextMenu = $useStore((state) => state.homeui.status.rowContextMenu)
  const handleClose = () => {
    $store.homeui.setState({ rowContextMenu: null })
  }

  const menuItems = useMemo(() => {
    return [
      contextMenu?.item.type === 'file' && {
        label: 'Download',
        icon: <FaDownload />,
        onClick() {},
      },
    ]
  }, [contextMenu?.item])

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
