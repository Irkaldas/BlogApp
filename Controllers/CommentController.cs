using BlogApp.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private BlogAppDbContext blogAppDbContext;
        public CommentController(BlogAppDbContext blogAppDbContext)
        {
            this.blogAppDbContext = blogAppDbContext;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments(long id)
        {

            var comments = await blogAppDbContext.Comments
                    .Where(c => c.ArticleId == id)
                    .ToListAsync();

            return comments.Count > 0 ? Ok(comments) : BadRequest("No comments found.");

        }

        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment([FromBody] Comment comment)
        {

            if (comment is not null)
            {
                comment.Article = default;
                var newComment = await blogAppDbContext.Comments.AddAsync(comment);
                await blogAppDbContext.SaveChangesAsync();

                return Ok(await blogAppDbContext.Comments.FirstOrDefaultAsync(c => c.Id == newComment.Entity.Id));
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        "Error occured during posting comment");
            }
        }

    }
}