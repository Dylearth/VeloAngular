import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { VelosService } from '../services/velos.service';
import { HttpParams } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit, OnDestroy {

  carte: L.Map;
  velos: any[];
  iconeMarqueur: any;
  veloSubscription: Subscription;
  params = new HttpParams();

  constructor(private veloService: VelosService) {}

  // S'abonne au service velo pour récupérer en temps réel les données et les affecter dans le tableau de velos
  ngOnInit() {
    this.veloSubscription = this.veloService.velosSubject.subscribe(
      (velos: any[]) => {
        this.velos = velos;
        this.placeMarqueurs();
      }
    );
    this.InitMap();
    // Récupère les informations liées aux vélos
    this.veloService.emitVeloSubject(); 
  }

  InitMap()
  {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.carte = L.map("carte", {
      minZoom: 7,
      maxZoom: 18,
      center:  new L.LatLng(48.109601, -1.67408),
      zoom :12
  });
    // Création des tuiles de la carte
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    }).addTo(this.carte);
  }    
    
  // Place les marqueurs en parcourant la liste des informations liées aux vélos
  placeMarqueurs() {
    this.velos.forEach(velo => {
      // Sélectionne le marqueur en fonction de l'état de la station
      velo.fields.etat=='En fonctionnement'? this.iconeMarqueur = this.veloService.iconeMarqueur : this.iconeMarqueur = this.veloService.iconeMarqueurRouge;
      L.marker([velo.fields.coordonnees[0], velo.fields.coordonnees[1]], 
        { icon: this.iconeMarqueur })
      // Pop up lors du clique sur un marqueur
      .bindPopup(`
        <h3>${velo.fields.nom} (${velo.fields.idstation})</h3>
        <b style="color: ${velo.fields.etat=='En fonctionnement'? 'green' : 'red'}">${velo.fields.etat}</b><br/>
        <i>Vélos disponibles : </i>${velo.fields.nombrevelosdisponibles ? velo.fields.nombrevelosdisponibles : 'Inconnu'}<br/>
        <i>Emplacements disponibles : </i>${velo.fields.nombreemplacementsdisponibles ? velo.fields.nombreemplacementsdisponibles : 'Inconnu'}<br/>
      `).addTo(this.carte);
    })
  }

  ngOnDestroy(): void {
    this.veloSubscription.unsubscribe();
  }

}
