using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace BlogApp.Model
{
    public class Article
    {

        public long Id { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string Body { get; set; } = default!;

        public long UserId { get; set; } = default!;
        public IEnumerable<Comment> Comments { get; set; } = default!;
        public IEnumerable<Favorite> Favorites { get; set; } = default!;
    }
}