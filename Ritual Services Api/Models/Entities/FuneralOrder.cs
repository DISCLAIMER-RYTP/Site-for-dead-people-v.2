using Ritual_Services_Api.Models.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Entities.Idemtity
{
    public class FuneralOrder
    {
       public int Id { get; set; }
       public int Price { get; set; }
        public User User { get; set; }
        public CategoryOrder Category { get; set; }
        public RequestOrder Request { get; set; }
    }
}
