import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { accessibilityOutline, search, layersOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
/**
 * @class TabsPage
 * @description Componente principal que gestiona la navegación por pestañas de la aplicación.
 *              Define la estructura de las pestañas y carga los iconos necesarios para cada una.
 */
export class TabsPage {
  /**
   * @property {EnvironmentInjector} environmentInjector
   * @description Inyector de entorno utilizado para la creación de componentes dinámicos.
   *              Se inyecta automáticamente utilizando la función `inject` de Angular.
   */
  public environmentInjector = inject(EnvironmentInjector);

  /**
   * @constructor
   * @description Constructor de la clase `TabsPage`.
   *              Inicializa los iconos de Ionic que serán utilizados en las pestañas.
   */
  constructor() {
    // Añade los iconos necesarios para las pestañas de la aplicación.
    // `layersOutline` para la pestaña de tareas (Todo).
    // `accessibilityOutline` para la pestaña de accesibilidad.
    // `search` para la pestaña de búsqueda.
    addIcons({ layersOutline, accessibilityOutline, search, addOutline });
  }
}
