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
    public async Task<IActionResult> GetArticles(long id, string sortType, string search)
    {
        return Ok(
                new
                {
                    Articles = await blogAppDbContext.Articles.OrderByDescending(a => a.Id)
                    .Include(a => a.Tags).ToListAsync(),
                    totalArticles = await blogAppDbContext.Articles.CountAsync()
                });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Article>> GetArticle(long id)
    {
        return Ok(await blogAppDbContext.Articles.FindAsync(id));
    }

    [HttpPost]
    public async Task<ActionResult<Article>> PostArticle([FromBody] Article article)
    {
        if (article != null && article.Tags != null)
        {
            article.Id = default;
            for (int i = 0; i < article.Tags.Count(); i++)
            {
                if (article.Tags.ElementAt(i).Id != null)
                {
                    Tag tag = await blogAppDbContext.Tags.FirstOrDefaultAsync(t => t.Id == article.Tags.ElementAt(i).Id) ?? article.Tags.ElementAt(i);
                    article.Tags.Remove(article.Tags.ElementAt(i));
                    article.Tags.Add(tag);
                }
            }

            await blogAppDbContext.Articles.AddAsync(article);
            await blogAppDbContext.SaveChangesAsync();

            return Ok(article);
        }
        return StatusCode(StatusCodes.Status500InternalServerError,
                        "Error occured during posting article");

    }
}
