using System.ComponentModel.DataAnnotations;

namespace BooksAndQuotes.Api.DTOs;

public class BookCreateDto
{
    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;
    [Required]
    [StringLength(100)]
    public string Author { get; set; } = string.Empty;
    [Range(1, 9999)]
    public int YearPublished { get; set; }
    [Required]
    [StringLength(20)]
    public string Isbn { get; set; } = string.Empty;
    [Url]
    public string? CoverImageUrl { get; set; }
}