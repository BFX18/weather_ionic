const WEATHER_API =
  'https://api.open-meteo.com/v1/forecast' +
  '?latitude=-6.2' +
  '&longitude=106.8' +
  '&hourly=temperature_2m' +
  '&timezone=Asia%2FJakarta' +
  '&forecast_days=3'

export async function getWeatherData() {
  const response = await fetch(WEATHER_API)

  if (!response.ok) {
    throw new Error('Gagal mengambil data cuaca.')
  }

  const data = await response.json()

  if (
    !data.hourly ||
    !Array.isArray(data.hourly.time) ||
    !Array.isArray(data.hourly.temperature_2m)
  ) {
    throw new Error('Format data cuaca tidak sesuai.')
  }

  return data
}