import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
  // to clear the subscription, whenever we leave that component, let's add on destroy as an interface
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  // good practice to store that subscription in some property when use, and clean it up when we leave the component.
   private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService) {
    this.igChangeSub = {} as Subscription
  }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    // store my subscription in that igChangeSub property / subscribe turns to subscription which store in there.
    this.igChangeSub = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }

  // listen to in the shopping edited component
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }


  // this is the recommended pattern which will replace the event emitter with a more optimal solution
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

}
