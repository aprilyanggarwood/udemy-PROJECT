import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  // has not understood yet
  get recipeControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private fb: FormBuilder, private router:Router) {
    this.id = {} as number;
    this.recipeForm = {} as FormGroup
   }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          // use + to convert the string id to a number
          this.id = +params['id'];
          // if id is not undentified, the id can be edited. like /1/edit
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }




  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
       this.recipeService.addRecipe(this.recipeForm.value)
    }
     this.onCancel()
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    // (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
    // As of Angular 8+, there's a new way of clearing all items in a FormArray.
    // The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.
    //It's like manually creating a loop and calling removeAt() for every item.
    (<FormArray>this.recipeForm.get('ingredients')).clear()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
}



  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      // something not working for extracting the ingrediet data from exsiting recipe
      // if (recipe['ingredients']) {
      //   for (let ingredient of recipe.ingredients) {
      //     recipeIngredients.push(
      //       new FormGroup({
      //         'name': new FormControl(ingredient.name, Validators.required),
      //         'amount': new FormControl(ingredient.amount, [
      //           Validators.required,
      //           Validators.pattern(/^[1-9]+[0-9]*$/)
      //         ])
      //       })
      //     );
      //   }
      // }
    }




    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    })





}




}
