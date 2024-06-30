import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'danote-ff429',
        appId: '1:662612463347:web:2b1d20054b93e1338ab186',
        storageBucket: 'danote-ff429.appspot.com',
        apiKey: 'AIzaSyCAuDxLV632EITydD1zsZPpGS2D8stbwUw',
        authDomain: 'danote-ff429.firebaseapp.com',
        messagingSenderId: '662612463347',
        measurementId: 'G-D95VJPVX9R',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
