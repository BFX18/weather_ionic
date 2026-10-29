<template>
  <ion-app>
    <WeatherHeader
      :is-dark="isDark"
      @toggle-theme="toggleTheme"
    />

    <ion-content>
      <main class="page-container">
        <section class="page-heading">
          <h1>Dashboard Cuaca</h1>
          <p>Informasi prakiraan suhu untuk wilayah Jakarta.</p>
        </section>

        <div v-if="loading" class="loading-state">
          <ion-spinner name="crescent" />
          <p class="muted-text">Sedang mengambil data cuaca...</p>
        </div>

        <ion-card v-else-if="error">
          <ion-card-content>
            <div class="error-state">
              <p>{{ error }}</p>

              <ion-button @click="fetchWeather">
                Coba Lagi
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <template v-else-if="weatherRows.length">
          <ion-card class="weather-overview">
            <ion-card-content>
              <div class="weather-location">
                <div>
                  <p class="muted-text">Lokasi</p>
                  <h2>Jakarta, Indonesia</h2>
                </div>

                <ion-button
                  fill="clear"
                  aria-label="Perbarui data cuaca"
                  @click="fetchWeather"
                >
                  <ion-icon
                    :icon="refreshOutline"
                    slot="start"
                  />
                  Perbarui
                </ion-button>
              </div>

              <div class="weather-temperature">
                {{ formatTemperature(weatherRows[0].temperature) }}
              </div>

              <p class="weather-date">
                Data prakiraan pertama:
                {{ formatDate(weatherRows[0].time) }}
              </p>

              <p class="muted-text">
                Suhu pada waktu prakiraan pertama yang tersedia.
              </p>
            </ion-card-content>
          </ion-card>

          <WeatherStats
            :min-temperature="minTemperature"
            :average-temperature="averageTemperature"
            :max-temperature="maxTemperature"
          />

          <WeatherTable :rows="weatherRows" />
        </template>

        <div v-else class="muted-text">
          Data cuaca belum tersedia.
        </div>

        <footer class="app-footer">
          Sumber data:
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-Meteo
          </a>
        </footer>
      </main>
    </ion-content>
  </ion-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import {
  IonApp,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSpinner
} from '@ionic/vue'

import { refreshOutline } from 'ionicons/icons'

import WeatherHeader from './components/WeatherHeader.vue'
import WeatherStats from './components/WeatherStats.vue'
import WeatherTable from './components/WeatherTable.vue'

import { getWeatherData } from './services/weatherService.js'

const loading = ref(false)
const error = ref('')
const weatherRows = ref([])

const isDark = ref(
  localStorage.getItem('cuacakita-theme') === 'dark'
)

function applyTheme() {
  document.body.classList.toggle('dark', isDark.value)

  localStorage.setItem(
    'cuacakita-theme',
    isDark.value ? 'dark' : 'light'
  )
}

function toggleTheme() {
  isDark.value = !isDark.value
}

watch(isDark, applyTheme, { immediate: true })

const temperatures = computed(() => {
  return weatherRows.value
    .map(row => row.temperature)
    .filter(value => Number.isFinite(value))
})

const minTemperature = computed(() => {
  return temperatures.value.length
    ? Math.min(...temperatures.value)
    : null
})

const maxTemperature = computed(() => {
  return temperatures.value.length
    ? Math.max(...temperatures.value)
    : null
})

const averageTemperature = computed(() => {
  if (!temperatures.value.length) return null

  const total = temperatures.value.reduce(
    (sum, value) => sum + value,
    0
  )

  return total / temperatures.value.length
})

async function fetchWeather() {
  loading.value = true
  error.value = ''

  try {
    const data = await getWeatherData()

    weatherRows.value = data.hourly.time.map((time, index) => ({
      time,
      temperature: data.hourly.temperature_2m[index]
    }))
  } catch (err) {
    error.value = err instanceof Error
      ? err.message
      : 'Terjadi kesalahan saat mengambil data cuaca.'

    weatherRows.value = []
  } finally {
    loading.value = false
  }
}

function formatTemperature(value) {
  return Number.isFinite(value) ? `${value.toFixed(1)} °C` : '--'
}

function formatDate(value) {
  return new Date(value).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta'
  })
}

onMounted(fetchWeather)
</script>