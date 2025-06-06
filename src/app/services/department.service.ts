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
import { Department } from '@models/department.model';
import { from, Observable } from 'rxjs';

interface ApiResponse<T = any> {
    status: boolean;
    message: string;
    data: T | null;
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private firestore: Firestore = inject(Firestore);

    getAll(): Observable<Department[]> {
        const ref = collection(this.firestore, 'departamentos');
        return collectionData(ref, { idField: 'id' }) as Observable<Department[]>;
    }

    getByCountry(paisId: string): Observable<Department[]> {
        const ref = collection(this.firestore, 'departamentos');
        const q = query(ref, where('paisId', '==', paisId));
        return collectionData(q, { idField: 'id' }) as Observable<Department[]>;
    }

    add(department: Omit<Department, 'id'>): Observable<ApiResponse<{ id: string }>> {
        const ref = collection(this.firestore, 'departamentos');
        return from(
            addDoc(ref, department)
                .then((docRef: any) => ({
                    status: true,
                    message: 'Departamento agregado correctamente',
                    data: { id: docRef.id }
                }))
                .catch((err): ApiResponse<{ id: string }> => ({
                    status: false,
                    message: 'Error al agregar departamento',
                    data: null // Aquí forzamos a null para que coincida con ApiResponse
                }))
        );
    }

    update(id: string, department: Partial<Department>): Observable<ApiResponse<null>> {
        const docRef = doc(this.firestore, `departamentos/${id}`);
        return from(
            updateDoc(docRef, department)
                .then(() => ({
                    status: true,
                    message: 'Departamento actualizado correctamente',
                    data: null
                }))
                .catch((err): ApiResponse<null> => ({
                    status: false,
                    message: 'Error al actualizar departamento',
                    data: null
                }))
        );
    }


    deleteDepartment(id: string): Observable<ApiResponse<null>> {
        const docRef = doc(this.firestore, `departamentos/${id}`);
        return from(
            deleteDoc(docRef)
                .then(() => ({
                    status: true,
                    message: 'Departamento eliminado correctamente',
                    data: null
                }))
                .catch((err): ApiResponse<null> => ({
                    status: false,
                    message: 'Error al eliminar departamento',
                    data: null
                }))
        );
    }

}
