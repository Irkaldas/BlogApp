using Microsoft.AspNetCore.Mvc;
using BlogApp.Model;
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



    [HttpPost]
    public async Task<ActionResult<string>> AddArticleToFavorites([FromBody] Favorite favorite)
    {
        await blogAppDbContext.Favorites.AddAsync(favorite);
        try
        {
            await blogAppDbContext.SaveChangesAsync();

            return Ok("Item added successfully");
        }
        catch (Exception ex)
        {
            return BadRequest("Couldn't add item.");
        }

    }
    [HttpPost]
    public async Task<ActionResult<string>> DeleteArticleFromFavorites(Favorite favorite)
    {
        await blogAppDbContext.Favorites.AddAsync(favorite);
        try
        {
            await blogAppDbContext.SaveChangesAsync();

            return Ok("Item removed successfully");
        }
        catch (Exception ex)
        {
            return BadRequest("Couldn't remove item.");
        }

    }
}
