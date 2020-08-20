import { Component, OnInit } from '@angular/core';
import { Employee, Payroll, Dependent } from './model/employee.model';
import { EmployeeService } from './services/employee.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

export interface TableElement {
  name: string;
  employeeId: string;
  emailAddress: string;
  phoneNumber: string;
  benefitCost: number;
}

export interface TableElementEmployee {
  name: string;
  employeeId: string;
  emailAddress: string;
  phoneNumber: string;
  benefitCost: number;
  incomeYearly: number;
  incomePerPay: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  editEmployees: Employee[] = [];
  displayedColumns: string[] = ['select', 'name', 'employeeId', 'emailAddress', 'phoneNumber', 'benefitCost'];
  displayedColumnsEmployee: string[] = ['name', 'employeeId', 'emailAddress', 'phoneNumber', 'benefitCost', 'incomeYearly', 'incomePerPay'];
  employeeId = '';
  name = '';
  nameDependent = '';
  numberDependent = '';
  emailDependent = '';
  dataSource = new MatTableDataSource<TableElement>();
  dataSourceE = new MatTableDataSource<TableElementEmployee>();
  dataSourceAll = new MatTableDataSource<TableElementEmployee>();
  isDependentAdded = false;
  totalCost = 0;
  constructor(
    private _employeeService: EmployeeService,
  ) { }

  selectedDependents = [];

  ngOnInit(): void {

  }

  getAllEmployee() {
    this._employeeService.getAllEmployee().subscribe(res => {
      console.log(res);
      const data = [];
      if (res.EmployeePayroll && res.EmployeePayroll.length > 0) {
        res.EmployeePayroll.forEach(d => {
          data.push({name: d.Name,  employeeId: d.EmployeeId,
          emailAddress: d.Email, phoneNumber: d.PhoneNumber, benefitCost:
          d.AnnualBenefitCosts, incomeYearly: d.TakeHomeIncomeYearly, incomePerPay: d.TakeHomeIncomeMonthly});
          this.dataSourceAll.data = data;
         });
        this.totalCost = res.TotalBenefitCosts;
    }
    });
  }

  selectDependent($event) {
    this.selectedDependents.push($event);
  }

  removeDependent() {
    const rowKey = [];
    this.selectedDependents.forEach(element => {
      rowKey.push(this.dataSource.data[element].employeeId);
    });
    this._employeeService.removeDependent(this.name, this.employeeId, rowKey).subscribe(res => {
      this.dataSourceE.data = [{name: res.Name,  employeeId: this.employeeId,
        emailAddress: res.Email, phoneNumber: res.PhoneNumber, benefitCost: res.AnnualBenefitCosts,
        incomeYearly: res.TakeHomeIncomeYearly, incomePerPay: res.TakeHomeIncomeMonthly}];
      this.initDataSource(res);
    });
    this.selectedDependents = [];
  }

  getEmployee() {
    this._employeeService.getEmployee(this.name, this.employeeId).subscribe(res => {
      this.dataSourceE.data = [{name: res.Name,  employeeId: this.employeeId,
         emailAddress: res.Email, phoneNumber: res.PhoneNumber, benefitCost: res.AnnualBenefitCosts,
         incomeYearly: res.TakeHomeIncomeYearly, incomePerPay: res.TakeHomeIncomeMonthly}];
      const data = [];
      if (res.Dependents && res.Dependents.length > 0) {
           res.Dependents.forEach(d => {
             data.push({name: d.FullName,  employeeId: d.RowKey,
             emailAddress: d.Email, phoneNumber: d.PhoneNumber, benefitCost: d.AnnualBenefitCosts});
            });
           this.dataSource.data = data;
         }
    });
  }

  initDataSource(res: Employee) {
    const data = [];
    if (res.Dependents && res.Dependents.length > 0) {
        res.Dependents.forEach(d => {
          data.push({name: d.FullName,  employeeId: d.RowKey,
          emailAddress: d.Email, phoneNumber: d.PhoneNumber, benefitCost: d.AnnualBenefitCosts});
          this.dataSource.data = data;
         });
    }
    return data;
  }

  addDependent() {
    this.isDependentAdded = false;
    const dependent = new Dependent(this.emailDependent, this.numberDependent, this.nameDependent);
    dependent.Email = this.emailDependent;
    dependent.FullName = this.nameDependent;
    dependent.PhoneNumber = this.numberDependent;
    this._employeeService.addDependent(this.name, this.employeeId, dependent).subscribe(res => {
      console.log(res);
      this.dataSource.data = this.initDataSource(res);
      this.dataSourceE.data = [{name: res.Name,  employeeId: this.employeeId,
        emailAddress: res.Email, phoneNumber: res.PhoneNumber, benefitCost: res.AnnualBenefitCosts,
        incomeYearly: res.TakeHomeIncomeYearly, incomePerPay: res.TakeHomeIncomeMonthly}];
    });
  }

}

