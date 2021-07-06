import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { HomesService } from './homes.service';

describe('HomesService', () => {
  let service: HomesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomesService);
  });

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});