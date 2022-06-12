using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApp.Model
{
    public class Comment
    {
        public long Id { get; set; }
        public string Body { get; set; } = string.Empty;
        public long UpVotes { get; set; }
        public long DownVotes { get; set; }
        public long UserId { get; set; }
        public long ArticleId { get; set; }
        public Article? Article { get; set; }
    }
}