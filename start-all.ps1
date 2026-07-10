Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  🚀 Starting AI Mutual Fund Advisor" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running
Write-Host "📦 Checking MongoDB..." -ForegroundColor Yellow
try {
     = Invoke-WebRequest -Uri "http://localhost:27017" -TimeoutSec 2 -ErrorAction SilentlyContinue
    Write-Host "✅ MongoDB is running locally" -ForegroundColor Green
} catch {
    Write-Host "⚠️  MongoDB not running locally. Using MongoDB Atlas (cloud)" -ForegroundColor Yellow
}
Write-Host ""

# Start Ollama
Write-Host "🤖 Starting Ollama..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "ollama serve"
Start-Sleep -Seconds 3
Write-Host "✅ Ollama started" -ForegroundColor Green
Write-Host ""

# Start Analytics
Write-Host "📊 Starting Analytics Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Kishan Suthar\OneDrive\Desktop\advisor-project\advisor-analytics'; .\venv\Scripts\Activate.ps1; uvicorn main:app --reload --port 8000"
Start-Sleep -Seconds 2
Write-Host "✅ Analytics started on http://localhost:8000" -ForegroundColor Green
Write-Host ""

# Start Backend
Write-Host "🔧 Starting Backend Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Kishan Suthar\OneDrive\Desktop\advisor-project\advisor-backend'; node server.js"
Start-Sleep -Seconds 2
Write-Host "✅ Backend started on http://localhost:5000" -ForegroundColor Green
Write-Host ""

# Start Frontend
Write-Host "🎨 Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Kishan Suthar\OneDrive\Desktop\advisor-project\advisor-frontend'; npm run dev"
Start-Sleep -Seconds 2
Write-Host "✅ Frontend started on http://localhost:5173" -ForegroundColor Green
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "✅ All services started!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📊 Analytics: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "🔍 Health Check: http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  To stop all services, close each terminal window." -ForegroundColor Yellow
