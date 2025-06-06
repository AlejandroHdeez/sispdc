import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public exportReportAsExcelFile(json: any[], excelFileName: string, sheetName: string, merge: any[], columnWidths: any[] = []): void {
    /* generate worksheet */
    var ws = XLSX.utils.aoa_to_sheet(json);

    /* add merges */
    ws["!merges"] = merge;

    // Apply the column widths
    ws['!cols'] = columnWidths;

    /* generate workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    /* generate file and download */
    const excelBuffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public exportMultipleSheetAsExcelFile(sheets: any[], excelFileName: string): void {

    let wb = XLSX.utils.book_new();

    sheets.forEach(sheet => {

      /* generate worksheet */
      let ws = XLSX.utils.json_to_sheet(sheet.json);

      /* generate workbook */
      XLSX.utils.book_append_sheet(wb, ws, sheet.sheetName);
    })

    /* generate file and download */
    const excelBuffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
