import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Best Weather In The World';
  status: string;

  constructor(private _loader: LoaderService) {
    this._loader.status.subscribe(res => this.status = res);
  }

  ngOnInit() {}
}
