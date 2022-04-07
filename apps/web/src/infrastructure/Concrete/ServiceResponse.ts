export enum ServiceResponseStatus {
    SUCCESS = 'success',
    ERROR = 'error',
}

export class ServiceResponse<T> {
    public status: ServiceResponseStatus;
    public data: T | undefined;

    constructor(status: ServiceResponseStatus, data?: T) {
        this.status = status;
        this.data = data;
    }

    static failure(error: Error): ServiceResponse<Error> {
        return new ServiceResponse(ServiceResponseStatus.ERROR, error);
    }

    static success<T>(data?: T): ServiceResponse<T> {
        return new ServiceResponse(ServiceResponseStatus.SUCCESS, data);
    }
}

export type VoidResponse = ServiceResponse<void>;
