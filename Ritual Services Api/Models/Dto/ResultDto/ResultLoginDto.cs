using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Dto.ResultDto
{
    public class ResultLoginDto: ResultDto
    {
        public string Token { get; set; }
    }
}
