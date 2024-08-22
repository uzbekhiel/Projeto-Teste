using Microsoft.EntityFrameworkCore;
using TJAPI.Entities;

namespace TJAPI.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) { }

        public DbSet<User> User { get; set; }
        public DbSet<UserType> UserType { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserType>()
                .HasMany(e => e.Users)
                .WithOne(e=>e.UserType)
                .HasForeignKey(e=>e.ID_TIPOUSUARIO)
                .IsRequired(false);

            base.OnModelCreating(modelBuilder);
        }

    }
}
