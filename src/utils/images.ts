// images.ts
export const menuImages = import.meta.glob('/src/assets/menus/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export function getMenuImage(imageField: string): string {
  const fileName = imageField.includes('/') ? imageField.split('/').pop()! : imageField;
  return menuImages[`/src/assets/menus/${fileName}`] || '';
}
