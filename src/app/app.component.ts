import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.models';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contactList: Contact[] = [];
  onlyFavorites: boolean = false;

  constructor(private service: ContactService) { }

  ngOnInit(): void {
    this.fetchContactList(this.onlyFavorites);
  }

  handleData(event: Contact) {
    console.log('Recieved data!', event);
  }

  createContact(event: Contact) {
    this.service.addContact(event).subscribe(() => this.fetchContactList(this.onlyFavorites))
  }

  handleUpdate(): void {
    this.fetchContactList(this.onlyFavorites);
  }

  fetchContactList(onlyFav: boolean): void {
    this.service.getContactList(onlyFav).subscribe(data => {
      this.contactList = data;
    });
  }

  toggleView(onlyFav: boolean): void {
    this.onlyFavorites = !onlyFav;
    this.fetchContactList(this.onlyFavorites);
  }
}
