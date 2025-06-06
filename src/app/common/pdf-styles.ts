import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PdfStyles {

    styles = {
        tableStyle: {
            fontSize: 10,
            alignment: 'center',
            padding: [5, 10],
            valign: 'middle',
        },
        tableHeader: {
            fontSize: 12,
            bold: true,
            alignment: 'center',
            padding: [5, 10],
        },
        tableHeaderMin: {
            fontSize: 8,
            bold: true,
            alignment: 'center',
            padding: [5, 10],
        },
        header: {
            fontSize: 12,
            bold: true,
            alignment: 'center',
            color: 'black'
        },
        header2: {
            fontSize: 11,
            bold: true,
            alignment: 'center',
            color: 'black'
        },
        title: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            color: 'black'
        },
        titleLeft: {
            fontSize: 14,
            bold: true,
            alignment: 'left',
            color: 'black'
        },
        titleLeft2: {
            fontSize: 18,
            bold: true,
            alignment: 'left',
            color: 'black'
        },
        subtitle: {
            fontSize: 12,
            bold: true,
            alignment: 'center',
            color: 'black'
        },
        subtitle1: {
            fontSize: 10,
            bold: true,
            alignment: 'left',
            color: 'black'
        },
        subtitle2: {
            fontSize: 9,
            bold: true,
            alignment: 'left',
            color: 'black'
        },
        subtitleLeft: {
            fontSize: 10,
            alignment: 'left',
            color: 'black'
        },
        subtitleLeftVE: {
            fontSize: 8,
            alignment: 'left',
            color: 'black'
        },
        subtitleLeftBold: {
            fontSize: 10,
            alignment: 'left',
            bold: true,
            color: 'black'
        },
        subtitleRight: {
            fontSize: 10,
            alignment: 'right',
            color: 'black'
        },
        subtitleRightBold: {
            fontSize: 10,
            alignment: 'right',
            color: 'black',
            bold: true
        },
        titleCenterDetail: {
            fontSize: 12,
            alignment: 'center',
            color: 'black',
            bold: true
        },
        titleCenterDetailBlue: {
            fontSize: 14,
            alignment: 'center',
            color: 'black',
            bold: true
        },
        subtitleRightBlueSmall: {
            fontSize: 8,
            alignment: 'right',
            color: 'black'
        },
        subtitleCenterBlueSmall: {
            fontSize: 8,
            alignment: 'center',
            color: 'black'
        },
        subtitleJustifyBlueSmall: {
            fontSize: 8,
            alignment: 'justify',
            color: 'black'
        },
        subtitleCenter: {
            fontSize: 10,
            alignment: 'center',
            color: 'black',
            bold: false
        },
        subtitleCenterBlue: {
            fontSize: 10,
            alignment: 'center',
            color: 'black',
            bold: false
        },
        subtitleCenterBlueGray: {
            fontSize: 10,
            alignment: 'center',
            color: 'black',
            bold: false
        },
        subtitleCenterValorationSmall: {
            fontSize: 8,
            alignment: 'center',
            color: 'black',
            bold: false
        },
        subtitleCenterBold: {
            fontSize: 10,
            alignment: 'center',
            color: 'black',
            bold: true
        },
        subtitleCenterBlueBold: {
            fontSize: 10,
            alignment: 'center',
            color: 'black',
            bold: true
        },
        subtitleCenterValoration: {
            fontSize: 28,
            alignment: 'center',
            color: 'red',
            bold: true
        },
        contentMiddle: {
            fontSize: 9,
            bold: false,
            color: 'black'
        },
        content: {
            fontSize: 8,
            bold: false,
            color: 'black'
        },
        contentSmall: {
            fontSize: 7,
            bold: false,
            color: 'black'
        },
        contentFooter: {
            fontSize: 7,
            bold: false,
            color: 'black',
            alignment: 'center',
        },
        contentLeftVE: {
            fontSize: 8,
            alignment: 'left',
            color: 'black'
        },
        contentLeft: {
            fontSize: 10,
            alignment: 'left',
            color: 'black'
        },
        contentLeftBold: {
            fontSize: 10,
            alignment: 'left',
            color: 'black',
            bold: true
        },
        contentJustify: {
            fontSize: 10,
            alignment: 'justify',
            color: 'black'
        },
        contentJustifyVE: {
            fontSize: 8,
            alignment: 'justify',
            color: 'black'
        },
        contentJustifyBold: {
            fontSize: 10,
            alignment: 'justify',
            color: 'black',
            bold: true
        },
        contentCenter: {
            fontSize: 10,
            alignment: 'center',
            color: 'black'
        },
        contentVE: {
            fontSize: 8,
            alignment: 'center',
            color: 'black'
        },
        contentCenterBold: {
            fontSize: 10,
            alignment: 'center',
            color: 'black',
            bold: true
        },
        contentRight: {
            fontSize: 10,
            alignment: 'right',
            color: 'black'
        },
        contentSubtitle: {
            fontSize: 10,
            alignment: 'left',
            color: 'black',
            bold: true,
        },
        contentRightLiquidation: {
            fontSize: 8,
            alignment: 'right',
            color: 'black'
        },
        contentCenterLiquidation: {
            fontSize: 8,
            alignment: 'center',
            color: 'black'
        },
        contentCenterLiquidationBold: {
            fontSize: 8,
            alignment: 'center',
            color: 'black',
            bold: true,
        },
        contentLeftLiquidation: {
            fontSize: 8,
            alignment: 'left',
            color: 'black'
        },
        contentLeftLiquidationBold: {
            fontSize: 8,
            alignment: 'left',
            color: 'black',
            bold: true
        },
        contentJustifyLiquidation: {
            fontSize: 8,
            alignment: 'justify',
            color: 'black'
        },
        contentJustifyLiquidationBold: {
            fontSize: 8,
            alignment: 'justify',
            color: 'black',
            bold: true
        },
        normal: {
            fontSize: 12,
            bold: false,
            color: 'black'
        },
        pageNumber: {
            fontSize: 8,
            color: 'black'
        },
        table: {
            margin: 0,
            alignment: 'center',
            color: '#444'
        },
        justify: {
            fontSize: 12,
            bold: false,
            alignment: 'justify'
        },
        center: {
            fontSize: 12,
            bold: true,
            alignment: 'center'
        },
        left: {
            fontSize: 12,
            bold: true,
            alignment: 'left'
        },
        right: {
            fontSize: 12,
            bold: true,
            alignment: 'right'
        }
    };

    getPdfStyles(): any {
        return this.styles;
    }

    stylesDetail = {
        rotatedText: {
            rotation: 90
        },
        header: {
            fontSize: 14,
            bold: true,
            alignment: 'center'
        },
        justificado: {
            fontSize: 12,
            alignment: 'justify'
        },
        centrar: {
            fontSize: 12,
            bold: true,
            alignment: 'center'
        },
        izquierda: {
            fontSize: 12,
            bold: true,
            alignment: 'left'
        },
        derecha: {
            fontSize: 12,
            bold: true,
            alignment: 'right'
        },
        subheader: {
            fontSize: 12,
            bold: true
        },
        estiloTabla: {
            margin: 0
        },
        tableHeader: {
            bold: true,
            fontSize: 10,
            color: 'black'
        },
        tableHeader2: {
            bold: true,
            fontSize: 8,
            color: 'black'
        },
        tableHeaderTravel: {
            bold: true,
            fontSize: 11,
            alignment: 'center',
            color: 'red'
        },
        rotation: {
            fontSize: 800,
            rotation: -45,
        },
        tableSubHeader: {
            bold: true,
            fontSize: 9,
            color: 'black'
        },
        detalleMin: {
            fontSize: 6
        },
        detalle: {
            fontSize: 8
        },
        detalleParent: {
            fontSize: 8,
            fillColor: '#F3F3F3'
        },  // pageSize = 'LEGAL';
        // pageMargins = 30;
        red: {
            bold: true,
            fontSize: 10,
            color: 'red'
        },
        bold: {
            bold: true,
            fontSize: 12
        },
        boldSmall: {
            bold: true,
            fontSize: 10
        },
        headerMedium: {
            fontSize: 18,
            bold: true,
            alignment: 'center'
        },
        tableSubHeaderMedium: {
            bold: true,
            fontSize: 15,
            color: 'black'
        },
        detalleMedium: {
            fontSize: 10
        },
    };

    getPdfStylesDetail(): any {
        return this.stylesDetail;
    }

    getStyle(margin: number[], alignment: string) {
        let style = {
            defaultStyles: {
                li: {
                    margin: margin
                },
                p: {
                    margin: margin,
                    alignment: alignment,
                    fontSize: 10
                }
            }
        }
        return style;
    }
}
