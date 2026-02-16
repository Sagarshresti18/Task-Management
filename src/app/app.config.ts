import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyCl0pPZCnLHIqBoi7X_J861fLJvcEKye9c",
  authDomain: "taskflow-live.firebaseapp.com",
  projectId: "taskflow-live",
  storageBucket: "taskflow-live.firebasestorage.app",
  messagingSenderId: "454504858738",
  appId: "1:454504858738:web:48a089f5c7c765c8796eeb",
  measurementId: "G-XWCRL01XYV"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnalytics(() => getAnalytics())
  ]
};
