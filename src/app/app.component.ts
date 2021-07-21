import { ServiceService } from './services/service.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Datos CODVID-19';

  public obs$!: Observable<any>;

  public localidadSeleccionada:Localidad={nombre: 'Peñaflor', dataValue:3101};

  public provincias:Provincia[]=[
    {
      nombre:'Cádiz',
      localidades:[
        {nombre: 'Bornos', dataValue:2363},
        {nombre: 'Conil de la Frontera', dataValue:2367},
        {nombre: 'Jerez de la Frontera', dataValue:2373},

      ]
    },
    {
        nombre:'Córdoba',
        localidades:[
          {nombre: 'Castro del Río', dataValue:2421},
          {nombre: 'Córdoba (capital)', dataValue:2423},
          {nombre: 'Hornachuelos', dataValue:2438},
          {nombre: 'Palma del Río', dataValue:2451},
          {nombre: 'Posadas', dataValue:2455},
        ]
      },
      {
        nombre:'Huelva',
        localidades:[
          {nombre: 'Isla Cristina', dataValue:2755},
          {nombre: 'Punta Umbría', dataValue:2773},
        ]
      },
      {
        nombre:'Sevilla',
        localidades:[
          {nombre: 'Cazalla de la Sierra', dataValue:3057},
          {nombre: 'Constantina', dataValue:3058},
          {nombre: 'Dos Hermanas', dataValue:3063},
          {nombre: 'Écija', dataValue:503755},
          {nombre: 'El Pedroso', dataValue:3100},
          {nombre: 'La Campana', dataValue:3047},
          {nombre: 'La Puebla de los Infantes', dataValue:3105},
          {nombre: 'Lora del Río', dataValue:3082},
          {nombre: 'Mairena del Alcor', dataValue:3085},
          {nombre: 'Peñaflor', dataValue:3101},
          {nombre: 'Sevilla (capital)', dataValue:3120},
          {nombre: 'Tocina', dataValue:3121},
        ]
      }
    ];  

    public expande:boolean=false;

  constructor(private api:ServiceService, private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,){
    this.iconRegistry.addSvgIcon(
      'whatsapp',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/svg/whatsapp.svg')
    );
  }

  ngOnInit(): void {    
    const localidadStr:string | null = localStorage.getItem('localidad');
    if(localidadStr){
      this.localidadSeleccionada= JSON.parse(localidadStr);
    }
    this.cargaDatos(this.localidadSeleccionada);    
    
  }

  setExpande(){
    this.expande=true;
  }

  public cargaDatos(localidad:Localidad){
    this.expande=false;
    this.localidadSeleccionada=localidad;    
    localStorage.setItem('localidad',JSON.stringify(this.localidadSeleccionada));
    this.obs$=this.api.loadCovidData(localidad.dataValue);
  }

  public async openSweetInputPhoneNumber() {
    const { value: number } = await swal.fire({
      input: 'number',
      inputLabel: 'Número de móvil',
      confirmButtonColor: '#5851ec',
      inputPlaceholder: 'Número de móvil',      
      showCloseButton: true,
      imageUrl: '/assets/svg/whatsapp.svg',
      imageWidth: 96,
      imageHeight: 96,
      inputAttributes: {
        autocomplete: 'off',
      },
    });
    if(!number) return;
    if (number > 111111111 && number < 999999999) {
      const url:string='https://covid19.fjmduran.com/';
      const envia: string = `https://wa.me/34${number}?text=${url}`;
      window.open(envia, '_blank');
    } else {
      swal.fire('', 'No es un número de móvil válido','warning');
    }    
  }

}

interface Localidad {
  nombre: string;
  dataValue:number
}

interface Provincia{
  nombre:string;
  localidades: Localidad[]
}