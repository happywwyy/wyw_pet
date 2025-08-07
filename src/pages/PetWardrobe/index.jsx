import { useRef, useState } from 'react'
import { Button, Toast, Loading, Uploader } from 'react-vant'
import { Photo } from '@react-vant/icons'
import { useTitle } from '../../hooks/useTitle'
import styles from './wardrobe.module.css'

export default function PetWardrobe() {
    useTitle('宠物衣柜 - 毛球伴侣')
    
    const workflowUrl = 'https://api.coze.cn/v1/workflow/run'
    const workflow_id = '7533134823737884723' // 您需要替换为实际的宠物换装工作流ID
    
    const patToken = import.meta.env.VITE_PAT_TOKEN
    const uploadUrl = 'https://api.coze.cn/v1/files/upload'
    const uploadImageRef = useRef(null)
    
    // 状态管理
    const [imgPreview, setImgPreview] = useState('https://picsum.photos/300/400?random=pet')
    const [petType, setPetType] = useState('狗')
    const [clothingType, setClothingType] = useState('连体衣')
    const [clothingColor, setClothingColor] = useState('粉色')
    const [clothingStyle, setClothingStyle] = useState('可爱')
    const [season, setSeason] = useState('春秋')
    const [imgUrl, setImgUrl] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    // 更新图片预览
    const updateImageData = () => {
        const input = uploadImageRef.current
        if (!input.files || input.files.length === 0) return
        
        const file = input.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgPreview(e.target?.result)
        }
    }

    // 上传文件到Coze
    const uploadFile = async () => {
        const formData = new FormData()
        const input = uploadImageRef.current
        if (!input.files || input.files.length <= 0) return
        
        formData.append('file', input.files[0])
        
        try {
            const res = await fetch(uploadUrl, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${patToken}` },
                body: formData,
            })
            
            const ret = await res.json()
            if (ret.code !== 0) {
                setStatus(ret.msg)
                return null
            }
            
            return ret.data.id
        } catch (error) {
            console.error('文件上传失败:', error)
            setStatus(`上传失败: ${error.message}`)
            return null
        }
    }

    // 生成宠物换装图片
    const generateOutfit = async () => {
        // 检查Token配置
        if (!patToken) {
            Toast.show({ message: '未配置PAT Token，请检查环境变量', type: 'fail' })
            return
        }

        setLoading(true)
        setStatus('图片上传中...')
        
        try {
            // 上传图片
            const file_id = await uploadFile()
            if (!file_id) {
                setLoading(false)
                return
            }

            setStatus('图片上传成功，AI正在为您的宠物设计服装...')
            
            // 调用工作流
            const parameters = {
                picture: { file_id },
                pet_type: petType,
                clothing_type: clothingType,
                clothing_color: clothingColor,
                clothing_style: clothingStyle,
                season: season
            }

            console.log('请求参数:', { workflow_id, parameters })

            const res = await fetch(workflowUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${patToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workflow_id, parameters }),
            })

            if (!res.ok) {
                throw new Error(`HTTP错误: ${res.status} ${res.statusText}`)
            }

            const ret = await res.json()
            console.log('API响应:', ret)
            
            if (ret.code !== 0) {
                setStatus(ret.msg || '生成失败，请重试')
                Toast.show({ message: ret.msg || '生成失败', type: 'fail' })
                return
            }

            const data = JSON.parse(ret.data)
            setStatus('')
            setImgUrl(data.answer)
            Toast.show({ message: '换装完成！您的宠物看起来真可爱~', type: 'success' })
            
        } catch (error) {
            console.error('生成失败:', error)
            setStatus(`生成失败: ${error.message}`)
            Toast.show({ message: `生成失败: ${error.message}`, type: 'fail' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>🎀 宠物衣柜</h1>
                <p className={styles.subtitle}>为您的爱宠设计专属服装</p>
            </div>

            <div className={styles.content}>
                {/* 左侧输入区域 */}
                <div className={styles.inputSection}>
                    {/* 图片上传 */}
                    <div className={styles.uploadArea}>
                        <div className={styles.imagePreview}>
                            <img src={imgPreview} alt="宠物照片预览" />
                            <div className={styles.uploadOverlay}>
                                <input
                                    ref={uploadImageRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={updateImageData}
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    type="primary"
                                    size="small"
                                    icon={<Photo />}
                                    onClick={() => uploadImageRef.current?.click()}
                                >
                                    选择宠物照片
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* 设置选项 */}
                    <div className={styles.settingsPanel}>
                        <div className={styles.settingGroup}>
                            <label className={styles.label}>宠物类型</label>
                            <select 
                                value={petType} 
                                onChange={(e) => setPetType(e.target.value)}
                                className={styles.select}
                            >
                                <option value="狗">🐕 狗狗</option>
                                <option value="猫">🐱 猫咪</option>
                                <option value="兔子">🐰 兔子</option>
                                <option value="仓鼠">🐹 仓鼠</option>
                            </select>
                        </div>

                        <div className={styles.settingGroup}>
                            <label className={styles.label}>服装类型</label>
                            <select 
                                value={clothingType} 
                                onChange={(e) => setClothingType(e.target.value)}
                                className={styles.select}
                            >
                                <option value="连体衣">👕 连体衣</option>
                                <option value="小裙子">👗 小裙子</option>
                                <option value="外套">🧥 外套</option>
                                <option value="背心">🎽 背心</option>
                                <option value="帽子">👒 帽子</option>
                                <option value="围巾">🧣 围巾</option>
                            </select>
                        </div>

                        <div className={styles.settingGroup}>
                            <label className={styles.label}>服装颜色</label>
                            <select 
                                value={clothingColor} 
                                onChange={(e) => setClothingColor(e.target.value)}
                                className={styles.select}
                            >
                                <option value="粉色">💗 粉色</option>
                                <option value="蓝色">💙 蓝色</option>
                                <option value="黄色">💛 黄色</option>
                                <option value="绿色">💚 绿色</option>
                                <option value="紫色">💜 紫色</option>
                                <option value="红色">❤️ 红色</option>
                                <option value="白色">🤍 白色</option>
                                <option value="黑色">🖤 黑色</option>
                            </select>
                        </div>

                        <div className={styles.settingGroup}>
                            <label className={styles.label}>服装风格</label>
                            <select 
                                value={clothingStyle} 
                                onChange={(e) => setClothingStyle(e.target.value)}
                                className={styles.select}
                            >
                                <option value="可爱">🥰 可爱风</option>
                                <option value="优雅">✨ 优雅风</option>
                                <option value="运动">⚽ 运动风</option>
                                <option value="休闲">😎 休闲风</option>
                                <option value="正式">🎩 正式风</option>
                                <option value="节日">🎄 节日风</option>
                            </select>
                        </div>

                        <div className={styles.settingGroup}>
                            <label className={styles.label}>适合季节</label>
                            <select 
                                value={season} 
                                onChange={(e) => setSeason(e.target.value)}
                                className={styles.select}
                            >
                                <option value="春秋">🌸 春秋季</option>
                                <option value="夏季">☀️ 夏季</option>
                                <option value="冬季">❄️ 冬季</option>
                                <option value="四季">🌈 四季通用</option>
                            </select>
                        </div>
                    </div>

                    {/* 生成按钮 */}
                    <div className={styles.generateSection}>
                        <Button
                            type="primary"
                            size="large"
                            block
                            loading={loading}
                            onClick={generateOutfit}
                            className={styles.generateBtn}
                        >
                            {loading ? '🎨 AI设计中...' : '🎀 开始换装'}
                        </Button>
                    </div>
                </div>

                {/* 右侧结果展示区域 */}
                <div className={styles.outputSection}>
                    <div className={styles.resultArea}>
                        {loading && (
                            <div className={styles.loadingArea}>
                                <Loading size="24px" />
                                <p className={styles.loadingText}>AI正在精心设计中...</p>
                            </div>
                        )}
                        
                        {status && !loading && (
                            <div className={styles.statusMessage}>
                                <p>{status}</p>
                            </div>
                        )}
                        
                        {imgUrl && !loading && (
                            <div className={styles.resultImage}>
                                <img src={imgUrl} alt="换装结果" />
                                <div className={styles.resultActions}>
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() => {
                                            // 保存图片功能
                                            const link = document.createElement('a')
                                            link.href = imgUrl
                                            link.download = `宠物换装_${Date.now()}.jpg`
                                            link.click()
                                        }}
                                    >
                                        💾 保存图片
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            setImgUrl('')
                                            setStatus('')
                                        }}
                                    >
                                        🔄 重新生成
                                    </Button>
                                </div>
                            </div>
                        )}
                        
                        {!imgUrl && !loading && !status && (
                            <div className={styles.placeholder}>
                                <div className={styles.placeholderIcon}>🎨</div>
                                <p>上传宠物照片，选择喜欢的服装样式</p>
                                <p>AI将为您的爱宠设计专属服装~</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}