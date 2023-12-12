using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Lr6.Server;

public partial class Course3Context : DbContext
{
    public Course3Context()
    {
    }

    public Course3Context(DbContextOptions<Course3Context> options)
        : base(options)
    {
    }

    public virtual DbSet<PositionsInRequest> PositionsInRequests { get; set; }

    public virtual DbSet<PositionsInSupply> PositionsInSupplies { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductStock> ProductStocks { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<Storage> Storages { get; set; }

    public virtual DbSet<Supply> Supplies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=course3;Username=postgres;Password=Pg_2023_Admin");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PositionsInRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("positions_in_request_pkey");

            entity.ToTable("positions_in_request");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Count).HasColumnName("count");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.RequestId).HasColumnName("request_id");

            entity.HasOne(d => d.Product).WithMany(p => p.PositionsInRequests)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("positions_in_request_product_id_fkey");

            entity.HasOne(d => d.Request).WithMany(p => p.PositionsInRequests)
                .HasForeignKey(d => d.RequestId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("positions_in_request_request_id_fkey");
        });

        modelBuilder.Entity<PositionsInSupply>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("positions_in_supply_pkey");

            entity.ToTable("positions_in_supply");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Count).HasColumnName("count");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.SupplyId).HasColumnName("supply_id");

            entity.HasOne(d => d.Product).WithMany(p => p.PositionsInSupplies)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("positions_in_supply_product_id_fkey");

            entity.HasOne(d => d.Supply).WithMany(p => p.PositionsInSupplies)
                .HasForeignKey(d => d.SupplyId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("positions_in_supply_supply_id_fkey");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("products_pkey");

            entity.ToTable("products");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(1024)
                .HasColumnName("image_url");
        });

        modelBuilder.Entity<ProductStock>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("product_stocks_pkey");

            entity.ToTable("product_stocks");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Count).HasColumnName("count");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.StorageId).HasColumnName("storage_id");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductStocks)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("product_stocks_product_id_fkey");

            entity.HasOne(d => d.Storage).WithMany(p => p.ProductStocks)
                .HasForeignKey(d => d.StorageId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("product_stocks_storage_id_fkey");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("requests_pkey");

            entity.ToTable("requests");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CompletionDate).HasColumnName("completion_date");
            entity.Property(e => e.RequestDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnName("request_date");
            entity.Property(e => e.StorageId).HasColumnName("storage_id");

            entity.HasOne(d => d.Storage).WithMany(p => p.Requests)
                .HasForeignKey(d => d.StorageId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("requests_storage_id_fkey");
        });

        modelBuilder.Entity<Storage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("storages_pkey");

            entity.ToTable("storages");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .HasColumnName("address");
        });

        modelBuilder.Entity<Supply>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("supplies_pkey");

            entity.ToTable("supplies");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Date)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnName("date");
            entity.Property(e => e.StorageId).HasColumnName("storage_id");

            entity.HasOne(d => d.Storage).WithMany(p => p.Supplies)
                .HasForeignKey(d => d.StorageId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("supplies_storage_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
