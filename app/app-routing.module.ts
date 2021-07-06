import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateComponent } from './corporate/corporate.component';
import { HomesComponent } from './homes/homes.component';
import { DataComponent } from './data/data.component';
const routes: Routes = [
  {path:"" ,component : CorporateComponent},
  {path:"homes",component : HomesComponent},
  {path:"homes/details",component : DataComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
