import { InjectionToken } from "@angular/core";

export const API_HOST_TOKEN = new InjectionToken<string>('API_HOST_TOKEN',{
    factory:() => ''
})