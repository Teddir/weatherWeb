# WeatherWeb (Ionic Vue + TypeScript)

A simple Ionic Vue application that fetches and displays hourly weather forecast data (time and temperature in °C) from the Open-Meteo API for Jakarta (latitude **-6.2**, longitude **106.8**).

## Features

* Fetches hourly forecast on page load
* Displays time and temperature (°C) in a clean list using Ionic components
* Loading and error states
* Strongly typed API layer with TypeScript interfaces

## Tech Stack

* Ionic Vue (Vue 3 + Ionic Components)
* TypeScript
* Vite

## Getting Started

### Prerequisites

* Node.js 18+ recommended
* npm 8+

### Install

```bash
npm install
```

### Run (Dev)

```bash
ionic serve
```

Then open the local URL printed in the terminal.

### Build (Web)

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Project Structure

```
/ (project root)
├─ src/
│  ├─ api/
│  │  └─ weather.ts          # API call to Open-Meteo and response shaping
│  ├─ types/
│  │  └─ weather.ts          # TypeScript interfaces for weather response
│  ├─ views/
│  │  └─ HomePage.vue        # Main page: fetch + render list
│  ├─ App.vue                # Ionic app wrapper
│  ├─ main.ts                # App bootstrap
│  └─ router/index.ts        # Route to Home
├─ public/
└─ README.md
```

## API

The app uses Open-Meteo’s public API (no key required):

```
https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m
```

The API call is encapsulated in `src/api/weather.ts` via:

`fetchHourlyWeather(latitude, longitude)`

which returns an array of:

```ts
{ time: string, temperatureC: number }
```

## Core Files

### `src/views/HomePage.vue`

* Fetches weather on mount using `fetchHourlyWeather(-6.2, 106.8)`
* Renders a table-style list using `IonList`, `IonItem`, `IonLabel`
* Includes a header row, loading spinner, and error message

### `src/api/weather.ts`

* Builds the request URL and fetches `hourly.temperature_2m`
* Maps the API response into `{ time, temperatureC }`

### `src/types/weather.ts`

Interfaces for the Open-Meteo response and simplified hourly data:

* `WeatherApiResponse`
* `WeatherHourly`
* `HourlyWeatherPoint`

## Ionic Components Used

* `IonPage`, `IonHeader`, `IonToolbar`, `IonTitle`
* `IonContent`, `IonList`, `IonItem`, `IonLabel`
* `IonCard`, `IonCardHeader`, `IonCardTitle`, `IonCardSubtitle`, `IonCardContent`
* `IonSpinner`

## Notes

* The list currently renders Jakarta (-6.2, 106.8).
  You can change the coordinates passed to `fetchHourlyWeather` for any other location.
* Times are displayed using the browser’s locale (`toLocaleString`) in 24-hour format.

## License

MIT
