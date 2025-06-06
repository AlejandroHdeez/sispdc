import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Status {

  defaultOption = {
    statusId: null,
    name: 'No definido',
    description: 'Estado no encontrado',
    message: 'Es necesario verificar el estado',
    color: 'red'
  };

  numericRequestOptions = [
    {
      enrollmentStatus: 0,
      name: 'Anulado',
      description: 'Anulado',
      color: 'red'
    },
    {
      enrollmentStatus: 1,
      name: 'En proceso',
      description: 'En proceso',
      color: 'blue'
    },
    {
      enrollmentStatus: 2,
      name: 'Finalizado',
      description: 'Finalizado',
      color: 'orange'
    },
    {
      enrollmentStatus: 3,
      name: 'Autorizado',
      description: 'Autorizado',
      color: 'green'
    },
    {
      enrollmentStatus: 4,
      name: 'Rechazado',
      description: '',
      color: 'red'
    },
    {
      enrollmentStatus: 5,
      name: 'Autorizado por CDAG',
      description: '',
      color: 'green'
    },
    {
      enrollmentStatus: 6,
      name: 'Rechazado por CDAG',
      description: '',
      color: 'red'
    }
  ];

  getOptionNumericRequestStatus() {
    return this.numericRequestOptions;
  }

  getNumericRequestStatus(id: number) {
    let status = this.numericRequestOptions.find(item => item.enrollmentStatus === id);
    return status ? status : this.defaultOption;
  }


  options = [
    {
      statusId: 0,
      name: 'Inactivo',
      description: 'Inactivo',
      message: 'Click en editar para activar',
      color: 'red'
    },
    {
      statusId: 1,
      name: 'Activo',
      description: 'Activo',
      message: '',
      color: 'green'
    },
  ];

  getOptionStatus() {
    return this.options;
  }

  getStatus(id: number) {
    let status = this.options.find(item => item.statusId === id);
    return status ? status : this.defaultOption;
  }

  // agreementsOptions = [
  //   {
  //     statusId: 0,
  //     name: 'Anulado',
  //     description: 'Anulado',
  //     message: '',
  //     color: 'red'
  //   },
  //   {
  //     statusId: 1,
  //     name: 'Creado',
  //     description: '',
  //     message: '',
  //     color: 'green'
  //   },
  //   {
  //     statusId: 2,
  //     name: 'Finalizado',
  //     description: '',
  //     message: '',
  //     color: 'blue'
  //   },
  // ];

  // getAgreementsOptions(id: number) {
  //   let status = this.agreementsOptions.find(item => item.statusId === id);
  //   return status ? status : this.defaultOption;
  // }

  pressAccreditationReqOptions = [
    {
      statusId: 0,
      name: 'Anulado',
      description: 'Anulado',
      message: 'Click en editar para activar',
      color: 'red'
    },
    {
      statusId: 1,
      name: 'Enviado',
      description: 'Enviado',
      message: 'Click en editar para activar',
      color: 'orange'
    },
    {
      statusId: 2,
      name: 'Recepcionado',
      description: 'Recepcionado',
      message: 'Click en editar para activar',
      color: 'blue'
    },
    {
      statusId: 3,
      name: 'Aprobado',
      description: '',
      message: 'Aprobado',
      color: 'green'
    },
    {
      statusId: 4,
      name: 'Rechazado',
      description: '',
      message: 'Rechazado',
      color: 'red'
    },
  ];

  gePressAccreditationReqOptions(id: number) {
    let status = this.pressAccreditationReqOptions.find(item => item.statusId === id);
    return status ? status : this.defaultOption;
  }

  congressAccreditationReqOptions = [
    {
      statusId: 0,
      name: 'Anulado',
      description: 'Anulado',
      message: 'Click en editar para activar',
      color: 'red'
    },
    {
      statusId: 1,
      name: 'Enviado',
      description: 'Enviado',
      message: 'Click en editar para activar',
      color: 'orange'
    },
    {
      statusId: 2,
      name: 'Recepcionado',
      description: 'Recepcionado',
      message: 'Click en editar para activar',
      color: 'blue'
    },
    {
      statusId: 3,
      name: 'Aprobado',
      description: '',
      message: 'Aprobado',
      color: 'green'
    },
    {
      statusId: 4,
      name: 'Rechazado',
      description: '',
      message: 'Rechazado',
      color: 'red'
    },
  ];

  geCongressAccreditationReqOptions(id: number) {
    let status = this.congressAccreditationReqOptions.find(item => item.statusId === id);
    return status ? status : this.defaultOption;
  }

  ceoAccreditationReqOptions = [
    {
      statusId: 0,
      name: 'Anulado',
      description: 'Anulado',
      message: 'Click en editar para activar',
      color: 'red'
    },
    {
      statusId: 1,
      name: 'Enviado',
      description: 'Enviado',
      message: 'Click en editar para activar',
      color: 'orange'
    },
    {
      statusId: 2,
      name: 'Recepcionado',
      description: 'Recepcionado',
      message: 'Click en editar para activar',
      color: 'blue'
    },
    {
      statusId: 3,
      name: 'Aprobado',
      description: '',
      message: 'Aprobado',
      color: 'green'
    },
    {
      statusId: 4,
      name: 'Rechazado',
      description: '',
      message: 'Rechazado',
      color: 'red'
    },
  ];

  getCeoAccreditationReqOptions(id: number) {
    let status = this.ceoAccreditationReqOptions.find(item => item.statusId === id);
    return status ? status : this.defaultOption;
  }

 accreditationOptions = [
   {
     statusId: 0,
     name: 'Inactivo',
     description: 'Inactivo',
     message: 'Click en editar para activar',
     color: 'red'
   },
   {
     statusId: 1,
     name: 'Activo',
     description: 'Activo',
     message: 'Click en editar para activar',
     color: 'orange'
   },
   {
     statusId: 3,
     name: 'Recepcionado',
     description: 'Recepcionado',
     message: 'Click en editar para activar',
     color: 'blue'
   },
   {
     statusId: 2,
     name: 'Entregado',
     description: '',
     message: 'Aprobado',
     color: 'green'
   },
   {
     statusId: 4,
     name: 'Rechazado',
     description: '',
     message: 'Rechazado',
     color: 'red'
   },
  ];

  getAccreditationOptions(id: number) {
    let status = this.accreditationOptions.find(item => item.statusId === id);
    return status ? status : this.defaultOption;
  }



  // taskOptionsCDAG = [
  //   {
  //     statusId: 0,
  //     name: 'Anulado',
  //     description: '',
  //     message: 'Click en editar para activar',
  //     color: 'red'
  //   },
  //   {
  //     statusId: 1,
  //     name: 'Asignado',
  //     description: 'Autorizar o rechazar',
  //     message: 'Click en editar para activar',
  //     color: 'green'
  //   },
  //   {
  //     statusId: 2,
  //     name: 'Finalizado',
  //     description: 'Enviado a Federación',
  //     message: 'Click en editar para activar',
  //     color: 'blue'
  //   },
  //   {
  //     statusId: 3,
  //     name: 'Rechazado',
  //     description: '',
  //     message: 'Click en editar para activar',
  //     color: 'red'
  //   },
  // ];

  // getTaskOptionsCDAG(id: number) {
  //   let status = this.taskOptionsCDAG.find(item => item.statusId === id);
  //   return status ? status : this.defaultOption;
  // }

  // appointmentOptions = [
  //   {
  //     statusId: 0,
  //     name: 'Anulado',
  //     description: 'Anulado',
  //     message: 'Click en editar para activar',
  //     color: 'red'
  //   },
  //   {
  //     statusId: 1,
  //     name: 'Creado',
  //     description: 'Creado',
  //     message: '',
  //     color: 'green'
  //   },
  //   {
  //     statusId: 2,
  //     name: 'Enviado a CE',
  //     description: 'Enviado a CE',
  //     message: '',
  //     color: 'yellow'
  //   },
  //   {
  //     statusId: 3,
  //     name: 'CDAG',
  //     description: 'CDAG',
  //     message: '',
  //     color: 'blue'
  //   },
  //   {
  //     statusId: 4,
  //     name: 'Asignado',
  //     description: 'Asignado',
  //     message: '',
  //     color: 'blue'
  //   },
  //   {
  //     statusId: 5,
  //     name: 'Recepcionada',
  //     description: 'Recepcionada',
  //     message: '',
  //     color: 'orange'
  //   },
  //   {
  //     statusId: 6,
  //     name: 'Finalizada',
  //     description: 'Finalizada',
  //     message: '',
  //     color: 'green'
  //   },
  //   {
  //     statusId: 7,
  //     name: 'Rechazada',
  //     description: 'Rechazada',
  //     message: '',
  //     color: 'red'
  //   },
  // ];

  // getAppointmentOptions(id: number) {
  //   let status = this.appointmentOptions.find(item => item.statusId === id);
  //   return status ? status : this.defaultOption;
  // };

  enrollmentDetailAthletesOptions = [
    {
      statusId: 0,
      name: 'Anulado',
      description: 'Anulado',
      message: 'Click en editar para activar',
      color: 'red'
    },
    {
      statusId: 1,
      name: 'Creado',
      description: 'Creado',
      message: '',
      color: ''
    },
    {
      statusId: 2,
      name: 'Enviado a aprobación',
      description: 'Enviado a aprobación',
      message: '',
      color: 'blue'
    },
    {
      statusId: 3,
      name: 'Aprobado',
      description: 'Aprobado',
      message: '',
      color: 'green'
    },
    {
      statusId: 4,
      name: 'Rechazado',
      description: 'Rechazado',
      message: '',
      color: 'red'
    },
  ];

  getEnrollmentDetailAthleteOptions(id: number) {
    let status = this.enrollmentDetailAthletesOptions.find(item => item.statusId === id);
    return status ? status : this.defaultOption;
  };

  enrollmentRequestOptions = [
    {
      statusId: 0,
      name: 'Anulado',
      description: 'Anulado',
      message: 'Click en editar para activar',
      color: 'red'
    },
    {
      statusId: 1,
      name: 'En proceso',
      description: 'En proceso de adición de atletas, caballallos y oficiales (staff)',
      message: '',
      color: 'green'
    },
    {
      statusId: 2,
      name: 'Finalizado',
      description: 'Solicitud finalizada.',
      message: '',
      color: 'blue'
    }
  ];

  getEnrollmentRequestOptions(id: number) {
    let status = this.enrollmentRequestOptions.find(item => item.statusId === id);
    return status ? status : this.defaultOption;
  };



}
