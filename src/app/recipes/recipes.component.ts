import { Component, OnInit } from '@angular/core';

// import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers:[RecipeService]
})
export class RecipesComponent implements OnInit {
  // selectedRecipe!: Recipe;
  // constructor(private recipeService: RecipeService) { }
  constructor() { }

  // .subscribe - get informed about any changes at the same page
  ngOnInit(): void {
    // this.recipeService.recipeSelected
    //   .subscribe(
    //     (recipe: Recipe) => {
    //       this.selectedRecipe = recipe;
    //     }
    //   )

  }

  // if use selectedRecipe = $event from demo, don't need this onSelectedRecipe function
  // onSelectedRecipe(recipe: Recipe) {
  //   this.selectedRecipe = recipe

  // }

}
