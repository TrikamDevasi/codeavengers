Write-Host "🛑 Stopping all services..." -ForegroundColor Red
Write-Host ""
Write-Host "Please close each terminal window manually to stop services." -ForegroundColor Yellow
Write-Host ""
Write-Host "Services to stop:" -ForegroundColor Cyan
Write-Host "1. Frontend (npm run dev)" -ForegroundColor White
Write-Host "2. Backend (node server.js)" -ForegroundColor White
Write-Host "3. Analytics (uvicorn main:app)" -ForegroundColor White
Write-Host "4. Ollama (ollama serve)" -ForegroundColor White
Write-Host ""
Write-Host "Or press Ctrl+C in each terminal." -ForegroundColor Yellow
