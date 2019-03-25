import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('updateText') updateText: ElementRef;

  membersRef: AngularFireList<any>;
  members$: Observable<any[]>;

  newMemberX: string = '';
  editMemberX: boolean = false;
  editId: number;

  constructor(public db: AngularFireDatabase) {
    this.membersRef = db.list('/messages');
    this.loadMembers(false);
  }

  addMember(newName: string) {
    this.membersRef.push({ text: newName });
    this.newMemberX = '';
  }

  editMember(i) {
    this.editMemberX = true;
    this.editId = i;
    setTimeout( () => this.updateText.nativeElement.focus());
  }

  updateMember(key: string, newText: string) {
    this.membersRef.update(key, { text: newText });
    this.editMemberX = false;
  }

  deleteMember(key: string) {
    if(confirm('R u sure u wanna delete this?!'))
      this.membersRef.remove(key);
  }

  loadMembers(filterX) {
    // Use snapshotChanges().map() to store the key
    this.members$ = this.membersRef.snapshotChanges().pipe(
      map(changes => {
        //filter Members X-Team 
        changes = (filterX) ?
          changes.filter(changes => changes.payload.val().text.toLowerCase().includes(filterX.toLowerCase())) :
          changes;
        // Sort Alphabetical X-Team
        changes = changes.sort((a, b) => a.payload.val().text.toLowerCase() < b.payload.val().text.toLowerCase() ? -1 : 1);
        // key and value X-Team
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

}