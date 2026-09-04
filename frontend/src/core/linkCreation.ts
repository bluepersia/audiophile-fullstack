function createCategoryLink(categoryName: string): string {
  return `/category/${categoryName}`;
}

function createProductLink(productSlug: string): string {
  return `/product/${productSlug}`;
}

export { createCategoryLink, createProductLink };
