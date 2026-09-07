namespace BooksAndQuotes.Api.Models;

public class Book
{
	public int Id { get; set; }
	public string Title { get; set; } = string.Empty;
	public string Author { get; set; } = string.Empty;
	public int YearPublished { get; set; }
	public string Isbn { get; set; } = string.Empty;
	public string? CoverImageUrl { get; set; }
	public string? UserId { get; set; }
	public AppUser? User { get; set; }
}
