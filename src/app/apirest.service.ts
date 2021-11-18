import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({providedIn: 'root'})

export class ApirestService 
{
  listado = [];
  Item: any;
  private apiURL = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  getUsers()
  {
    let url = this.apiURL + "users";
    this.listado =[];
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: []) => {
        resolve(data);
        data.forEach(item => { this.listado.push(item);})
      },
      error => { console.log("error")
      })
    })
  }
  async getUser(id:String)
  {
    let url = this.apiURL + 'users/' + id;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: any) => {
        resolve(data);
        this.Item = data;
      },
      error => { console.log("error")
      })
    })
  }

  async getUsername()
  {
    let url = this.apiURL + 'users';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: any) => {
        resolve(data);
        this.Item = data;
      },
      error => { console.log("error")
      })
    })
  }

  async getPosts(userId:string)
  {
    let url = this.apiURL + 'posts/' + userId;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: any) => {
        resolve(data);
        this.Item = data;
      },
      error => { console.log("error")
      })
    })
  }
  async getUserPost(postId:string)
  {
    let url = this.apiURL + 'posts/' + postId + '/comments';
    this.listado =[];
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: any) => {
        resolve(data);
        data.forEach(item => { this.listado.push(item);})
      },
      error => { console.log("error")
      })
    })
  }

// ponemos el alert en caso de que el usuario no exista

  async presentAlert() 
  {
    const alert = await this.alertCtrl.create
    ({
      cssClass: 'my-custom-class',
      header: 'Usuario no encontrado',
      buttons: ['Okay'],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
