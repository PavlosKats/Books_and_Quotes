namespace BooksAndQuotes.Api.DTOs;

public class BookResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public int YearPublished { get; set; }
    public string Isbn { get; set; } = string.Empty;
    public string? CoverImageUrl { get; set; }
}