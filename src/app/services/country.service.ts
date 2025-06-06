import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Country } from '@models/country.model';
import { from, Observable } from 'rxjs';

interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T | null;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private firestore: Firestore = inject(Firestore);

  getCountries(): Observable<Country[]> {
    const ref = collection(this.firestore, 'paises');
    return collectionData(ref, { idField: 'id' }) as Observable<Country[]>;
  }

  addCountry(country: Omit<Country, 'id'>): Observable<ApiResponse<{ id: string }>> {
    const ref = collection(this.firestore, 'paises');
    return from(
      addDoc(ref, country)
        .then((docRef: any) => ({
          status: true,
          message: 'País agregado correctamente',
          data: { id: docRef.id }
        }))
        .catch((err): ApiResponse<{ id: string }> => ({
          status: false,
          message: 'Error al agregar país',
          data: null
        }))
    );
  }

  updateCountry(id: string, country: Partial<Country>): Observable<ApiResponse<null>> {
    const docRef = doc(this.firestore, `paises/${id}`);
    return from(
      updateDoc(docRef, country)
        .then(() => ({
          status: true,
          message: 'País actualizado correctamente',
          data: null
        }))
        .catch((err): ApiResponse<null> => ({
          status: false,
          message: 'Error al actualizar país',
          data: null
        }))
    );
  }


  deleteCountry(id: string): Observable<ApiResponse<null>> {
    const docRef = doc(this.firestore, `paises/${id}`);
    return from(
      deleteDoc(docRef)
        .then(() => ({
          status: true,
          message: 'País eliminado correctamente',
          data: null
        }))
        .catch((err): ApiResponse<null> => ({
          status: false,
          message: 'Error al eliminar país',
          data: null
        }))
    );
  }

}
