import { TextField, IconButton } from '@mui/material'
import { useMemo, useRef, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'

const AddressBar = (props) => {
  const [searchFocused, setSearchFocused] = useState(false)
  const searchInputRef = useRef<any>()
  const location = useLocation()

  const addresses = useMemo(() => {
    return location.pathname
      .split('/')
      .filter((path) => path)
      .map((path, index, arr) => {
        return (
          <>
            {index === arr.length - 1 ? (
              <p>{path}</p>
            ) : (
              <Link to={'/' + arr.slice(0, index + 1).join('/')}>{path}</Link>
            )}

            {index < arr.length - 1 && (
              <div className="mx-1 text-gray-400">&gt;</div>
            )}
          </>
        )
      })
  }, [location.pathname])

  return (
    <div className="flex items-center gap-3">
      <div>
        <Link to={'..'}>UP</Link>
      </div>

      <div
        className={$tw(searchFocused ? 'hidden' : 'flex-1', 'overflow-hidden')}
      >
        <div className="flex items-center">{addresses}</div>
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
