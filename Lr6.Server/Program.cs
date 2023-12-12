using Npgsql;

using System.Net;
using System.Text.Json.Serialization;

namespace Lr6.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //using var context = new Course3Context();
            //context.Requests.Add(new Request
            //{
            //    RequestDate = new DateOnly(2014, 2, 24),
            //    StorageId = 23,
            //    PositionsInRequests = [
            //        new PositionsInRequest
            //        {
            //            ProductId = 20,
            //            Count = 1
            //        },
            //    ]
            //});
            //context.SaveChanges();
            //context.Supplies.Remove(new Supply { Id = 2 }) ;
            //context.SaveChanges();
            //context.Products.Add(new Product
            //{
            //    Name = "������� ����� ��� ������� ����� �� �������"
            //});
            //context.SaveChanges();
            //context.Products.Update(context.Products.Single(p => p.Name == "����� �������� ��� ����������� ������������� �������")).Entity.Name = "����� �������� ��� ����������� ������������ �������";
            //context.SaveChanges();

            //context.Storages.AddRange(
            //    new() { Address = "������ �.�������� ��.��������� 41" },
            //    new() { Address = "������ �.�������� ��.�������� 12" }
            //);
            //context.SaveChanges();

            //context.ProductStocks.Add(
            //    new ProductStock
            //    {
            //        Count = 3,
            //        Product = context.Products.Single(p => p.Name == "����� �������� ��� ����������� ������������ �������"),
            //        Storage = context.Storages.Single(s => s.Address == "������ �.�������� ��.�������� 12")
            //    }
            //);

            //context.SaveChanges();

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.WriteIndented = true;
            });
            builder.Services.AddDbContext<Course3Context>();


            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
