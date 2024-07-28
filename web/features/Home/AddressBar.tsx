import { useNavigate } from 'react-router-dom'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TextField, IconButton, ButtonBase } from '@mui/material'
import { RiSearch2Line } from 'react-icons/ri'
import { GrHomeRounded } from 'react-icons/gr'
import { BiSolidRightArrow } from 'react-icons/bi'
import useLocations from './useLocations'

const AddressBar = () => {
  const navigate = useNavigate()
  const [searchFocused, setSearchFocused] = useState(false)
  const locations = useLocations()
  const addressContainerRef = useAddressBarRef(locations.paths)

  return (
    <div className="grid grid-flow-col auto-cols-[auto_1fr_auto] gap-2">
      <IconButton
        size="small"
        onClick={() => navigate('/')}
        disabled={locations.paths.length === 0}
      >
        <GrHomeRounded />
      </IconButton>

      <div
        ref={addressContainerRef}
        className={$tw(searchFocused && 'hidden', 'overflow-hidden')}
      >
        <div className="flex items-center h-full">
          {locations.paths.map((location, i) => {
            return (
              <React.Fragment key={i}>
                <ButtonBase
                  tabIndex={-1}
                  className="!rounded-md"
                  onClick={() => {
                    const path = locations.paths.slice(0, i + 1).join('/')
                    navigate('/' + path)
                  }}
                >
                  <div className="px-1">{location}</div>
                </ButtonBase>

                {locations.paths.length - 1 === i || (
                  <div className="opacity-25 text-[0.5rem]">
                    <BiSolidRightArrow />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <AddressBarSearch
        searchFocused={searchFocused}
        setSearchFocused={setSearchFocused}
      />
    </div>
  )
}

function AddressBarSearch({ searchFocused, setSearchFocused }) {
  const searchInputRef = useRef<any>()
  const searchText = $useStore((state) => state.homeui.status.searchText)

  return (
    <div className={$tw('relative', searchFocused ? 'w-full' : 'w-10')}>
      <TextField
        fullWidth
        size="small"
        value={searchText}
        variant="outlined"
        placeholder="Search..."
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
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
        onChange={(e) => {
          $store.homeui.setState({ searchText: e.target.value })
        }}
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
  )
}

function useAddressBarRef(locations: string[]) {
  const addressContainerRef = useRef<any>()

  const handleAddressBarScroll = useCallback(() => {
    if (addressContainerRef.current) {
      addressContainerRef.current.scrollLeft =
        addressContainerRef.current.scrollWidth
    }
  }, [])

  useEffect(() => handleAddressBarScroll, [locations])
  useEffect(() => {
    window.addEventListener('resize', handleAddressBarScroll)
    return () => window.removeEventListener('resize', handleAddressBarScroll)
  }, [])

  return addressContainerRef
}

export default AddressBar
