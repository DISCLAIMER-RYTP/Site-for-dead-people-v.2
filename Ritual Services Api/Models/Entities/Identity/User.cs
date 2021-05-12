using Microsoft.AspNetCore.Identity;
using Ritual_Services_Api.Models.Entities.Idemtity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Entities.Identity
{
    public class User : IdentityUser
    {
        public virtual UserAdditionalInfo UserAdditionalInfo { get; set; }
        public ICollection<FuneralOrder> Orders { get; set; }
    }
}
