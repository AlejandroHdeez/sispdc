import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    collection,
    collectionData,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
} from '@angular/fire/firestore';
import { Municipality } from '@models/municipality.model';
import { from, Observable } from 'rxjs';

interface ApiResponse<T = any> {
    status: boolean;
    message: string;
    data: T | null;
}

@Injectable({
    providedIn: 'root'
})
export class MunicipalityService {
    private firestore: Firestore = inject(Firestore);

    getAll(): Observable<Municipality[]> {
        const ref = collection(this.firestore, 'municipios');
        return collectionData(ref, { idField: 'id' }) as Observable<Municipality[]>;
    }

    getByDepartment(departamentoId: string): Observable<Municipality[]> {
        const ref = collection(this.firestore, 'municipios');
        const q = query(ref, where('departamentoId', '==', departamentoId));
        return collectionData(q, { idField: 'id' }) as Observable<Municipality[]>;
    }

    add(municipality: Omit<Municipality, 'id'>): Observable<ApiResponse<{ id: string }>> {
        const ref = collection(this.firestore, 'municipios');
        return from(
            addDoc(ref, municipality)
                .then((docRef: any) => ({
                    status: true,
                    message: 'Municipio agregado correctamente',
                    data: { id: docRef.id }
                }))
                .catch((err): ApiResponse<{ id: string }> => ({
                    status: false,
                    message: 'Error al agregar municipio',
                    data: null // Aquí forzamos a null para que coincida con ApiResponse
                }))
        );
    }

    update(id: string, municipality: Partial<Municipality>): Observable<ApiResponse<null>> {
        const docRef = doc(this.firestore, `municipios/${id}`);
        return from(
            updateDoc(docRef, municipality)
                .then(() => ({
                    status: true,
                    message: 'Municipio actualizado correctamente',
                    data: null
                }))
                .catch((err): ApiResponse<null> => ({
                    status: false,
                    message: 'Error al actualizar municipio',
                    data: null
                }))
        );
    }


    deleteMunicipality(id: string): Observable<ApiResponse<null>> {
        const docRef = doc(this.firestore, `municipios/${id}`);
        return from(
            deleteDoc(docRef)
                .then(() => ({
                    status: true,
                    message: 'Municipio eliminado correctamente',
                    data: null
                }))
                .catch((err): ApiResponse<null> => ({
                    status: false,
                    message: 'Error al eliminar municipio',
                    data: null
                }))
        );
    }

}
