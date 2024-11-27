import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDifference'
})
export class TimeDifferencePipe implements PipeTransform {
  transform(registerDate: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(registerDate).getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Bugün kaydedildi';
    if (diffInDays === 1) return 'Dün kaydedildi';
    return `${diffInDays} gün önce kaydedildi`;
  }
}
