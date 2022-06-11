using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApp.Model
{
    public class Favorite
    {
        public long Id { get; set; } = default!;
        public long UserId { get; set; } = default!;
        public long ArticleId { get; set; } = default!;
        public Article? Article { get; set; } = default!;
    }
}