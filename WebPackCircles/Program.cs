using WebPackCircles.Services;
using WebPackCircles.Work;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("https://github.io") 
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddKeyedTransient<CirclePacker, RectangularPacker>(PackingStrategy.Rectangular);
builder.Services.AddKeyedTransient<CirclePacker, TriangularPacker>(PackingStrategy.Triangular);
builder.Services.AddTransient<ICalculateService, CalculateService>();
builder.Services.AddTransient<ResponseService>();

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();