namespace BooksAndQuotes.Api.DTOs;

public class QuoteResponseDto
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? Author { get; set; }
    public int? BookId { get; set; }
}