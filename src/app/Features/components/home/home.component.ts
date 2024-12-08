import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgModel } from '@angular/forms';
import { BooksService } from '../../../core/services/books.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    ConfirmDialog,
    ConfirmDialogModule,
    ToastModule,
    NavBarComponent,

  ],
  providers: [ConfirmationService, MessageService],
})


export class HomeComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  categories: any[] = [];
  selectedCategory: string | null = null;
  searchQuery: string = '';

  constructor(
    private booksService: BooksService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe((response: any) => {
      this.books = response.products;
      this.filteredBooks = [...this.books];
      this.setCategories();
    });
  }

  setCategories() {
    const uniqueCategories = Array.from(new Set(this.books.map((book) => book.category)));
    this.categories = uniqueCategories.map((category) => ({
      label: category,
      value: category,
    }));
  }

  filterBooks() {
    this.filteredBooks = this.books.filter((book) =>
      (this.searchQuery ? book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) : true) &&
      (this.selectedCategory ? book.category === this.selectedCategory : true)
    );
  }
  deleteBook(book: any) {
    this.confirmationService.confirm({
      message:`Are you sure you want to delete "${book.title}"?,`,
      header: 'Delete Confirmation',
      acceptLabel: 'Confirm', 
      rejectLabel: 'Cancel', 
      acceptButtonStyleClass: 'p-button-danger', 
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
     
        this.booksService.deleteBook(book.id ).subscribe(() => {
          this.books = this.books.filter((b) => b.id !== book.id);
          this.filterBooks();
  
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: `"${book.title}" has been successfully deleted.,`
          });
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Deletion cancelled.',
        });
      },
    });
  }
  
  
}
