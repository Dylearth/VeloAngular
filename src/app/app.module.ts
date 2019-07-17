import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatAutocompleteModule, MatCardModule,MatSortModule,
   MatTableModule } from '@angular/material';
import { CdkColumnDef } from '@angular/cdk/table';
import { MaterialModule } from './material.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { TableauComponent } from './tableau/tableau.component';
import { CarteComponent } from './carte/carte.component';
import { HeaderComponent } from './header/header.component';
import { VelosService } from './services/velos.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ErreurCheminComponent } from './erreurChemin/erreurChemin.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

const appRoutes: Routes = [
   { path: 'tableau', component: TableauComponent },
   { path: 'carte', component: CarteComponent },
   { path: '', redirectTo: 'tableau', pathMatch: 'full' },
   { path: '404', component: ErreurCheminComponent },
   { path: '**', redirectTo: '404' }
]

@NgModule({
   declarations: [
      AppComponent,
      TableauComponent,
      CarteComponent,
      HeaderComponent,
      ErreurCheminComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      HttpClientModule,
      MatMenuModule,
      MatCardModule,
      MatTableModule,
      MatSortModule,
      MatAutocompleteModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      VelosService,
      CdkColumnDef,
      { provide: LOCALE_ID, useValue: "fr-CA" }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
