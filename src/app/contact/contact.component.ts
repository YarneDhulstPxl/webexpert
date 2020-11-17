import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Contact } from '../models/contact.models';
import { ContactService } from '../services/contact.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

    @Input() contact: Contact;
    @Output() onUpdate: EventEmitter<any> = new EventEmitter();

    name: string;
    email: string;
    phone: string;
    isFavorite: boolean = false;

    constructor(private service: ContactService) { }

    ngOnInit() {
        this.name = 'John Doe';
        this.email = 'john.doe@gmail.com';
        this.phone = '011642839';
    }

    onClick() : void {
        console.log('Button clicked. Status van favorite is:' + this.isFavorite);
    }

    toggleFavorite(id: string, isFavorite: boolean): void {
        this.service.updateContact(id, {isFavorite: isFavorite}).subscribe(() => this.onUpdate.emit());
    }
}