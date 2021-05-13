using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ritual_Services_Api.Models.Entities;
using Ritual_Services_Api.Models.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Helpers
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services,
            IWebHostEnvironment env,
            IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
                SeedUsers(manager, managerRole,context);
            }
        }
        private static void SeedUsers(UserManager<User> userManager, RoleManager<IdentityRole> roleManager,ApplicationContext context)
        {
            context.Categories.Add(new Category { Name = "Ritual-Stuff" });
            context.Categories.Add(new Category { Name = "Memorial" });
            context.Categories.Add(new Category { Name = "Crosses" });
            context.Categories.Add(new Category { Name = "Wreaths" });
            context.Categories.Add(new Category { Name = "Urns" });
            context.Categories.Add(new Category { Name = "Coffins" });

            context.Wares.Add(new Ware { Name = "Crosses", Image = "Images/maryna.png", Price = 213, Description = "sdfsdfsdfsdf", Category = context.Categories.FirstOrDefault(x => x.Name == "Ritual-Stuff") });
            context.Wares.Add(new Ware { Name = "Crosses", Image = "ddd", Price = 213, Description = "sdfsdfsdfsdf", Category = context.Categories.FirstOrDefault(x => x.Name == "Ritual-Stuff") });
            context.Wares.Add(new Ware { Name = "Crosses", Image = "ddd", Price = 213, Description = "sdfsdfsdfsdf", Category = context.Categories.FirstOrDefault(x => x.Name == "Ritual-Stuff") });

            context.Wares.Add(new Ware { Name = "War", Image = "dsffds", Price = 213, Description = "sdfsdfsdfsdf", Category = context.Categories.FirstOrDefault(x => x.Name == "Memorial") });

            context.Wares.Add(new Ware { Name = "Pink", Image = "dsffds", Price = 21312, Description = "sdfsdfsdfsdf", Category = context.Categories.FirstOrDefault(x => x.Name == "Crosses") });
            context.Wares.Add(new Ware { Name = "Orange", Image = "dsffds", Price = 12, Description = "sdfsdfsdfsdf", Category = context.Categories.FirstOrDefault(x => x.Name == "Wreaths") });
            context.Wares.Add(new Ware { Name = "Zelena", Image = "dsffds", Price = 612, Description = "sdfsdfsdfsdf", Category = context.Categories.FirstOrDefault(x => x.Name == "Urns") });
            context.Wares.Add(new Ware { Name = "Burba", Image = "dsffds", Price = 312, Description = "sdfsdfsdfsdf", Category = context.Categories.FirstOrDefault(x => x.Name == "Coffins") });


            context.SaveChanges();




            var roleName = "Admin";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultAdminRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Admin"
                }).Result;
                var resultUserRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "User"
                }).Result;
                var resultGuestRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Guest"
                }).Result;
            }
            string email = "admin@gmail.com";
            var admin = new User
            {
                Email = email,
                UserName = email
            };
            var dasha = new User
            {
                Email = "dasha.gryb@gmail.com",
                UserName = "dasha.gryb@gmail.com"
            };
            var resultAdmin = userManager.CreateAsync(admin, "Qwerty1-").Result;
            resultAdmin = userManager.AddToRoleAsync(admin, "Admin").Result;
            var resultDasha = userManager.CreateAsync(dasha, "Qwerty1-").Result;
            resultDasha = userManager.AddToRoleAsync(dasha, "Guest").Result;
        }
    }
}
