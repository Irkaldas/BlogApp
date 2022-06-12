using BlogApp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments(long id)
        {
            try
            {
                return Ok(await blogAppDbContext.Comments
                    .Where(c => c.ArticleId == id)
                    .ToListAsync());
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving comments from the database");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment([FromBody] Comment c)
        {

            // try
            // {
            c.Article = default;
            var newComment = await blogAppDbContext.Comments.AddAsync(c);
            await blogAppDbContext.SaveChangesAsync();

            return Ok(await blogAppDbContext.Comments.FirstOrDefaultAsync(c => c.Id == newComment.Entity.Id));
        }
    }
}