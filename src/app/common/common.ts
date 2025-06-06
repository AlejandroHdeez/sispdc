import { AbstractControl, FormGroup } from '@angular/forms';
import { Injectable, inject } from '@angular/core';
import { AppConfigService } from '../app.config.service';

@Injectable({
  providedIn: 'root'
})

export class Common {

  private strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  private configSrv = inject(AppConfigService);
  //   private urlAppSso = this.configSrv.getUrlAppSso();

  constructor(
  ) { }

  defaultPagination(): number[] {
    return [25, 50, 100, 500];
  }

  getStrongRegex(): RegExp {
    return this.strongRegex;
  }

  getFloatRegex(): string {
    return '^-?[0-9]\\d*(\\.\\d{1,5})?$';
  }

  getNumericRegex(): string {
    return '^[0-9]*$';
  }

  getNumbericAndStringRegex(): string {
    return '^[0-9a-zA-Z]+';
  }

  taxNumberSanitization(element: string): string {
    return element.replace(/[&\/\\#,+()$~%.'":*?<>{}" "_-]/g, '');
  }

  getAnswers(): any[] {
    return [{
      value: true,
      name: 'SI'
    },
    {
      value: false,
      name: 'NO'
    }]
  }

  group(array: any, field: any): any {
    const group: any = array.reduce(function (r: any, a: any) {
      r[a[field]!] = r[a[field]!] || [];
      r[a[field]!].push(a);
      return r;
    }, Object.create(null));
    return group;
  }

  sort(groupedData: Record<string, any[]>): Record<string, any[]> {
    return Object.keys(groupedData)
      .sort()
      .reduce((acc, key) => {
        acc[key] = groupedData[key];
        return acc;
      }, {} as Record<string, any[]>);
  }

  compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getFormData(form: FormGroup): FormData {
    const formData = new FormData();

    Object.entries(form.controls).forEach(([key, value]) => {
      formData.append(key, value.value);
    });

    return formData;
  }

  getDateUTC(data: Date | string): Date {
    const date = new Date(data);
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  }

  getAge(birthday: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }

  formatCui(text: string) {
    return text.replace(/(\d{4})(\d{5})/, '$1 $2 ');
  }

  dateFormatter(date: Date): string {
    date = new Date(date);
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

    let day = date.getDate();
    let dayWord = dias[date.getUTCDay()];
    let month = meses[date.getUTCMonth()];
    let year = date.getUTCFullYear();

    const dateText = `${day} de ${month} del ${year}`

    return dateText;
  }

  validateDocumentType(file: File, type: string): boolean {
    let types: any[] = []
    switch (type) {
      case 'file':
        types = ['application/pdf'];
        break;
      case 'image':
        types = ['image/png', 'image/jpeg'];
        break;
    }
    return types.includes(file.type)
  }

  downloadImg(partialUrl: string, filename: string) {
    // saveAs(this.configSrv.getUrlFiles + partialUrl, filename);
  }

  downloadImgBytes(bytes: any[], filename: string, type: string) {
    const image = `data:${type};base64,${bytes}`;
    // saveAs(image, filename);
  }

  calculateTotals(fields: string[], data: any[]): any {
    return fields.reduce((totals: any, field) => {
      totals[field] = data.reduce((acc, item) => acc + (item[field] || 0), 0);
      return totals;
    }, {});
  }

  capitalizeLongWords(str: string) {
    const words = str.split(' ');

    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 3) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
      }
    }

    return words.join(' ');
  }

  getMonth(monthNumber: string | number, shortName: boolean = true) {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const monthsShort = ['ene', 'feb', 'marz', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

    return shortName ? monthsShort[(Number(monthNumber) - 1)] : months[(Number(monthNumber) - 1)]
  }


  validFileTypes(fileValidTypes: any[], type: string): boolean {
    const validTypes: any = {
      pdf: ['application/pdf'], //pdf files
      image: ['image/png', 'image/jpeg'], //image files
      excel: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'], //excel files
      word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] //word files
    }

    for (const fileType of fileValidTypes) {
      if (validTypes[fileType] && validTypes[fileType].includes(type)) {
        return true; // Valid file type found
      }
    }
    return false; // Type not found in any valid file type array
  }

  viewBlobImage(blob: Blob) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      //   Swal.fire({
      //     html: `<img src="${e.target.result}" width="450" onerror="this.src='./assets/images/no_image.png'">`,
      //     confirmButtonText: "Cerrar",
      //   });
    };
    reader.readAsDataURL(blob);
  }

  getMonths(): any[] {
    return [
      {
        month: "enero",
        monthNumber: 1
      },
      {
        month: "febrero",
        monthNumber: 2
      },
      {
        month: "marzo",
        monthNumber: 3
      },
      {
        month: "abril",
        monthNumber: 4
      },
      {
        month: "mayo",
        monthNumber: 5
      },
      {
        month: "junio",
        monthNumber: 6
      },
      {
        month: "julio",
        monthNumber: 7
      },
      {
        month: "agosto",
        monthNumber: 8
      },
      {
        month: "septiembre",
        monthNumber: 9
      },
      {
        month: "octubre",
        monthNumber: 10
      },
      {
        month: "noviembre",
        monthNumber: 11
      },
      {
        month: "diciembre",
        monthNumber: 12
      },
    ]
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  updateErrorMessage(fieldname: string, control: AbstractControl, rules: any) {
    let obj = rules[fieldname];
    for (let index = 0; index < obj.validators.length; index++) {
      let element = obj.validators[index];
      if (control?.hasError(element.type) && (control?.dirty || control?.touched)) {
        obj.message = element.message;
        break;
      }
    }
  }

  roundNumber(value: number): number {
    return Math.round(value);
  }

  pdfViewWindow(blob: Blob): string {
    const url = window.URL.createObjectURL(blob);
    if (!url) {
      alert('Error: No se pudo generar la URL para el archivo.');
      return '';
    }

    const windowWidth = 700;
    const windowHeight = 600;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const left = (screenWidth / 2) - (windowWidth / 2);
    const top = (screenHeight / 2) - (windowHeight / 2);

    const viewer = window.open('', '_blank', `width=${windowWidth},height=${windowHeight},top=${top},left=${left}`);
    if (viewer) {
      viewer.document.write(`
        <html>
          <head>
          </head>
          <body style="margin:0">
            <iframe src="${url}" frameborder="0" style="width:100%;height:100%"></iframe>
          </body>
        </html>
      `);
    } else {
      alert('Error: No se pudo abrir la ventana del visor.');
    }

    return url;
  }

}
