import { TextField, IconButton } from '@mui/material'
import { useRef, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const AddressBar = (props) => {
  const [searchFocused, setSearchFocused] = useState(false)
  const searchInputRef = useRef<any>()

  return (
    <div className="flex items-center">
      <div className={$tw(searchFocused ? 'hidden' : 'flex-1')}>
        asdfasdfasdfasdf
      </div>

      <div className={$tw('relative', searchFocused ? 'w-full' : 'w-10')}>
        <TextField
          fullWidth
          style={{
            transition: 'opacity 0.25s ease-in',
            opacity: searchFocused ? 1 : 0,
          }}
          inputProps={{
            ref: searchInputRef,
            style: {
              paddingInline: '0.5rem',
              paddingBlock: '0.3rem',
            },
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search..."
          variant="outlined"
          size="small"
        />

        <div
          className={$tw(
            'absolute top-[50%] right-0 translate-y-[-50%]',
            searchFocused ? 'hidden' : ''
          )}
        >
          <IconButton
            tabIndex={-1}
            onClick={() => setTimeout(() => searchInputRef.current.focus(), 50)}
          >
            <RiSearch2Line />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default AddressBar
