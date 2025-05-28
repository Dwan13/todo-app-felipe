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
/**
 * Componente de página para gestionar la configuración de accesibilidad de la aplicación.
 * Permite a los usuarios ajustar temas visuales, tamaño de texto y brillo.
 */
export class AccesibilityPage implements OnInit {
  /**
   * Controla el estado del interruptor para el modo oscuro (paleta de colores).
   * @type {boolean}
   */
  paletteToggle = false;
  /**
   * Controla el estado del interruptor para el texto en negrita.
   * @type {boolean}
   */
  boldText = false;
  /**
   * Controla el estado del interruptor para la función True Tone.
   * @type {boolean}
   */
  trueTone = true;
  /**
   * Define el tamaño del texto ('small', 'medium', 'large').
   * @type {'small' | 'medium' | 'large'}
   */
  textSize: 'small' | 'medium' | 'large' = 'medium';
  /**
   * Controla el nivel de brillo de la interfaz. El valor 1 representa el 100%.
   * @type {number}
   */
  brightness: number = 1; // 1 = 100%, 0.5 = 50%, 1.5 = 150%

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa la paleta de colores oscura basándose en las preferencias del sistema
   * y añade un listener para cambios en el esquema de color.
   */
  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);
    prefersDark.addEventListener('change', (e) => this.initializeDarkPalette(e.matches));
  }

  /**
   * Inicializa la paleta de colores oscura.
   * @param {boolean} isDark - Indica si el sistema prefiere el modo oscuro.
   */
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  /**
   * Maneja el evento de cambio del interruptor de la paleta de colores.
   * @param {CustomEvent} event - El evento de cambio que contiene el estado del interruptor.
   */
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  /**
   * Alterna la paleta de colores oscura en el elemento raíz del documento.
   * @param {boolean} shouldAdd - Si es `true`, añade la clase para el modo oscuro; de lo contrario, la elimina.
   */
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  /**
   * Alterna el texto en negrita en el elemento raíz del documento.
   * @param {boolean} enabled - Si es `true`, añade la clase para texto en negrita; de lo contrario, la elimina.
   */
  toggleBoldText(enabled: boolean) {
    this.boldText = enabled;
    document.documentElement.classList.toggle('accessibility-bold-text', enabled);
  }

  /**
   * Alterna la función True Tone en el elemento raíz del documento.
   * @param {boolean} enabled - Si es `true`, añade la clase para True Tone; de lo contrario, la elimina.
   */
  toggleTrueTone(enabled: boolean) {
    this.trueTone = enabled;
    document.documentElement.classList.toggle('accessibility-true-tone', enabled);
  }

  /**
   * Cambia el nivel de brillo de la interfaz de usuario.
   * Limita el valor de brillo entre 0.5 (50%) y 1.5 (150%).
   * Aplica el brillo como una propiedad CSS personalizada y un filtro CSS.
   * @param {number | { lower: number; upper: number }} value - El valor de brillo o un objeto de rango.
   */
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
  
  

  /**
   * Establece el tamaño del texto en la interfaz de usuario.
   * Elimina las clases de tamaño de texto existentes y añade la clase correspondiente al nuevo tamaño.
   * @param {'small' | 'medium' | 'large'} size - El tamaño de texto deseado.
   */
  setTextSize(size: 'small' | 'medium' | 'large') {
    this.textSize = size;
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large');
    document.documentElement.classList.add(`text-${size}`);
  }
}
