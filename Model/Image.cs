using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApp.Model
{
    public class Image
    {
        public long? Id { get; set; }
        public byte[]? ImageData { get; set; }
    }
}