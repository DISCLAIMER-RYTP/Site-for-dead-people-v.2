using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Dto
{
    public class FuneralOrderDto
    {
        public int Id { get; set; }
        public int Price { get; set; }
        public string CategoryName { get; set; }
        public int UserId { get; set; }
    }
}
