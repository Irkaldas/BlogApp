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
        public IEnumerable<Favorite> GetFavorites([FromBody] string UserId)
        {
            return blogAppDbContext.Favorites.Where(f => f.UserId == UserId);
        }

        [HttpPost("add")]
        public async Task<ActionResult<Favorite>> AddArticleToFavorites([FromBody] Favorite favorite)
        {

            if (favorite is not null)
            {
                favorite.Id = default;
                favorite.Article = default;
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