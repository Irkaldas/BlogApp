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
        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public long UserId { get; set; }
        public IEnumerable<Comment>? Comments { get; set; }
        public IEnumerable<Favorite>? Favorites { get; set; }
    }
}