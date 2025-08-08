import { useRef, useState } from 'react'
import styles from './wardrobe.module.css'

export default function PetWardrobe() {
    const workflowUrl = 'https://api.coze.cn/v1/workflow/run'
    const workflow_id = '7508417030077628450'

    const patToken = import.meta.env.VITE_PAT_TOKEN
    const uploadUrl = 'https://api.coze.cn/v1/files/upload'
    const uploadImageRef = useRef(null)
    const [imgPreview, setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png')
    const [uniform_color, setUniformColor] = useState('红')
    const [uniform_number, setUniformNumber] = useState(10)
    const [position, setPosition] = useState(0)
    const [shooting_hand, setShootingHand] = useState(0)
    const [style, setStyle] = useState('写实')
    const [imgUrl, setImgUrl] = useState('')
    const [status, setStatus] = useState('')
    const submittingRef = useRef(false)

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

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

    const uploadFile = async () => {
        const formData = new FormData()
        const input = uploadImageRef.current
        if (!input.files || input.files.length <= 0) return
        formData.append('file', input.files[0])
        const res = await fetch(uploadUrl, {
            method: 'POST',
            headers: { Authorization: `Bearer ${patToken}` },
            body: formData,
        })
        const ret = await res.json()
        if (ret.code !== 0) { setStatus(ret.msg); return }
        return ret.data.id
    }

    const generate = async () => {
        // 环境检查
        if (!patToken) { setStatus('错误：未配置PAT Token'); return }
        if (submittingRef.current) { return }
        submittingRef.current = true
        setStatus('图片上传中...')
        const file_id = await uploadFile()
        if (!file_id) { submittingRef.current = false; return }
        setStatus('图片上传成功，正在生成...')
        const parameters = {
            picture: { file_id },
            style,
            uniform_number: Number(uniform_number),
            // 同时传递两种命名，兼容开始节点中可能的拼写为 uiniform_color
            uniform_color,
            uiniform_color: uniform_color,
            position: Number(position),
            shooting_hand: Number(shooting_hand),
        }
        try {
            let attempt = 0
            let lastErrMsg = ''
            while (attempt < 3) {
                const res = await fetch(workflowUrl, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${patToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ workflow_id, parameters }),
                })
                if (!res.ok) throw new Error(`HTTP错误: ${res.status} ${res.statusText}`)
                const ret = await res.json()
                if (ret.code === 0) {
                    const payload = JSON.parse(ret.data)
                    setStatus('')
                    let imageUrl = ''
                    if (typeof payload === 'string') {
                        imageUrl = payload
                    } else if (payload.answer) {
                        imageUrl = payload.answer
                    } else if (payload.data) {
                        if (typeof payload.data === 'string') {
                            imageUrl = payload.data
                        } else {
                            imageUrl = payload.data.url || payload.data.image_url || ''
                        }
                    } else if (payload.url) {
                        imageUrl = payload.url
                    }
                    setImgUrl(imageUrl)
                    break
                }
                lastErrMsg = ret.msg || ''
                const isRateLimit = /rate[-\s]?limited|Too Many Requests|429/i.test(lastErrMsg)
                if (!isRateLimit) { setStatus(lastErrMsg); break }
                attempt += 1
                const waitMs = attempt === 1 ? 3000 : attempt === 2 ? 8000 : 15000
                setStatus(`请求过于频繁，${Math.ceil(waitMs/1000)}秒后自动重试(${attempt}/3)...`)
                await sleep(waitMs)
            }
            if (attempt >= 3 && lastErrMsg) {
                setStatus(`请求过于频繁，请稍后再试: ${lastErrMsg}`)
            }
        } catch (error) {
            console.error('API调用错误:', error)
            setStatus(`错误: ${error.message}`)
        } finally {
            submittingRef.current = false
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <div className={styles.fileInput}>
                    <input
                        ref={uploadImageRef}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        required
                        onChange={updateImageData}
                    />
                </div>
                <img
                    src={imgPreview}
                    alt="preview"
                    className={styles.preview}
                />
                <div className={styles.settings}>
                    <div className={styles.selection}>
                        <label>队服编号</label>
                        <input value={uniform_number} type="number" onChange={(event) => setUniformNumber(event.target.value)} />
                    </div>
                </div>
                <div className={styles.selection}>
                    <label>队服颜色:</label>
                    <select value={uniform_color} onChange={(e) => { setUniformColor(e.target.value) }}>
                        <option value="红">红</option>
                        <option value="蓝">蓝</option>
                        <option value="绿">绿</option>
                    </select>
                </div>
                <div className="settings">
                    <div className="selection">
                        <label>位置：</label>
                        <select value={position} onChange={(e) => { setPosition(e.target.value) }}>
                            <option value="0">守门员</option>
                            <option value="1">前锋</option>
                            <option value="2">后卫</option>
                        </select>
                    </div>
                    <div className={styles.selection}>
                        <label>持杆:</label>
                        <select value={shooting_hand} onChange={(e) => setShootingHand(e.target.value)}>
                            <option value="0">左手</option>
                            <option value="1">右手</option>
                        </select>
                    </div>
                    <div className={styles.selection}>
                        <label>风格:</label>
                        <select value={style} onChange={(e) => setStyle(e.target.value)}>
                            <option value="写实">写实</option>
                            <option value="乐高">乐高</option>
                            <option value="国漫">国漫</option>
                        </select>
                    </div>
                </div>
                <div className={styles.generate}>
                    <button onClick={generate}>生成</button>
                </div>
            </div>
            <div className={styles.output}>
                <div className={styles.generated}>
                    {imgUrl && <img src={imgUrl} alt="" />}
                    {status && <>{status}</>}
                </div>
            </div>
        </div>
    )
}