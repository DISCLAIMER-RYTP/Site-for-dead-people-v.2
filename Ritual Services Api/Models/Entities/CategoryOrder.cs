using Ritual_Services_Api.Models.Entities.Idemtity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Entities
{
    public class CategoryOrder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<FuneralOrder> FuneralOrders { get; set; }
    }
}
