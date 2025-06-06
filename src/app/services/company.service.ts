import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Company } from '@models/company.model';
import { from, Observable } from 'rxjs';

interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T | null;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private firestore: Firestore = inject(Firestore);

  getAll(): Observable<Company[]> {
    const ref = collection(this.firestore, 'empresas');
    return collectionData(ref, { idField: 'id' }) as Observable<Company[]>;
  }

  add(company: Omit<Company, 'id'>): Observable<ApiResponse<{ id: string }>> {
    const ref = collection(this.firestore, 'empresas');
    return from(
      addDoc(ref, company)
        .then((docRef: any) => ({
          status: true,
          message: 'Empresa agregada correctamente',
          data: { id: docRef.id }
        }))
        .catch((err): ApiResponse<{ id: string }> => ({
          status: false,
          message: 'Error al agregar empresa',
          data: null
        }))
    );
  }

  update(id: string, company: Partial<Company>): Observable<ApiResponse<null>> {
    const docRef = doc(this.firestore, `empresas/${id}`);
    return from(
      updateDoc(docRef, company)
        .then(() => ({
          status: true,
          message: 'Empresa actualizada correctamente',
          data: null
        }))
        .catch((err): ApiResponse<null> => ({
          status: false,
          message: 'Error al actualizar empresa',
          data: null
        }))
    );
  }


  delete(id: string): Observable<ApiResponse<null>> {
    const docRef = doc(this.firestore, `empresas/${id}`);
    return from(
      deleteDoc(docRef)
        .then(() => ({
          status: true,
          message: 'Empresa eliminada correctamente',
          data: null
        }))
        .catch((err): ApiResponse<null> => ({
          status: false,
          message: 'Error al eliminar empresa',
          data: null
        }))
    );
  }

}
