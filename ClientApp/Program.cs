using BlogApp.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BlogApp.JwtFeatures;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options => options.AddDefaultPolicy(
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:44493")
                                .AllowAnyMethod()
                                .AllowAnyHeader()
                                .AllowCredentials();
                      }));
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<BlogAppDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("BlogAppConnection"));
});

builder.Services.AddDbContext<IdentityContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("IdentityConnection"));
});

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<IdentityContext>();

builder.Services.AddScoped<JwtHandler>();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["validIssuer"],
        ValidAudience = jwtSettings["validAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["securityKey"]))
    };
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

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();
app.UseEndpoints(routes =>
                {
                    routes.MapControllerRoute(
                        name: "default",
                        pattern: "{controller}/{id:long?}");
                    routes.MapControllerRoute(
                        name: "favorite",
                        pattern: "{controller}/add"
                    );
                });

app.MapFallbackToFile("index.html"); ;

SeedData.EnsurePopulated(app);

app.Run();
