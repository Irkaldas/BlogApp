using BlogApp.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options => options.AddDefaultPolicy(
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:44493")
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                      }));

builder.Services.AddControllers();

builder.Services.AddDbContext<BlogAppDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("BlogAppConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{id:long?}");

app.MapFallbackToFile("index.html"); ;

SeedData.EnsurePopulated(app);

app.Run();
