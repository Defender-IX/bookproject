from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.utils.text import slugify


class BookCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    slug = models.SlugField(max_length=100, verbose_name='Слаг')

    def get_absolute_url(self):
        return reverse('books:category', args=[self.slug])

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Author(models.Model):
    name = models.CharField(max_length=200, verbose_name='Имя')
    slug = models.SlugField(max_length=200, verbose_name='Слаг')
    image = models.ImageField(upload_to='authors', blank=True, verbose_name='Изображение')

    def get_absolute_url(self):
        return reverse('books:single_author', args=[self.slug])

    class Meta:
        verbose_name = 'Автор'
        verbose_name_plural = 'Авторы'

    def __str__(self):
        return self.name


class Book(models.Model):

    class NewManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    name = models.CharField(max_length=200, verbose_name='Название')
    slug = models.SlugField(max_length=200, verbose_name='Слаг')
    author = models.ForeignKey(Author, on_delete=models.CASCADE, verbose_name='Автор')
    # category = models.ManyToManyField(BookCategory)
    category = models.ForeignKey(BookCategory, on_delete=models.CASCADE, verbose_name='Категория')
    excerpt = models.TextField(blank=True, verbose_name='Краткое описание')
    image = models.ImageField(upload_to='books', blank=True, verbose_name='Изображение')
    STATUS_CHOICES = (
        ('draft', 'Черновик'),
        ('published', 'Опубликовано'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='published', verbose_name='Статус')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата Создания')
    published = NewManager()

    def get_absolute_url(self):
        return reverse('books:single_book', args=[self.slug])

    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

    def __str__(self):
        return self.name


class BookChapter(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, verbose_name='Книга')
    title = models.CharField(max_length=100, blank=True, verbose_name='Заголовок')
    number = models.CharField(max_length=5, verbose_name='Номер главы')
    text = models.TextField(verbose_name='Текст')
    slug = models.SlugField(max_length=5, default='', editable=False)

    def save(self):
        self.slug = slugify(self.number)
        super(BookChapter, self).save()

    def get_absolute_url(self):
        return reverse('books:book_chapter', args=[self.book.slug, self.slug])

    class Meta:
        verbose_name = 'Глава'
        verbose_name_plural = 'Главы'

    def __str__(self):
        return f"{self.book} {self.number}"
