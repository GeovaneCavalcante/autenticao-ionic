import { ENV } from './../../ENV';
import { HttpClient } from '@angular/common/http';;
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class GenericoProvider {

  token: any

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) 
  {
    console.log('Hello GenericoProvider Provider');
  }  
 
  login(credentials) {

    return this.http.post(ENV.apiUrl + 'api_token_auth/', credentials)
    .toPromise()
    .then(data => {
      this.setToken(data)
      return data
    })
    .catch(error => {
      return error
    });
  } 

  setToken(data){
    this.storage.set('token', data['token']);
    this.storage.set('user', data['user']);
    console.log(data)
  }
  

}
