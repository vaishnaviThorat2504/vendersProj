import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenderRateService {


  private arr: any[] = [
    {
      date: '25 dec',
      vendor: "HCL",
      rateCard: 'Rate Card4',
      rate: 50,
      project: 'venders project',
      status: 'submit',
      budgetHrs: '78',
      file :"C:\\fakepath\\WhatsApp Image 2023-10-13 at 19.22.49.jpeg",
      remarks:'B' ,
    }
  ]; 

  constructor(private http: HttpClient){}

  private rateCardsSubject = new BehaviorSubject<string[]>([]);
  rateCards$ = this.rateCardsSubject.asObservable();

  private rateCardsSubject2 = new BehaviorSubject<string[]>([]);
  rateCards2$ = this.rateCardsSubject2.asObservable();

  private formDataSubject = new BehaviorSubject<any>(this.arr.slice());
  formData$ = this.formDataSubject.asObservable();

  getRateCards(vendor: string): void {
    // Your logic to fetch rate cards based on the selected vendor
    switch (vendor) {
      case 'TCS':
        this.rateCardsSubject.next(['Rate Card 1', 'Rate Card 2']);
        break;
      case 'Honeywell':
        this.rateCardsSubject.next(['Rate Card 2', 'Rate Card 3']);
        break;
      case 'HCL':
        this.rateCardsSubject.next(['Rate Card 4']);
        break;
      default:
        this.rateCardsSubject.next([]);
        break;
    }
  }

  getRate(rate: string): void {
    // Your logic to fetch rate cards based on the selected vendor
    switch (rate) {
      case 'Rate Card 1':
        this.rateCardsSubject2.next(['Rs 100']);
        break;
      case 'Rate Card 2':
        this.rateCardsSubject2.next(['$ 25']);
        break;
      case 'Rate Card 3':
        this.rateCardsSubject2.next(['Rs 150']);
        break;
        case 'Rate Card 4':
        this.rateCardsSubject2.next(['Rs 200']);
        break;
      default:
        this.rateCardsSubject2.next([]);
        break;
    }
  }

  setFormData(obj:any){
    this.arr.push(obj)
    this.formDataSubject.next(this.arr.slice());
  }

  cardIndex(id:number){
    return this.arr.slice()[id] 
  }
}
