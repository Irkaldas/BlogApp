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
    public async Task<Article> GetArticle(long id)
    {
        return await blogAppDbContext.Articles.FindAsync(id);
    }
}
