using System.Security.Claims;
using BooksAndQuotes.Api.Data;
using BooksAndQuotes.Api.DTOs;
using BooksAndQuotes.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BooksAndQuotes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookResponseDto>>> GetBooks()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var books = await _context.Books
            .Where(book => book.UserId == userId)
            .Select(book => new BookResponseDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                YearPublished = book.YearPublished,
                Isbn = book.Isbn,
                CoverImageUrl = book.CoverImageUrl
            })
            .ToListAsync();

        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookResponseDto>> GetBook(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var book = await _context.Books
            .Where(item => item.Id == id && item.UserId == userId)
            .Select(item => new BookResponseDto
            {
                Id = item.Id,
                Title = item.Title,
                Author = item.Author,
                YearPublished = item.YearPublished,
                Isbn = item.Isbn,
                CoverImageUrl = item.CoverImageUrl
            })
            .FirstOrDefaultAsync();

        if (book == null)
        {
            return NotFound();
        }

        return Ok(book);
    }

    [HttpPost]
    public async Task<ActionResult<BookResponseDto>> CreateBook(BookCreateDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var book = new Book
        {
            Title = dto.Title,
            Author = dto.Author,
            YearPublished = dto.YearPublished,
            Isbn = dto.Isbn,
            CoverImageUrl = dto.CoverImageUrl,
            UserId = userId
        };

        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        var response = new BookResponseDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            YearPublished = book.YearPublished,
            Isbn = book.Isbn,
            CoverImageUrl = book.CoverImageUrl
        };

        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, BookUpdateDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var book = await _context.Books
            .FirstOrDefaultAsync(item => item.Id == id && item.UserId == userId);

        if (book == null)
        {
            return NotFound();
        }

        book.Title = dto.Title;
        book.Author = dto.Author;
        book.YearPublished = dto.YearPublished;
        book.Isbn = dto.Isbn;
        book.CoverImageUrl = dto.CoverImageUrl;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var book = await _context.Books
            .FirstOrDefaultAsync(item => item.Id == id && item.UserId == userId);

        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}