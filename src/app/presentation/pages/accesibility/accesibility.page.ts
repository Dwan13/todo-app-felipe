import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRange,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({
  personCircle,
  personCircleOutline,
  sunny,
  sunnyOutline,
});
@Component({
  selector: 'app-accesibility',
  templateUrl: './accesibility.page.html',
  styleUrls: ['./accesibility.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRange,
    IonText,
    IonTitle,
    IonToggle,
    IonToolbar,
  ],
})
export class AccesibilityPage implements OnInit {
  paletteToggle = false;
  boldText = false;
  trueTone = true;
  textSize: 'small' | 'medium' | 'large' = 'medium';
  brightness: number = 1; // 1 = 100%, 0.5 = 50%, 1.5 = 150%

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);
    prefersDark.addEventListener('change', (e) => this.initializeDarkPalette(e.matches));
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  toggleBoldText(enabled: boolean) {
    this.boldText = enabled;
    document.documentElement.classList.toggle('accessibility-bold-text', enabled);
  }

  toggleTrueTone(enabled: boolean) {
    this.trueTone = enabled;
    document.documentElement.classList.toggle('accessibility-true-tone', enabled);
  }

  changeBrightness(value: number | { lower: number; upper: number }) {
    let brightnessValue: number;
  
    if (typeof value === 'number') {
      brightnessValue = value;
    } else if (value && typeof value === 'object' && 'lower' in value) {
      brightnessValue = value.lower;
    } else {
      brightnessValue = 1;
    }
  
    // Limitar el brillo para que no baje de 0.5 y no pase de 1.5
    brightnessValue = Math.min(Math.max(brightnessValue, 0.5), 1.5);
  
    this.brightness = brightnessValue;
    document.documentElement.style.setProperty('--accessibility-brightness', brightnessValue.toString());
  
    // Aplicar filtro CSS directamente para evitar errores si usas el filtro en otro lado
    document.documentElement.style.filter = `brightness(${brightnessValue})`;
  }
  
  

  setTextSize(size: 'small' | 'medium' | 'large') {
    this.textSize = size;
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large');
    document.documentElement.classList.add(`text-${size}`);
  }
}
