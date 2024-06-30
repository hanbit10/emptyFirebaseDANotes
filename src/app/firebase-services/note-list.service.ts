import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class NoteListService {
  items$;
  items;
  firestore: Firestore = inject(Firestore);
  unsubList;
  unsubSingle;

  constructor() {
    this.items$ = collectionData(this.getNotesRef());
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach((element) => {
        console.log(this.setNoteObject(element.data(), element.id));
      });
    });

    this.unsubSingle = onSnapshot(
      this.getSingleDocRef('notes', 'v6uTLZiR6mXqnSX0WfPl'),
      (element) => {}
    );

    this.unsubSingle();
    this.unsubList();

    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach((element) => {
        console.log(element);
      });
    });
  }

  ngOnDestroy() {
    this.items.unsubscribe();
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || '',
      type: obj.type || 'note',
      title: obj.title || '',
      content: obj.content || '',
      marked: obj.marked || false,
    };
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }
  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
