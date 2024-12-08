import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../../../core/services/books.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table'; 
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { SortEvent } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [TableModule, ReactiveFormsModule, ButtonModule, InputTextModule, CommonModule , RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  providers: [MessageService]
})
export class AdminLayoutComponent implements OnInit {
  books: any[] = []; 
  isEditMode: boolean = false;
  currentBookId: string | null = null;

  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    category: new FormControl('', Validators.required),
    rating: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(
    private booksService: BooksService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getBooks(); 
  }

  getBooks() {
    this.booksService.getBooks().subscribe((data: any) => {
      this.books = data.products; 
    });
  }

  onSubmit() {
    const bookData = this.bookForm.value;
  
    bookData.price = parseFloat(bookData.price);
    bookData.rating = parseFloat(bookData.rating);
    bookData.stock = parseInt(bookData.stock, 10);

    if (this.isEditMode && this.currentBookId) {
      this.booksService.updateBook(this.currentBookId, bookData).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Book updated successfully!' });
        this.resetForm();
        this.getBooks();
      });
    }
     else {
      this.booksService.addBook(bookData).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Book added successfully!' });
        this.resetForm();
        this.getBooks(); 

        console.log('added')
      });
    }
  }

  onEdit(book: any) {
    this.isEditMode = true;
    this.currentBookId = book.id;
    book.price = parseFloat(book.price);
    book.rating = parseFloat(book.rating);
    book.stock = parseInt(book.stock, 10);
    this.bookForm.patchValue(book);
    console.log('edit')
  }

  resetForm() {
    this.isEditMode = false;
    this.currentBookId = null;
    this.bookForm.reset();
    console.log('edit done')
  }

 
  onSort(event: SortEvent) {
    console.log(event);
  }
}
