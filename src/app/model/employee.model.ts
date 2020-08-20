export class Employee {
    Email: string;
    PhoneNumber: string;
    Name: string;
    AnnualBenefitCosts: number;
    numberOfDependents: number;
    Dependents: [Dependent];
    TakeHomeIncomeMonthly: number;
    TakeHomeIncomeYearly: number;
    EmployeeId: string;
    constructor() {
        this.Email = '';
        this.PhoneNumber = '';
        this.Name = '';
    }
}

export class Dependent {
    Email: string;
    PhoneNumber: string;
    FullName: string;
    AnnualBenefitCosts: number;
    RowKey: number;
    constructor(email: string, phone: string, name: string) {
        this.Email = email;
        this.PhoneNumber = phone;
        this.FullName = name;
    }
}

export class Payroll {
    EmployeePayroll: Array<Employee>;
    TotalBenefitCosts: number;
    constructor(
    ) {
        this.EmployeePayroll = [];
        this.TotalBenefitCosts = 0;
    }
}
