$apiKey=""
$latitude="45.800013"
$longitude="15.173284"
$response=$(Invoke-WebRequest -Method Get -Uri "https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}")