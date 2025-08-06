import { Outlet } from 'react-router-dom'

const BlankLayout = () => {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  )
}

export default BlankLayout