import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../recipe-service/recipe.service';
import {RecipeEntity} from '../entity/recipe.entity';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: RecipeEntity[];
  private subscription: Subscription;

  constructor(private recipeService: RecipeService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.subscription = this.recipeService.getRecipeListByUsername(localStorage.getItem('username')).subscribe(
      recipes => this.recipes = recipes
      , error => console.log('error occured ' + error),
      () => console.log('completed'));
    setTimeout(() => {
        this.spinner.hide();
      }, 1000
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
