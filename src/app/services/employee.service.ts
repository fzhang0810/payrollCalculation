
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS operator for mapping the observable

import { Employee, Dependent } from '../model/employee.model';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {

    api = 'https://localhost:44392/api/employee';
    EmployeeUrl = 'https://localhost:44392/api/delete/dependents/employname';

    constructor(
        private http: HttpClient
    ) { }

    getEmployee(name: string, employeeId: string): Observable<Employee> {
        return this.http.get<Employee>(`${this.api}/${name}/${employeeId}`);
    }

    addDependent(name: string, employeeId: string, dependent: Dependent): Observable<Employee> {
        return this.http.post<Employee>(`${this.api}/${name}/${employeeId}/dependent`, dependent);
    }

    removeDependent(name: string, employeeId: string, rowKey: string[]): Observable<Employee> {
        return this.http.post<Employee>(`${this.EmployeeUrl}/${name}/${employeeId}`, rowKey);
    }
 }
