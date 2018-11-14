import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: Headers;
  options: RequestOptions;
  public token: string;
  private messageSource = new BehaviorSubject('esto como se cambia');
  datosbd = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  API_ENDPOINT = 'https://rest-analysedaten.herokuapp.com';

  login(email: string, password: string): any {
    // tslint:disable-next-line:no-debugger
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.API_ENDPOINT + '/user/login', { email, password }, { headers: headers })
      .pipe(map(res => {
        // console.log(res);
        localStorage.setItem('userLogin', JSON.stringify(res));
        return res;
      }

      ));
  }

  getDetails(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    const aux = userLogin.token;
    const Authorization = { Authorization: 'Bearer' + aux };
    return this.http.get(this.API_ENDPOINT + '/datendetail', { headers: Authorization });
  }

  getDaten(currentPage: number): Observable<any> {
    // tslint:disable-next-line:no-debugger

    return this.http.get(this.API_ENDPOINT + '/daten/' + currentPage  );
  }

  getDatenMap(): Observable<any> {
    // tslint:disable-next-line:no-debugger

    return this.http.get(this.API_ENDPOINT + '/daten/');
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('userLogin');
  }

  // tslint:disable-next-line:typedef
  addFile(file) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.API_ENDPOINT + '/daten', file, { headers: headers })
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  // tslint:disable-next-line:typedef
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    // tslint:disable-next-line:no-debugger
 
    // const totalPages = Math.ceil(totalItems / pageSize);
    const totalPages = totalItems;
    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
      
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
        this.getDaten(currentPage);
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
        this.getDaten(currentPage);
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
        this.getDaten(currentPage);
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
