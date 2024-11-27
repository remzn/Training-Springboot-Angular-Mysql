import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  newUser: User = { id: 0, name: '', email: '', surname: '' };
  editingUser: User = { id: 0, name: '', email: '', surname: '' };
  filteredUsers: User[] = [];
  searchQuery: string = '';
  selectedUsers: number[] = []; // Seçilen kullanıcıların ID'lerini tutan dizi

  constructor(private userService: UserService,private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log('Kullanıcılar:', data);
        this.users = data;
        this.filteredUsers = data; // İlk yüklemede filtrelenmiş kullanıcılar
      },
      (error: any) => {
        console.error('Kullanıcılar yüklenirken hata oluştu:', error);
      }
    );
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(
      (user: User) => {
        console.log('Kullanıcı başarıyla eklendi:', user);
        this.loadUsers();
        this.newUser = { id: 0, name: '', email: '', surname: '' }; // Formu sıfırla
      },
      (error: any) => {
        console.error('Kullanıcı eklenirken hata oluştu:', error);
      }
    );
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('Kullanıcı başarıyla silindi');
        this.loadUsers();
      },
      (error: any) => {
        console.error('Kullanıcı silinirken hata oluştu:', error);
      }
    );
  }

  editUser(user: User): void {
    this.editingUser = { ...user }; // Düzenleme için seçilen kullanıcıyı ayarla
  }

  updateUser(): void {
    this.userService.updateUser(this.editingUser).subscribe(
      () => {
        console.log('Kullanıcı başarıyla güncellendi');
        this.loadUsers();
        this.editingUser = { id: 0, name: '', email: '', surname: '' }; // Düzenleme modunu sıfırla
      },
      (error: any) => {
        console.error('Kullanıcı güncellenirken hata oluştu:', error);
      }
    );
  }

  toggleSelection(id: number): void {
    if (this.selectedUsers.includes(id)) {
      this.selectedUsers = this.selectedUsers.filter((userId) => userId !== id);
    } else {
      this.selectedUsers.push(id);
    }
  }

  deleteSelectedUsers(): void {
    if (this.selectedUsers.length === 0) {
      console.warn('Silinecek kullanıcı seçilmedi.');
      return;
    }

    const confirmDelete = confirm(
      'Seçili kullanıcıları silmek istediğinize emin misiniz?'
    );
    if (!confirmDelete) {
      return;
    }

    const deletionPromises = this.selectedUsers.map((id) =>
      this.userService.deleteUser(id).toPromise()
    );

    Promise.all(deletionPromises)
      .then(() => {
        console.log('Seçili kullanıcılar başarıyla silindi.');
        this.loadUsers(); // Kullanıcı listesini yeniden yükle
        this.selectedUsers = []; // Seçilen kullanıcıları sıfırla
      })
      .catch((error) => {
        console.error('Toplu silme işlemi sırasında hata oluştu:', error);
      });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.surname.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  logout() {
    this.authService.logout(); // AuthService'deki logout fonksiyonunu çağırın
    this.router.navigate(['/login']); // Kullanıcıyı login sayfasına yönlendirin
  }
  exportToCSV(): void {
    const header = ['ID', 'İsim', 'E-posta', 'Soyisim']; // CSV başlıkları
    const rows = this.filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.surname
    ]);

    // CSV formatında içeriği oluşturma
    let csvContent = 'data:text/csv;charset=utf-8,' + header.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    // CSV dosyasını indirmek için link oluşturma
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'kullanici_listesi.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Linki kaldırma
  }
}
