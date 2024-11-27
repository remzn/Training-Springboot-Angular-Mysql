import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService,private authService: AuthService) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.loadUserDetails(userId);
    } else {
      this.isLoading = false;
    }
  }

  loadUserDetails(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.user = user;
        this.isLoading = false;
      },
      (error) => {
        console.error('Kullanıcı detayları yüklenirken hata oluştu:', error);
        this.isLoading = false;
      }
    );
  }
  
  goBackToUserList(): void {
    this.router.navigate(['/users']); // Kullanıcı listesine yönlendir
  }
    
}
