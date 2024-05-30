import { Component } from '@angular/core';
import { HeaderComponent } from './public/components/header/header.component';
import { MessageContainerComponent } from './public/components/message-container/message-container.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [ HeaderComponent, RouterOutlet, MessageContainerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'products';
}
