import { Injectable } from '@angular/core';
import { joueur } from '../model/joueur';
import { Equipe } from '../model/equipe';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { equipeWrapper } from '../model/equipWrapper';
import { apiUrl,apiUrlEqu } from '../config';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  //apiUrl :string = "http://localhost:8080/Devoir4/api";
  joueurs! :joueur[];
  //equipes! : Equipe[];
  joueur! :joueur;
  constructor(private http :HttpClient ,private authService :AuthService) {
    //this.equipes=[{idEquipe:1,nomEquipe:"psg"},{idEquipe:4,nomEquipe:"manutd"}]
    /*this.joueurs= [{idJoueur:1,nomJoueur:"Cristiano ronaldo",numeroJoueur:"30",equipe:{idEquipe:2,nomEquipe:"man utd"}},
    {idJoueur:2,nomJoueur:"lionel messi",numeroJoueur:"30",equipe:{idEquipe:1,nomEquipe:"psg"}},
    {idJoueur:3,nomJoueur:"lionel messi",numeroJoueur:"30",equipe:{idEquipe:1,nomEquipe:"psg"}},
    {idJoueur:4,nomJoueur:"Cristiano ronaldo",numeroJoueur:"30" ,equipe:{idEquipe:4,nomEquipe:"man utd"}}, 
  ];*/
   }
   listeJoueurs():Observable<joueur[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<joueur[]>(apiUrl+"/all");
   }
   ajouterJoueur(jou : joueur):Observable<joueur>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<joueur>(apiUrl,jou,{headers:httpHeaders})
   }
   supprimerJoueur(id :number){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url  =`${apiUrl}/${id}`;
    return this.http.delete(url,{headers:httpHeaders});
    /*const index = this.joueurs.indexOf(joueur,0);
    if(index > -1)this.joueurs.splice(index,1);*/
   }
   consulterJoueur(id:number):Observable< joueur>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const api =`${apiUrl}/${id}`;
    return  this.http.get<joueur>(api,{headers:httpHeaders});
    }
    updateJoueur(j:joueur):Observable< joueur>{
      let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.put<joueur>(apiUrl,j,{headers:httpHeaders});
      
    }
    trierJoueurs(){
      this.joueurs=this.joueurs.sort((j1,j2)=>{
        if(j1!.id!>j2!.id!){
          return 1
        }
        if(j1!.id!<j2!.id!){
          return -1
        }
        return 0
      })
    }
    //Equipes 
    listeEquipes():Observable<equipeWrapper>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      //const apiUrlEqu="http://localhost:8080/Devoir4/equ";
      return this.http.get<equipeWrapper>(apiUrlEqu,{headers:httpHeaders});
    }
    /*consulterEquipe(id:number):Equipe{
      return this.equipes.find(equ=>equ.idEquipe==id)!;
    }*/
    rechercherParCategorie(idequ: number):Observable< joueur[]> {

      const url = `${apiUrl}/Equipe/${idequ}`;
      return this.http.get<joueur[]>(url);
      }
    rechercheParNom(nom:string):Observable<joueur[]>{
      const url = `${apiUrl}/JoueurByName/${nom}`;
      return this.http.get<joueur[]>(url);
      
    }
    ajouterEquipe(equ:Equipe):Observable<Equipe>{
      //const apiUrlEqu="http://localhost:8080/Devoir4/equ";
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.post<Equipe>(apiUrlEqu,equ,{headers:httpHeaders})

    }
}
