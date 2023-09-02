import { Pipe, PipeTransform } from '@angular/core';
import { User, UserModel } from '../store/types/user';

@Pipe({
  name: 'searchFilter',
})
export class FilterPipe implements PipeTransform {
  transform(items: UserModel[] | null, searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((item) =>
      item.username.toLowerCase().includes(searchText)
    );
  }
}
