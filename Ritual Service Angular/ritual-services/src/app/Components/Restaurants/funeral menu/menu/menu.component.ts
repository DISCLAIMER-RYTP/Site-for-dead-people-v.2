import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  elements: any = [
    { dish: 'Ukrainian borsch', portion: '300g'},
    { dish: 'buckwheat porridge', portion: '150g'},
    { dish: 'fresh cabbage salad', portion: '100g'},
    { dish: 'Meat stew with potatoes', portion: '300g'},
    { dish: 'Fish fried in batter', portion: '100g'},
    { dish: 'Chicken chop', portion: '75g'},
    { dish: 'Herring with onions', portion: '40/20g'},
    { dish: 'Sausage. Cheese', portion: '20/30g'},
    { dish: 'Bread', portion: '3st'},
    { dish: 'Stewed fruit', portion: '200g'},
    { dish: 'Potato pie', portion: '1st'},
    { dish: 'Pie with jam', portion: '1st'},
    { dish: 'Wheel', portion: '30g'},
    { dish: 'Cahors', portion: '200g'},

  ];

  headElements = [ 'Dish', 'Portion'];

}
