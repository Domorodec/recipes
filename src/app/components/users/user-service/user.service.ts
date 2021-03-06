import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';
import {UserEntity} from '../entity/user.entity';
import {environment} from '../../../../environments/environment';
import {AlertService} from '../../services/alert.service';
import {AlertConstants} from '../../../constants/alert.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: UserEntity;
  public error: string;

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  getUserTokenFromBackend(username: string, password: string): Observable<any> {
    return this.http.get<UserEntity>(`${environment.backendURL}/login?username=${username}&password=${password}`,
      {observe: 'response'}
    ).pipe(
      catchError(() => {
          this.alertService.setMsg(AlertConstants.BAD_LOGIN);
          error('not valid username or password');
        }
      )
    );
  }

  getUserData(username: string, password: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${environment.backendURL}/users/loginAfterAuth?username=${username}&password=${password}`,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('usertoken')
        })

      }).pipe(tap(user => {
      this.user = user;
      localStorage.setItem('username', user.name);
    }));
  }

  registerUser(user): Observable<UserEntity> {
    user.id = Math.random() * 65531;
    user.created = new Date();
    return this.http.post<UserEntity>(environment.backendURL + '/users/register', user
    ).pipe(
      tap((rec: UserEntity) => console.log(`added user w / id =${rec.id}`)),
      catchError((err) => {
        error('error saving user data to backend with detail: ' + err.error );
        this.error = err.error;
        this.alertService.setMsg(this.error);
      }));
  }
}

