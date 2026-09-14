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
public class QuotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public QuotesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuoteResponseDto>>> GetQuotes()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var quotes = await _context.Quotes
            .Where(quote => quote.UserId == userId)
            .Select(quote => new QuoteResponseDto
            {
                Id = quote.Id,
                Content = quote.Content,
                Author = quote.Author,
                BookId = quote.BookId
            })
            .ToListAsync();

        return Ok(quotes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<QuoteResponseDto>> GetQuote(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var quote = await _context.Quotes
            .Where(item => item.Id == id && item.UserId == userId)
            .Select(item => new QuoteResponseDto
            {
                Id = item.Id,
                Content = item.Content,
                Author = item.Author,
                BookId = item.BookId
            })
            .FirstOrDefaultAsync();

        if (quote == null)
        {
            return NotFound();
        }

        return Ok(quote);
    }

    [HttpPost]
    public async Task<ActionResult<QuoteResponseDto>> CreateQuote(QuoteCreateDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!await BookExistsForUser(dto.BookId, userId))
        {
            return BadRequest("Invalid bookId.");
        }

        var quote = new Quote
        {
            Content = dto.Content,
            Author = dto.Author,
            BookId = dto.BookId,
            UserId = userId
        };

        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        var response = new QuoteResponseDto
        {
            Id = quote.Id,
            Content = quote.Content,
            Author = quote.Author,
            BookId = quote.BookId
        };

        return CreatedAtAction(nameof(GetQuote), new { id = quote.Id }, response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(int id, QuoteUpdateDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var quote = await _context.Quotes
            .FirstOrDefaultAsync(item => item.Id == id && item.UserId == userId);

        if (quote == null)
        {
            return NotFound();
        }

        if (!await BookExistsForUser(dto.BookId, userId))
        {
            return BadRequest("Invalid bookId.");
        }

        quote.Content = dto.Content;
        quote.Author = dto.Author;
        quote.BookId = dto.BookId;

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

    private async Task<bool> BookExistsForUser(int? bookId, string? userId)
    {
        if (!bookId.HasValue)
        {
            return true;
        }

        return await _context.Books
            .AnyAsync(book => book.Id == bookId.Value && book.UserId == userId);
    }
}