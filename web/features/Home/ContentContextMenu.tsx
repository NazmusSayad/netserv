import { useEffect, useMemo, useRef, useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaDownload } from 'react-icons/fa6'
import { ImNewTab } from 'react-icons/im'
import { getFsUrl, useApi } from '@/api/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { downloadUsingDOM } from '@/utils/dom'
import { BiRename } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import SimpleModal from '@/components/SimpleModal'
import { IconButton, TextField } from '@mui/material'
import { GiCheckMark } from 'react-icons/gi'

export default function ContentContextMenu() {
  const api = useApi()
  const locationReact = useLocation()
  const contextMenu = $useStore((state) => state.homeui.status.rowContextMenu)
  const isReadOnly = $useStore((state) => state.auth.readOnly)

  const handleClose = () => {
    $actions.homeui.setState({ rowContextMenu: null })
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
      {
        label: 'Rename',
        icon: <BiRename />,
        disabled: isReadOnly,
        onClick() {
          $actions.homeui.setState({ renameItem: contextMenu?.item! })
        },
      },
      {
        label: 'Delete',
        icon: <AiOutlineDelete />,
        disabled: isReadOnly,
        async onClick() {
          await api.post('/api/delete' + locationReact.pathname, {
            names: [contextMenu?.item.name!],
          })

          $actions.homeui.deleteItems([contextMenu?.item.name!])
        },
      },
    ]
  }, [contextMenu?.item, locationReact.pathname])

  return (
    <>
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

      <RenameModal />
    </>
  )
}

function RenameModal() {
  const api = useApi()
  const location = useLocation()
  const navigate = useNavigate()
  const [newName, setNewName] = useState('')
  const renameItem = $useStore((state) => state.homeui.status.renameItem)
  const textFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setNewName(renameItem?.name || '')
  }, [renameItem?.name])

  useEffect(() => {
    if (renameItem) {
      setTimeout(() => textFieldRef.current?.focus(), 200)
    }
  }, [renameItem])

  async function handleRename() {
    const res = await api.post(
      '/api/rename' + location.pathname + '/' + renameItem?.name,
      { newName }
    )

    if (!res.ok) return
    navigate(location.pathname, { replace: true, state: 'refresh' })
    $actions.homeui.setState({ renameItem: null })
  }

  return (
    <SimpleModal
      open={!!renameItem}
      header={'Rename: ' + renameItem?.name}
      containerClassName={'w-[min(36rem,97%)] rounded-lg'}
      close={() => $actions.homeui.setState({ renameItem: null })}
    >
      <div className={'flex items-center'}>
        <TextField
          fullWidth
          value={newName}
          ref={textFieldRef}
          disabled={api.loading}
          onChange={(e) => setNewName(e.target.value)}
        />

        <IconButton disabled={api.loading} onClick={handleRename}>
          <GiCheckMark />
        </IconButton>
      </div>
    </SimpleModal>
  )
}
