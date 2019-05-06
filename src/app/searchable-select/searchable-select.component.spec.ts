import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchableSelectComponent } from "./searchable-select.component";

describe("SearchableSelectComponent", () => {
  let component: SearchableSelectComponent<any>;
  let fixture: ComponentFixture<SearchableSelectComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchableSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
