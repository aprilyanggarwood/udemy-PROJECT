import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) {
    this.id = {} as number;
   }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          // use + to convert the string id to a number
          this.id = +params['id'];
          // if id is not undentified, the id can be edited. like /1/edit
          this.editMode = params['id'] != null;
        }
      )


  }

}
