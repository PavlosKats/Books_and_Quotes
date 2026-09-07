using System.Security.Claims;
using BooksAndQuotes.Api.Data;
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
	public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		var books = await _context.Books
			.Where(book => book.UserId == userId)
			.ToListAsync();

		return Ok(books);
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<Book>> GetBook(int id)
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		var book = await _context.Books
			.FirstOrDefaultAsync(item => item.Id == id && item.UserId == userId);

		if (book == null)
		{
			return NotFound();
		}

		return Ok(book);
	}

	[HttpPost]
	public async Task<ActionResult<Book>> CreateBook(Book book)
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
		book.UserId = userId;

		_context.Books.Add(book);
		await _context.SaveChangesAsync();

		return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateBook(int id, Book book)
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		var existingBook = await _context.Books
			.FirstOrDefaultAsync(item => item.Id == id && item.UserId == userId);

		if (existingBook == null)
		{
			return NotFound();
		}

		existingBook.Title = book.Title;
		existingBook.Author = book.Author;
		existingBook.YearPublished = book.YearPublished;
		existingBook.Isbn = book.Isbn;
		existingBook.CoverImageUrl = book.CoverImageUrl;

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
