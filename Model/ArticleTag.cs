using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApp.Model
{
    public class ArticleTag
    {
        public long? ArticleId { get; set; }
        public Article? Article { get; set; }
        public long? TagId { get; set; }
        public Tag? Tag { get; set; }
    }
}