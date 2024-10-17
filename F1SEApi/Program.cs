using Microsoft.EntityFrameworkCore;
using F1SEApi.Contexts;
using F1SEApi.Services;
using System.Text.Json.Serialization;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<F1SEContext>(options => options.UseSqlite("Data Source=Database/F1SE.db"));

builder.Services.AddCors(
    options => {
        options.AddPolicy("AllowAll", policies => policies
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        );
    }
);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<ImageService>();

var app = builder.Build();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
