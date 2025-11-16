<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Jakarta Hourly Forecast</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Jakarta Hourly Forecast</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="content-wrap">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Weather from Open-Meteo</ion-card-title>
            <ion-card-subtitle>Latitude -6.2, Longitude 106.8</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div v-if="loading" class="center">
              <ion-spinner name="crescent"></ion-spinner>
            </div>
            <div v-else-if="error" class="center error">
              {{ error }}
            </div>
            <div v-else>
              <ion-list lines="full">
                <ion-item class="list-header">
                  <ion-label class="col time"><strong>Time</strong></ion-label>
                  <ion-label class="col temp"><strong>Temperature (°C)</strong></ion-label>
                </ion-item>
                <ion-item v-for="(point, idx) in points" :key="idx">
                  <ion-label class="col time">
                    {{ formatTime(point.time) }}
                  </ion-label>
                  <ion-label class="col temp">
                    {{ point.temperatureC.toFixed(1) }}
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/vue';
import { fetchHourlyWeather } from '../api/weather';
import type { HourlyWeatherPoint } from '../types/weather';

const loading = ref<boolean>(true);
const error = ref<string>('');
const points = ref<HourlyWeatherPoint[]>([]);

function formatTime(iso: string): string {
  // Show local time in a readable format
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

onMounted(async () => {
  try {
    // Jakarta coordinates from the prompt
    points.value = await fetchHourlyWeather(-6.2, 106.8);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error fetching weather';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.content-wrap {
  padding: 12px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
}

.error {
  color: var(--ion-color-danger);
}

.list-header {
  --background: var(--ion-color-light);
  --color: var(--ion-color-medium);
}

.col {
  display: inline-block;
}

.col.time {
  width: 65%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col.temp {
  width: 35%;
  text-align: right;
}
</style>
