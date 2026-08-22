function createCategoryLink(categoryName: string): string {
  return `/category/${categoryName}`;
}

function createProductLink(productName: string): string {
  return `/product/${productName}`;
}

export { createCategoryLink, createProductLink };
