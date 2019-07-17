import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { VelosService } from '../services/velos.service';
import * as L from 'leaflet';
import { $ } from 'protractor';


@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit, OnDestroy {

  carte: L.Map;
  velos: any[];
  veloSubscription: Subscription;
  headElements = ['Station (ID)', 'Nom', 'Coordonnées', 'Etat', 'Emplacements actuels', 'Emplacements disponibles', 'Vélos disponibles', 'Dernière mise à jour'];

  constructor(private veloService: VelosService) { }


  ngOnInit() {
    // S'abonne au service velo pour récupérer en temps réel les données et les affecter dans le tableau velos
    this.veloSubscription = this.veloService.velosSubject.subscribe(
      (velos: any[]) => {
        this.velos = velos;
      }
    );
    this.veloService.emitVeloSubject();
    this.InitMap();
  }

  afficheCarte(lat: number, long: number) {
    this.carte.setView([lat, long], 17);
    L.marker([lat, long], { icon: this.veloService.iconeMarqueur }).addTo(this.carte);
  }
  InitMap() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.carte = L.map("tabCarte", {
      zoomControl: false,
      center: new L.LatLng(48.109601, -1.67408),
      zoom: 7
    });
    // Création des tuiles de la carte
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    }).addTo(this.carte);
  }

  ngOnDestroy(): void {
    this.veloSubscription.unsubscribe();
  }
}
