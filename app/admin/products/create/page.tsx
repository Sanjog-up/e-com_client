import PageTitle from '@/components/forms/admin/page-title'
import ProductForm from '@/components/forms/admin/products/product.form'
import React from 'react'

const CreateProductsPage = () => {
  return (
    <main>
      <PageTitle
      title='Add Products'
      linkText='Go back'
      link='/admin/products'
      />
      <ProductForm/>
    </main>
  )
}

export default CreateProductsPage
