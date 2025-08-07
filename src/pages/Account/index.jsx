import useTitle from '@/hooks/useTitle'
import { useState, useEffect, useRef } from 'react'
import { 
  Cell, 
  CellGroup, 
  Badge, 
  Switch,
  ActionSheet,
  Toast,
  Dialog,
  Field,
  Button,
  Uploader
} from 'react-vant'
import { 
  Contact, 
  Setting, 
  Bag, 
  Like, 
  Service, 
  Question, 
  Location,
  Bell,
  Lock,
  Eye,
  Arrow,
  Photo,
  Edit
} from '@react-vant/icons'
import { useUserStore } from '@/store/useUserStore'
import LoginModal from '@/components/LoginModal'
import styles from './account.module.css'

const Account = () => {
  useTitle('我的 - 毛球伴侣')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showNicknameDialog, setShowNicknameDialog] = useState(false)
  const [newNickname, setNewNickname] = useState('')
  
  const { user, isLogin, initUser, logout, updateProfile, uploadUserAvatar, loading } = useUserStore()
  
  // 初始化用户状态
  useEffect(() => {
    initUser()
  }, [])
  
  // 检查登录状态
  useEffect(() => {
    if (!isLogin) {
      setShowLoginModal(true)
    }
  }, [isLogin])
  
  // 默认用户信息（未登录时显示）
  const defaultUserInfo = {
    nickname: '未登录用户',
    avatar: 'https://picsum.photos/80/80?random=default',
    level: '游客',
    points: 0,
    coins: 0
  }
  
  const userInfo = isLogin && user ? user : defaultUserInfo

  const handleLogout = () => {
    setShowActionSheet(true)
  }

  const confirmLogout = () => {
    logout()
    Toast.show({ message: '已退出登录', type: 'success' })
    setShowActionSheet(false)
    setShowLoginModal(true)
  }
  
  // 处理头像上传
  const handleAvatarUpload = async (file) => {
    if (!isLogin) {
      Toast.show({ message: '请先登录', type: 'fail' })
      return
    }
    
    const result = await uploadUserAvatar(file.file)
    if (result.success) {
      Toast.show({ message: '头像更新成功', type: 'success' })
    } else {
      Toast.show({ message: result.message || '头像上传失败', type: 'fail' })
    }
  }
  
  // 处理昵称修改
  const handleNicknameEdit = () => {
    if (!isLogin) {
      Toast.show({ message: '请先登录', type: 'fail' })
      return
    }
    setNewNickname(userInfo?.nickname || '')
    setShowNicknameDialog(true)
  }
  
  const confirmNicknameEdit = async () => {
    if (!newNickname.trim()) {
      Toast.show({ message: '昵称不能为空', type: 'fail' })
      return
    }
    
    const result = await updateProfile({ nickname: newNickname.trim() })
    if (result.success) {
      Toast.show({ message: '昵称更新成功', type: 'success' })
      setShowNicknameDialog(false)
    } else {
      Toast.show({ message: result.message || '更新失败', type: 'fail' })
    }
  }
  
  return (
    <div className={styles.container}>
      {/* 用户信息头部 */}
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <img 
                src={userInfo?.avatar || 'https://picsum.photos/80/80?random=default'}
                alt="用户头像"
                className={styles.avatarImg}
                onError={(e) => {
                  e.target.src = 'https://picsum.photos/80/80?random=default'
                }}
              />
            </div>
            {isLogin && (
              <Uploader
                onAfterRead={handleAvatarUpload}
                accept="image/*"
                className={styles.avatarUploader}
              >
                <div className={styles.avatarOverlay}>
                  <Photo size="16" />
                </div>
              </Uploader>
            )}
          </div>
          <div className={styles.userDetails}>
            <div className={styles.nicknameContainer}>
              <h2 className={styles.userName}>{userInfo?.nickname || '未登录用户'}</h2>
              {isLogin && (
                <Edit 
                  size="16" 
                  className={styles.editIcon}
                  onClick={handleNicknameEdit}
                />
              )}
            </div>
            <div className={styles.userLevel}>
              <Badge content={userInfo?.level || '游客'} color="#ff6b6b" />
            </div>
          </div>
          <div className={styles.userStats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{userInfo?.points || 0}</div>
              <div className={styles.statLabel}>积分</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{userInfo?.coins || 0}</div>
              <div className={styles.statLabel}>金币</div>
            </div>
          </div>
        </div>
      </div>

      {/* 快捷功能 */}
      <div className={styles.quickActions}>
        <div className={styles.actionItem}>
          <Bag className={styles.actionIcon} />
          <span>我的订单</span>
        </div>
        <div className={styles.actionItem}>
          <Like className={styles.actionIcon} />
          <span>我的收藏</span>
        </div>
        <div className={styles.actionItem}>
          <Location className={styles.actionIcon} />
          <span>收货地址</span>
        </div>
        <div className={styles.actionItem}>
          <Service className={styles.actionIcon} />
          <span>客服中心</span>
        </div>
      </div>

      {/* 功能列表 */}
      <div className={styles.menuSection}>
        <CellGroup>
          <Cell
            icon={<Contact />}
            title="个人资料"
            isLink
            rightIcon={<Arrow />}
          />
          <Cell
            icon={<Bell />}
            title="消息通知"
            rightIcon={
              <Switch
                checked={notifications}
                onChange={setNotifications}
                size="20"
              />
            }
          />
          <Cell
            icon={<Eye />}
            title="深色模式"
            rightIcon={
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                size="20"
              />
            }
          />
        </CellGroup>
      </div>

      <div className={styles.menuSection}>
        <CellGroup>
          <Cell
            icon={<Lock />}
            title="隐私设置"
            isLink
            rightIcon={<Arrow />}
          />
          <Cell
            icon={<Question />}
            title="帮助与反馈"
            isLink
            rightIcon={<Arrow />}
          />
          <Cell
            icon={<Setting />}
            title="关于我们"
            isLink
            rightIcon={<Arrow />}
          />
        </CellGroup>
      </div>

      {/* 退出登录 */}
      {isLogin && (
        <div className={styles.logoutSection}>
          <Cell
            title="退出登录"
            titleClass={styles.logoutText}
            onClick={handleLogout}
          />
        </div>
      )}

      {/* 登录弹窗 */}
      <LoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* 昵称修改弹窗 */}
      <Dialog
        visible={showNicknameDialog}
        title="修改昵称"
        showCancelButton
        onCancel={() => setShowNicknameDialog(false)}
        onConfirm={confirmNicknameEdit}
        confirmButtonLoading={loading}
      >
        <Field
          value={newNickname}
          onChange={setNewNickname}
          placeholder="请输入新昵称"
          maxLength={20}
        />
      </Dialog>

      {/* 退出确认弹窗 */}
      <ActionSheet
        visible={showActionSheet}
        onCancel={() => setShowActionSheet(false)}
        actions={[
          {
            name: '确认退出',
            color: '#ff6b6b',
            callback: confirmLogout
          },
          {
            name: '取消',
            callback: () => setShowActionSheet(false)
          }
        ]}
        title="确定要退出登录吗？"
      />
    </div>
  )
}

export default Account