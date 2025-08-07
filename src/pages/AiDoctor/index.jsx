import { useEffect, useState } from 'react'
import { Button, Field, Loading, Toast } from 'react-vant'
import { Service, Arrow } from '@react-vant/icons'
import useTitle from '@/hooks/useTitle'
import { petDoctorChat } from '@/llm'
import styles from './doctor.module.css'

const AiDoctor = () => {
  useTitle('AI超级医生 - 毛球伴侣')
  
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasIntroduced, setHasIntroduced] = useState(false)

  // 常见问题
  const commonQuestions = [
    '我的猫咪不爱吃饭怎么办？',
    '狗狗一直咳嗽是什么原因？',
    '宠物疫苗接种时间表',
    '猫咪呕吐需要注意什么？',
    '狗狗拉肚子如何处理？',
    '宠物驱虫多久做一次？'
  ]

  // AI医生自我介绍
  useEffect(() => {
    if (!hasIntroduced) {
      // 检查API密钥是否配置
      const hasApiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || import.meta.env.VITE_KIMI_API_KEY
      const isDefaultKey = import.meta.env.VITE_DEEPSEEK_API_KEY === 'your_deepseek_api_key_here' || 
                          import.meta.env.VITE_KIMI_API_KEY === 'your_kimi_api_key_here'
      
      let welcomeContent = `您好！我是毛球医生🩺，您的专属宠物健康顾问。

我拥有丰富的宠物医疗知识，可以为您的猫咪和狗狗提供：
• 健康问题咨询
• 日常护理建议  
• 疾病预防指导
• 紧急情况处理

有什么关于毛孩子健康的问题，尽管问我吧！记住，如果情况严重，还是要及时就医哦～`

      // 如果API密钥未配置，添加配置提示
      if (!hasApiKey || isDefaultKey) {
        welcomeContent += `

⚠️ **配置提示**：
AI对话功能需要配置API密钥才能使用。请在项目根目录创建 .env.local 文件并添加：

\`\`\`
VITE_DEEPSEEK_API_KEY=your_actual_api_key
\`\`\`

获取API密钥：https://platform.deepseek.com/`
      }

      const welcomeMessage = {
        id: Date.now(),
        role: 'assistant',
        content: welcomeContent,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages([welcomeMessage])
      setHasIntroduced(true)
    }
  }, [hasIntroduced])

  // 发送消息
  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) {
      Toast.show({ message: '请输入您的问题', type: 'fail' })
      return
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const response = await petDoctorChat([{ role: 'user', content: text.trim() }])
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.content || '抱歉，我现在遇到了一些问题，请稍后再试。',
        timestamp: new Date().toLocaleTimeString()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI聊天错误:', error)
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '抱歉，我现在遇到了一些技术问题。如果您的宠物情况紧急，建议立即联系当地宠物医院。',
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // 处理常见问题点击
  const handleQuestionClick = (question) => {
    handleSendMessage(question)
  }

  // 处理回车发送
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={styles.container}>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.doctorInfo}>
          <div className={styles.doctorAvatar}>
            <Service size="24" />
          </div>
          <div className={styles.doctorDetails}>
            <h2 className={styles.doctorName}>毛球医生</h2>
            <p className={styles.doctorDesc}>专业宠物健康顾问</p>
          </div>
          <div className={styles.statusIndicator}>
            <span className={styles.onlineStatus}></span>
            <span className={styles.statusText}>在线</span>
          </div>
        </div>
      </div>

      {/* 常见问题 */}
      {messages.length <= 1 && (
        <div className={styles.quickQuestions}>
          <h3 className={styles.quickTitle}>常见问题</h3>
          <div className={styles.questionGrid}>
            {commonQuestions.map((question, index) => (
              <div
                key={index}
                className={styles.questionCard}
                onClick={() => handleQuestionClick(question)}
              >
                <span className={styles.questionText}>{question}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 聊天区域 */}
      <div className={styles.chatArea}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageItem} ${
              message.role === 'user' ? styles.userMessage : styles.aiMessage
            }`}
          >
            <div className={styles.messageAvatar}>
              {message.role === 'assistant' ? (
                <Service size="20" />
              ) : (
                <div className={styles.userAvatarIcon}>👤</div>
              )}
            </div>
            <div className={styles.messageContent}>
              <div className={styles.messageBubble}>
                <p className={styles.messageText}>{message.content}</p>
              </div>
              <div className={styles.messageTime}>{message.timestamp}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className={`${styles.messageItem} ${styles.aiMessage}`}>
            <div className={styles.messageAvatar}>
              <Service size="20" />
            </div>
            <div className={styles.messageContent}>
              <div className={styles.messageBubble}>
                <div className={styles.typingIndicator}>
                  <Loading type="spinner" size="16" />
                  <span>毛球医生正在思考中...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <Field
            value={inputText}
            onChange={setInputText}
            placeholder="描述一下毛孩子的情况..."
            className={styles.messageInput}
            onKeyPress={handleKeyPress}
            maxLength={500}
          />
          <Button
            type="primary"
            size="small"
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputText.trim()}
            className={styles.sendButton}
            icon={<Arrow />}
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AiDoctor
