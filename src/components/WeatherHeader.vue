<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        ☁️ CuacaKita
      </ion-title>

      <ion-buttons slot="end">
        <ion-button @click="$emit('toggle-theme')">
          <ion-icon
            :icon="isDark ? sunnyOutline : moonOutline"
            slot="start"
          />
          {{ isDark ? 'Light' : 'Dark' }}
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/vue'

import {
  sunnyOutline,
  moonOutline
} from 'ionicons/icons'

defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-theme'])
</script>