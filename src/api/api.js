import { createInstance } from './index.js';

const instance = createInstance();

function getCategories(success, failure) {
  instance.get('categories').then(success).catch(failure);
}

function getProductsList(categoryId, page, order, success, failure) {
  instance
    .get(`products/${categoryId}/${page}`, { params: { order: order } })
    .then(success)
    .catch(failure);
}

function getProductsPrefix(prefix, success, failure) {
  instance.get(`products/${prefix}`).then(success).catch(failure);
}

function orderProducts(prefix, success, failure) {
  instance.post(`products/${prefix}`).then(success).catch(failure);
}

export { getCategories, getProductsList, getProductsPrefix, orderProducts };
