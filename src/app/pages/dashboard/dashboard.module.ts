import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbCarouselModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { LineChartService } from './lineChart/lineChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMapService } from './usersMap/usersMap.service';
// table
import { CondensedTable } from './condensedTable';
import { ContextualTable } from './contextualTable';
// loader
import { Loader } from './loader';
// service
import { DashboardService } from './dashboard.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    NgbCarouselModule,
    NgbTypeaheadModule,
    routing
  ],
  declarations: [
    PopularApp,
    PieChart,
    TrafficChart,
    UsersMap,
    LineChart,
    Feed,
    Todo,
    Calendar,
    Dashboard,
    // table
    CondensedTable,
    ContextualTable,
    // loader
    Loader
  ],
  providers: [
    CalendarService,
    FeedService,
    LineChartService,
    PieChartService,
    TodoService,
    TrafficChartService,
    UsersMapService,
    // service
    DashboardService
  ]
})
export class DashboardModule {}
