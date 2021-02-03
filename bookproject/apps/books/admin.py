from django.contrib import admin
from .models import Book, BookCategory, Author, BookChapter


class BookChapterInline(admin.TabularInline):
    model = BookChapter
    extra = 0

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'author', 'status', 'created')
    search_fields = ('name', 'category', 'author')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [BookChapterInline]

@admin.register(BookCategory)
class BookCategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
