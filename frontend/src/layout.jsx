import { Outlet, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Container, Button, Dropdown } from 'react-bootstrap'

import { logout, selectUser } from './features/authSlice'
import { ToastContainer } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { capitalize } from './utils'

export const AppLayout = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          <div className="d-flex">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="secondary">
                {capitalize(i18n.language)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => i18n.changeLanguage('ru')}>
                  Ru
                </Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage('en')}>
                  En
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {user && (
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(logout())
                  navigate('/login')
                }}
              >
                {t('logout')}
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
      <Outlet />
      <ToastContainer />
    </div>
  )
}
