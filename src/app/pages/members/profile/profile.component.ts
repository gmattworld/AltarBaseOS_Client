import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { MemberProfile } from '../../../core/models/member-profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  member = signal<MemberProfile | null>(null);
  profileForm!: FormGroup;
  isEditMode = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeForm(); // Initialize with empty structure
    this.loadMemberProfile();
  }

  loadMemberProfile() {
    this.authService.getMemberProfile().subscribe(profile => {
      this.member.set(profile.data);
      this.updateFormWithProfileData(profile.data);
    });
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      // Personal Information
      personal: this.fb.group({
        preferred_name: ['', Validators.required],
        middle_name: [''],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        date_of_birth: [''],
        gender: [''],
        marital_status: [''],
        occupation: [''],
        bio: [''],
      }),
      // Contact Information
      contact: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone_mobile: [''],
        phone_home: [''],
        phone_work: [''],
      }),
      // Address
      address: this.fb.group({
        address_street: [''],
        address_city: [''],
        address_state: [''],
        address_postal: [''],
        address_country: [''],
      }),
      // Emergency Contact
      emergency: this.fb.group({
        emergency_contact_name: [''],
        emergency_contact_relationship: [''],
        emergency_contact_phone: [''],
      }),
      // Church & Ministry
      ministry: this.fb.group({
        join_date: [''],
        membership_class_date: [''],
        ministry_roles: [[]],
        skills: [[]],
        spiritual_gifts: [[]],
      }),
      // Communication Preferences
      preferences: this.fb.group({
        preferred_contact_method: [''],
        allow_emails: [true],
        allow_texts: [true],
        allow_phone_calls: [true],
        directory_listed: [true],
      }),
    });
  }

  updateFormWithProfileData(profile: MemberProfile) {
    if (!profile) return;

    this.profileForm.patchValue({
      personal: {
        preferred_name: profile.preferred_name,
        middle_name: profile.middle_name,
        first_name: profile.first_name,
        last_name: profile.last_name,
        date_of_birth: profile.date_of_birth ? formatDate(profile.date_of_birth, 'yyyy-MM-dd', 'en') : '',
        gender: profile.gender,
        marital_status: profile.marital_status,
        occupation: profile.occupation,
        bio: profile.bio,
      },
      contact: {
        email: profile.email,
        phone_mobile: profile.phone_mobile,
        phone_home: profile.phone_home,
        phone_work: profile.phone_work,
      },
      address: {
        address_street: profile.address_street,
        address_city: profile.address_city,
        address_state: profile.address_state,
        address_postal: profile.address_postal,
        address_country: profile.address_country,
      },
      emergency: {
        emergency_contact_name: profile.emergency_contact_name,
        emergency_contact_relationship: profile.emergency_contact_relationship,
        emergency_contact_phone: profile.emergency_contact_phone,
      },
      ministry: {
        join_date: profile.join_date ? formatDate(profile.join_date, 'yyyy-MM-dd', 'en') : '',
        membership_class_date: profile.membership_class_date ? formatDate(profile.membership_class_date, 'yyyy-MM-dd', 'en') : '',
        ministry_roles: profile.ministry_roles,
        skills: profile.skills,
        spiritual_gifts: profile.spiritual_gifts,
      },
      preferences: {
        preferred_contact_method: profile.preferred_contact_method,
        allow_emails: profile.allow_emails,
        allow_texts: profile.allow_texts,
        allow_phone_calls: profile.allow_phone_calls,
        directory_listed: profile.directory_listed,
      }
    });
  }

  get personalForm() { return this.profileForm.get('personal') as FormGroup; }
  get contactForm() { return this.profileForm.get('contact') as FormGroup; }
  get addressForm() { return this.profileForm.get('address') as FormGroup; }
  get emergencyForm() { return this.profileForm.get('emergency') as FormGroup; }
  get ministryForm() { return this.profileForm.get('ministry') as FormGroup; }
  get preferencesForm() { return this.profileForm.get('preferences') as FormGroup; }

  toggleEditMode() {
    this.isEditMode.set(!this.isEditMode());
    if (!this.isEditMode()) {
      // On cancelling, revert changes by reloading profile data
      if (this.member()) {
        this.updateFormWithProfileData(this.member()!);
      }
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const updatedProfile = this.profileForm.value;
    console.log('Profile update submitted:', updatedProfile);
    // Here you would call a service to update the member's profile
    // e.g., this.authService.updateMemberProfile(updatedProfile).subscribe(...)
    this.isEditMode.set(false);
  }
}
