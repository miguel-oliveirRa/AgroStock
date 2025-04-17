using Application.Services.Product;
using Application.Interfaces;
using Application.UseCases;
using Infrastructure.Persistence.Context;
using Infrastructure.Persistence.Repository;
using Microsoft.EntityFrameworkCore;
using Application.MappingProfile;
using Application.Services.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Application.Services.Users;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("Front-End", policy =>
    {
        policy.WithOrigins("URL-DO-SEU-FRONT-END")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
    
});

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionTeste"))
);

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ITokenManager, TokenManager>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<CreateUseCase>();
builder.Services.AddScoped<DeleteUseCase>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<UpdateAmountUseCase>();
builder.Services.AddScoped<UpdateProductUseCase>();
builder.Services.AddScoped<GetUseCase>();
builder.Services.AddScoped<GetByIdUseCase>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = JwtSettings.GetValidationParameters();
});

builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseRouting();

app.UseCors("Front-End");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseHttpsRedirection();
app.Run();
