import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { LoaderService } from '../loader.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [

    trigger('locations', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('50ms', [
          animate('400ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  locations = [];

  constructor(private _loader: LoaderService) {
    this._loader.locations.subscribe(
      res => this.locations = res.slice(0, environment.size_of_top_list)
    );
  }

  ngOnInit() {}

}
