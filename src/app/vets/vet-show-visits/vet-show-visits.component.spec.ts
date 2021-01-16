import { Owner } from 'app/owners/owner';
import { PetType } from './../../pettypes/pettype';
import { PetService } from 'app/pets/pet.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Vet } from './../vet';
import { VetService } from 'app/vets/vet.service';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from 'app/error.service';
import { VisitService } from 'app/visits/visit.service';
import { Visit } from 'app/visits/visit';
import { VetShowVisitsComponent } from './vet-show-visits.component';
import { Pet } from 'app/pets/pet';

class VisitServiceStub {
  getPlannedVisitsByVet(): Observable<Visit[]> {
    return of( [{ id: 1, description: 'rabies shot', date: "2013-01-01", vet: 1, pet:{id: 7, name: 'Samantha', owner:{firstName:'Vorname', lastName: 'Nachname'}}  } as Visit] );
  }
  getPastVisitsByVet(): Observable<Visit[]> {
    return of( [{ id: 1, description: 'rabies shot', date: "2013-01-01", vet: 1, pet:{id: 7, name: 'Samantha', owner:{firstName:'Vorname', lastName: 'Nachname'}}  } as Visit] );
  }
}

class VetServiceStub {
  getVetById(): Observable<Vet> {
    return of( { id: 1, firstName: "James", lastName: "Carter" } as Vet );
  }
}

describe('VetShowVisitsComponent', () => {
  let component: VetShowVisitsComponent;
  let fixture: ComponentFixture<VetShowVisitsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ VetShowVisitsComponent ],
      providers:[
        {provide: VisitService, useClass: VisitServiceStub},
        {provide: VetService, useClass: VetServiceStub},
        {provide: ActivatedRoute, useValue: { snapshot:{ paramMap: convertToParamMap( { 'id': 1 } ) }}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VetShowVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
