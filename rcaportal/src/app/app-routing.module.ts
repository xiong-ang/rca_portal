import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home/home-component.component';
import { FilterComponentComponent } from './filter/filter-component.component';
import { NotfoundComponentComponent } from './notfound-component/notfound-component.component';


const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: 'filter', component: FilterComponentComponent },
  { path: '**', component: NotfoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
