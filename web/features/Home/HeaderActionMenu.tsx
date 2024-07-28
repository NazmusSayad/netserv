import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaPlus } from 'react-icons/fa6'
import { Button, IconButton } from '@mui/material'
import { useMemo, useState } from 'react'
import useCssQuery from 'use-css-query'
import {
  MdUploadFile,
  MdOutlineCreateNewFolder,
  MdOutlineDriveFolderUpload,
} from 'react-icons/md'

export default function HeaderActionMenu() {
  const matches = useCssQuery('(max-width: 38rem)')

  const data = useMemo(() => {
    return [
      {
        label: 'New Folder',
        icon: <MdOutlineCreateNewFolder />,
        onClick: () => {
          console.log('New Folder')
        },
      },
      {
        label: 'Upload Folders',
        icon: <MdOutlineDriveFolderUpload />,
        onClick: () => {
          console.log('Upload Folders')
        },
      },
      {
        label: 'Upload Files',
        icon: <MdUploadFile />,
        onClick: () => {
          console.log('Upload Files')
        },
      },
    ]
  }, [])

  return matches ? <DropdownMenu data={data} /> : <LineMenu data={data} />
}

const LineMenu = ({ data }: { data: ButtonData }) => {
  return data.map((item, index) => (
    <Button
      key={index}
      size="small"
      color="inherit"
      startIcon={item.icon}
      onClick={item.onClick}
    >
      {item.label}
    </Button>
  ))
}

const DropdownMenu = ({ data }: { data: ButtonData }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        size={'small'}
        id="basic-button"
        aria-haspopup="true"
        onClick={handleClick}
        aria-expanded={open ? 'true' : undefined}
        aria-controls={open ? 'basic-menu' : undefined}
      >
        <FaPlus />
      </IconButton>

      <Menu
        open={open}
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        {data.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose()
              item.onClick()
            }}
          >
            <div className={'flex items-center gap-2'}>
              <div className={'text-xl mt-[-0.1rem]'}>{item.icon}</div>
              <div>{item.label}</div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

type ButtonData = {
  label: string
  icon: JSX.Element
  onClick: () => void
}[]
