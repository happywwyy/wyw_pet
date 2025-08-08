# 设置环境变量并启动开发服务器
Write-Host "设置环境变量..." -ForegroundColor Green
$env:VITE_DEEPSEEK_API_KEY = "sk-b0eecba5c43648c6ba76b5f7c711cf59"
$env:VITE_KIMI_API_KEY = "sk-sxPhA1nG1TxC41pgy1TE5xztM79ssmMtMCbtwIYPTqP119gz"
$env:VITE_PAT_TOKEN = "pat_7nJct1gZq0r1R8jK0PKF52HFveVF2YScO5HxvU0RHYNMuTS1vR8v1hKe4gdr7TeN"

Write-Host "环境变量设置完成!" -ForegroundColor Green
Write-Host "VITE_DEEPSEEK_API_KEY: $($env:VITE_DEEPSEEK_API_KEY.Substring(0,10))..." -ForegroundColor Yellow
Write-Host "VITE_KIMI_API_KEY: $($env:VITE_KIMI_API_KEY.Substring(0,10))..." -ForegroundColor Yellow

Write-Host "启动开发服务器..." -ForegroundColor Green
npm run dev





