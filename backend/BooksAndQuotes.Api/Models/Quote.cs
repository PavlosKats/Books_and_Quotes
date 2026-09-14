namespace BooksAndQuotes.Api.Models;

public class Quote
{
	public int Id { get; set; }
	public string Content { get; set; } = string.Empty;
	public string? Author { get; set; }
	public int? BookId { get; set; }
	public Book? Book { get; set; }
	public string? UserId { get; set; }
	public AppUser? User { get; set; }
}
