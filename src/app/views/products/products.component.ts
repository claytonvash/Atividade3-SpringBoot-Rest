import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/shared/services/product.service';
import { IProduct } from 'app/shared/interfaces/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'app/shared/classes/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  form: FormGroup;
  product: Product;

  constructor(private service: ProductService, private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.service.findAll().subscribe(dados => {
      this.products = dados.content;
    },
      err => {
        console.log(err.message);
      }
    );
  }

  save() {
    this.product = new Product();

    this.product.name = this.form.get('name').value;
    this.product.description = this.form.get('description').value;
    this.product.price = this.form.get('price').value;
    this.product.imgUrl = '';
    this.product.id = 0;

    this.product.categories = [{
      id: 1,
      name: 'Eletronics'
    }];

    this.service.save(this.product).subscribe(result => {
      alert('Produto salvo com sucesso');
    },
      err => {
        console.log(err.message);
        alert('Ocorreu um erro ao salvar o produto!');
      });

    this.service.findAll().subscribe(dados => {
      this.products = dados.content;
    },
      err => {
        console.log(err.message);
      }
    );
  }

}
