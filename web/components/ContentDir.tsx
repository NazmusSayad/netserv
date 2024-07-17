import usePathJoin from '@/hooks/usePathJoin'
import { DirResponse } from '@/types/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import css from './ContentDir.module.scss'
import TrashIcon from '@/assets/icons/trash.svg'
import { useApi } from '@/api/react'
import { bytesToAutoUnit } from '@/utils'

export default function ContentDir({ dir }: { dir: DirResponse }) {
  const api = useApi()
  const join = usePathJoin()
  const location = useLocation()
  const navigate = useNavigate()

  async function deleteFile(path: string, type: 'file' | 'dir') {
    if (
      !window.confirm(
        `Are you sure you want to delete this ${type}?\n${type} name: ${path}`
      )
    )
      return

    await api.delete(path)
    navigate(location.pathname, { state: {} })
  }

  return (
    <ul className={css.contentList}>
      {dir.directories.map((name, i) => (
        <li key={name + i}>
          <span className={css.itemIcon}>📁</span>
          <Link className={css.itemLink} to={join(name)}>
            {name}
          </Link>
          <button
            className={css.deleteBtn}
            onClick={() => deleteFile(join(name), 'dir')}
          >
            <TrashIcon />
          </button>
        </li>
      ))}

      {dir.files.map((file, i) => (
        <li key={file.name + i}>
          <span className={css.itemIcon}>📝</span>
          <Link className={css.itemLink} to={join(file.name)}>
            {file.name}

            <span className={css.textFileSize}>
              {bytesToAutoUnit(file.size)}
            </span>
          </Link>
          <button
            className={css.deleteBtn}
            onClick={() => deleteFile(join(file.name), 'file')}
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  )
}
