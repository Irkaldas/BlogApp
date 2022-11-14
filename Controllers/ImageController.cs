using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BlogApp.Model;

namespace BlogApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private BlogAppDbContext blogAppDbContext;
        public ImageController(BlogAppDbContext blogAppDbContext)
        {
            this.blogAppDbContext = blogAppDbContext;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetImage(long id)
        {
            var myImage = await blogAppDbContext.Images.FindAsync(id);
            if (myImage != null && myImage.ImageData != null)
            {
                return (File(myImage.ImageData, "multipart/form-data"));
            }

            return StatusCode(StatusCodes.Status500InternalServerError,
                                    "Error occured during retriving image");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteImage(long id)
        {
            var myImage = new Image
            {
                Id = id,
                ImageData = default
            };
            blogAppDbContext.Images.Remove(myImage);
            await blogAppDbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> PostImage()
        {
            if (Request.Form.Files.Count > 0)
            {
                var myFile = Request.Form.Files[0].OpenReadStream();

                MemoryStream ms = new MemoryStream();
                myFile.CopyTo(ms);

                Image newImage = new Image
                {
                    Id = default,
                    ImageData = ms.ToArray()
                };

                var res = await blogAppDbContext.Images.AddAsync(newImage);
                await blogAppDbContext.SaveChangesAsync();
                string imageUrl = $"{Request.Scheme}://{Request.Host.Value}/api/image/{res.Entity.Id}";
                return Ok(new
                {
                    url = imageUrl,
                });
            }

            return StatusCode(StatusCodes.Status500InternalServerError,
                        "Error occured during posting image");
        }

    }
}