import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output, OnDestroy} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef!: ElementRef;
  // @ViewChild('amountInput') amountInputRef!: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm!: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {
    this.subscription = {} as Subscription
    this.editedItemIndex = {} as number
    this.editedItem = {} as Ingredient
    // this.slForm = {} as NgForm
  }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          // get the edited item index first , then edited the item by using setValue method
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })

        }
      )
  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    // if edit mode is false, the button will be reset to Add out from Update
    this.editMode = false;
    form.reset();

    // this.ingredientAdded.emit(newIngredient);
    // this.slService.addIngredient(newIngredient);
  }


  onClear() {
    this.slForm.reset()
    this.editMode = false;
}

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

}
