using BlogApp.Model;
using Microsoft.AspNetCore.Mvc;

namespace BlogApp.Controllers
{
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private BlogAppDbContext blogAppDbContext;
        public CommentController(BlogAppDbContext blogAppDbContext)
        {
            this.blogAppDbContext = blogAppDbContext;
        }

        [HttpGet("{id}")]
        public IEnumerable<Comment> GetComments(long id)
        {
            return blogAppDbContext.Comments
                .Where(c => c.ArticleId == id);
        }

        [HttpPost]
        public async Task PostComment([FromBody] Comment c)
        {
            c.Article = default;
            blogAppDbContext.Comments.Add(c);
            await blogAppDbContext.SaveChangesAsync();
        }

    }
}