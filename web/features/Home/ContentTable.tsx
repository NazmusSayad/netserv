import { useLocation, useNavigate } from 'react-router-dom'
import { MouseEventHandler } from 'react'
import { Checkbox } from '@mui/material'
import { FcFile } from 'react-icons/fc'
import { FcFolder } from 'react-icons/fc'
import { InfoTargetWeb } from '@/store/slice/HomeUI'
import { getScrollBarWidth } from '@/utils/dom'
import { useStore } from '@/store'
import { convertBytesToUnit } from '@/utils/size'

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
  return (
    <TableRow
      addPadding
      className={'sticky top-0 bg-zinc-800 outline outline-white/15 outline-1 z-[999]'}
    >
      <th className={_1stColumnClass}>
        <Checkbox defaultChecked size="small" />
      </th>
      <th className={_2ndColumnClass}>Name</th>
      <th className={_3rdColumnClass}>Modified At</th>
      <th className={_4thColumnClass}>Size</th>
    </TableRow>
  )
}

const TableDataItem = ({
  data,
  navigate,
}: {
  data: InfoTargetWeb<InfoBasicDir | InfoBasicFile>
  navigate: (path: string) => void
}) => {
  return (
    <TableRow
      key={data.name}
      className={$tw('hover:bg-white/5')}
      onClick={() => navigate(data.name)}
    >
      <td className={$tw(_1stColumnClass, 'opacity-50')}>
        <Checkbox
          checked={data.selected}
          size="small"
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      </td>

      <td className={$tw(_2ndColumnClass)}>
        <span className="pr-1">
          {data.type === 'file' ? (
            <FcFile className="inline-block" />
          ) : (
            <FcFolder className="inline-block" />
          )}
        </span>

        <span>{data.name}</span>
      </td>

      <td className={$tw(_3rdColumnClass, 'opacity-50')}>
        {formatDate(data.modifiedAt)}
      </td>

      <td className={$tw(_4thColumnClass, 'opacity-50')}>
        {data.type === 'file' && convertBytesToUnit(data.size)}
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

const _1stColumnClass = 'py-1 w-10 text-left'
const _2ndColumnClass = 'text-left'
const _3rdColumnClass = 'w-48 text-right'
const _4thColumnClass = 'w-16 text-right'
export default ContentTable
