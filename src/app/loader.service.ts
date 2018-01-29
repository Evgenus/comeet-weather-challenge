import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { sortBy } from 'underscore';

import { environment } from '../environments/environment';

@Injectable()
export class LoaderService {

  private _status = new BehaviorSubject<string>('READY');
  status = this._status.asObservable();

  private _locations = new BehaviorSubject<any[]>([]);
  locations = this._locations.asObservable();

  private _gender = new BehaviorSubject<string>("Male");
  gender = this._gender.asObservable();;

  api_url = "https://api.openweathermap.org/data/2.5/box/city";
  zoom = 24;
  lon_step = 360 / 1;
  lat_step = 180 / 1;
  goal_temp = 21;
  goal_humidity = 50;
  private _jobs = new Set();

  constructor(private http:Http) {
    this.startLoading();
  }

  queryCell(w:Number, s:Number, e: Number, n: Number) {
    let params = new URLSearchParams();
    let bbox = [w, s, e, n, this.zoom].join(',');
    params.set('bbox', bbox);
    params.set('appid', environment.open_weather_token);
    this._jobs.add(bbox);
    this.http.get(this.api_url, {params}).toPromise().then(
      res => this.processResult(bbox, res.json())
    ).catch(
      error => console.log(error)
    )
  }

  addLocations(new_locations: any[]) {
    this._status.next('SORTING');
    this._locations.next(
      sortBy(
        this._locations.value.concat(new_locations),
        (loc:any) => Math.abs(loc.main.temp - this.goal_temp) + Math.abs(loc.main.humidity - this.goal_humidity)
      )
    );
    if(this._jobs.size == 0) {
      this._status.next('READY');
    } else {
      this._status.next('LOADING');
    }
  }

  processResult(job_id, data) {
    this._jobs.delete(job_id);
    if(data.length == 0) return;
    this.addLocations(data.list);
  }

  startLoading() {
    this._status.next('LOADING');
    if(environment.production) {
      for(let lon=-180; lon < 180; lon += this.lon_step) {
        for(let lat=-90; lat < 90; lat += this.lat_step) {
          this.queryCell(lon, lat, lon + this.lon_step, lat + this.lat_step);
        }
      }
    } else {
      self.setTimeout(
        () => this.processResult(null, environment.result),
        3000
      );
    }
  }

    setGender(gender) {
      if(this.gender == gender) return;
      if(gender == "Male") {
        this.goal_temp = 21;
      } else if(gender == "Female") {
        this.goal_temp = 22;
      }
      this._gender.next(gender);
      this.addLocations([]); // forcing data resorting;
    }
}
