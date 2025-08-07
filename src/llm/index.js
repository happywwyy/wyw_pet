/**
 * AI聊天模块 - 宠物健康医生
 */
const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const KIMI_CHAT_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

// 宠物医生系统提示词
const PET_DOCTOR_SYSTEM_PROMPT = `你是一位专业的宠物健康医生，名叫"毛球医生"。你拥有丰富的宠物医疗经验，专门为猫咪和狗狗提供健康咨询服务。

你的特点：
1. 专业：具备扎实的兽医学知识，能够准确诊断和建议
2. 温暖：用亲切、温和的语言与宠物主人交流
3. 负责：对每一个咨询都认真对待，给出专业建议
4. 谨慎：对于严重症状，会建议及时就医

你的回答要求：
- 使用简洁易懂的语言
- 提供实用的建议和解决方案
- 必要时建议寻求线下兽医帮助
- 保持专业但不失亲和力的语调
- 回答长度控制在200字以内

请记住：你只能提供健康咨询建议，不能替代实际的兽医诊疗。`;

// 通用聊天函数
export const chat = async (
    messages, 
    api_url = DEEPSEEK_CHAT_API_URL, 
    api_key = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-b0eecba5c43648c6ba76b5f7c711cf59',
    model = 'deepseek-chat'
) => {
    try {
        // 调试信息 - 检查环境变量加载情况
        console.log('环境变量检查:', {
            hasDeepSeekKey: !!import.meta.env.VITE_DEEPSEEK_API_KEY,
            hasKimiKey: !!import.meta.env.VITE_KIMI_API_KEY,
            currentApiKey: api_key ? `${api_key.substring(0, 10)}...` : 'undefined',
            usingFallback: !import.meta.env.VITE_DEEPSEEK_API_KEY,
            mode: import.meta.env.MODE,
            dev: import.meta.env.DEV
        });
        
        // 检查API密钥是否配置
        if (!api_key || api_key === 'your_deepseek_api_key_here' || api_key === 'your_kimi_api_key_here') {
            console.error('API密钥未正确配置:', api_key);
            throw new Error('API_KEY_NOT_CONFIGURED');
        }

        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model,
                messages: [
                    {
                        role: 'system',
                        content: PET_DOCTOR_SYSTEM_PROMPT
                    },
                    ...messages
                ],
                stream: false,
                temperature: 0.7,
                max_tokens: 1000
            })
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('API_KEY_INVALID');
            } else if (response.status === 429) {
                throw new Error('RATE_LIMIT_EXCEEDED');
            } else if (response.status === 500) {
                throw new Error('SERVER_ERROR');
            } else {
                throw new Error(`API请求失败: ${response.status}`);
            }
        }
        
        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            return {
                code: 0,
                data: {
                    role: 'assistant',
                    content: data.choices[0].message.content
                }
            };
        } else {
            throw new Error('API响应格式错误');
        }
    } catch (err) {
        console.error('AI聊天错误:', err);
        
        let errorMessage = '抱歉，我现在遇到了一些技术问题，请稍后再试。';
        
        if (err.message === 'API_KEY_NOT_CONFIGURED') {
            errorMessage = '🔧 AI功能需要配置API密钥才能使用。\n\n请联系管理员配置DeepSeek或Kimi API密钥。\n\n如有紧急情况，建议直接联系当地宠物医院。';
        } else if (err.message === 'API_KEY_INVALID') {
            errorMessage = '🔑 API密钥无效或已过期。\n\n请检查密钥配置或联系管理员更新密钥。\n\n如有紧急情况，建议直接联系当地宠物医院。';
        } else if (err.message === 'RATE_LIMIT_EXCEEDED') {
            errorMessage = '⏰ 请求过于频繁，请稍后再试。\n\n如有紧急情况，建议直接联系当地宠物医院。';
        } else if (err.message === 'SERVER_ERROR') {
            errorMessage = '🛠️ AI服务暂时不可用，请稍后再试。\n\n如有紧急情况，建议直接联系当地宠物医院。';
        }
        
        return {
            code: -1,
            msg: errorMessage,
            data: {
                role: 'assistant',
                content: errorMessage
            }
        };
    }
};

// Kimi聊天
export const kimiChat = async (messages) => {
    const res = await chat(
        messages,
        KIMI_CHAT_API_URL,
        import.meta.env.VITE_KIMI_API_KEY || 'sk-sxPhA1nG1TxC41pgy1TE5xztM79ssmMtMCbtwIYPTqP119gz',
        'moonshot-v1-auto'
    );
    return res.data || res;
};

// DeepSeek聊天
export const deepseekChat = async (messages) => {
    const res = await chat(
        messages,
        DEEPSEEK_CHAT_API_URL,
        import.meta.env.VITE_DEEPSEEK_API_KEY,
        'deepseek-chat'
    );
    return res.data || res;
};

// 默认使用DeepSeek
export const petDoctorChat = deepseekChat;
