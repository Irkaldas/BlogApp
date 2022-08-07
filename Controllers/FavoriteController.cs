using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using BlogApp.Model;

namespace BlogApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoriteController : ControllerBase
    {
        private BlogAppDbContext blogAppDbContext;
        public FavoriteController(BlogAppDbContext blogAppDbContext)
        {
            this.blogAppDbContext = blogAppDbContext;
        }

        [HttpGet]
        public IEnumerable<Favorite> GetFavorites()
        {
            return blogAppDbContext.Favorites;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Favorite>> AddArticleToFavorites([FromBody] Favorite favorite)
        {

            if (favorite is not null)
            {
                favorite.Id = default;
                favorite.Article = default;
                favorite.ArticleId = 1;
                favorite.UserId = "7b98cad3-d905-4a06-862a-9efffbd2e74e";
                var newFavorite = await blogAppDbContext.Favorites.AddAsync(favorite);
                await blogAppDbContext.SaveChangesAsync();
                return Ok(await blogAppDbContext.Favorites.FirstOrDefaultAsync(f => f.Id == newFavorite.Entity.Id));
            }
            else
            {
                return BadRequest("Błąd błąd");
            }


        }

        [HttpPost]
        [Route("remove/{id?}")]
        public async Task<ActionResult> RemoveArticleFromFavorites(long id)
        {
            Favorite newFavorite = new Favorite() { Id = id };
            blogAppDbContext.Favorites.Remove(newFavorite);
            try
            {
                await blogAppDbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }
    }
}