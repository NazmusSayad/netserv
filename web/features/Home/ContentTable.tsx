import { Location, useLocation, useNavigate } from 'react-router-dom'
import { MouseEventHandler } from 'react'
import { Checkbox } from '@mui/material'
import { FcFile } from 'react-icons/fc'
import { FcFolder } from 'react-icons/fc'
import { getScrollBarWidth } from '@/utils/dom'
import { actions, useStore } from '@/store'
import { convertBytesToUnit } from '@/utils/size'
import fileSupport from '@/config/file-support'
import useIsAnyItemSelected from './useIsAnyItemSelected'

const ContentTable = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentDir = useStore((state) => state.homeui.status.currentDir)
  if (!currentDir) return <div>Empty</div>

  return (
    <div className="relative">
      <table style={{ width: '100%' }}>
        <tbody>
          <TableHeader />

          {Object.values(currentDir.childDirs).map((item) => {
            return (
              <TableDataItem
                key={item.name}
                data={item}
                location={location}
                navigate={(path: string) => {
                  navigate(`${location.pathname}/${path}`)
                }}
              />
            )
          })}

          {Object.values(currentDir.childFiles).map((item) => {
            return (
              <TableDataItem
                key={item.name}
                data={item}
                location={location}
                navigate={(path: string) => {
                  navigate(`${location.pathname}/?file=${path}`)
                }}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const TableHeader = () => {
  const isAnySelected = useIsAnyItemSelected()
  console.log({ selected: isAnySelected })

  return (
    <TableRow
      addPadding
      className={
        'sticky top-0 bg-zinc-800 outline outline-white/15 outline-1 z-[999]'
      }
    >
      <th className={checkboxColumnClass}>
        <Checkbox
          checked={isAnySelected}
          onChange={() => {
            isAnySelected
              ? actions.homeui.unselectAllItems()
              : actions.homeui.selectAllItems()
          }}
          size="small"
        />
      </th>
      <th className={nameColumnClass}>Name</th>
      <th className={sizeColumnClass}>Size</th>
      <th className={modifiedColumnClass}>Modified At</th>
    </TableRow>
  )
}

const TableDataItem = ({
  data,
  navigate,
  location,
}: {
  data: InfoChildDirWeb | InfoChildFileWeb
  navigate: (path: string) => void
  location: Location
}) => {
  const Icon =
    data.type === 'file'
      ? fileSupport(data.ext)?.IconComponent || FcFile
      : FcFolder

  return (
    <TableRow
      key={data.name}
      className={$tw('hover:bg-white/5')}
      onClick={() => navigate(data.name)}
    >
      <td className={$tw(checkboxColumnClass)}>
        <Checkbox
          checked={Boolean(data.selected)}
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            actions.homeui.toggleItem(data.name)
          }}
        />
      </td>

      <td className={$tw(nameColumnClass)}>
        <span className="pr-1">
          <Icon className="inline-block" />
        </span>

        <span>{data.name}</span>
      </td>

      <td className={$tw(sizeColumnClass, 'opacity-50')}>
        {data.type === 'file' && convertBytesToUnit(data.size)}
      </td>

      <td className={$tw(modifiedColumnClass, 'opacity-50')}>
        {formatDate(data.modifiedAt)}
      </td>
    </TableRow>
  )
}

function formatDate(date: Date) {
  const currentDate = new Date()
  const newDateInstance = new Date(date)

  if (currentDate.toDateString() === newDateInstance.toDateString()) {
    return currentDate.toLocaleTimeString()
  }

  return 'Hello'
}

const scrollBarWidth = getScrollBarWidth()
const TableRow = ({
  children,
  className,
  addPadding = false,
  onClick,
}: {
  children: React.ReactNode
  addPadding?: boolean
  className?: string
  onClick?: MouseEventHandler
}) => {
  if (!addPadding) {
    return (
      <tr className={className} onClick={onClick}>
        <td />
        {children}
        <td />
      </tr>
    )
  }

  return (
    <tr className={className}>
      <td
        style={{
          width: `calc(var(--abcdefghij-gap-size) - ${scrollBarWidth + 4}px)`,
          transition: 'width 0.25s ease-in',
        }}
      />
      {children}
      <td
        style={{
          width: `calc(var(--abcdefghij-gap-size) + ${scrollBarWidth / 2}px)`,
          transition: 'width 0.25s ease-in',
        }}
      />
    </tr>
  )
}

const checkboxColumnClass = 'py-1 w-10 text-left'
const modifiedColumnClass = 'w-32 text-right'
const sizeColumnClass = 'w-16 text-right'
const nameColumnClass = 'text-left break-words break-all'
export default ContentTable
