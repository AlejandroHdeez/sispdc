import { PdfMakeWrapper, Columns, Table, Txt, Stack, Img, Cell } from 'pdfmake-wrapper';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { AppConfigService } from '@app/app.config.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PdfStyles } from '@common/pdf-styles';
import { Status } from '@common/status';
import { Common } from '@common/common';
import { Company } from '@models/company.model';
import { Colaborator } from '@models/colaborator.model';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
(pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;

@Injectable({
    providedIn: 'root',
})
export class Report {
    logo = this.configSrv.logo;

    pageSize = 'LETTER';
    pageMargins = 30;
    form: any;

    constructor(
        public configSrv: AppConfigService,
        private pdfStyles: PdfStyles,
        private status: Status,
        public common: Common
    ) { }

    async print(colaborators: any[], company: Company) {
        const docName = `Colaboradores - ${company.comercialName}`;
        const pdf = new PdfMakeWrapper();

        pdf.pageSize(this.pageSize);
        pdf.pageOrientation('portrait');
        pdf.pageMargins([15, 10, 15, 50]);

        pdf.add(
            new Table([
                [
                    new Cell(
                        new Columns([
                            new Table([
                                [
                                    new Cell(
                                        new Columns([await new Img(this.logo).style('content').alignment('right').width(90).margin([0, 0, 0, 0]).build(),]).end,
                                    ).border([false, false, false, false]).margin([0, 0, 60, 0]).end,
                                ],
                            ]).widths(['100%']).margin([10, 5, 10, 10]).end,
                        ]).end,
                    ).border([false, false, false, false]).end,
                    new Cell(
                        new Columns([
                            new Table([
                                [
                                    new Cell(
                                        new Columns([new Txt('SISPDC').style('tableHeader').color('#1e2a51').alignment('center').margin([0, 0, 0, 0]).fontSize(10).end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                                [
                                    new Cell(
                                        new Columns([new Txt(`COLABORADORES`).style('tableHeader').color('#1e2a51').alignment('center').margin([0, 0, 0, 0]).fontSize(10).bold().end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                                [
                                    new Cell(
                                        new Columns([new Txt(`EMPRESA: ${company.comercialName.toUpperCase()}`).style('tableHeader').color('#1e2a51').alignment('center').margin([0, 0, 0, 0]).fontSize(10).bold().end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                            ]).widths(['100%']).margin([35, 30, 5, 10]).end,
                        ]).end,
                    ).border([false, false, false, false]).end,
                    new Cell(
                        new Columns([
                            new Table([
                                [
                                    new Cell(
                                        new Columns([new Txt(``).style('subtitleRightBold').margin([0, 20, 0, 0]).end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                            ]).widths(['100%']).margin([10, 5, 0, 0]).end,
                        ]).end,
                    ).border([false, false, false, false]).end,
                ],
            ])
                .color('#000')
                .margin([0, 5, 0, 0])
                .widths(['10%', '80%', '10%'])
                .end
        );

        if (colaborators.length) {

            const body = [];
            const header = [
                { text: 'Nombre completo', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Edad', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Telefono', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: ' Correo electrónico', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
            ];

            body.push(header);

            for (const colaborator of colaborators) {

                const item = [
                    { text: colaborator.fullname || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.age || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.phoneNumber || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.email || 'No definido', style: 'detalle', alignment: 'center' },
                ];
                body.push(item);
            }

            pdf.add(
                new Table(body).headerRows(1).lineHeight(1.2).style('estiloTabla').color('#444').margin([0, 6, 0, 0]).fontSize(9).alignment('center')
                    .widths(['35%', '20%', '20%', '25%']).end
            );

            pdf.add(
                pdf.ln(1)
            );
        }

        pdf.footer(
            (pagenumber: number, pagecount: number) => {
                return new Stack(
                    [
                        new Txt('Página ' + pagenumber + ' de ' + pagecount + ' - Generado ' + formatDate(new Date(), 'dd/MM/yyyy hh:mm:ss a', 'en-US')).style('detalle').alignment('center').fontSize(9).margin([0, 2]).end,
                    ]
                ).end;
            }
        );

        pdf.styles(this.getStyles());
        pdf.create().download(docName.replaceAll(' ', '_'));
    }

    async printCompanies(companies: any[]) {
        const docName = `Empresas`;
        const pdf = new PdfMakeWrapper();

        pdf.pageSize(this.pageSize);
        pdf.pageOrientation('landscape');
        pdf.pageMargins([15, 10, 15, 50]);

        pdf.add(
            new Table([
                [
                    new Cell(
                        new Columns([
                            new Table([
                                [
                                    new Cell(
                                        new Columns([await new Img(this.logo).style('content').alignment('right').width(90).margin([0, 0, 0, 0]).build(),]).end,
                                    ).border([false, false, false, false]).margin([0, 0, 60, 0]).end,
                                ],
                            ]).widths(['100%']).margin([10, 5, 10, 10]).end,
                        ]).end,
                    ).border([false, false, false, false]).end,
                    new Cell(
                        new Columns([
                            new Table([
                                [
                                    new Cell(
                                        new Columns([new Txt('SISPDC').style('tableHeader').color('#1e2a51').alignment('center').margin([0, 0, 0, 0]).fontSize(10).end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                                [
                                    new Cell(
                                        new Columns([new Txt(`EMPRESAS`).style('tableHeader').color('#1e2a51').alignment('center').margin([0, 0, 0, 0]).fontSize(10).bold().end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                            ]).widths(['100%']).margin([35, 30, 5, 10]).end,
                        ]).end,
                    ).border([false, false, false, false]).end,
                    new Cell(
                        new Columns([
                            new Table([
                                [
                                    new Cell(
                                        new Columns([new Txt(``).style('subtitleRightBold').margin([0, 20, 0, 0]).end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                            ]).widths(['100%']).margin([10, 5, 0, 0]).end,
                        ]).end,
                    ).border([false, false, false, false]).end,
                ],
            ])
                .color('#000')
                .margin([0, 5, 0, 0])
                .widths(['10%', '80%', '10%'])
                .end
        );

        if (companies.length) {

            const body = [];
            const header = [
                { text: 'País', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Departamento', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Municipio', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'NIT', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Nombre Comercial', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Razon Social', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Correo electrónico', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Telefono', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
            ];

            body.push(header);

            for (const colaborator of companies) {

                const item = [
                    { text: colaborator.nameCountry || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.nameDepartment || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.nameMunicipality || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.nit || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.comercialName || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.socialReason || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.email || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.phoneNumber || 'No definido', style: 'detalle', alignment: 'center' },
                ];
                body.push(item);
            }

            pdf.add(
                new Table(body).headerRows(1).lineHeight(1.2).style('estiloTabla').color('#444').margin([0, 6, 0, 0]).fontSize(9).alignment('center')
                    .widths(['10%', '10%', '10%', '10%', '20%', '15%', '15%', '10%']).end
            );

            pdf.add(
                pdf.ln(1)
            );
        }

        pdf.footer(
            (pagenumber: number, pagecount: number) => {
                return new Stack(
                    [
                        new Txt('Página ' + pagenumber + ' de ' + pagecount + ' - Generado ' + formatDate(new Date(), 'dd/MM/yyyy hh:mm:ss a', 'en-US')).style('detalle').alignment('center').fontSize(9).margin([0, 2]).end,
                    ]
                ).end;
            }
        );

        pdf.styles(this.getStyles());
        pdf.create().download(docName.replaceAll(' ', '_'));
    }

    async printColaborators(colaborators: any[], companies: any[]) {
        const docName = `Colaboradores`;
        const pdf = new PdfMakeWrapper();

        pdf.pageSize(this.pageSize);
        pdf.pageOrientation('portrait');
        pdf.pageMargins([15, 10, 15, 50]);

        pdf.add(
            new Table([
                [
                    new Cell(
                        new Columns([
                            new Table([
                                [
                                    new Cell(
                                        new Columns([await new Img(this.logo).style('content').alignment('right').width(90).margin([0, 0, 0, 0]).build(),]).end,
                                    ).border([false, false, false, false]).margin([0, 0, 60, 0]).end,
                                ],
                            ]).widths(['100%']).margin([10, 5, 10, 10]).end,
                        ]).end,
                    ).border([false, false, false, false]).end,
                    new Cell(
                        new Columns([
                            new Table([
                                [
                                    new Cell(
                                        new Columns([new Txt('SISPDC').style('tableHeader').color('#1e2a51').alignment('center').margin([0, 0, 0, 0]).fontSize(10).end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                                [
                                    new Cell(
                                        new Columns([new Txt(`COLABORADORES`).style('tableHeader').color('#1e2a51').alignment('center').margin([0, 0, 0, 0]).fontSize(10).bold().end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                            ]).widths(['100%']).margin([35, 30, 5, 10]).end,
                        ]).end,
                    ).border([false, false, false, false]).end,
                    new Cell(
                        new Columns([
                            new Table([
                                [
                                    new Cell(
                                        new Columns([new Txt(``).style('subtitleRightBold').margin([0, 20, 0, 0]).end,]).end,
                                    ).border([false, false, false, false]).end,
                                ],
                            ]).widths(['100%']).margin([10, 5, 0, 0]).end,
                        ]).end,
                    ).border([false, false, false, false]).end,
                ],
            ])
                .color('#000')
                .margin([0, 5, 0, 0])
                .widths(['10%', '80%', '10%'])
                .end
        );

        if (colaborators.length) {

            const body = [];
            const header = [
                { text: 'Empresa(s)', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Nombre completo', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Edad', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: 'Telefono', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
                { text: ' Correo electrónico', style: 'tableSubHeader', fillColor: '#1e2a51', color: '#FFFFFF', alignment: 'center', bold: true },
            ];

            body.push(header);

            for (const colaborator of colaborators) {
                const companyNames = this.getCompanyNames(colaborator.companyIds, companies)?.join(', ') || 'No definido';

                const item = [
                    { text: companyNames, style: 'detalle', alignment: 'center' },
                    { text: colaborator.fullname || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.age || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.phoneNumber || 'No definido', style: 'detalle', alignment: 'center' },
                    { text: colaborator.email || 'No definido', style: 'detalle', alignment: 'center' },
                ];
                body.push(item);
            }

            pdf.add(
                new Table(body).headerRows(1).lineHeight(1.2).style('estiloTabla').color('#444').margin([0, 6, 0, 0]).fontSize(9).alignment('center')
                    .widths(['30%', '20%', '10%', '20%', '20%'])
                    .end
            );

            pdf.add(
                pdf.ln(1)
            );
        }

        pdf.footer(
            (pagenumber: number, pagecount: number) => {
                return new Stack(
                    [
                        new Txt('Página ' + pagenumber + ' de ' + pagecount + ' - Generado ' + formatDate(new Date(), 'dd/MM/yyyy hh:mm:ss a', 'en-US')).style('detalle').alignment('center').fontSize(9).margin([0, 2]).end,
                    ]
                ).end;
            }
        );

        pdf.styles(this.getStyles());
        pdf.create().download(docName.replaceAll(' ', '_'));
    }

    getCompanyNames(ids: number[], companies: any): string[] {
        return companies
            .filter((company: any) => ids.includes(company.id))
            .map((company: any) => company.comercialName);
    }


    getStyles() {
        return this.pdfStyles.getPdfStyles();
    }

}

