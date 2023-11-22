export async function fetchBooks() {
  try {
    const response = await fetch('buecher.json');
    if (!response.ok) {
      throw new Error('Response not OK');
    }
    const data = await response.json();
    console.log(data); // Überprüfe die geladenen Daten in der Konsole
    return data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    // Handle the error or set a default value
    return [];
  }
}