import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  gender: string;

  constructor(private _loader: LoaderService) { }

  ngOnInit() {
    this._loader.gender.subscribe(res => this.gender = res);
  }

  genderChanged() {
    this._loader.setGender(this.gender)
  }
}
