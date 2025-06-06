import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomDateAdapter extends NativeDateAdapter {

  override parse(value: string): Date | null {
    if (value.length === 0) {
      return null;
    }

    const [day, month, year] = value.split('/');
    if (!day || !month || !year) {
      return null;
    }

    return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  }

  override format(date: Date, displayFormat: any): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
