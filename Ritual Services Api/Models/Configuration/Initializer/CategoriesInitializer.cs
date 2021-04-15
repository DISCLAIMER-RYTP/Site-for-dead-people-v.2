using Ritual_Services_Api.Models.Configuration.Interfaces;
using Ritual_Services_Api.Models.Entities;
using Ritual_Services_Api.Models.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Configuration.Initializer
{
    public class CategoriesInitializer :ITypeInitializer
    {
        public async Task Init(ApplicationContext context)
        {
            Category[] categories = new Category[]
            {
                new Category { Name = "Adventure" },
                new Category { Name = "Fantasy" }
            };

            await context.Set<Category>().AddRangeAsync(categories);
        }

    }
}
