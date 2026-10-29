<template>
  <div class="stats-grid">
    <ion-card class="stat-card">
      <div class="stat-label">Suhu Minimum</div>
      <div class="stat-value">
        {{ formatTemperature(minTemperature) }}
      </div>
    </ion-card>

    <ion-card class="stat-card">
      <div class="stat-label">Suhu Rata-rata</div>
      <div class="stat-value">
        {{ formatTemperature(averageTemperature) }}
      </div>
    </ion-card>

    <ion-card class="stat-card">
      <div class="stat-label">Suhu Maksimum</div>
      <div class="stat-value">
        {{ formatTemperature(maxTemperature) }}
      </div>
    </ion-card>
  </div>
</template>

<script setup>
import { IonCard } from '@ionic/vue'

defineProps({
  minTemperature: {
    type: Number,
    default: null
  },
  averageTemperature: {
    type: Number,
    default: null
  },
  maxTemperature: {
    type: Number,
    default: null
  }
})

function formatTemperature(value) {
  return Number.isFinite(value) ? `${value.toFixed(1)} °C` : '--'
}
</script>