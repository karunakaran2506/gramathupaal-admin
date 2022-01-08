import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(stock: Array<any>, category: any) {
    let stocks: Array<any> = stock.filter((x: any) => x?.product?.category?._id == category)
    return stocks;
  }

}
