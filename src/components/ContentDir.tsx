import usePathJoin from '@/hooks/usePathJoin'
import { DirResponse } from '@/types/data'
import { Link } from 'react-router-dom'

export default function ContentDir({ dir }: { dir: DirResponse }) {
  const join = usePathJoin()

  return (
    <div>
      {dir.directories.map((name, i) => (
        <div key={name + i}>
          <Link to={join(name)}>📁{name}</Link>
        </div>
      ))}

      {dir.files.map((file, i) => (
        <div key={file.name + i}>
          <Link to={join(file.name)}>📝{file.name}</Link>
        </div>
      ))}
    </div>
  )
}
