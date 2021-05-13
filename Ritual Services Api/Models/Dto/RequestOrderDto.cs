using Ritual_Services_Api.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Dto.ResultDto
{
    public class RequestOrderDto
    {
        public int Id { get; set; }

        public Req Requests { get; set; }

        public int OrderId { get; set; }
    }
}
