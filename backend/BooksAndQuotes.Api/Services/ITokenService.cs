using BooksAndQuotes.Api.Models;

namespace BooksAndQuotes.Api.Services;

public interface ITokenService
{
    string CreateToken(AppUser user);
}