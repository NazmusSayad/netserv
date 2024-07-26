import { Checkbox } from '@mui/material'
import { getScrollBarWidth } from '@/utils/dom'
import { TableSingleItem } from '@/config/types'

const arrayOfNumbers = Array.from({ length: 100 }, (_, i) => ({
  name: 'name - ' + i,
  size: 23,
  modifiedAt: '999',
  selected: false,
}))

const _1stColumnClass = 'py-1 w-10 text-left'
const _2ndColumnClass = 'text-left'
const _3rdColumnClass = 'w-48 text-right'
const _4thColumnClass = 'w-12 text-right'

const ContentTable = () => {
  return (
    <div className="relative">
      <table style={{ width: '100%' }}>
        <TableHeader />

        {arrayOfNumbers.map((num) => {
          return <TableItem key={num} data={num} />
        })}
      </table>
    </div>
  )
}

const TableHeader = () => {
  return (
    <TableRow
      addPadding
      className={'sticky top-0 bg-zinc-800 outline outline-white/15 outline-1'}
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

const TableItem = ({ data }: { data: TableSingleItem }) => {
  return (
    <TableRow
      key={data.name}
      className={$tw(
        'outline outline-1 outline-gray-400/5',
        'hover:bg-white/5'
      )}
    >
      <td className={_1stColumnClass}>
        <Checkbox checked={data.selected} size="small" />
      </td>

      <td className={_2ndColumnClass}>{data.name}</td>
      <td className={_3rdColumnClass}>{data.modifiedAt}</td>
      <td className={_4thColumnClass}>{data.size}</td>
    </TableRow>
  )
}

const scrollBarWidth = getScrollBarWidth()
const TableRow = ({
  children,
  className,
  addPadding = false,
}: {
  children: React.ReactNode
  addPadding?: boolean
  className?: string
}) => {
  if (!addPadding) {
    return (
      <tr className={className}>
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
          width: `calc(var(--abcdefghij-gap-size) - ${
            scrollBarWidth / 2 + 2
          }px)`,
          transition: 'width 0.25s ease-in',
        }}
      />
    </tr>
  )
}

export default ContentTable
