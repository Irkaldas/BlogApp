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
        public long Id { get; set; } = default!;
        public string? Body { get; set; } = default!;
        public long UpVotes { get; set; } = default!;
        public long DownVotes { get; set; } = default!;
        public long UserId { get; set; } = default!;

        public long ArticleId { get; set; } = default!;
        public Article? Article { get; set; } = default!;
    }
}