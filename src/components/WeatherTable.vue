<template>
  <ion-card>
    <ion-card-content>
      <h2 class="section-title">Prakiraan Suhu per Jam</h2>

      <div v-if="rows.length === 0" class="muted-text">
        Data cuaca belum tersedia.
      </div>

      <template v-else>
        <div class="table-wrapper">
          <table class="weather-table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Suhu</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in visibleRows" :key="row.time">
                <td>{{ formatDate(row.time) }}</td>
                <td>{{ formatTemperature(row.temperature) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="action-row">
          <span class="muted-text">
            Menampilkan {{ visibleRows.length }} dari {{ rows.length }} data
          </span>

          <ion-button
            fill="outline"
            size="small"
            @click="showAll = !showAll"
          >
            {{ showAll ? 'Tampilkan 10 Data' : 'Lihat Semua Data' }}
          </ion-button>
        </div>
      </template>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import {
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/vue'

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  }
})

const showAll = ref(false)

const visibleRows = computed(() => {
  return showAll.value ? props.rows : props.rows.slice(0, 10)
})

watch(
  () => props.rows,
  () => {
    showAll.value = false
  }
)

function formatDate(value) {
  const date = new Date(value)

  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta'
  })
}

function formatTemperature(value) {
  return Number.isFinite(value) ? `${value.toFixed(1)} °C` : '--'
}
</script>