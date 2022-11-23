using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace BlogApp.Model
{
    public class Tag
    {
        public long? Id { get; set; }
        public string? Name { get; set; }
        [JsonIgnore]
        public ICollection<Article> Articles { get; set; } = new List<Article>();
    }
}