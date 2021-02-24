import { Component, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  providers: [
    {
      
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsComponent),
      multi: true
    }
  ]
})
export class ChipsComponent implements ControlValueAccessor {

  public constructor(private elementRef: ElementRef) {}

  //ControlValueAccessor methods
  public onChange: any;
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {}
  public writeValue(value: Array<string>): void {
    this.values = value;
  }

  public get values(): Array<string> {
    return this.selectedItems;
  }

  public set values(value: Array<string>) {
    this.selectedItems = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  public items: Array<string> = [
    "Java",
    "JavaScript",
    "C",
    "C++",
    "Python",
    "PHP",
    "Go",
    "Swift",
    "Pascal",
    "Matlab",
    "C#",
    "R",
    "TypeScript",
    "Pico",
    "Python",
    "Basic",
    "Ruby",
    "Sql",
    "Assembly language",
    "Sml",
  ];

  public searchText: string = "";
  public searchResults: Array<string> = [];
  public selectedItems: Array<string> = [];

  public get searchPlaceholder(): string {
    return this.searchText ? "" : "Type a Programming Language";
  }
  
  public get searchQuery(): string {
    return this.searchText;
  }

  public set searchQuery(updatedString: string) {
    this.searchText = updatedString;
    if (this.searchText.length > 0) {
      this.querySearchResults();
    } else {
      this.searchResults = [];
    }
  }

  public addItem(value: string): void {
    const index: number = this.selectedItems.findIndex(
      (x: string) => x === value
    );
    if (index === -1) {
      this.selectedItems.push(value);
      this.reset();
      this.focusInput();
    }
  }

  public removeItem(value: string): void {
    const index: number = this.selectedItems.findIndex(
      (x: string) => x === value
    );
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.focusInput();
    }
  }

  private querySearchResults(): void {
    this.searchResults = this.items.filter(
      (x: string) =>
        x.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
  }

  // to focus the search input
  private focusInput(): void {
    const inputData: any = this.elementRef.nativeElement.querySelector(
      ".search-input__data"
    );
    if (inputData) {
      inputData.focus();
    }
  }

  // clear character(s) after selection
  private reset(): void {
    this.searchQuery = "";
    this.searchResults = [];
  }

}