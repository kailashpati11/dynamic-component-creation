import { Component, ComponentRef, createNgModule, Injector, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  componentRef!: ComponentRef<DynamicComponent>;

  constructor(
    private injector: Injector
  ) { }

  async createDynamicModule() {
    const { DynamicModule } = await import('./dynamic/dynamic.module');
    const moduleRef = createNgModule(DynamicModule, this.injector);
    this.container.clear();
    this.componentRef = this.container.createComponent(DynamicComponent, { ngModuleRef: moduleRef });
  }

  removeDynamicModule() {
    if(this.container) {
      this.container.clear();
    }
  }
}
