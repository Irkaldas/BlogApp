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
    [Route("[controller]")]
    [Authorize]
    public class FavoriteController : Controller
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

        [HttpPost]
        [Route("favorite/add")]
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
        [Route("favorite/remove/{id?}")]
        public async Task<ActionResult<string>> RemoveArticleFromFavorites(long id)
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
                return BadRequest();
            }

        }
    }
}