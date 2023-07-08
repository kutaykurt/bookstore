export async function fetchBooks() {
  try {
    const response = await fetch('buecher.json');
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}