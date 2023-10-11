import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path: '', redirectTo:'/recipes', pathMatch:'full'},
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent
      },
      // 0/new that means editMode = false
      {
        path: 'new',
        component:RecipeEditComponent
      },
      // :id put behind the any other paths to avoid parse or load id first.
      {
        path: ':id',
        component: RecipeDetailComponent
      },
      // 0/edit that means editMode = true
      {
        path: ':id/edit',
        component:RecipeEditComponent
      }
  ] },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
