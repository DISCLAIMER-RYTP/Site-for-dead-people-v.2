using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Dto
{
    public class PlaceCemetaryDto
    {
        public int Id { get; set; }
        public string Dsitrict { get; set; }
        public string Place { get; set; }
        public int Prise { get; set; }
    }
}
