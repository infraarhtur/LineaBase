import { HttpHeaders } from '@angular/common/http';


export interface HttpErrorResponseInit {
    error?: any;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
}
