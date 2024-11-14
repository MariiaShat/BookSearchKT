import React, { useState } from 'react';
import './BookSearch.css'; 

const BookSearch = () => {
    const [query, setQuery] = useState(''); //query: строка, которая хранит введенное пользователем название книги.
    const [books, setBooks] = useState([]); //books: массив, который будет хранить результаты поиска книг.
    const [error, setError] = useState(''); // error: строка для хранения сообщения об ошибке, если что-то пойдет не так.

    // handleSearch: Асинхронная функция, которая вызывается при нажатии кнопки "Поиск".
    const handleSearch = async () => {
        if (!query) return;//Проверка на пустой запрос: Если query пустой, функция завершает выполнение.

        try {
            const response = await fetch(
                'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=roOw10BMLD5RqfizPmGdUMZ6E7br3ZqS'
            );

            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }

            const data = await response.json();
            const filteredBooks = data.results.books.filter(book =>
                book.title.toLowerCase().includes(query.toLowerCase())
            );

            setBooks(filteredBooks);
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="book-search">
            <h1>Поиск книг</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)} //Поле ввода для ввода названия книги. При изменении значения вызывается setQuery, чтобы обновить состояние
                placeholder="Введите название книги"
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Поиск</button>

            {error && <p className="error">{error}</p>}
            <ul className="book-list">
                {books.map((book) => (
                    <li key={book.primary_isbn13} className="book-item">
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookSearch;
