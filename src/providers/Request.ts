import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HomeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Request {
  constructor(public http: Http) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
  }
  get(url, data) {
    return new Promise((resolve, reject) => {
      this.http.get("http://api.dfjc.dev"+this.formatUrl(url, data)).map(res => res.json()).subscribe(e => {
        resolve(e);
      }, err => {
        reject(err);
      })
    })
  }
  post(url, data) {
    return new Promise((resolve, reject) => {
      this.http.post("http://api.dfjc.dev"+this.formatUrl(url, data), data.data).map(res => res.json()).subscribe(e => {
        resolve(e);
      }, err => {
        reject(err);
      })
    })
  }
  put(url, data) {
    return new Promise((resolve, reject) => {
      this.http.put("http://api.dfjc.dev"+this.formatUrl(url, data), data.data).map(res => res.json()).subscribe(e => {
        resolve(e);
      }, err => {
        reject(err);
      })
    })
  }
  delete(url, data) {
    return new Promise((resolve, reject) => {
      this.http.delete("http://api.dfjc.dev"+this.formatUrl(url, data)).map(res => res.json()).subscribe(e => {
        resolve(e);
      }, err => {
        reject(err);
      })
    })
  }
  formatUrl(url, data) {
    if (!url) alert("请求url不能为空")
    if (!data) return url
    if (data.operateId) data.url.replace(/\{[^\}]+\}/g, data.operateId)
    let params = data.params || {}
    if (data.query) params = Object.assign(params,{q:JSON.stringify(data.query)})
    for (let key in params) {
      url += "&" + key + "=" + params[key]
    }
    return url.replace("&", "?")
  }
}
