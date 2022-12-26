import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './website/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>import('./website/website.module').then(m => m.WebsiteModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
