import usePathJoin from '@/hooks/usePathJoin'
import { DirResponse } from '@/types/data'
import { Link } from 'react-router-dom'
import css from './ContentDir.module.scss'

export default function ContentDir({ dir }: { dir: DirResponse }) {
  const join = usePathJoin()

  return (
    <ul className={css.contentList}>
      {dir.directories.map((name, i) => (
        <li key={name + i}>
          <Link to={join(name)}>📁{name}</Link>
        </li>
      ))}

      {dir.files.map((file, i) => (
        <li key={file.name + i}>
          <Link to={join(file.name)}>📝{file.name}</Link>
        </li>
      ))}
    </ul>
  )
}
