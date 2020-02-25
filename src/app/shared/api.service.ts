import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Filters, PaginatedRequestQuery, UrlParams} from './interfaces';
import {Observable} from 'rxjs';
import {Sort} from '@angular/material';
import {BusinessEntity, Page, Project} from '../core/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASE_URL = 'https://tdct-api.herokuapp.com/';

  constructor(public readonly http: HttpClient) { }

  private queryToParams(query: PaginatedRequestQuery): UrlParams {
    const pageIndex: number = query.pageIndex;
    const pageSize: number = query.pageSize;
    const sort: Sort = query.sort;
    let filters: Array<string> = [];
    if (query.filters) {
      Object.keys(query.filters).map(filter => {
        if (query.filters[filter]) {
          filters.push(filter + '=re=' + query.filters[filter]);
        }
      })
    }
    const output = Object.assign({
      page: pageIndex.toString(),
      size: pageSize.toString()
    });
    if (filters.length) {
      output['filter'] = filters.join(';');
    }
    return output;
  }

  public getProjects = (query: PaginatedRequestQuery): Observable<Page<Project>> => {
    return this.http.get<Page<Project>>(
        this.BASE_URL + 'api/v1/projects',
      {
        params: this.queryToParams(query)
      });
  };

  public getBusinessEntities = (query: PaginatedRequestQuery): Observable<Page<BusinessEntity>> => {
    return this.http.get<Page<BusinessEntity>>(
        this.BASE_URL + 'api/v1/business-entity',
        {
          params: this.queryToParams(query)
        });
  };

  public addProject(body: Project): Observable<null> {
    return this.http.post<null>(this.BASE_URL + 'api/v1/projects', body);
  }

  // todo: change endpoint
  public addBusinessEntity(body: any): Observable<null> {
    return this.http.post<null>(this.BASE_URL + 'businessEntities', body);
  }

  public findUsersByName(query: string): Observable<Page<any>> {
    return this.http.get<Page<any>>(this.BASE_URL + 'api/v1/users?filter=name=re=' + query);
  }

  public findProjectsByName(query: string): Observable<Page<any>> {
    return this.http.get<any>(this.BASE_URL + 'api/v1/projects?filter=name=re=' + query);
  }

}
