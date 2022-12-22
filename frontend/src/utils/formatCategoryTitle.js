export function formatCategoryTitle(category) {
  if (category.title === "Sandwiches") {
    return "🥪 Sandwiches";
  } else if (category.title === "Salads") {
    return "🥗 Salads";
  } else if (category.title === "Soups") {
    return "🥣 Soups";
  } else if (category.title === "Drinks") {
    return "🍹 Drinks";
  } else if (category.title === "Bakery") {
    return "🍰 Bakery";
  }
  return category;
}
