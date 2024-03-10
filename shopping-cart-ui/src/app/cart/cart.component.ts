import { Component,  OnInit, ViewChild } from '@angular/core';

 
import { ShoppingService } from '../shopping.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-CartDetail',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})


export class CartDetailComponent implements OnInit {
  
  grandTotalConfirm = 0;
  grandTotalPending = 0;
  orderStatus: any;
  orderDetailCheckout: any[] = [];

  displayedColumns: string[] = [
    'id',
    'product_id',
    'name',
    'quantity',
    'price',
    // 'userName',
    'status',
  ];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialogRef: MatDialogRef<CartDetailComponent>,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.getShoppingCardDetail();
  }

  
  getShoppingCardDetail() {
    this.shoppingService.shoppingCardDetail().subscribe({
      next: (res) => {
 
        this.dataSource = new MatTableDataSource(
          res.filter((item: any) => item.status === 'PENDING')
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
        this.orderStatus =  res.filter((item: any) => item.status === 'PENDING');
        console.log("orderStatus...",this.orderStatus);

        this.dataSource2 = new MatTableDataSource(
          res.filter((item: any) => item.status === 'CONFIRM')
        ); 
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;

        this.calGrandTotal(res);
 

        let data1 = res.filter((item: any) => item.status === 'PENDING');
        this.orderDetailCheckout = data1;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  calGrandTotal(orderDetail: any[]) { 
    this.grandTotalPending = orderDetail
      .filter((order) => order.status === 'PENDING')
      .reduce((sum, order) => sum + order.quantity * order.price, 0);

    this.grandTotalConfirm = orderDetail
      .filter((order) => order.status === 'CONFIRM')
      .reduce((sum, order) => sum + order.quantity * order.price, 0);
  }

  removeAllCart(product: any): void {
    if (product.quantity > 0) {
      this.shoppingService.removeProductFormCart(product.id).subscribe({
        next: (data: any) => {
          console.log('removeProductFormCart==>' + data);
          //this.getProList();
          product.quantity += 1;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else {
      console.log('Product out of stock');
    }
  }

  CheckOut(): void {
    this.shoppingService.checkout(this.orderDetailCheckout).subscribe({
      next: (data: any) => {
        console.log('Checkout successful:', data);
        // Update the cart or perform any other action after successful checkout
        this._dialogRef.close();
        location.reload();
      },
      error: (error: any) => {
        console.log('Checkout failed:', error);
      },
    });
  }
 
  emptyCartByUser() {
    this.shoppingService.emptyCartByUser().subscribe({
      next: (res) => {
        this.getShoppingCardDetail();
        this._dialogRef.close();
        location.reload();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeDialogRef() {
    this._dialogRef.close();
  }
}
