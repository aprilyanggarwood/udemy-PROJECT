import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;


  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.recipes = {} as Recipe[]
    this.subscription = {} as Subscription

   }

  ngOnInit(): void {
    // I want to listen the recipe changed event
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    // relativeTo: this.route:  from current activated  route to the new recipe route / private route: ActivatedRoute
    this.router.navigate(['new'], {relativeTo: this.route})


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

//   onRecipeSelected(recipe: Recipe) {
//     this.recipeWasSelected.emit(recipe);
//  }

}
