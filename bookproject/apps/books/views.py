from django.shortcuts import render, get_object_or_404
from .models import Book, Author, BookCategory, BookChapter

# Book
def catalog(request):
    books = Book.published.all()

    context_dict = {'books': books}
    return render(request, 'books/catalog.html', context_dict)


def single_book(request, book):
    book = get_object_or_404(Book, slug=book, status='published')
    chapters = BookChapter.objects.filter(book=book)

    context_dict = {'book': book, 'chapters': chapters}
    return render(request, 'books/single-book.html', context_dict)


def book_chapter(request, book_slug, slug):
    book = get_object_or_404(Book, slug=book_slug)
    chapter = get_object_or_404(BookChapter, slug=slug, book=book)
    chapters = BookChapter.objects.filter(book=book)

    try:
        next_chapter = BookChapter.objects.get(id=chapter.id+1)
    except:
        next_chapter = ''
    try:
        prev_chapter = BookChapter.objects.get(id=chapter.id-1)
    except:
        prev_chapter = ''
    # next_chapter = BookChapter.objects.filter(id__gt=chapter.id, book=book).order_by('id').first()
    # prev_chapter = BookChapter.objects.filter(id__lt=chapter.id, book=book).order_by('id').first()

    context_dict = {
        'chapter': chapter,
        'chapters': chapters,
        'next_chapter': next_chapter,
        'prev_chapter': prev_chapter,
    }
    return render(request, 'books/book-chapter.html', context_dict)


# Category
def category(request, category):
    category = get_object_or_404(BookCategory, slug=category)
    books = Book.published.filter(category=category)

    context_dict = {'category': category, 'books': books}
    return render(request, 'books/category.html', context_dict)


# Author
def catalog_author(request):
    authors = Author.objects.all()

    context_dict = {'authors': authors}
    return render(request, 'books/catalog-author.html', context_dict)


def single_author(request, author):
    author = get_object_or_404(Author, slug=author)
    books = Book.published.filter(author=author)

    context_dict = {'author': author, 'books': books}
    return render(request, 'books/single-author.html', context_dict)
