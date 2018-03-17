export class EmployeeModel {
    private _firstName: string;
    private _lastName: string;

    constructor(firstName, lastName, public isFTE: boolean, public paytype: string, public language: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    set firstName(value: string) {
        this._firstName = this.getNameFormat(value);
    }

    get firstName(): string {
        return this._firstName;
    }

    set lastName(value: string) {
        this._lastName = this.getNameFormat(value);
    }

    get lastName(): string {
        return this._lastName;
    }

    private getNameFormat(value: string): string {
        return value.charAt(0).toLocaleUpperCase() + value.slice(1);
    }
}
