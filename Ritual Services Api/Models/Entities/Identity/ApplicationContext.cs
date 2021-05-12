
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Ritual_Services_Api.Models.Entities.Idemtity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Entities.Identity
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
        public virtual DbSet<UserAdditionalInfo> UserAdditionalInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasOne(ui => ui.UserAdditionalInfo)
                .WithOne(u => u.User)
                .HasForeignKey<UserAdditionalInfo>();

            builder.Entity<FuneralOrder>()
               .HasOne(f => f.Category)
               .WithMany(c => c.FuneralOrders);

            builder.Entity<FuneralOrder>()
                .HasOne(f => f.User)
                .WithMany(c => c.Orders);


            base.OnModelCreating(builder);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Ware> Wares { get; set; }
        public DbSet<PlaceCemetary> PlaceCemetaries { get; set; }
        public DbSet<Employees> Employees { get; set; }

        public DbSet<FuneralOrder> FuneralOrders { get; set; }


    }
}
