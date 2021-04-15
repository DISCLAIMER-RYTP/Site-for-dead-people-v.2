using Ritual_Services_Api.Models.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Configuration.Interfaces
{
     public interface ITypeInitializer
    {
        Task Init(ApplicationContext context);

    }
}
