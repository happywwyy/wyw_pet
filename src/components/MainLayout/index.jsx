import {
  useState,
  useEffect
} from 'react';
import {
  Tabbar,
} from 'react-vant';
import {
  HomeO,
  Search,
  FriendsO,
  SettingO,
  UserO
} from '@react-vant/icons';
import {
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom'

//菜单栏配置 - 宠物主题
const tabs = [
  { icon: <HomeO />, title: '首页', path: '/home'},
  { icon: <Search />, title: '宠物商城', path: '/shop'},
  { icon: <FriendsO />, title: '我的收藏', path: '/collection'},
  { icon: <SettingO />, title: '宠物社区', path: '/community'},
  { icon: <UserO />, title: '我的账户', path: '/account'}
]

const MainLayout = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
      console.log(location.pathname, '////')
      // es6的使用power 
      const index = tabs.findIndex(
          tab => location.pathname.startsWith(tab.path)
      );
      setActive(index)
  }, [])
  return (
      <div className='flex flex-col h-screen'
      style={{paddingBottom: '50px'}}>
        <div className='flex-1'>
          <Outlet />
        </div>
          {/* tabbar */}
          <Tabbar value={active} onChange={
              (key) => { 
                  setActive(key);
                  navigate(tabs[key].path);
          }
          }>
              {tabs.map((tab, index) => (
                  <Tabbar.Item 
                      key={index} 
                      icon={tab.icon}
                  > 
                  {tab.title}
                  </Tabbar.Item>
              ))}
          </Tabbar>
      </div>
  )
}

export default MainLayout;