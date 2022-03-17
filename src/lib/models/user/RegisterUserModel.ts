import { ValidationErrorType, ValidationResult } from "../core/ValidationResult";

export class RegisterUserModel {

    constructor(
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    ) {
        this.email = email
        this.username = username
        this.password = password
        this.confirmPassword = confirmPassword
    }

    public email: string;
    public username: string;
    public password: string;
    public confirmPassword: string;

    public validate(): ValidationResult {
        if (!this.email || !this.password || !this.confirmPassword) {
            return ValidationResult.getNegative('Required fields are empty')
        }

        if (this.password != this.confirmPassword) {
            return ValidationResult.getNegative('Passwords do not match', ValidationErrorType.PasswordMismatch)
        }

        return ValidationResult.getPositive();
    }
}
