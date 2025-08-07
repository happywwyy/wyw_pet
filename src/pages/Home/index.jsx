import { useEffect, useState } from 'react'
import { 
  Card, 
  Button,
  Grid,
  Tag,
  Checkbox,
  Popup,
  Form,
  Field,
  Picker,
  Dialog,
  Toast,
  ActionSheet
} from 'react-vant'
import { 
  Edit,
  Delete, 
  Plus,
  Eye
} from '@react-vant/icons'
import useTitle from '@/hooks/useTitle'
import { usePetStore } from '@/store/usePetStore'
import styles from './home.module.css'

const Home = () => {
  useTitle('毛球伴侣 - 首页')
  
  const { pets, loading, fetchPets, addPet, updatePet, deletePet } = usePetStore()

  // 表单状态
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    species: '猫',
    breed: '',
    age: '',
    weight: '',
    gender: '雄性',
    color: '',
    birthday: '',
    owner: '',
    phone: '',
    address: '',
    healthStatus: '健康',
    notes: ''
  })

  // 示例数据（如果没有宠物数据时显示）
  const [todoList, setTodoList] = useState([
    { id: 1, time: '10:00', task: '喂早餐', completed: true },
    { id: 2, time: '14:00', task: '梳毛', completed: false },
    { id: 3, time: '18:30', task: '喂晚餐', completed: false }
  ])

  const quickActions = [
    { id: 1, name: '喂食', icon: '🥣', color: '#ff6b6b' },
    { id: 2, name: '用药', icon: '💊', color: '#4ecdc4' },
    { id: 3, name: '清洁', icon: '🛁', color: '#45b7d1' },
    { id: 4, name: '体重', icon: '⚖️', color: '#96ceb4' }
  ]

  // 宠物类型选项（仅限猫和狗）
  const petSpeciesOptions = [
    { text: '猫', value: '猫' },
    { text: '狗', value: '狗' }
  ]

  // 性别选项
  const genderOptions = [
    { text: '雄性', value: '雄性' },
    { text: '雌性', value: '雌性' }
  ]

  // 健康状态选项
  const healthOptions = [
    { text: '健康', value: '健康' },
    { text: '生病', value: '生病' },
    { text: '康复中', value: '康复中' }
  ]

  useEffect(() => {
    fetchPets()
  }, [fetchPets])

  const toggleTodo = (id) => {
    setTodoList(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const handleQuickAction = (actionName) => {
    Toast.info(`执行${actionName}操作`)
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: '',
      species: '猫',
      breed: '',
      age: '',
      weight: '',
      gender: '雄性',
      color: '',
      birthday: '',
      owner: '',
      phone: '',
      address: '',
      healthStatus: '健康',
      notes: ''
    })
  }

  // 打开添加表单
  const handleAdd = () => {
    resetForm()
    setShowAddForm(true)
  }

  // 查看宠物详情
  const handleView = (pet) => {
    setSelectedPet(pet)
    setShowDetailModal(true)
  }

  // 打开编辑表单
  const handleEdit = (pet) => {
    setSelectedPet(pet)
    setFormData({ ...pet })
    setShowEditForm(true)
  }

  // 删除宠物
  const handleDelete = (pet) => {
    Dialog.confirm({
      title: '确认删除',
      message: `确定要删除 ${pet.name} 的信息吗？`,
      confirmButtonText: '删除',
      cancelButtonText: '取消',
    }).then(() => {
      deletePet(pet.id)
      Toast.success('删除成功')
    }).catch(() => {
      // 用户取消
    })
  }

  // 提交添加表单
  const handleAddSubmit = async () => {
    if (!formData.name.trim()) {
      Toast.fail('请输入宠物姓名')
      return
    }

    try {
      await addPet(formData)
      setShowAddForm(false)
      resetForm()
      Toast.success('添加成功')
    } catch (error) {
      Toast.fail('添加失败')
    }
  }

  // 提交编辑表单
  const handleEditSubmit = async () => {
    if (!formData.name.trim()) {
      Toast.fail('请输入宠物姓名')
      return
    }

    try {
      await updatePet(selectedPet.id, formData)
      setShowEditForm(false)
      setSelectedPet(null)
      resetForm()
      Toast.success('更新成功')
    } catch (error) {
      Toast.fail('更新失败')
    }
  }

  // 处理日期输入
  const handleDateInput = (field) => {
    const dateStr = prompt('请输入日期 (YYYY-MM-DD):')
    if (dateStr) {
      setFormData(prev => ({
        ...prev,
        [field]: dateStr
      }))
    }
  }

  const getPetEmoji = (species) => {
    return species === '猫' ? '🐱' : '🐶'
  }

  return (
    <div className={styles.container}>
      {/* 状态栏 */}
      <div className={styles.statusBar}>
        <div className={styles.statusContent}>
          <h1 className={styles.appTitle}>毛球伴侣</h1>
          <div className={styles.statusIcons}>
            <span className={styles.weatherIcon}>🔔</span>
            <span className={styles.weatherIcon}>☀️</span>
          </div>
        </div>
        <div className={styles.greeting}>
          <span>嗨，小明！今天也要好好照顾毛孩子们哦~</span>
        </div>
      </div>

      {/* 宠物管理区域 */}
      <div className={styles.petManagement}>
        <div className={styles.managementHeader}>
          <h3 className={styles.sectionTitle}>我的宠物</h3>
          <Button 
            type="primary" 
            size="small"
            icon={<Plus />}
            onClick={handleAdd}
            className={styles.addButton}
          >
            添加宠物
          </Button>
        </div>

        {/* 宠物列表 */}
        {Array.isArray(pets) && pets.length > 0 ? (
          <div className={styles.petList}>
            {pets.map(pet => (
              <Card key={pet.id} className={styles.petCard}>
                <div className={styles.petHeader}>
                  <div className={styles.petBasicInfo}>
                    <span className={styles.petEmoji}>{getPetEmoji(pet.species)}</span>
                    <div className={styles.petDetails}>
                      <h3 className={styles.petName}>{pet.name}</h3>
                      <p className={styles.petInfo}>{pet.species} · {pet.breed} · {pet.age}岁</p>
                      <Tag type="success" size="mini">⭐ {pet.healthStatus}</Tag>
                    </div>
                  </div>
                  <div className={styles.petActions}>
                    <Button 
                      size="mini" 
                      type="default"
                      icon={<Eye />}
                      onClick={() => handleView(pet)}
                    />
                    <Button 
                      size="mini" 
                      type="primary"
                      icon={<Edit />}
                      onClick={() => handleEdit(pet)}
                    />
                    <Button 
                      size="mini" 
                      type="danger"
                      icon={<Delete />}
                      onClick={() => handleDelete(pet)}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // 默认示例宠物卡片（当没有宠物时显示）
          <Card className={styles.petCard}>
            <div className={styles.petHeader}>
              <div className={styles.petBasicInfo}>
                <span className={styles.petEmoji}>🐱</span>
                <div className={styles.petDetails}>
                  <h2 className={styles.petName}>喵喵 (3岁·美短)</h2>
                  <div className={styles.petStatus}>
                    <Tag type="success" size="mini">⭐ 健康状态：良好</Tag>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.petInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📅</span>
                <span>上次驱虫：3天前</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>⏰</span>
                <span>下次喂食：18:30</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* 快捷功能区 */}
      <div className={styles.quickActions}>
        <h3 className={styles.sectionTitle}>快捷功能</h3>
        <Grid columns={4} gutter={12}>
          {quickActions.map(action => (
            <Grid.Item key={action.id}>
              <div 
                className={styles.actionItem}
                onClick={() => handleQuickAction(action.name)}
                style={{ backgroundColor: action.color + '20' }}
              >
                <div className={styles.actionIcon} style={{ color: action.color }}>
                  {action.icon}
                </div>
                <span className={styles.actionName}>{action.name}</span>
              </div>
            </Grid.Item>
          ))}
        </Grid>
      </div>

      {/* 今日提醒 */}
      <div className={styles.todayReminder}>
        <div className={styles.reminderHeader}>
          <h3 className={styles.sectionTitle}>▶ 今日待办</h3>
        </div>
        
        <Card className={styles.todoCard}>
          {todoList.map(todo => (
            <div key={todo.id} className={styles.todoItem}>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              >
                <span className={todo.completed ? styles.completedTask : styles.pendingTask}>
                  {todo.time} {todo.task} {todo.completed ? '(完成)' : ''}
                </span>
              </Checkbox>
            </div>
          ))}
        </Card>
      </div>

      {/* 添加宠物弹窗 */}
      <Popup 
        visible={showAddForm} 
        onClose={() => setShowAddForm(false)}
        position="bottom"
        style={{ height: '80%' }}
      >
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>添加宠物</h2>
          </div>
          
          <Form className={styles.form}>
            <Field
              label="姓名"
              placeholder="请输入宠物姓名"
              value={formData.name}
              onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
            />
            <Field
              label="种类"
              placeholder="点击选择"
              value={formData.species}
              readonly
              onClick={() => {
                ActionSheet.show({
                  title: '选择宠物种类',
                  actions: petSpeciesOptions.map(option => ({
                    name: option.text,
                    callback: () => setFormData(prev => ({ ...prev, species: option.value }))
                  })),
                  cancelText: '取消'
                })
              }}
            />
            <Field
              label="品种"
              placeholder="请输入品种"
              value={formData.breed}
              onChange={(val) => setFormData(prev => ({ ...prev, breed: val }))}
            />
            <Field
              label="年龄"
              placeholder="请输入年龄"
              value={formData.age}
              onChange={(val) => setFormData(prev => ({ ...prev, age: val }))}
            />
            <Field
              label="体重(kg)"
              placeholder="请输入体重"
              value={formData.weight}
              onChange={(val) => setFormData(prev => ({ ...prev, weight: val }))}
            />
            <Field
              label="性别"
              placeholder="点击选择"
              value={formData.gender}
              readonly
              onClick={() => {
                ActionSheet.show({
                  title: '选择性别',
                  actions: genderOptions.map(option => ({
                    name: option.text,
                    callback: () => setFormData(prev => ({ ...prev, gender: option.value }))
                  })),
                  cancelText: '取消'
                })
              }}
            />
            <Field
              label="毛色"
              placeholder="请输入毛色"
              value={formData.color}
              onChange={(val) => setFormData(prev => ({ ...prev, color: val }))}
            />
            <Field
              label="生日"
              placeholder="点击选择日期"
              value={formData.birthday}
              readonly
              onClick={() => handleDateInput('birthday')}
            />
            <Field
              label="主人姓名"
              placeholder="请输入主人姓名"
              value={formData.owner}
              onChange={(val) => setFormData(prev => ({ ...prev, owner: val }))}
            />
            <Field
              label="联系电话"
              placeholder="请输入联系电话"
              value={formData.phone}
              onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
            />
            <Field
              label="地址"
              placeholder="请输入地址"
              value={formData.address}
              onChange={(val) => setFormData(prev => ({ ...prev, address: val }))}
            />
            <Field
              label="健康状态"
              placeholder="点击选择"
              value={formData.healthStatus}
              readonly
              onClick={() => {
                ActionSheet.show({
                  title: '选择健康状态',
                  actions: healthOptions.map(option => ({
                    name: option.text,
                    callback: () => setFormData(prev => ({ ...prev, healthStatus: option.value }))
                  })),
                  cancelText: '取消'
                })
              }}
            />
            <Field
              label="备注"
              placeholder="请输入备注信息"
              value={formData.notes}
              onChange={(val) => setFormData(prev => ({ ...prev, notes: val }))}
            />
          </Form>
          
          <div className={styles.formActions}>
            <Button onClick={() => setShowAddForm(false)}>取消</Button>
            <Button type="primary" onClick={handleAddSubmit}>确认添加</Button>
          </div>
        </div>
      </Popup>

      {/* 编辑宠物弹窗 */}
      <Popup 
        visible={showEditForm} 
        onClose={() => setShowEditForm(false)}
        position="bottom"
        style={{ height: '80%' }}
      >
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>编辑宠物</h2>
          </div>
          
          <Form className={styles.form}>
            <Field
              label="姓名"
              placeholder="请输入宠物姓名"
              value={formData.name}
              onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
            />
            <Field
              label="种类"
              placeholder="点击选择"
              value={formData.species}
              readonly
              onClick={() => {
                ActionSheet.show({
                  title: '选择宠物种类',
                  actions: petSpeciesOptions.map(option => ({
                    name: option.text,
                    callback: () => setFormData(prev => ({ ...prev, species: option.value }))
                  })),
                  cancelText: '取消'
                })
              }}
            />
            <Field
              label="品种"
              placeholder="请输入品种"
              value={formData.breed}
              onChange={(val) => setFormData(prev => ({ ...prev, breed: val }))}
            />
            <Field
              label="年龄"
              placeholder="请输入年龄"
              value={formData.age}
              onChange={(val) => setFormData(prev => ({ ...prev, age: val }))}
            />
            <Field
              label="体重(kg)"
              placeholder="请输入体重"
              value={formData.weight}
              onChange={(val) => setFormData(prev => ({ ...prev, weight: val }))}
            />
            <Field
              label="性别"
              placeholder="点击选择"
              value={formData.gender}
              readonly
              onClick={() => {
                ActionSheet.show({
                  title: '选择性别',
                  actions: genderOptions.map(option => ({
                    name: option.text,
                    callback: () => setFormData(prev => ({ ...prev, gender: option.value }))
                  })),
                  cancelText: '取消'
                })
              }}
            />
            <Field
              label="毛色"
              placeholder="请输入毛色"
              value={formData.color}
              onChange={(val) => setFormData(prev => ({ ...prev, color: val }))}
            />
            <Field
              label="生日"
              placeholder="点击选择日期"
              value={formData.birthday}
              readonly
              onClick={() => handleDateInput('birthday')}
            />
            <Field
              label="主人姓名"
              placeholder="请输入主人姓名"
              value={formData.owner}
              onChange={(val) => setFormData(prev => ({ ...prev, owner: val }))}
            />
            <Field
              label="联系电话"
              placeholder="请输入联系电话"
              value={formData.phone}
              onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
            />
            <Field
              label="地址"
              placeholder="请输入地址"
              value={formData.address}
              onChange={(val) => setFormData(prev => ({ ...prev, address: val }))}
            />
            <Field
              label="健康状态"
              placeholder="点击选择"
              value={formData.healthStatus}
              readonly
              onClick={() => {
                ActionSheet.show({
                  title: '选择健康状态',
                  actions: healthOptions.map(option => ({
                    name: option.text,
                    callback: () => setFormData(prev => ({ ...prev, healthStatus: option.value }))
                  })),
                  cancelText: '取消'
                })
              }}
            />
            <Field
              label="备注"
              placeholder="请输入备注信息"
              value={formData.notes}
              onChange={(val) => setFormData(prev => ({ ...prev, notes: val }))}
            />
          </Form>
          
          <div className={styles.formActions}>
            <Button onClick={() => setShowEditForm(false)}>取消</Button>
            <Button type="primary" onClick={handleEditSubmit}>确认修改</Button>
          </div>
        </div>
      </Popup>

      {/* 查看宠物详情弹窗 */}
      <Popup 
        visible={showDetailModal} 
        onClose={() => setShowDetailModal(false)}
        position="bottom"
        style={{ height: '70%' }}
      >
        {selectedPet && (
          <div className={styles.detailContainer}>
            <div className={styles.detailHeader}>
              <span className={styles.detailEmoji}>{getPetEmoji(selectedPet.species)}</span>
              <h2>{selectedPet.name}</h2>
            </div>
            
            <div className={styles.detailContent}>
              <div className={styles.detailSection}>
                <h3>基本信息</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>种类:</span>
                    <span>{selectedPet.species}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>品种:</span>
                    <span>{selectedPet.breed}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>年龄:</span>
                    <span>{selectedPet.age}岁</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>性别:</span>
                    <span>{selectedPet.gender}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>体重:</span>
                    <span>{selectedPet.weight}kg</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>毛色:</span>
                    <span>{selectedPet.color}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>生日:</span>
                    <span>{selectedPet.birthday}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>健康状态:</span>
                    <Tag type={selectedPet.healthStatus === '健康' ? 'success' : 'warning'} size="mini">
                      {selectedPet.healthStatus}
                    </Tag>
                  </div>
                </div>
              </div>
              
              <div className={styles.detailSection}>
                <h3>主人信息</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>主人姓名:</span>
                    <span>{selectedPet.owner}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>联系电话:</span>
                    <span>{selectedPet.phone}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>地址:</span>
                    <span>{selectedPet.address}</span>
                  </div>
                </div>
              </div>
              
              {selectedPet.notes && (
                <div className={styles.detailSection}>
                  <h3>备注</h3>
                  <p className={styles.notes}>{selectedPet.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Popup>

      {/* 底部间距 */}
      <div className={styles.bottomSpacer}></div>
    </div>
  )
}

export default Home