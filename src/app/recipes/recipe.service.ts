import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

 recipeSelected = new EventEmitter<Recipe>()

 private  recipes: Recipe[] = [
   new Recipe('A Test Recipe',
     'This is simply a test',
     'https://cdn.pixabay.com/photo/2023/07/27/07/42/cherry-cake-8152717_1280.jpg',
   [
     new Ingredient('Meet', 1),
     new Ingredient('French Fries', 20)
      ]),


    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2023/07/27/07/42/cherry-cake-8152717_1280.jpg',
   [
     new Ingredient('Buns', 2),
     new Ingredient('Meat',1)
      ])

  ];

  constructor(private slService: ShoppingListService) {}

  // return a copy of new array by slice()
  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(index: number) {
    return this.recipes[index];

  }

  //  add Ingredients To the ShoppingList
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

}
