import { ServiceService } from './services/service.service';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { A2HSPromptService } from '../../../common/src/services/a2-hs-prompt.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { SafariInstallInstructionsComponent } from './safari-install-instructions/safari-install-instructions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Datos CODVID-19';

  private obs$!: Observable<any>;
  public data: any;
  public httpError: boolean = false;

  public localidadSeleccionada: Localidad = {
    nombre: 'Peñaflor',
    dataValue: 3101,
    detailMapaCovid: 'Peñaflor',
  };

  public provincias: Provincia[] = [
    {
      nombre: 'Cádiz',
      localidades: [
        { nombre: 'Bornos', dataValue: 2363, detailMapaCovid: 'Bornos' },
        {
          nombre: 'Conil de la Frontera',
          dataValue: 2367,
          detailMapaCovid: 'Conil%20de%20la%20Frontera',
        },
        {
          nombre: 'El Puerto de Santa María',
          dataValue: 2380,
          detailMapaCovid: 'El%20Puerto%20de%20Santa%20María',
        },
        {
          nombre: 'Jerez de la Frontera',
          dataValue: 2373,
          detailMapaCovid: 'Jerez%20de%20la%20Frontera',
        },
      ],
    },
    {
      nombre: 'Córdoba',
      localidades: [
        {
          nombre: 'Castro del Río',
          dataValue: 2421,
          detailMapaCovid: 'Castro%20del%20Río',
        },
        {
          nombre: 'Córdoba (capital)',
          dataValue: 2423,
          detailMapaCovid: 'Córdoba',
        },
        {
          nombre: 'Hornachuelos',
          dataValue: 2438,
          detailMapaCovid: 'Hornachuelos',
        },
        { nombre: 'Lucena', dataValue: 2440, detailMapaCovid: 'Lucena' },
        {
          nombre: 'Palma del Río',
          dataValue: 2451,
          detailMapaCovid: 'Palma%20del%20Río',
        },
        { nombre: 'Posadas', dataValue: 2455, detailMapaCovid: 'Posadas' },
      ],
    },
    {
      nombre: 'Huelva',
      localidades: [
        { nombre: 'Almonte', dataValue: 2718, detailMapaCovid: 'Almonte' },
        { nombre: 'Bollullos Par del Condado', dataValue: 2726, detailMapaCovid: 'Bollullos%20Par%20del%20Condado' },
        { nombre: 'Cartaya', dataValue: 2734, detailMapaCovid: 'Cartaya' },
        {
          nombre: 'Higuera de la sierra',
          dataValue: 2751,
          detailMapaCovid: 'Higuera%20de%20la%20sierra',
        },
        {
          nombre: 'Isla Cristina',
          dataValue: 2755,
          detailMapaCovid: 'Isla%20Cristina',
        },
        {
          nombre: 'Punta Umbría',
          dataValue: 2773,
          detailMapaCovid: 'Punta%20Umbría',
        },
      ],
    },
    {
      nombre: 'Sevilla',
      localidades: [
        {
          nombre: 'Alcolea del río',
          dataValue: 3030,
          detailMapaCovid: 'Alcolea%20del%20Río',
        },
        { nombre: 'Bormujos', dataValue: 3042, detailMapaCovid: 'Bormujos' },
        {
          nombre: 'Cazalla de la Sierra',
          dataValue: 3057,
          detailMapaCovid: 'Cazalla%20de%20la%20Sierra',
        },
        {
          nombre: 'Constantina',
          dataValue: 3058,
          detailMapaCovid: 'Constantina',
        },
        {
          nombre: 'Dos Hermanas',
          dataValue: 3063,
          detailMapaCovid: 'Dos%20Hermanas',
        },
        { nombre: 'Écija', dataValue: 503755, detailMapaCovid: 'Écija' },
        {
          nombre: 'El Pedroso',
          dataValue: 3100,
          detailMapaCovid: 'El%20Pedroso',
        },
        { nombre: 'Guillena', dataValue: 3074, detailMapaCovid: 'Guillena' },
        {
          nombre: 'La Campana',
          dataValue: 3047,
          detailMapaCovid: 'La%20Campana',
        },
        {
          nombre: 'La Puebla de los Infantes',
          dataValue: 3105,
          detailMapaCovid: 'La%20Puebla%20de%20los%20Infantes',
        },
        {
          nombre: 'Lora del Río',
          dataValue: 3082,
          detailMapaCovid: 'Lora%20del%20Río',
        },
        {
          nombre: 'Mairena del Alcor',
          dataValue: 3085,
          detailMapaCovid: 'Mairena%20del%20Alcor',
        },
        {
          nombre: 'Montellano',
          dataValue: 3091,
          detailMapaCovid: 'Montellano',
        },
        { nombre: 'Peñaflor', dataValue: 3101, detailMapaCovid: 'Peñaflor' },
        {
          nombre: 'Sevilla (capital)',
          dataValue: 3120,
          detailMapaCovid: 'Sevilla',
        },
        { nombre: 'Tocina', dataValue: 3121, detailMapaCovid: 'Tocina' },
      ],
    },
  ];

  public expande: boolean = false;
  public showBtnInstall: boolean = false;
  public safari:boolean = false;

  public mapaCovid: string = 'https://www.mapacovid.es/detail/Peñaflor';

  constructor(
    private api: ServiceService,
    private a2hsPromptService: A2HSPromptService,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.a2hsPromptService
      .getCanShowInstallPopup$()
      .subscribe((showInstallPopup) => {
        const browser: 'Chromium' | 'Safari' | 'Firefox' =
          this.a2hsPromptService.getNavigator();          
        if (browser === 'Safari'){
          this.safari=true;
          this.showBtnInstall = true;
        }else{
          this.showBtnInstall = showInstallPopup;
        }        
        if (showInstallPopup) this.showInstallPopup();
      });

    const localidadStr: string | null = localStorage.getItem('localidad');
    if (localidadStr) {
      this.localidadSeleccionada = JSON.parse(localidadStr);
    }
    this.cargaDatos(this.localidadSeleccionada);
  }

  test(b: boolean) {
    this.a2hsPromptService.setValue(b);
  }

  public showInstallPopup() {
    const browser: 'Chromium' | 'Safari' | 'Firefox' =
      this.a2hsPromptService.getNavigator();
    if (browser === 'Safari') {
      this.showSafariInstallInstructions();
    } else {
      this.openBottomSheet();
    }
  }

  private openBottomSheet() {
    this._bottomSheet
      .open(BottomSheetComponent)
      .afterDismissed()
      .subscribe((resp) => {
        if (resp) {
          this.a2hsPromptService.showInstallPopup();
        }
      });
  }

  private showSafariInstallInstructions(): void {
    this.dialog.open(SafariInstallInstructionsComponent, {
      width: '90%',
      maxWidth: '600px',
    });
  }

  setExpande() {
    this.expande = true;
  }

  public cargaDatos(localidad: Localidad) {
    this.data = null;
    this.httpError = false;
    this.expande = false;
    this.localidadSeleccionada = localidad;
    localStorage.setItem(
      'localidad',
      JSON.stringify(this.localidadSeleccionada)
    );
    this.obs$ = this.api.loadCovidData(localidad.dataValue);
    this.obs$.subscribe(
      (data) => {
        this.data = data;
        this.httpError = false;
      },
      (error) => {
        this.httpError = true;
        console.log(error);
      }
    );
    this.mapaCovid = `https://www.mapacovid.es/detail/${this.localidadSeleccionada.detailMapaCovid}`;
  }

  public async openSweetInputPhoneNumber() {
    const shareData: ShareData = {
      url: 'https://covid19.fjmduran.com',
    };
    navigator.share(shareData);
    /*   const { value: number } = await swal.fire({
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
    }     */
  }
}

interface Localidad {
  nombre: string;
  dataValue: number;
  detailMapaCovid: string;
}

interface Provincia {
  nombre: string;
  localidades: Localidad[];
}
