using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace BlogApp.Model
{
    public class SeedData
    {

        public static void EnsurePopulated(IApplicationBuilder app)
        {
            BlogAppDbContext blogAppDbContext = app.ApplicationServices
            .CreateScope().ServiceProvider.GetRequiredService<BlogAppDbContext>();

            if (blogAppDbContext.Database.GetPendingMigrations().Any())
            {
                blogAppDbContext.Database.Migrate();
            }

            if (!blogAppDbContext.Articles.Any())
            {
                Comment c1 = new Comment
                {
                    Body = "Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit",
                    UpVotes = 20,
                    DownVotes = 10,
                };
                Comment c2 = new Comment
                {
                    Body = "Ea Molestias Quasi Exercitationem Repellat Qui Ipsa Sit Aut",
                    UpVotes = 130,
                    DownVotes = 30,
                };
                Comment c3 = new Comment
                {
                    Body = "Nesciunt Quas Odio",
                    UpVotes = 1337,
                    DownVotes = 420,
                };
                Comment c4 = new Comment
                {
                    Body = "Qui Est Esse",
                    UpVotes = 997,
                    DownVotes = 111,
                };
                Comment c5 = new Comment
                {
                    Body = "Eum Et Est Occaecati",
                    UpVotes = 123,
                    DownVotes = 345,
                };
                Comment c6 = new Comment
                {
                    Body = "Dolorem Eum Magni Eos Aperiam Quia",
                    UpVotes = 2457,
                    DownVotes = 21,
                };
                Comment c7 = new Comment
                {
                    Body = "Dolorem Eum Magni Eos Aperiam Quia",
                    UpVotes = 333,
                    DownVotes = 555,
                };
                Comment c8 = new Comment
                {
                    Body = "Dolorem Eum Magni Eos Aperiam Quia",
                    UpVotes = 1324,
                    DownVotes = 823,
                };

                blogAppDbContext.Articles.AddRange(
                    new Article
                    {
                        Body = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        Title = "What is Lorem Ipsum?",
                        UserId = 1,
                        Comments = new List<Comment>() { c1, c2 }
                    },
                    new Article
                    {
                        Body = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                        Title = "Why do we use it?",
                        UserId = 1,
                        Comments = new List<Comment>() { c3, c4 }
                    },
                    new Article
                    {
                        Body = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
                        Title = "Where does it come from?",
                        UserId = 2,
                        Comments = new List<Comment>() { c5, c6 }
                    },
                    new Article
                    {
                        Body = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
                        Title = "Where can I get some?",
                        UserId = 3,
                        Comments = new List<Comment>() { c7, c8 }
                    }
                );
                blogAppDbContext.SaveChanges();
            }
        }
    }
}