using System.ComponentModel.DataAnnotations;

namespace BooksAndQuotes.Api.DTOs;

public class QuoteCreateDto
{
    [Required]
    [StringLength(500)]
    public string Content { get; set; } = string.Empty;
    [StringLength(100)]
    public string? Author { get; set; }
    public int? BookId { get; set; }
}