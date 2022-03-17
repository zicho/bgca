export class ValidationResult {
    success: boolean;
    message: string;
    errorType: ValidationErrorType;


    constructor(success: boolean, message: string, errorType?: ValidationErrorType) {
        this.success = success
        this.message = message
        this.errorType = errorType;
    }


    public static getPositive(message?: string) {
        return new ValidationResult(true, message)
    }

    public static getNegative(message: string, errorType: ValidationErrorType = ValidationErrorType.GenericError) {
        return new ValidationResult(false, message, errorType)
    }
}

export enum ValidationErrorType {
    GenericError,
    PasswordMismatch
}

export class ErrorState {
    hasError: boolean;
    message: string;
    errorType: ValidationErrorType;


  constructor(hasError: boolean = false, message?: string, errorType?: ValidationErrorType) {
    this.hasError = hasError
    this.message = message
    this.errorType = errorType
  }

}