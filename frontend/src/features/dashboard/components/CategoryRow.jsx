export function CategoryRow({ categories }) {
  return (
    <div className="category-list">
      {categories.map((category) => (
        <div
          className="category-item"
          key={category.id}
          role="button"
          onClick={() => console.log("click")}
        >
          {category.title}
        </div>
      ))}
      <div role="button" className="new-category">
        Category +
      </div>
    </div>
  );
}
