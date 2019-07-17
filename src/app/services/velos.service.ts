import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as L from 'leaflet';

@Injectable()
export class VelosService {

  velosSubject = new Subject<any[]>();
  private velos = [];
  params = new HttpParams();
  //Image de l'icone du marqueur rouge (en panne)
  iconeMarqueurRouge = L.icon({
    iconUrl: 'assets/images/marqueurVeloRouge.png',
    iconSize: [42, 66], // Taille de l'icone
    iconAnchor: [21, 66], // Point du marqueur
    popupAnchor: [0, -80] // Point de la pop-up
  });

  //Image de l'icone du marqueur 
  iconeMarqueur = L.icon({
    iconUrl: 'assets/images/marqueurVelo.png',
    iconSize: [42, 66], // Taille de l'icone
    iconAnchor: [21, 66], // Point du marqueur
    popupAnchor: [0, -80] // Point de la pop-up
  });
  
  constructor(private httpClient: HttpClient) {
    this.getVelosFromAPI();
  }

  // Récupére la liste des informations liée aux vélos via l'API
  getVelosFromAPI() {
    this.httpClient
      .get<{ records: any[] }>('https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-des-stations-le-velo-star-en-temps-reel&rows=-1')
      .subscribe(
        (response) => {
          this.velos = response.records; // Affecte les valeurs au tableau velos
          this.emitVeloSubject();
        },
        (error) => {
          console.log('Erreur API : ', error);
        }
      );
  }

  // Met à jour les informations liées à velos
  emitVeloSubject() {
    this.velosSubject.next(this.velos);
  }


}
