import React from 'react';
import ProductCard from './ProductCard';

const sampleProducts = [
  { id: 1, name: 'Apple - 10.2-Inch iPad', model: 'MK2K3LL/A', sku: '4901809', price: '$249.99', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Apple - 10.9-Inch iPad Air', model: 'ML9J3LL/A', sku: '4907300', price: '$499.99', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Apple - 11-Inch iPad Pro', model: 'MP5B3LL/A', sku: '6340507', price: '$799.00', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Samsung Galaxy Tab S7', model: 'SM-T870NZKAXAR', sku: '6401716', price: '$649.99', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Microsoft Surface Pro 7', model: 'VDV-00001', sku: '6366566', price: '$899.99', image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Lenovo Tab P11 Pro', model: 'ZA7C0045US', sku: '6416241', price: '$399.99', image: 'https://via.placeholder.com/150' },
];

function ProductList() {
  return (
    <div>
      {sampleProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;