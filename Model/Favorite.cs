using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApp.Model
{
    public class Favorite
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long ArticleId { get; set; }
        public Article? Article { get; set; }
    }
}