import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  error(error: Error) {
    console.error(error.message ? `Error: ${error.message}` : 'Unknown Error', error);
  }
}
