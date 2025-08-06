# React 宠物管理 APP - 毛球伴侣

ReadMe.md 很重要 方便面试官
- 移动端 App
- 宠物主题应用
    - 专注于宠物信息管理
    - 简洁友好的用户界面
- 包含绝大多数前端考点
    - 都适用于任何移动端App

## 技术栈
- React 全家桶
    - React组件开发
        组件的封装
        第三方组件库
        受控和非受控
        hooks编程 自定义的hooks
    - React-router-dom
        SPA
        路由守卫
        懒加载
    - Zustand
- mock 接口模拟
- axios 请求拦截和代理
- jwt进行登入
- module css
- vite 配置
- 性能优化
    防抖节流
    useCallback useMemo
- css预处理器 
    flex transition transform
- 移动端适配
    rem
- 设计模式的理解
- git 提交等编程风格

## 项目的架构
- components
- pages
- store
- api
- hooks
- mock

## 开发前的准备
- 安装的包
    react-router-dom
    zustand
    axios
    vite-plugin-mock
    lib-flexible(解决移动端适配)
    开发期间的依赖
        jwt
        react-vant 第三方的UI组件库
- vite 配置
    - alias
    - mock
    - user-scalable=no 不允许用户缩放
    - css 预处理
        box-sizing font-family:-apply-system
        怎么区分 index.css,App.css,module.css
        index.css  reset
        App.css 全局样式
        module.css 模块化样式
    - 移动端的适配 rem
        不能用px,用相对单位rem html
        不同设备上体验要一致
        不同尺寸手机 等比例缩放
        设计师的设计稿 750px iphone 4 375pt
        css 一行代码 手机的不同尺寸 html font-size 等比例
        layout
        flexible.js 阿里 在任何设备上
        1 rem = 屏幕宽度/10

- lib-flexible 
    阿里开源
    设置html font-size = window.innerWidth/10
    css的px 像素宽度 = 手机设备宽度 = 375
    1px = 2发光源
    750px 设计稿

- 设计稿上查看一个盒子的大小？
    - 一像素不差的还原设计稿
    - 设计稿中像素单位
    - /75

## 项目亮点
- 移动端适配
    - lib-flexible 库，将1rem=屏幕宽度/10
    - 设计稿 尺寸是iphone标准尺寸750px
    - 设计稿中像素单位/75
    - 前端的职责是还原设计稿
    - 频繁地单位换算 260/75 = 3.46667rem
    - 自动化？ 
    pnpm i -D postcss postcss-pxtorem
    postcss.config.js
    postcss 是css预编译器，很强大
    vite会自动读取postcss.config.js 将css文件编译
    px -> rem

## 启动项目
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 功能模块
- UI组件库
    - react-vant 第三方组件库 70%组件已经有了，不用写
    - 选择一个适合宠物主题的UI组件库
- 配置路由及懒加载
    - 懒加载
    - Layout组件
        - 嵌套路由Outlet分组路由配置
        - 网页有几个模板 Layout
            - Route 不加path 对应的路由自动选择
            - tabbar 模板 (首页、商城、收藏、社区、账户)
            - blank 模板
    - tabbar
        - react-vant + @react-vant/icons
        - value + onChange 响应式
        - 宠物主题的底部导航

### 核心功能 - 首页设计
- **宠物类型限制**
    - 专门针对猫🐱和狗🐶两种宠物类型
    - 智能emoji显示：猫显示🐱，狗显示🐶
    - 简化用户选择，提升使用体验

- **状态栏模块**
    - 应用标题 "毛球伴侣"
    - 通知和天气图标
    - 个性化问候语："嗨，小明！今天也要好好照顾毛孩子们哦~"
    - 渐变背景设计，简洁美观
    
- **宠物管理区域** ✅ **完整CRUD功能**
    - **添加宠物**：右上角"添加宠物"按钮，弹窗表单
    - **查看宠物**：👁️ 查看按钮，详细信息弹窗展示
    - **编辑宠物**：✏️ 编辑按钮，修改宠物信息
    - **删除宠物**：🗑️ 删除按钮，确认对话框防误删
    - 宠物列表展示：头像emoji、基本信息、健康状态
    - 支持完整信息录入：姓名、种类、品种、年龄、体重、性别、毛色、生日、主人信息、健康状态、备注
    
- **快捷功能区**
    - 4个快捷操作按钮：
        - 🥣 喂食 (红色主题)
        - 💊 用药 (青色主题)  
        - 🛁 清洁 (蓝色主题)
        - ⚖️ 体重 (绿色主题)
    - 网格布局，色彩丰富
    - 点击反馈动画效果
    
- **今日提醒模块**
    - ▶ 今日待办标题
    - 任务列表：
        - ✓ 10:00 喂早餐 (已完成)
        - ☐ 14:00 梳毛 (待完成)
        - ☐ 18:30 喂晚餐 (待完成)
    - 可交互的复选框
    - 完成状态视觉区分

- **交互体验优化**
    - 移动端适配的表单设计
    - ActionSheet选择器（种类、性别、健康状态）
    - 弹窗式详情查看和编辑界面
    - Toast消息提示反馈
    - 流畅的动画过渡效果
    - 确认对话框防误删

- **设计特色**
    - 整体采用紫色渐变背景
    - 卡片式设计，圆角和阴影效果
    - 毛玻璃效果增强视觉层次
    - 丰富的emoji和图标使用
    - 温馨可爱的色彩搭配
    - 专业的宠物管理界面

## 页面结构
- **首页 (Home)** - 宠物管理中心 ✅
    - 状态栏：应用标题和个性化问候
    - 宠物管理：完整CRUD功能（增删改查）
    - 快捷功能：喂食、用药、清洁、体重记录
    - 今日提醒：待办事项管理
    - 支持猫🐱和狗🐶两种宠物类型
- **宠物商城 (Shop)** - 宠物用品商城 (占位页面)
- **我的收藏 (Collection)** - 收藏功能 (占位页面)  
- **宠物社区 (Community)** - 社交功能 (占位页面)
- **我的账户 (Account)** - 用户中心 (占位页面)
- **宠物详情 (Detail)** - 详情页面 (占位页面)
- **用户登录 (Login)** - 登录页面 (占位页面)

## 技术特色
- **状态管理**: Zustand轻量级状态管理
- **API模拟**: Vite Mock插件模拟后端接口
- **移动适配**: lib-flexible + postcss-pxtorem
- **组件化**: 高复用性的React组件设计
- **响应式**: 适配不同尺寸移动设备
- **用户体验**: 流畅的交互动画和反馈

## 项目截图
*(开发完成后添加截图)*

## 目录结构
```
pet/
├── public/
├── src/
│   ├── api/           # API接口
│   ├── components/    # 通用组件
│   ├── hooks/         # 自定义Hooks
│   ├── pages/         # 页面组件
│   ├── store/         # 状态管理
│   ├── App.jsx        # 根组件
│   ├── main.jsx       # 入口文件
│   ├── index.css      # 基础样式
│   └── App.css        # 全局样式
├── mock/              # Mock数据
├── package.json
├── vite.config.js
└── README.md
```

## 开发计划
- [x] 项目基础架构搭建
- [x] 宠物信息增删改查功能
- [x] 移动端适配和样式优化
- [ ] 宠物图片上传功能
- [ ] 搜索和筛选功能
- [ ] 数据导入导出
- [ ] 用户认证系统集成
- [ ] 更多宠物管理功能

## 贡献
欢迎提交 Issue 和 Pull Request 来改进这个项目！