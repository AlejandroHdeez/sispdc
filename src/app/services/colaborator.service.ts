import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Colaborator } from '@models/colaborator.model';
import { from, Observable } from 'rxjs';

interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T | null;
}

@Injectable({
  providedIn: 'root'
})
export class ColaboratorService {
  private firestore: Firestore = inject(Firestore);

  getAll(): Observable<Colaborator[]> {
    const ref = collection(this.firestore, 'colaboradores');
    return collectionData(ref, { idField: 'id' }) as Observable<Colaborator[]>;
  }

  add(colaborator: Omit<Colaborator, 'id'>): Observable<ApiResponse<{ id: string }>> {
    const ref = collection(this.firestore, 'colaboradores');
    return from(
      addDoc(ref, colaborator)
        .then((docRef: any) => ({
          status: true,
          message: 'Colaborador agregado correctamente',
          data: { id: docRef.id }
        }))
        .catch((err): ApiResponse<{ id: string }> => ({
          status: false,
          message: 'Error al agregar colaborador',
          data: null
        }))
    );
  }

  update(id: string, colaborator: Partial<Colaborator>): Observable<ApiResponse<null>> {
    const docRef = doc(this.firestore, `colaboradores/${id}`);
    return from(
      updateDoc(docRef, colaborator)
        .then(() => ({
          status: true,
          message: 'Colaborador actualizado correctamente',
          data: null
        }))
        .catch((err): ApiResponse<null> => ({
          status: false,
          message: 'Error al actualizar colaborador',
          data: null
        }))
    );
  }


  delete(id: string): Observable<ApiResponse<null>> {
    const docRef = doc(this.firestore, `colaboradores/${id}`);
    return from(
      deleteDoc(docRef)
        .then(() => ({
          status: true,
          message: 'Colaborador eliminado correctamente',
          data: null
        }))
        .catch((err): ApiResponse<null> => ({
          status: false,
          message: 'Error al eliminar colaborador',
          data: null
        }))
    );
  }

}
