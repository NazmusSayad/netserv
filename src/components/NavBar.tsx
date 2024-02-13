import { Link, useLocation } from 'react-router-dom'
import css from './NavBar.module.scss'
import Wrapper from '@/layouts/Wrapper'
import BackIcon from '@/assets/icons/back.svg'

export default function NavBar() {
  const location = useLocation()

  return (
    <nav className={css.nav}>
      <Wrapper>
        <div className={css.content}>
          <div className={css.dirNames}>
            {location.pathname.split('/').map((name, i, array) => {
              if (i === 0)
                return (
                  <Link key={name + i} to={`/`}>
                    🏠︎
                  </Link>
                )

              return (
                <div key={name + i}>
                  /<Link to={`${array.slice(0, i + 1).join('/')}`}>{name}</Link>
                </div>
              )
            })}
          </div>

          <div>
            {location.pathname !== '/' && (
              <Link
                className={css.link}
                to={location.pathname.replace(/\/[^\/]*$/, '')}
              >
                <BackIcon />
              </Link>
            )}
          </div>
        </div>
      </Wrapper>
    </nav>
  )
}
