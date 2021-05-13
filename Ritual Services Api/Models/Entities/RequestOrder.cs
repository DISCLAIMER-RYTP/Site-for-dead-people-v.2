using Ritual_Services_Api.Models.Entities.Idemtity;
using Ritual_Services_Api.Models.Entities.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Models.Entities
{
    public enum Req { Requested, Accepted, Rejected }

    public class RequestOrder
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Req Requests { get; set; }

        [Required]
        public FuneralOrder Order { get; set; }

    }
}
