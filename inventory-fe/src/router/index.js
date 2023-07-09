import { createRouter, createWebHistory } from 'vue-router'

import ItemView from '../views/Item/View.vue'
import AddItem from '../views/Item/Add.vue'
import EditItem from '../views/Item/Edit.vue'
import DetailItem from '../views/Item/Detail.vue'

import CustomerView from '../views/Customer/View.vue'
import AddCustomer from '../views/Customer/Add.vue'
import EditCustomer from '../views/Customer/Edit.vue'
import DetailCustomer from '../views/Customer/Detail.vue'

import SalesView from '../views/Sales/View.vue'
import AddSales from '../views/Sales/Add.vue'
import DetailView from '../views/Sales/Detail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Item
    {
      path: '/',
      name: 'item',
      component: ItemView
    },
    {
      path: '/add-data-item',
      name: 'add-data-item',
      component: AddItem
    },
    {
      path: '/detail-data-item/:itemId',
      name: 'detail-data-item',
      component: DetailItem
    },
    {
      path: '/edit-data-item/:itemId',
      name: 'edit-data-item',
      component: EditItem
    },
    // Customer
    {
      path: '/customer',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/add-data-customer',
      name: 'add-data-customer',
      component: AddCustomer
    },
    {
      path: '/detail-data-customer/:customerId',
      name: 'detail-data-customer',
      component: DetailCustomer
    },
    {
      path: '/edit-data-customer/:customerId',
      name: 'edit-data-customer',
      component: EditCustomer
    },
    // Sales
    {
      path: '/sales',
      name: 'sales',
      component: SalesView
    },
    {
      path: '/add-data-sales',
      name: 'add-data-sales',
      component: AddSales
    },
    {
      path: '/detail-data-sales/:salesId',
      name: 'detail-data-sales',
      component: DetailView
    },
  ]
})

export default router
