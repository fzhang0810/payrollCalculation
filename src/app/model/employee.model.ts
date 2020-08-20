export class Employee {
    Email: string;
    PhoneNumber: string;
    FullName: string;
    AnnualBenefitCosts: number;
    numberOfDependents: number;
    Dependents: [Dependent];
    TakeHomeIncomeMonthly: number;
    TakeHomeIncomeYearly: number;
    constructor() {
        this.Email = '';
        this.PhoneNumber = '';
        this.FullName = '';
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

export class Deductions {
    deduction: string;
    amount: number;
    constructor(
    ) {
        this.deduction = '';
        this.amount = 0;
    }
}
