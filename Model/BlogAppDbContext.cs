using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.Model
{
    public class BlogAppDbContext : DbContext
    {
        public BlogAppDbContext(DbContextOptions<BlogAppDbContext> options)
        : base(options) { }

        public DbSet<Article> Articles { get; set; } = default!;
        public DbSet<Comment> Comments { get; set; } = default!;
        public DbSet<Favorite> Favorites { get; set; } = default!;
        public DbSet<Image> Images { get; set; } = default!;
        public DbSet<Tag> Tags { get; set; } = default!;
        //public DbSet<ArticleTag> articleTags { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // modelBuilder.Entity<ArticleTag>()
            // .HasKey(articleTag => new { articleTag.ArticleId, articleTag.TagId });

            // modelBuilder.Entity<ArticleTag>()
            // .HasOne(articleTag => articleTag.Article)
            // .WithMany(article => article.ArticleTags)
            // .HasForeignKey(articleTag => articleTag.ArticleId);

            // modelBuilder.Entity<ArticleTag>()
            // .HasOne(articleTag => articleTag.Tag)
            // .WithMany(tag => tag.ArticleTags)
            // .HasForeignKey(articleTag => articleTag.TagId);
        }

    }
}