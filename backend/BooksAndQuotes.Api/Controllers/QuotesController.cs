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
public class QuotesController : ControllerBase
{
	private readonly AppDbContext _context;

	public QuotesController(AppDbContext context)
	{
		_context = context;
	}

	[HttpGet]
	public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		var quotes = await _context.Quotes
			.Where(quote => quote.UserId == userId)
			.ToListAsync();

		return Ok(quotes);
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<Quote>> GetQuote(int id)
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		var quote = await _context.Quotes
			.FirstOrDefaultAsync(item => item.Id == id && item.UserId == userId);

		if (quote == null)
		{
			return NotFound();
		}

		return Ok(quote);
	}

	[HttpPost]
	public async Task<ActionResult<Quote>> CreateQuote(Quote quote)
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
		quote.UserId = userId;

		_context.Quotes.Add(quote);
		await _context.SaveChangesAsync();

		return CreatedAtAction(nameof(GetQuote), new { id = quote.Id }, quote);
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateQuote(int id, Quote quote)
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		var existingQuote = await _context.Quotes
			.FirstOrDefaultAsync(item => item.Id == id && item.UserId == userId);

		if (existingQuote == null)
		{
			return NotFound();
		}

		existingQuote.Content = quote.Content;
		existingQuote.Author = quote.Author;
		existingQuote.BookId = quote.BookId;

		await _context.SaveChangesAsync();

		return NoContent();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteQuote(int id)
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		var quote = await _context.Quotes
			.FirstOrDefaultAsync(item => item.Id == id && item.UserId == userId);

		if (quote == null)
		{
			return NotFound();
		}

		_context.Quotes.Remove(quote);
		await _context.SaveChangesAsync();

		return NoContent();
	}
}
