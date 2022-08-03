using Microsoft.AspNetCore.Mvc;
using BlogApp.Model;
using Microsoft.EntityFrameworkCore;
namespace BlogApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticleController : ControllerBase
{
    private BlogAppDbContext blogAppDbContext;

    public ArticleController(BlogAppDbContext blogAppDbContext)
    {
        this.blogAppDbContext = blogAppDbContext;
    }

    [HttpGet]
    public IEnumerable<Article> GetArticles()
    {
        return blogAppDbContext.Articles;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Article>> GetArticle(long id)
    {
        return Ok(await blogAppDbContext.Articles.FindAsync(id));
    }

    [HttpGet]
    public IEnumerable<Favorite> GetFavorites()
    {
        return blogAppDbContext.Favorites;
    }

    [HttpPost]
    public async Task<ActionResult<string>> AddArticleToFavorites([FromBody] Favorite favorite)
    {
        var newFavorite = await blogAppDbContext.Favorites.AddAsync(favorite);
        try
        {
            await blogAppDbContext.SaveChangesAsync();
            return Ok(await blogAppDbContext.Favorites.FirstOrDefaultAsync(f => f.Id == newFavorite.Entity.Id));
        }
        catch (Exception ex)
        {
            return BadRequest();
        }

    }
    [HttpPost]
    public async Task<ActionResult<string>> DeleteArticleFromFavorites(Favorite favorite)
    {
        blogAppDbContext.Favorites.Remove(favorite);
        try
        {
            await blogAppDbContext.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }

    }
}
