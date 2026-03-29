type ProductMediaProps = {
  title: string;
  palette: [string, string];
  imageUrl?: string;
  imageAlt?: string;
};

export function ProductMedia({ title, palette, imageUrl, imageAlt }: ProductMediaProps) {
  if (imageUrl) {
    return <img className="product-media__image" src={imageUrl} alt={imageAlt || title} />;
  }

  return (
    <div
      className="product-media__fallback"
      style={{
        backgroundImage: `linear-gradient(145deg, ${palette[0]} 0%, ${palette[1]} 100%)`
      }}
      aria-hidden="true"
    >
      <span>{title}</span>
    </div>
  );
}
