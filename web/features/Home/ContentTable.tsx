import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from 'react-icons/md'
import Wrapper from './Wrapper'
import { useLocation, useNavigate } from 'react-router-dom'
import useIsAnyItemSelected from './useIsAnyItemSelected'
import fileSupport from '@/config/file-support'
import { formatDate } from '@/utils/date'
import { FcFolder } from 'react-icons/fc'
import { MouseEventHandler } from 'react'
import { Button, Checkbox } from '@mui/material'
import { FcFile } from 'react-icons/fc'
import { formatBytesToUnit } from '@/utils'
import { useGetContentData } from './useContentData'

const ContentTable = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentDir] = useGetContentData()

  return (
    <div>
      <TableHeader />

      {currentDir.sortedDirs.map((item) => {
        return (
          <TableItem
            key={item.name}
            data={item}
            navigate={(path: string) => {
              navigate(`${location.pathname}/${path}`)
            }}
          />
        )
      })}

      {currentDir.sortedFiles.map((item) => {
        return (
          <TableItem
            key={item.name}
            data={item}
            navigate={(path: string) => {
              navigate(`${location.pathname}/?file=${path}`)
            }}
          />
        )
      })}
    </div>
  )
}

const TableHeader = () => {
  const isAnySelected = useIsAnyItemSelected()
  const sortBy = $useStore((state) => state.homeui.config.sortBy)
  const sortByMode = $useStore((state) => state.homeui.config.sortByMode)

  function generateClickHandler(name: typeof sortBy) {
    return () => {
      if (name === sortBy) {
        $actions.homeui.setConfig({
          sortBy: name,
          sortByMode: sortByMode === 'asc' ? 'dsc' : 'asc',
        })
      } else $actions.homeui.setConfig({ sortBy: name })
    }
  }

  const sortByModeElement =
    sortByMode == 'asc' ? (
      <MdKeyboardDoubleArrowDown className={'mt-[-.2rem] h-4'} />
    ) : (
      <MdKeyboardDoubleArrowUp className={'mt-[-.2rem] h-4'} />
    )

  return (
    <Row
      addPadding
      className={
        'sticky top-0 bg-zinc-800 outline outline-white/15 outline-1 z-[999]'
      }
    >
      <Checkbox
        size="small"
        checked={isAnySelected}
        onChange={() => {
          isAnySelected
            ? $actions.homeui.unselectAllItems()
            : $actions.homeui.selectAllItems()
        }}
      />

      <Button
        color={'inherit'}
        className={'!px-2 size-full !text-right !justify-start'}
        onClick={generateClickHandler('name')}
        endIcon={sortBy === 'name' && sortByModeElement}
      >
        <div className={'font-medium'}>Name</div>
      </Button>

      <Button
        color={'inherit'}
        className={'!px-2 size-full !text-right !justify-end'}
        onClick={generateClickHandler('size')}
        startIcon={sortBy === 'size' && sortByModeElement}
      >
        <div className={'font-medium'}>Size</div>
      </Button>

      <Button
        color={'inherit'}
        className={'!px-2 size-full !text-right !justify-end text-nowrap'}
        onClick={generateClickHandler('modifiedAt')}
        startIcon={sortBy === 'modifiedAt' && sortByModeElement}
      >
        <div className={'font-medium'}>Modified At</div>
      </Button>
    </Row>
  )
}

const TableItem = ({
  data,
  navigate,
}: {
  navigate: (path: string) => void
  data: InfoChildDirWeb | InfoChildFileWeb
}) => {
  const Icon =
    data.type === 'file'
      ? fileSupport(data.ext)?.IconComponent || FcFile
      : FcFolder

  return (
    <Row
      key={data.name}
      className={$tw('hover:bg-white/5')}
      onClick={() => navigate(data.name)}
      onContextMenu={(e) => {
        e.preventDefault()
        $actions.homeui.setState({
          rowContextMenu: {
            item: data,
            mouseX: e.clientX,
            mouseY: e.clientY,
          },
        })
      }}
    >
      <Checkbox
        checked={Boolean(data.selected)}
        size="small"
        onClick={(e) => {
          e.stopPropagation()
          $actions.homeui.toggleItem(data.name)
        }}
      />

      <div className={'flex items-center gap-1'}>
        <Icon />
        <div className={'max-h-[1.5rem] overflow-hidden'}>{data.name}</div>
      </div>

      <span className={'opacity-80 text-sm'}>
        {data.type === 'file' && formatBytesToUnit(data.size)}
      </span>

      <span className={'opacity-80 text-xs'}>
        {formatDate(data.modifiedAt)}
      </span>
    </Row>
  )
}

const Row = ({
  children,
  className,
  onClick,
  onContextMenu,
}: {
  children: React.ReactNode[]
  addPadding?: boolean
  className?: string
  onClick?: MouseEventHandler
  onContextMenu?: MouseEventHandler
}) => {
  return (
    <div className={className} onClick={onClick} onContextMenu={onContextMenu}>
      <Wrapper>
        <div
          className={
            'grid grid-flow-col auto-cols-[2.5rem_1fr_auto_auto] items-center'
          }
        >
          <div
            className={$tw(
              'overflow-hidden py-1 w-10 text-left size-full grid items-center'
            )}
          >
            {children[0]}
          </div>

          <div
            className={$tw(
              'overflow-hidden text-left size-full grid items-center'
            )}
          >
            {children[1]}
          </div>

          <div
            className={$tw(
              'overflow-hidden w-20 text-right size-full grid items-center'
            )}
          >
            {children[2]}
          </div>

          <div
            className={$tw(
              'hidden xxs:grid',
              'overflow-hidden w-32 text-right size-full items-center'
            )}
          >
            {children[3]}
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default ContentTable
