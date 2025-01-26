import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  faBackward,
  faCalendar, faCalendarDays,
  faCheck,
  faClipboard,
  faClipboardCheck,
  faEdit, faForward, faHeart, faMagnifyingGlassPlus,
  faSave,
  faTimes,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    CalendarViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCheck);
    library.addIcons(faTrashAlt);
    library.addIcons(faSave);
    library.addIcons(faEdit);
    library.addIcons(faTimes);
    library.addIcons(faCalendarDays);
    library.addIcons(faClipboardCheck);
    library.addIcons(faBackward);
    library.addIcons(faForward);
    library.addIcons(faHeart);
    library.addIcons(faMagnifyingGlassPlus);
  }
}
