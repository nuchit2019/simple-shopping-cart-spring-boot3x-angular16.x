import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartDetailComponent } from './cart/cart.component';
 
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit { 
 
  products: any;
  orderDetail: any;
  totalQty = 0; 
 

 
  constructor(
    private dialog: MatDialog,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.getshoppingCardDetail();
    this.getProductListAll();    
  }
 
  openCartDialog() {
    const dialogRef = this.dialog.open(CartDetailComponent);
    dialogRef.afterClosed().subscribe({
      next: (data: any) => {
        console.log(data);
        this.getProductListAll();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getProductListAll() { 
    this.shoppingService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getshoppingCardDetail() {
    this.shoppingService.shoppingCardDetail().subscribe({
      next: (res) => {
        this.orderDetail = res; 
        //this.totalQty = this.orderDetail.length;

       const _total = res.filter((item:any)=> item.status === 'PENDING');      
        this.totalQty =_total.length;         
      
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  openEditForm(data: any) {
    const dialogRef = this.dialog.open(CartDetailComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (data) => { 
        this.getProductListAll();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addProductToCart(product: any): void { 
    if (product.quantity > 0) {
      this.shoppingService.addProductToCart(product).subscribe({
        next: (data: any) => { 
          this.getProductListAll();
          this.getshoppingCardDetail(); 
          product.quantity -= 1;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else {
      console.log('Product out of stock');
    }
  }

  removeProductFormCart(productId: any): void {
    const matchingProducts = this.orderDetail.filter((product: any) => {
      return product.product_id === productId;
    });
    const orderId = matchingProducts[0].id;

    console.log('orderId==>' + orderId);

    this.shoppingService.removeProductFormCart(orderId).subscribe({
      next: (data: any) => {
        console.log('removeProductFormCart==>' + data);

        this.getProductListAll();
        this.getshoppingCardDetail();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
 
 
  } 

  buyOrderByproductID(productId: any): any {
    if (this.orderDetail.length > 0) {  

      const matchingProducts = this.orderDetail.filter((product: any) => {
        return product.product_id === productId && product.status === 'PENDING';
      });

      const quantity = matchingProducts.length;
      return quantity;
    } else return 0;
  }

  stockOnHandByproductID(inStock: any, orderQty: any): any {
    if (inStock == 0) return 0;
    else {
      return inStock - orderQty;
    }
  }

  

}
